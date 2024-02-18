import React from "react";

import { StyleSheet, View } from "react-native";
import { Text, Card } from "react-native-paper";

import CardTitle from "./card/CardTitle";
import CardPreview from "./card/CardPreview";
import CardData from "./card/CardData";

import { DATA_YELLOW } from "../../constants/colors";
import { generateData } from "./random";
import { DataTimeframe } from "../charts/ChartDataTypes";
import { sampleDataWithTimeframe } from "../../utils/SummaryUtils";

const SYS_UNIT = "sys";
const DIA_UNIT = "dia";

export default function BloodPressureCard() {
  const [openCard, setOpenCard] = React.useState(false);

  const [sysData, setSys] = React.useState(generateData(80, 200, 2000));
  const [diaData, setDia] = React.useState(generateData(60, 120, 2000));

  const [selectedTimeframe, setSelectedTimeframe] =
    React.useState<DataTimeframe>("5 mins");

  const displayedSys = sampleDataWithTimeframe(selectedTimeframe, sysData);
  const displayedDia = sampleDataWithTimeframe(selectedTimeframe, diaData);

  return (
    <Card style={styles.cardContainer}>
      <CardTitle
        text={"Blood Pressure"}
        icon={"clipboard-pulse-outline"}
        isOpen={openCard}
        setOpen={setOpenCard}
      />

      {openCard ? (
        <CardData
          data={displayedSys}
          unit={SYS_UNIT}
          data2={displayedDia}
          unit2={DIA_UNIT}
          color={DATA_YELLOW}
          timeframe={selectedTimeframe}
          setTimeframe={setSelectedTimeframe}
        />
      ) : (
        <CardPreview
          data={displayedSys}
          data2={displayedDia}
          color={DATA_YELLOW}
          unit={SYS_UNIT}
          unit2={DIA_UNIT}
        />
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  dataContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  dataValueContainer: {
    alignSelf: "center",
  },
  dataText: {
    fontWeight: "bold",
    color: DATA_YELLOW,
  },
  updatedText: {
    color: DATA_YELLOW,
  },
});
