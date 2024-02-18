import React from "react";

import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";

import CardData from "./card/CardData";
import CardTitle from "./card/CardTitle";
import CardPreview from "./card/CardPreview";

import { DATA_RED } from "../../constants/colors";
import { DataTimeframe } from "../charts/ChartDataTypes";
import { generateData } from "./random";
import { sampleDataWithTimeframe } from "../../utils/SummaryUtils";

const HEART_RATE_UNIT = "bpm";

export default function HeartRateCard() {
  const [heartRateData, _] = React.useState(generateData(60, 120, 2000));
  const [openCard, setOpenCard] = React.useState(false);
  const [selectedTimeframe, setSelectedTimeframe] =
    React.useState<DataTimeframe>("5 mins");

  const displayedData = sampleDataWithTimeframe(
    selectedTimeframe,
    heartRateData
  );

  return (
    <Card style={styles.cardContainer}>
      <CardTitle
        text={"Heart Rate"}
        icon={"heart-pulse"}
        isOpen={openCard}
        setOpen={setOpenCard}
      />
      {openCard ? (
        <CardData
          data={displayedData}
          color={DATA_RED}
          timeframe={selectedTimeframe}
          setTimeframe={setSelectedTimeframe}
          unit={HEART_RATE_UNIT}
        />
      ) : (
        <CardPreview
          data={displayedData}
          color={DATA_RED}
          unit={HEART_RATE_UNIT}
        />
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
  },
});
