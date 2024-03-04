import {
  SkPath,
  Group,
  Mask,
  Rect,
  Path,
  DashPathEffect,
} from "@shopify/react-native-skia";
import { useEffect } from "react";
import { Dimensions } from "react-native";
import {
  SharedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import LineChartGradient from "./LineChartGradient";
import { DefaultLineChartProps, GraphDimensions } from "./utils/LineChartTypes";

type SkiaGraphPathProps = {
  skiaGraph: SkPath;
  skiaGraph2?: SkPath;
  shownWidth: SharedValue<number>;
  dimension: GraphDimensions;
  graphProps: DefaultLineChartProps;
  color: string;
};

export default function SkiaGraphPath({
  skiaGraph,
  skiaGraph2,
  shownWidth,
  dimension,
  graphProps,
  color,
}: SkiaGraphPathProps) {
  const { canvasHeight, canvasWidth, graphWidth } = dimension;
  const { areaChart, startSpacing, yLabelWidth, xLabelHeight } = graphProps;

  const initialAnimatedWidth = useSharedValue(0);
  useEffect(() => {
    const phoneWidth = Dimensions.get("window").width;
    initialAnimatedWidth.value = withTiming(phoneWidth, { duration: 2000 });
  });

  return (
    <Group>
      {/* Partially opaque lines */}
      <Mask
        mask={<Rect x={shownWidth} height={canvasHeight} width={canvasWidth} />}
      >
        <Path
          style="stroke"
          path={skiaGraph}
          strokeWidth={3}
          color={color}
          opacity={0.4}
        />
        {skiaGraph2 && (
          <Path
            style="stroke"
            path={skiaGraph2}
            strokeWidth={3}
            color={color}
            opacity={0.4}
          />
        )}
      </Mask>
      {/* Actually line with gradient */}
      <Mask mask={<Rect height={canvasHeight} width={shownWidth} />}>
        {areaChart && (
          <LineChartGradient
            skiaGraph={skiaGraph}
            startX={startSpacing + yLabelWidth}
            endX={startSpacing + yLabelWidth + graphWidth}
            endY={canvasHeight - xLabelHeight}
            color={color}
          />
        )}
        <Path style="stroke" path={skiaGraph} strokeWidth={3} color={color} />

        {skiaGraph2 && (
          <Group>
            {areaChart && (
              <LineChartGradient
                skiaGraph={skiaGraph2}
                startX={startSpacing + yLabelWidth}
                endX={startSpacing + yLabelWidth + graphWidth}
                endY={canvasHeight - xLabelHeight}
                color={color}
              />
            )}
            <Path
              style="stroke"
              path={skiaGraph2}
              strokeWidth={3}
              color={color}
            >
              <DashPathEffect intervals={[6, 3]} />
            </Path>
          </Group>
        )}
      </Mask>
    </Group>
  );
}
