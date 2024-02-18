import React from "react";

import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";

import CardData from "./card/CardData";
import CardTitle from "./card/CardTitle";
import CardPreview from "./card/CardPreview";

import { DATA_BLUE } from "../../constants/colors";
import { DataTimeframe } from "../charts/ChartDataTypes";
import { generateData } from "./random";
import { sampleDataWithTimeframe } from "../../utils/SummaryUtils";

const RESPIRATORY_UNIT = "bpm";

export default function RespiratoryRateCard() {
  const [respiratoryData, _] = React.useState(generateData(60, 120, 2000));
  const [openCard, setOpenCard] = React.useState(false);
  const [selectedTimeframe, setSelectedTimeframe] =
    React.useState<DataTimeframe>("5 mins");

  const displayedData = sampleDataWithTimeframe(
    selectedTimeframe,
    respiratoryData
  );

  return (
    <Card style={styles.cardContainer}>
      <CardTitle
        text={"Respiratory Rate"}
        icon={"weather-windy"}
        isOpen={openCard}
        setOpen={setOpenCard}
      />
      {openCard ? (
        <CardData
          data={displayedData}
          color={DATA_BLUE}
          timeframe={selectedTimeframe}
          setTimeframe={setSelectedTimeframe}
          unit={RESPIRATORY_UNIT}
        />
      ) : (
        <CardPreview
          data={displayedData}
          color={DATA_BLUE}
          unit={RESPIRATORY_UNIT}
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
