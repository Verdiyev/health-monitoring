import React from "react";

import { StyleSheet, View } from "react-native";

import CardDataValue from "./CardDataValue";
import LineGraphPreview from "../../charts/LineGraphPreview";
import { ChartData } from "../../charts/ChartDataTypes";

type CardPreviewProps = {
  data: ChartData[];
  unit: string;
  data2?: ChartData[];
  unit2?: string;
  color: string;
};

export default function CardPreview(props: CardPreviewProps) {
  return (
    <View style={styles.cardPreviewContainer}>
      <CardDataValue
        color={props.color}
        showExactTime={false}
        chartData={props.data[props.data.length - 1]}
        unit={props.unit}
        chartData2={
          props.data2 == undefined
            ? undefined
            : props.data2[props.data2.length - 1]
        }
        unit2={props.unit2}
      />
      <LineGraphPreview
        color={props.color}
        data={props.data}
        data2={props.data2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardPreviewContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
});
