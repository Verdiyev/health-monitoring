import React from "react";

import { StyleSheet, View } from "react-native";
import { ChartData } from "./ChartDataTypes";
import LineChart from "../line-chart/LineChart";
import { LineDataPoint } from "../line-chart/utils/LineChartTypes";

type LineGraphPreviewProps = {
  data: ChartData[];
  data2?: ChartData[];
  color: string;
};

export default function LineGraphPreview(props: LineGraphPreviewProps) {
  const displayedData = props.data.map(
    (item): LineDataPoint => ({
      value: item.value,
      timestamp: item.timestamp,
    })
  );
  const displayedData2 = props.data2
    ? props.data2.map(
        (item): LineDataPoint => ({
          value: item.value,
          timestamp: item.timestamp,
        })
      )
    : undefined;

  return (
    <View style={styles.graphContainer}>
      <LineChart
        areaChart
        height={100}
        data={displayedData}
        data2={displayedData2}
        color={props.color}
        disablePanGesture
        hideXLabels
        hideXGridLines
        hideYAxisLine
        hideYGridLines
        hideYLabels
        lowerOffset={30}
        xLabelHeight={20}
        startSpacing={0}
        endSpacing={0}
        yLabelWidth={0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  graphContainer: {
    flex: 1,
    width: "100%",
    height: 80,
    paddingRight: 4,
  },
});
