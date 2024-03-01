import React from "react";

import { StyleSheet, View } from "react-native";
import { ChartData } from "./ChartDataTypes";
import LineChart from "../line-chart/LineChart";
import { LineDataPoint } from "../line-chart/utils/LineChartTypes";
import { SharedValue, useSharedValue } from "react-native-reanimated";

type DataLineGraphProps = {
  data: ChartData[];
  data2?: ChartData[];
  color: string;
  graphValue: SharedValue<number>;
  graphValue2?: SharedValue<number>;
  graphDate: SharedValue<string>;
};

export default function DataLineGraph(props: DataLineGraphProps) {
  const displayedData = props.data.map(
    (item): LineDataPoint => ({
      value: item.value,
      timestamp: item.timestamp,
    })
  );

  return (
    <View style={styles.container}>
      <LineChart
        data={displayedData}
        color={props.color}
        xLabelAngle={60}
        yLabelWidth={40}
        startSpacing={20}
        endSpacing={20}
        hideXGridLines
        hideYAxisLine
        shownValue={props.graphValue}
        shownValue2={props.graphValue2 ?? useSharedValue(0)}
        shownDate={props.graphDate}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: 16,
  },
});
