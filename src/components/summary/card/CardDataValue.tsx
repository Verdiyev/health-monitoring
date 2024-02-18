import React from "react";

import { StyleSheet, View, ViewStyle } from "react-native";
import { Text } from "react-native-paper";
import { ChartData } from "../../charts/ChartDataTypes";
import {
  differenceInSeconds,
  format,
  formatDistanceToNow,
  formatDistanceToNowStrict,
} from "date-fns";

type DataValueProp = {
  chartData: ChartData;
  unit: string;
  chartData2?: ChartData;
  unit2?: string;
  color: string;
  showExactTime: boolean;
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
  const coloredStyle = styles(props.color);
  return (
    <View style={coloredStyle.dataValueContainer}>
      <Text variant="headlineMedium" style={coloredStyle.dataText}>
        {props.chartData.value} {props.unit}
      </Text>
      {props.chartData2 && props.unit2 && (
        <Text variant="headlineMedium" style={coloredStyle.dataText}>
          {props.chartData2.value} {props.unit2}
        </Text>
      )}
      <Text variant="labelLarge" style={coloredStyle.updatedText}>
        {getLastUpdatedText(props.chartData.timestamp, props.showExactTime)}
      </Text>
    </View>
  );
}

const styles = (color) =>
  StyleSheet.create({
    dataValueContainer: {
      alignSelf: "center",
    },
    dataText: {
      fontWeight: "bold",
      color: color,
    },
    updatedText: {
      color: color,
    },
  });
