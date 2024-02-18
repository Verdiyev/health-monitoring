import React from "react";

import { StyleSheet, View } from "react-native";
import CardDataValue from "./CardDataValue";
import DataLineGraph from "../../charts/DataLineGraph";
import { ChartData, DataTimeframe } from "../../charts/ChartDataTypes";
import TimeframeMenu from "./TimeframeMenu";

type CardDataProps = {
  data: ChartData[];
  unit: string;
  data2?: ChartData[];
  unit2?: string;
  color: string;
  timeframe: DataTimeframe;
  setTimeframe: (x: DataTimeframe) => void;
};

export default function CardData(props: CardDataProps) {
  const [viewIndex, setViewIndex] = React.useState(-1);

  const showExactTime = viewIndex > -1;
  const setShownValue1 =
    viewIndex == -1 ? props.data[props.data.length - 1] : props.data[viewIndex];
  const setShownValue2 =
    props.data2 == undefined
      ? undefined
      : viewIndex == -1
      ? props.data2[props.data2.length - 1]
      : props.data2[viewIndex];

  return (
    <View>
      <View style={styles.dataTimeframeContainer}>
        <CardDataValue
          color={props.color}
          chartData={setShownValue1}
          unit={props.unit}
          chartData2={setShownValue2}
          unit2={props.unit2}
          showExactTime={showExactTime}
        />
        <TimeframeMenu
          timeframe={props.timeframe}
          setTimeframe={props.setTimeframe}
        />
      </View>

      <DataLineGraph
        color={props.color}
        data={props.data}
        data2={props.data2}
        setViewIndex={setViewIndex}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  dataTimeframeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
});
