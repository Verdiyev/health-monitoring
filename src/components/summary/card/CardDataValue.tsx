import React from "react";

import { StyleSheet, View, ViewStyle } from "react-native";
import { Text } from "react-native-paper";

type DataValueProp = {
  heartRate: number;
  lastUpdatedSec: number;
  color: string;
};

export default function CardDataValue(props: DataValueProp) {
  const coloredStyle = styles(props.color);
  return (
    <View style={coloredStyle.dataValueContainer}>
      <Text variant="headlineMedium" style={coloredStyle.dataText}>
        {props.heartRate} bpm
      </Text>
      <Text variant="labelLarge" style={coloredStyle.updatedText}>
        {props.lastUpdatedSec} sec ago
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
