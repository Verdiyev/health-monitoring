import React from "react";
import {
  DashPathEffect,
  Group,
  Line,
  Text,
  useFont,
  vec,
} from "@shopify/react-native-skia";

import { linspace } from "./utils/LineChartUtils";
import { format } from "date-fns";
import { DefaultLineChartProps, GraphDimensions } from "./utils/LineChartTypes";

type XAxisProps = {
  dimension: GraphDimensions;
  graphProps: DefaultLineChartProps;
};

export default function XAxis({ dimension, graphProps }: XAxisProps) {
  const {
    data,
    hideXLabels,
    hideXGridLines,
    xLabelHeight,
    yLabelWidth,
    startSpacing,
    topSpacing,
    noOfLabels,
    labelFontSize,
    xLabelAngle,
  } = graphProps;

  const { canvasWidth, canvasHeight, graphHeight, graphWidth } = dimension;

  const font = useFont(require("./../../assets/Roboto.ttf"), labelFontSize);
  const xAxisLabels = linspace(0, data.length - 1, noOfLabels, true);

  return (
    <Group>
      {/* X-Axis Line */}
      <Line // X-axis line
        p1={vec(yLabelWidth, graphHeight + topSpacing)}
        p2={vec(canvasWidth, graphHeight + topSpacing)}
        color="grey"
        style="stroke"
        strokeWidth={1}
      />

      {/* X-Axis labels */}
      {!hideXLabels &&
        xAxisLabels.map((xAxis: number, index: number) => {
          const xValue = format(data[Math.round(xAxis)].timestamp, "kk:mm");
          const textWidth = font?.measureText(xValue).width ?? 0;
          const textHeight = font?.measureText(xValue).height ?? 0;

          const yPos = canvasHeight - xLabelHeight / 2 + textHeight / 2;
          const startPos = yLabelWidth + startSpacing;
          const step = graphWidth / (noOfLabels - 1);
          const xPos = startPos + step * index - textWidth / 2;

          return (
            <Group
              key={index}
              transform={[{ rotate: (Math.PI / 180) * xLabelAngle }]}
              origin={{ x: xPos + textWidth / 2, y: yPos - textHeight / 2 }}
            >
              <Text x={xPos} y={yPos} text={xValue} font={font} />
            </Group>
          );
        })}

      {/* X-Axis grid lines */}
      {!hideXGridLines &&
        xAxisLabels.map((_, index: number) => {
          const startPos = yLabelWidth + startSpacing;
          const step = graphWidth / (noOfLabels - 1);
          const xPos = startPos + step * index;

          return (
            <Line
              key={index}
              p1={vec(xPos, topSpacing - 5)}
              p2={vec(xPos, graphHeight + topSpacing)}
            >
              <DashPathEffect intervals={[5, 5]} />
            </Line>
          );
        })}
    </Group>
  );
}
