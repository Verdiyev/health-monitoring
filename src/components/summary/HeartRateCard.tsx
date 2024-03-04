import React from "react";
import { StyleSheet } from "react-native";

import { DATA_RED } from "../../constants/colors";
import { ChartData } from "../charts/ChartDataTypes";
import { generateData } from "./random";
import { readFile, saveFile } from "../../utils/FileUtils";
import HealthCard from "./card/HealthCard";

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
  const rawData = JSON.parse(content);
  // Convert date string into Date object
  const loadedData: ChartData[] = rawData.map((item) => ({
    value: item.value,
    timestamp: new Date(item.timestamp),
  }));
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
      unit={HEART_RATE_UNIT}
      color={DATA_RED}
    />
  );
}

const styles = StyleSheet.create({});
