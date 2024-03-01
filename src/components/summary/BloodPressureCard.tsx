import React from "react";
import { StyleSheet } from "react-native";

import { DATA_YELLOW } from "../../constants/colors";
import { generateData } from "./random";
import { ChartData } from "../charts/ChartDataTypes";
import { readFile, saveFile } from "../../utils/FileUtils";
import HealthCard from "./card/HealthCard";

const SYS_UNIT = "sys";
const DIA_UNIT = "dia";

const FILE_NAME = "BloodPressure";

const loadData = async (
  offset: number,
  setHeartRateData: (x: ChartData[]) => void
) => {
  const content = await readFile(FILE_NAME);

  if (content.length == 0) {
    const genData = generateData(60 + offset, 120 + offset, 2000);
    setHeartRateData(genData);

    const saveContent = JSON.stringify(genData);
    saveFile(FILE_NAME, saveContent);
    return;
  }

  // Load existing data in file
  const loadedData: ChartData[] = JSON.parse(content);
  setHeartRateData(loadedData);
};

export default function BloodPressureCard() {
  const [sysData, setSysData] = React.useState(generateData(80, 200, 2000));
  const [diaData, setDiaData] = React.useState(generateData(60, 120, 2000));

  // React.useEffect(() => {
  //   if (sysData.length == 0) loadData(0, setSysData);
  //   if (diaData.length == 0) loadData(-20, setDiaData);
  // });

  return (
    <HealthCard
      title={"Blood Pressure"}
      titleIcon={"clipboard-pulse-outline"}
      data={sysData}
      data2={diaData}
      unit={SYS_UNIT}
      unit2={DIA_UNIT}
      color={DATA_YELLOW}
    />
  );
}

const styles = StyleSheet.create({});
