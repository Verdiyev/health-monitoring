import React from "react";
import {
  DashPathEffect,
  Group,
  Line,
  Text,
  useFont,
  vec,
} from "@shopify/react-native-skia";
import _ from "lodash";

import { linspace } from "./utils/LineChartUtils";
import { DefaultLineChartProps, GraphDimensions } from "./utils/LineChartTypes";

type YAxisProps = {
  minValue: number;
  maxValue: number;
  dimension: GraphDimensions;
  graphProps: DefaultLineChartProps;
};

export default function YAxis({
  minValue,
  maxValue,
  dimension,
  graphProps,
}: YAxisProps) {
  const {
    hideYAxisLine,
    hideYLabels,
    hideYGridLines,
    yLabelWidth,
    topSpacing,
    noOfSteps,
    labelFontSize,
  } = graphProps;
  const { canvasWidth, graphHeight } = dimension;

  const font = useFont(require("./../../assets/Roboto.ttf"), labelFontSize);
  const yAxisLabels = linspace(minValue, maxValue, noOfSteps, true);

  return (
    <Group>
      {/* Y-axis line */}
      {!hideYAxisLine && (
        <Line
          p1={vec(yLabelWidth, topSpacing - 10)}
          p2={vec(yLabelWidth, graphHeight + topSpacing)}
          color="grey"
          style="stroke"
          strokeWidth={1}
        />
      )}

      {/* Y-Axis Labels */}
      {!hideYLabels &&
        yAxisLabels.map((yAxis: number, index: number) => {
          const yValue = _.round(yAxis, 1).toString();
          const textWidth = font?.measureText(yValue).width ?? 0;
          const textHeight = font?.measureText(yValue).height ?? 0;

          const xPos = (yLabelWidth - textWidth) / 2;
          const startPos = graphHeight + textHeight / 2;
          const step = graphHeight / (noOfSteps - 1);
          const yPos = startPos - step * index + topSpacing;

          return (
            <Text key={index} x={xPos} y={yPos} text={yValue} font={font} />
          );
        })}

      {/* Y-Axis grid lines */}
      {!hideYGridLines &&
        yAxisLabels.map((_, index: number) => {
          if (index == 0) return <Line key={0} p1={vec(0, 0)} p2={vec(0, 0)} />;
          const startPos = graphHeight + topSpacing;
          const step = graphHeight / (noOfSteps - 1);
          const yPos = startPos - step * index;

          return (
            <Line
              key={index}
              p1={vec(yLabelWidth, yPos)}
              p2={vec(canvasWidth, yPos)}
            >
              <DashPathEffect intervals={[5, 5]} />
            </Line>
          );
        })}
    </Group>
  );
}
