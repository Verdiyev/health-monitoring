import React from "react";

import { StyleSheet, View } from "react-native";
import { BarChart, yAxisSides } from "react-native-gifted-charts";

export default function HistoryChart() {
  const [chartParentWidth, setChartParentWidth] = React.useState(0);

  const stackData = [
    {
      stacks: [
        { value: 10, color: "transparent" },
        { value: 20, color: "#4ABFF4", marginBottom: 2 },
      ],
      label: "Jan",
    },
    {
      stacks: [
        { value: 10, color: "transparent" },
        { value: 11, color: "orange", marginBottom: 2 },
      ],
      label: "Mar",
    },
    {
      stacks: [
        { value: 14, color: "transparent" },
        { value: 18, color: "#4ABFF4", marginBottom: 2 },
      ],
      label: "Feb",
    },
    {
      stacks: [
        { value: 7, color: "transparent" },
        { value: 11, color: "orange", marginBottom: 2 },
      ],
      label: "Mar",
    },
  ];

  return (
    <View
      style={{ paddingHorizontal: 8 }}
      onLayout={({ nativeEvent }) => {
        setChartParentWidth(nativeEvent.layout.width);
      }}
    >
      <BarChart
        stackData={stackData}
        width={chartParentWidth - 60}
        rotateLabel
        spacing={40}
        barWidth={12}
        noOfSections={4}
        barBorderRadius={6}
        initialSpacing={20}
        endSpacing={20}
        yAxisSide={yAxisSides.RIGHT}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
