import React from "react";

import { StyleSheet, View } from "react-native";
import { ActivityIndicator, Card } from "react-native-paper";

// import CardData from "./card/CardData";
import CardTitle from "./card/CardTitle";
// import CardPreview from "./card/CardPreview";

import { DATA_RED } from "../../constants/colors";
import { ChartData, DataTimeframe } from "../charts/ChartDataTypes";
import { generateData } from "./random";
import { sampleDataWithTimeframe } from "../../utils/SummaryUtils";
import { readFile, saveFile } from "../../utils/FileUtils";
import HealthCard from "./card/HealthCard";

const HEART_RATE_UNIT = "bpm";
const FILE_NAME = "HeartRate";

const loadData = async (setHeartRateData: (x: ChartData[]) => void) => {
  const content = await readFile(FILE_NAME);

  if (content.length >= 0) {
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

  return (
    <HealthCard
      title={"Heart Rate"}
      titleIcon={"heart-pulse"}
      data={heartRateData}
      unit={"bpm"}
      color={DATA_RED}
    />
  );
}

const styles = StyleSheet.create({});
