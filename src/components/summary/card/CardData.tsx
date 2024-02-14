import React from "react";

import { StyleSheet, View } from "react-native";
import CardDataValue from "./CardDataValue";
import DataLineGraph from "../../charts/DataLineGraph";
import { ChartData, DataTimeframe } from "../../charts/ChartDataTypes";
import TimeframeMenu from "./TimeframeMenu";

type CardDataProps = {
  data: ChartData[];
  data2?: ChartData[];
  color: string;
  timeframe: DataTimeframe;
  setTimeframe: (x: DataTimeframe) => void;
};

export default function CardData(props: CardDataProps) {
  const [viewIndex, setViewIndex] = React.useState(-1);

  const showExactTime = viewIndex > -1;
  const setShownValue =
    viewIndex == -1 ? props.data[props.data.length - 1] : props.data[viewIndex];

  return (
    <View>
      <View style={styles.dataTimeframeContainer}>
        <CardDataValue
          color={props.color}
          lastChartData={setShownValue}
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
