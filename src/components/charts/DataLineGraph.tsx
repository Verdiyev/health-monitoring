import React from "react";

import { StyleSheet, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { getChartSpacing, getChartYOffset } from "./ChartUtils";
import { ChartData } from "./ChartDataTypes";
import { format } from "date-fns";

type DataLineGraphProps = {
  data: ChartData[];
  data2?: ChartData[];
  color: string;
  setViewIndex: (i: number) => void;
};

export default function DataLineGraph(props: DataLineGraphProps) {
  const [chartParentWidth, setChartParentWidth] = React.useState(0);

  const NO_XAXIS_LABELS = 4;
  const interval = Math.round(props.data.length / NO_XAXIS_LABELS);

  const displayedData = props.data.map((hrData, index) => {
    return {
      value: hrData.value,
      label: Number.isInteger(index / interval)
        ? format(hrData.timestamp, "kk:mm")
        : "",
    };
  });

  return (
    <View
      style={{ paddingBottom: 20 }}
      onLayout={({ nativeEvent }) => {
        setChartParentWidth(nativeEvent.layout.width);
      }}
    >
      <LineChart
        isAnimated
        rotateLabel
        data={displayedData}
        data2={props.data2}
        color={props.color}
        color2={props.color}
        strokeDashArray2={[2, 2]}
        width={chartParentWidth - 45}
        spacing={getChartSpacing(props.data, chartParentWidth - 50)}
        height={150}
        hideDataPoints
        disableScroll
        yAxisOffset={getChartYOffset(displayedData, props.data2)}
        noOfSections={4}
        initialSpacing={10}
        endSpacing={10}
        thickness={3}
        rulesType="dash"
        rulesColor="gray"
        yAxisColor="white"
        yAxisThickness={0}
        yAxisTextStyle={{ color: "gray" }}
        xAxisColor="lightgray"
        xAxisLabelTextStyle={styles.xAxisLabelText}
        getPointerProps={(pointer) => {
          props.setViewIndex(pointer.pointerIndex);
        }}
        pointerConfig={{
          pointerStripColor: "gray",
          pointerStripWidth: 4,
          pointerColor: "lightgray",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  xAxisLabelText: {
    color: "black",
    fontSize: 12,
    width: 36,
    marginLeft: -10,
  },
});
