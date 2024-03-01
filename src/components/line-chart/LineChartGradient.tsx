import React from "react";
import {
  Group,
  LinearGradient,
  Path,
  SkPath,
  Skia,
  vec,
} from "@shopify/react-native-skia";
import { hexToRGB } from "./utils/LineChartUtils";

const Y_OFFSET = 1;

type LineChartGradientProps = {
  skiaGraph: SkPath;
  startX: number;
  endX: number;
  endY: number;
  color: string;
};

export default function LineChartGradient({
  skiaGraph,
  startX,
  endX,
  endY,
  color,
}: LineChartGradientProps) {
  const gradientAreaPath = Skia.Path.Make()
    .addPath(skiaGraph)
    .lineTo(endX, endY - Y_OFFSET)
    .lineTo(startX, endY - Y_OFFSET)
    .close();

  return (
    <Group transform={[{ translateY: Y_OFFSET }]}>
      <Path path={gradientAreaPath}>
        <LinearGradient
          start={vec(0, endY / 2)}
          end={vec(0, endY)}
          colors={[hexToRGB(color, 0.8), hexToRGB(color, 0.2)]}
        />
      </Path>
    </Group>
  );
}
