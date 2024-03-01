import React from "react";
import { StyleSheet } from "react-native";

import { DATA_BLUE } from "../../constants/colors";
import { generateData } from "./random";
import HealthCard from "./card/HealthCard";

const RESPIRATORY_UNIT = "bpm";

export default function RespiratoryRateCard() {
  const [respiratoryData, _] = React.useState(generateData(60, 120, 2000));

  return (
    <HealthCard
      title={"Respiratory Rate"}
      titleIcon={"weather-windy"}
      data={respiratoryData}
      unit={RESPIRATORY_UNIT}
      color={DATA_BLUE}
    />
  );
}

const styles = StyleSheet.create({});
