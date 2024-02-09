import React from "react";

import { StyleSheet, Text, View } from "react-native";

import CardDataValue from "./CardDataValue";
import LineGraphPreview from "../../charts/LineGraphPreview";
import { DATA_RED } from "../../../constants/colors";

export default function CardPreview() {
  return (
    <View style={styles.cardPreviewContainer}>
      <CardDataValue color={DATA_RED} heartRate={100} lastUpdatedSec={45} />
      <LineGraphPreview color={DATA_RED} />
    </View>
  );
}

const styles = StyleSheet.create({
  cardPreviewContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
});
