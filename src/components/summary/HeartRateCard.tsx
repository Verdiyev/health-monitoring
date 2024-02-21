import React from "react";

import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Card } from "react-native-paper";

import CardData from "./card/CardData";
import CardTitle from "./card/CardTitle";
import CardPreview from "./card/CardPreview";

import { DATA_RED } from "../../constants/colors";
import { ChartData, DataTimeframe } from "../charts/ChartDataTypes";
import { generateData } from "./random";
import { sampleDataWithTimeframe } from "../../utils/SummaryUtils";
import { readFile, saveFile } from "../../utils/FileUtils";

const HEART_RATE_UNIT = "bpm";
const FILE_NAME = "HeartRate";

const loadData = async (setHeartRateData: (x: ChartData[]) => void) => {
  const content = await readFile(FILE_NAME);

  if (content.length == 0) {
    const genData = generateData(60, 120, 2000);
    setHeartRateData(genData);

    const saveContent = JSON.stringify(genData);
    saveFile(FILE_NAME, saveContent);
    return;
  }

  // Load existing data in file
  const loadedData: ChartData[] = JSON.parse(content);
  setHeartRateData(loadedData);
};

export default function HeartRateCard() {
  const [heartRateData, setHeartRateData] = React.useState<ChartData[]>([]);

  React.useEffect(() => {
    if (heartRateData.length == 0) loadData(setHeartRateData);
  });

  const [openCard, setOpenCard] = React.useState(false);
  const [selectedTimeframe, setSelectedTimeframe] =
    React.useState<DataTimeframe>("5 mins");

  const displayedData =
    heartRateData.length == 0
      ? []
      : sampleDataWithTimeframe(selectedTimeframe, heartRateData);

  return (
    <Card style={styles.cardContainer}>
      <CardTitle
        text={"Heart Rate"}
        icon={"heart-pulse"}
        isOpen={openCard}
        setOpen={setOpenCard}
      />
      {displayedData.length == 0 ? (
        <View style={styles.circularLoadingContainer}>
          <ActivityIndicator />
        </View>
      ) : openCard ? (
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
  circularLoadingContainer: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
