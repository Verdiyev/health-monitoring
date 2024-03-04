import { StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { Canvas, Skia } from "@shopify/react-native-skia";
import {
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useGraphPanGesture } from "./hooks/useGraphTouchHandler";
import {
  interpolate,
  runOnJS,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { getYForX, parse } from "react-native-redash";

import Cursor from "./Cursor";
import SkiaGraphPath from "./SkiaGraphPath";
import XAxis from "./XAxis";
import YAxis from "./YAxis";
import {
  DefaultLineChartProps,
  GraphDimensions,
  LineChartProps,
} from "./utils/LineChartTypes";
import { generateGraph, getDataRange } from "./utils/LineChartUtils";

export default function LineChart(props: LineChartProps) {
  const [width, setWidth] = React.useState(0);

  const {
    data,
    data2,
    color,
    height = 300,
    labelFontSize = 14,
    noOfSteps = 4,
    noOfLabels = 4,
    xLabelHeight = 60,
    yLabelWidth = 50,
    startSpacing = 0,
    endSpacing = 30,
    topSpacing = 30,
    upperOffset = 5,
    lowerOffset = 5,
    xLabelAngle = 0,
    areaChart = false,
    hideYLabels = false,
    hideYAxisLine = false,
    hideYGridLines = false,
    hideXLabels = false,
    hideXGridLines = false,
    disablePanGesture = false,
    isActive = useSharedValue(false),
    shownValue = useSharedValue(0),
    shownValue2 = useSharedValue(0),
    shownDate = useSharedValue(new Date().toISOString()),
  } = props;

  const defaultProps: DefaultLineChartProps = {
    data,
    data2: data2 ?? [],
    color,
    height,
    labelFontSize,
    noOfSteps,
    noOfLabels,
    xLabelHeight,
    yLabelWidth,
    startSpacing,
    endSpacing,
    topSpacing,
    upperOffset,
    lowerOffset,
    areaChart,
    xLabelAngle,
    hideYLabels,
    hideYAxisLine,
    hideYGridLines,
    hideXLabels,
    hideXGridLines,
    disablePanGesture,
    isActive,
    shownValue,
    shownValue2,
    shownDate,
  };

  const LEFT_SPACING = yLabelWidth + startSpacing;
  const RIGHT_SPACING = endSpacing;

  const GRAPH_HEIGHT = Math.max(0, height - xLabelHeight - topSpacing);
  const GRAPH_WIDTH = Math.max(0, width - LEFT_SPACING - RIGHT_SPACING);

  const graphDimension: GraphDimensions = {
    canvasHeight: height,
    canvasWidth: width,
    graphWidth: GRAPH_WIDTH,
    graphHeight: GRAPH_HEIGHT,
  };

  const { minData, maxData } = getDataRange(data, data2);
  const minValue = minData - lowerOffset;
  const maxValue = maxData + upperOffset;

  const graph = generateGraph({
    data: data,
    xFrom: [data[0].timestamp, data[data.length - 1].timestamp],
    xTo: [LEFT_SPACING, Math.floor(LEFT_SPACING + GRAPH_WIDTH)],
    yFrom: [minValue, maxValue],
    yTo: [height - xLabelHeight, topSpacing],
  });

  const graph2 = data2
    ? generateGraph({
        data: data2,
        xFrom: [data2[0].timestamp, data2[data2.length - 1].timestamp],
        xTo: [LEFT_SPACING, Math.floor(LEFT_SPACING + GRAPH_WIDTH)],
        yFrom: [minValue, maxValue],
        yTo: [height - xLabelHeight, topSpacing],
      })
    : undefined;

  const xValues1 = data.map((item) => graph.x(item.timestamp));
  const xValues2 =
    data2 && graph2 ? data2.map((item) => graph2.x(item.timestamp)) : [];
  const xValues = [...new Set([...xValues1, ...xValues2])];

  const bezierGraph = parse(graph.path);
  const bezierGraph2 = graph2 ? parse(graph2.path) : undefined;

  const skiaGraph = Skia.Path.MakeFromSVGString(graph.path) ?? Skia.Path.Make();
  const skiaGraph2 = graph2
    ? Skia.Path.MakeFromSVGString(graph2.path) ?? Skia.Path.Make()
    : undefined;

  const { panX, panGesture } = useGraphPanGesture({
    isActive: isActive,
    enabled: !disablePanGesture,
    startSpacing: LEFT_SPACING,
    xIndices: xValues,
  });
  const cursorY = useDerivedValue(() => getYForX(bezierGraph, panX.value));
  const cursorY2 = useDerivedValue(() =>
    bezierGraph2 ? getYForX(bezierGraph2, panX.value) : 0
  );

  useEffect(() => {
    const lastX = xValues[xValues.length - 1];
    panX.value = withTiming(lastX, { duration: 1000 });
  });

  const getXDate = (xValue: number) => {
    shownDate.value = graph.x.invert(xValue).toISOString();
  };

  useDerivedValue(() => {
    runOnJS(getXDate)(panX.value);
    shownValue.value = interpolate(
      cursorY.value ?? 0,
      [height - xLabelHeight, topSpacing],
      [minValue, maxValue]
    );
    shownValue2.value = interpolate(
      cursorY2.value ?? 0,
      [height - xLabelHeight, topSpacing],
      [minValue, maxValue]
    );
  });

  return (
    <GestureHandlerRootView
      style={styles(height).container}
      onLayout={({ nativeEvent }) => setWidth(nativeEvent.layout.width)}
    >
      <Canvas style={styles(height).canvas}>
        <XAxis dimension={graphDimension} graphProps={defaultProps} />

        <YAxis
          minValue={minValue}
          maxValue={maxValue}
          dimension={graphDimension}
          graphProps={defaultProps}
        />

        <SkiaGraphPath
          skiaGraph={skiaGraph}
          skiaGraph2={skiaGraph2}
          shownWidth={panX}
          dimension={graphDimension}
          graphProps={defaultProps}
          color={color}
        />

        <Cursor x={panX} y={cursorY} active={isActive} color={color} />

        {data2 && (
          <Cursor x={panX} y={cursorY2} active={isActive} color={color} />
        )}
      </Canvas>

      <GestureDetector gesture={panGesture}>
        <View
          style={{
            position: "absolute",
            width: Math.floor(GRAPH_WIDTH),
            left: LEFT_SPACING,
            height: height,
          }}
        />
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

const styles = (height: number) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: height,
      position: "relative",
    },
    canvas: {
      width: "100%",
      height: height,
      // backgroundColor: "lightgrey",
    },
  });
