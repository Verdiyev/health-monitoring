import React from "react";

import { StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { getChartSpacing, getChartYOffset } from "./ChartUtils";

type DataLineGraphProps = {
  color: string;
};

export default function DataLineGraph(props: DataLineGraphProps) {
  const [chartParentWidth, setChartParentWidth] = React.useState(0);

  const heartRateData = [
    102, 86, 74, 94, 79, 90, 108, 113, 91, 75, 80, 82, 103, 99, 89, 71, 100,
    112, 72, 105, 111, 114, 110, 93, 76, 97, 107, 81, 98, 104, 115, 78, 73, 106,
    88, 83, 92, 96, 77, 84,
  ];

  const displayedData = heartRateData.map((bpm) => ({
    value: bpm,
  }));

  return (
    <View
      onLayout={({ nativeEvent }) => {
        setChartParentWidth(nativeEvent.layout.width);
      }}
    >
      <LineChart
        curved
        isAnimated
        data={displayedData}
        color={props.color}
        width={chartParentWidth - 50}
        spacing={getChartSpacing(heartRateData, chartParentWidth - 50)}
        height={150}
        hideDataPoints
        disableScroll
        yAxisOffset={getChartYOffset(heartRateData)}
        noOfSections={4}
        initialSpacing={0}
        endSpacing={0}
        thickness={3}
        yAxisColor="white"
        yAxisThickness={0}
        rulesType="dash"
        rulesColor="gray"
        yAxisTextStyle={{ color: "gray" }}
        xAxisColor="lightgray"
        // pointerConfig={{
        //   pointerStripUptoDataPoint: true,
        //   pointerStripColor: "lightgray",
        //   pointerStripWidth: 2,
        //   strokeDashArray: [2, 5],
        //   pointerColor: "lightgray",
        //   radius: 4,
        //   pointerLabelWidth: 100,
        //   pointerLabelHeight: 120,
        //   pointerLabelComponent: (items) => {
        //     return (
        //       <View
        //         style={{
        //           height: 120,
        //           width: 100,
        //           backgroundColor: "#282C3E",
        //           borderRadius: 4,
        //           justifyContent: "center",
        //           paddingLeft: 16,
        //         }}
        //       >
        //         <Text style={{ color: "lightgray", fontSize: 12 }}>{2018}</Text>
        //         <Text style={{ color: "white", fontWeight: "bold" }}>
        //           {items[0].value}
        //         </Text>
        //       </View>
        //     );
        //   },
        // }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
