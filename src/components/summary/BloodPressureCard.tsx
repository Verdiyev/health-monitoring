import React from "react";

import { StyleSheet, View } from "react-native";
import { Text, Card } from "react-native-paper";

import LineGraphPreview from "../charts/LineGraphPreview";
import { DATA_YELLOW } from "../../constants/colors";
import CardTitle from "./card/CardTitle";
import { generateData } from "./random";

type DataValueProp = {
  sysRate: number;
  diaRate: number;
  lastUpdatedSec: number;
};

const DataValue = (props: DataValueProp) => {
  return (
    <View style={styles.dataValueContainer}>
      <Text variant="headlineMedium" style={styles.dataText}>
        {props.sysRate} sys
      </Text>
      <Text variant="headlineMedium" style={styles.dataText}>
        {props.diaRate} dia
      </Text>
      <Text variant="labelLarge" style={styles.updatedText}>
        {props.lastUpdatedSec} sec ago
      </Text>
    </View>
  );
};

export default function BloodPressureCard() {
  const [openCard, setOpenCard] = React.useState(false);

  const [sysData, setSys] = React.useState(generateData(80, 200, 100));
  const [diaData, setDia] = React.useState(generateData(60, 120, 100));
  console.log(sysData, diaData);

  return (
    <Card style={styles.cardContainer}>
      <CardTitle
        text={"Blood Pressure"}
        icon={"clipboard-pulse-outline"}
        isOpen={openCard}
        setOpen={setOpenCard}
      />
      <View style={styles.dataContainer}>
        <DataValue sysRate={140} diaRate={90} lastUpdatedSec={45} />
        <LineGraphPreview color={DATA_YELLOW} data={sysData} data2={diaData} />
      </View>
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
