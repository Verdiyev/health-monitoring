import React from "react";

import { StyleSheet, View } from "react-native";
import {
  differenceInSeconds,
  format,
  formatDistanceToNow,
  formatDistanceToNowStrict,
} from "date-fns";
import {
  SharedValue,
  runOnJS,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { Canvas, Text, useFont } from "@shopify/react-native-skia";

const BOLD_FONT_PATH = "./../../../assets/Roboto-Bold.ttf";
const MEDIUM_FONT_PATH = "./../../../assets/Roboto-Medium.ttf";

const CANVAS_WIDTH = 140;
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

  const valueHeight = valueFont?.measureText(shownValue.value).height ?? 0;
  const value2Height = valueFont?.measureText(shownValue2.value).height ?? 0;
  const timeHeight =
    timestampFont?.measureText(shownTimestamp.value).height ?? 0;

  return (
    <View style={styles.container}>
      <Canvas
        style={{ height: valueHeight + TEXT_BOTTOM, width: CANVAS_WIDTH }}
      >
        <Text
          x={START_SPACING}
          y={valueHeight}
          text={shownValue}
          font={valueFont}
          color={props.color}
        />
      </Canvas>
      {props.value2 && props.unit2 && (
        <Canvas
          style={{ height: value2Height + TEXT_BOTTOM, width: CANVAS_WIDTH }}
        >
          <Text
            x={START_SPACING}
            y={valueHeight}
            text={shownValue2}
            font={valueFont}
            color={props.color}
          />
        </Canvas>
      )}
      <View style={{ height: 2 }} />
      <Canvas style={{ height: timeHeight + TEXT_BOTTOM, width: CANVAS_WIDTH }}>
        <Text
          x={START_SPACING}
          y={timeHeight}
          text={shownTimestamp}
          font={timestampFont}
          color={props.color}
        />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    // backgroundColor: "red",
  },
  canvas: {
    alignSelf: "center",
    width: 120,
    height: 80,
    // backgroundColor: "red",
  },
});
