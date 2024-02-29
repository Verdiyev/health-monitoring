import React from "react";

import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { getChartMax, getChartSpacing, getChartYOffset } from "./ChartUtils";
import { ChartData } from "./ChartDataTypes";
import LineChart from "../line-chart/LineChart";
import { LineDataPoint } from "../line-chart/utils/ChartTypes";

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

  return (
    <View style={styles.graphContainer}>
      <LineChart
        areaChart
        height={100}
        data={displayedData}
        color={props.color}
        disablePanGesture
        hideXLabels
        hideXGridLines
        hideYAxisLine
        hideYGridLines
        hideYLabels
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
    paddingHorizontal: 16,
  },
});
