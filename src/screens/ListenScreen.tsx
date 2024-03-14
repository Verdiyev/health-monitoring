import React from "react";

import { Canvas, Mask, Path, Rect, Skia } from "@shopify/react-native-skia";
import { Dimensions, StyleSheet, View } from "react-native";
import { useScanner } from "../components/listen/useScanner";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import { Button, useTheme } from "react-native-paper";

const CANVAS_HEIGHT = 200;

const FRAME_TIME = 17;
const TOTAL_DURATION = 5000;

export default function ListenScreen() {
  const theme = useTheme();
  const width = Dimensions.get("screen").width;

  const previousPath = useSharedValue(Skia.Path.Make());
  const currentPath = useSharedValue(
    Skia.Path.Make().moveTo(0, CANVAS_HEIGHT / 2)
  );

  const incoming = useSharedValue<number[]>([]);
  const { xValue } = useScanner({ maxWidth: width, duration: TOTAL_DURATION });

  useDerivedValue(() => {
    // Scanner reached the end of screen
    if (xValue.value == width) {
      previousPath.value = currentPath.value.copy();
      currentPath.value = Skia.Path.Make().moveTo(0, CANVAS_HEIGHT / 2);
    } else {
      if (incoming.value.length == 0) {
        currentPath.value.lineTo(xValue.value, CANVAS_HEIGHT / 2);
        return;
      }
      while (incoming.value.length > 0) {
        const data = incoming.value[0];
        currentPath.value.lineTo(xValue.value, CANVAS_HEIGHT / 2 + data);
        incoming.value = incoming.value.slice(1);
      }
    }
  });

  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  const addNewData = () => {
    const NO_DATA = 50;
    const MAX = 50;
    const MIN = 0;
    let prevData = 0;

    for (let i = 0; i < NO_DATA; i++) {
      setTimeout(() => {
        let data = getRandomInt(CANVAS_HEIGHT) - CANVAS_HEIGHT / 2;
        while (Math.abs(data - prevData) > 5)
          data = getRandomInt(CANVAS_HEIGHT) - CANVAS_HEIGHT / 2;

        incoming.value = [...incoming.value, data];
        prevData = data;
      }, 10 * i);
    }
  };

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
          color={"red"}
        />
        <Mask mask={<Rect x={xValue} height={CANVAS_HEIGHT} width={width} />}>
          <Path
            path={previousPath}
            style={"stroke"}
            strokeWidth={2}
            color={"red"}
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
      <Button mode="contained" style={styles.button} onPress={addNewData}>
        Add data
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  button: {
    margin: 12,
  },
});
