import React from "react";

import { StyleSheet } from "react-native";
import {
  differenceInSeconds,
  format,
  formatDistanceToNow,
  formatDistanceToNowStrict,
} from "date-fns";
import Animated, {
  SharedValue,
  runOnJS,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { Canvas, Text, useFont } from "@shopify/react-native-skia";

const BOLD_FONT_PATH = "./../../../assets/Roboto-Bold.ttf";
const MEDIUM_FONT_PATH = "./../../../assets/Roboto-Medium.ttf";

const MIN_CANVAS_WIDTH = 140;
const START_SPACING = 4;
const TEXT_BOTTOM = 6;

type DataValueProp = {
  value: SharedValue<number>;
  value2?: SharedValue<number>;
  timestamp: SharedValue<string>;
  isActive: SharedValue<boolean>;
  unit: string;
  unit2?: string;
  color: string;
};

/**
 * Generates text indicating the time elapsed since the last updated data point was received.
 *
 * Calculates the time difference between the current time and the provided `lastData`.
 * Based on the difference and the `showExactTime` flag, it generates a text indicating
 * when the data was last updated.
 *
 * @param lastData - The date representing the last update time.
 * @param showExactTime - Indicates to show the exact time of the last update when pan gesture is active
 * @returns A string indicating the time elapsed since the last update.
 *
 * @remarks
 * - The function utilizes the `differenceInSeconds`, `formatDistanceToNowStrict`, and `formatDistanceToNow`
 *   functions from the date-fns library for calculating and formatting the time difference.
 * - If the time difference is less than or equal to 2 seconds, the function returns "Updated now".
 * - If `showExactTime` is `true` when pan gesture is active, the function displays the exact time of the
 *   last update in addition to the relative time.
 *   Otherwise, it only displays the relative time since the last update.
 * - The function returns a string with "<" instead of "less than" to make the output more concise.
 *
 * @example
 * ```typescript
 * const lastUpdatedText = getLastUpdatedText(new Date("2024-03-19T12:00:00"), true);
 * console.log(lastUpdatedText); // Example output: "Updated now"
 * ```
 */
const getLastUpdatedText = (lastData: Date, showExactTime: boolean): string => {
  const seconds = differenceInSeconds(Date.now(), lastData);
  if (seconds <= 2) return "Updated now";

  const result = showExactTime
    ? formatDistanceToNowStrict(lastData, { addSuffix: true }) +
      " at " +
      format(lastData, "kk:mm")
    : formatDistanceToNow(lastData, {
        includeSeconds: true,
        addSuffix: true,
      });

  return result.replace("less than", "<");
};

export default function CardDataValue(props: DataValueProp) {
  const valueFont = useFont(require(BOLD_FONT_PATH), 26);
  const timestampFont = useFont(require(MEDIUM_FONT_PATH), 14);

  const shownValue = useDerivedValue(
    () => props.value.value.toFixed(1) + " " + props.unit
  );
  const shownValue2 = useDerivedValue(() =>
    props.value2 && props.unit2
      ? props.value2.value.toFixed(1) + " " + props.unit2
      : ""
  );

  const shownTimestamp = useSharedValue("");
  const convertTimestamp = (timeString: string, showExactTime: boolean) => {
    const date = new Date(timeString);
    const durationString = getLastUpdatedText(date, showExactTime);
    shownTimestamp.value = durationString;
  };
  useDerivedValue(() => {
    runOnJS(convertTimestamp)(props.timestamp.value, props.isActive.value);
  });

  const valueHeight = useDerivedValue(
    () => valueFont?.measureText(shownValue.value).height ?? 0
  );
  const value2Height = useDerivedValue(
    () => valueFont?.measureText(shownValue2.value).height ?? 0
  );
  const timeHeight = useDerivedValue(
    () => timestampFont?.measureText(shownTimestamp.value).height ?? 0
  );

  const CANVAS_HEIGHT = useDerivedValue(() => {
    const padding = value2Height.value == 0 ? TEXT_BOTTOM : 2 * TEXT_BOTTOM;
    return (
      valueHeight.value + value2Height.value + timeHeight.value + padding + 4
    );
  });

  const CANVAS_WIDTH = useDerivedValue(() => {
    const valueWidth = valueFont?.measureText(shownValue.value).width ?? 0;
    const value2Width = valueFont?.measureText(shownValue2.value).width ?? 0;
    const timestampWidth =
      timestampFont?.measureText(shownTimestamp.value).width ?? 0;
    return (
      Math.max(MIN_CANVAS_WIDTH, valueWidth, value2Width, timestampWidth) +
      START_SPACING
    );
  });

  const value2Pos = useDerivedValue(
    () => valueHeight.value + value2Height.value + TEXT_BOTTOM
  );
  const timestampPos = useDerivedValue(() => {
    const padding = value2Height.value == 0 ? TEXT_BOTTOM : 2 * TEXT_BOTTOM;
    return timeHeight.value + valueHeight.value + value2Height.value + padding;
  });

  return (
    <Animated.View style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}>
      <Canvas style={styles.canvas}>
        <Text
          x={START_SPACING}
          y={valueHeight}
          text={shownValue}
          font={valueFont}
          color={props.color}
        />
        <Text
          x={START_SPACING}
          y={value2Pos}
          text={shownValue2}
          font={valueFont}
          color={props.color}
        />
        <Text
          x={START_SPACING}
          y={timestampPos}
          text={shownTimestamp}
          font={timestampFont}
          color={props.color}
        />
      </Canvas>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  canvas: {
    width: "100%",
    height: "100%",
  },
});
