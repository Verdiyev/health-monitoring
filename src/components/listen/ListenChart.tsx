import React from "react";
import { Dimensions, PixelRatio, StyleSheet, View } from "react-native";
import {
  runOnJS,
  runOnUI,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { useScanner } from "./useScanner";
import { Button, useTheme } from "react-native-paper";
import { Skia, Canvas, Path, Mask, Rect } from "@shopify/react-native-skia";
import { divideDataInGroups, addNewData } from "../../utils/ListenUtils";
import { DATA_RED } from "../../constants/colors";

const CANVAS_HEIGHT = 200;
const FRAME_TIME = 17; // milliseconds

type ListenChartProps = {
  timeBase: number;
};

export default function ListenChart(props: ListenChartProps) {
  const TIME_BASE = props.timeBase * 1000; // Convert to milliseconds

  const theme = useTheme();
  const width = Dimensions.get("screen").width;

  const WIDTH_PER_FRAME = (FRAME_TIME / TIME_BASE) * width;
  const PIXELS_PER_FRAME =
    PixelRatio.getPixelSizeForLayoutSize(WIDTH_PER_FRAME);

  const previousPath = useSharedValue(Skia.Path.Make());
  const currentPath = useSharedValue(
    Skia.Path.Make().moveTo(0, CANVAS_HEIGHT / 2)
  );

  // Reset path values when time base changes
  previousPath.value = Skia.Path.Make();
  currentPath.value = Skia.Path.Make().moveTo(0, CANVAS_HEIGHT / 2);

  const incomingData: number[] = [];
  const { xValue } = useScanner({
    maxWidth: width,
    duration: TIME_BASE,
  });

  // Updates the current path with a new point.
  const updatePathWithNewPoint = (x: number, y: number) => {
    "worklet";
    currentPath.value.lineTo(x, CANVAS_HEIGHT / 2 + y);
  };

  // Processes bluetooth data in buffer and updates the current path.
  const processIncomingData = () => {
    // No data to be drawn
    if (incomingData.length == 0) {
      runOnUI(updatePathWithNewPoint)(xValue.value, 0);
      return;
    }

    // Time base is too large such that multiple frames will be drawing
    // on the same pixel. Just draw average of all incoming points.
    if (PIXELS_PER_FRAME <= 1) {
      const average =
        incomingData.reduce((a, b) => a + b, 0) / incomingData.length;
      runOnUI(updatePathWithNewPoint)(xValue.value, average);
      incomingData.length = 0; // Clear all data
      return;
    }

    // Pixel per frame >= 2 AND incoming data length > 0
    // Divide incoming data into groups of the number of pixels each
    // frame can show. This depends on the pixel ratio of the device.
    // For each subgroup, find the average and draw it on that pixel
    const groupedData = divideDataInGroups(incomingData, PIXELS_PER_FRAME);
    const widthInterval = WIDTH_PER_FRAME / groupedData.length;
    groupedData.forEach((group: number[], index: number) => {
      // Invert index so that first element will be draw groupedData length away from currentX
      const invertIndex = groupedData.length - index - 1;
      const average = group.reduce((a, b) => a + b, 0) / group.length;
      const newXValue = xValue.value - invertIndex * widthInterval;
      runOnUI(updatePathWithNewPoint)(newXValue, average);
    });
    incomingData.length = 0; // Reset data once processed
  };

  // Only called when xValue of scanner animation changes, won't change
  // when incomingData changes since it is on the JS thread. Updates path accordingly.
  useDerivedValue(() => {
    // Scanner reached the end of screen
    if (xValue.value == width) {
      previousPath.value = currentPath.value.copy();
      currentPath.value = Skia.Path.Make().moveTo(0, CANVAS_HEIGHT / 2);
      return;
    }

    runOnJS(processIncomingData)();
  });

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }} />
      <Canvas
        style={{
          width: width,
          height: CANVAS_HEIGHT,
        }}
      >
        <Path
          path={currentPath}
          style={"stroke"}
          strokeWidth={2}
          color={DATA_RED}
        />
        <Mask mask={<Rect x={xValue} height={CANVAS_HEIGHT} width={width} />}>
          <Path
            path={previousPath}
            style={"stroke"}
            strokeWidth={2}
            color={DATA_RED}
          />
        </Mask>
        <Rect
          x={xValue}
          y={0}
          width={10}
          height={CANVAS_HEIGHT}
          color={theme.colors.background}
        />
      </Canvas>
      <View style={{ flex: 1 }} />
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => addNewData(incomingData, CANVAS_HEIGHT)}
      >
        Simulate Data
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    margin: 12,
  },
});
