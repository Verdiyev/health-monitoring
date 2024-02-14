import React from "react";

import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { LineChart, yAxisSides } from "react-native-gifted-charts";
import { getChartMax, getChartSpacing, getChartYOffset } from "./ChartUtils";
import { ChartData } from "./ChartDataTypes";

type LineGraphPreviewProps = {
  data: ChartData[];
  data2?: ChartData[];
  color: string;
};

export default function LineGraphPreview(props: LineGraphPreviewProps) {
  const [chartParentWidth, setChartParentWidth] = React.useState(0);

  const customLabel = (val) => () => {
    return (
      <View style={{ width: 70, marginLeft: 7 }}>
        <Text variant="labelSmall">{val}</Text>
      </View>
    );
  };

  const displayedData = props.data.map((data: ChartData, index) => {
    const NO_X_INTERVAL = 9;
    return index % NO_X_INTERVAL
      ? {
          value: data.value,
        }
      : { value: data.value }; //, labelComponent: customLabel(index + 1)
  });

  return (
    <View
      style={styles.graphContainer}
      onLayout={({ nativeEvent }) => {
        setChartParentWidth(nativeEvent.layout.width);
      }}
    >
      <LineChart
        areaChart
        isAnimated
        data={displayedData}
        data2={props.data2}
        color1={props.color}
        color2={props.color}
        strokeDashArray2={[2, 2]}
        height={80}
        width={chartParentWidth - 28}
        spacing={getChartSpacing(props.data, chartParentWidth)}
        disableScroll
        hideYAxisText
        hideDataPoints
        hideRules
        maxValue={getChartMax(props.data)}
        yAxisOffset={getChartYOffset(props.data)}
        thickness={2}
        yAxisThickness={0}
        initialSpacing={0}
        endSpacing={0}
        startFillColor={props.color}
        startOpacity={0.4}
        endFillColor={props.color}
        endOpacity={0.1}
        xAxisColor="lightgray"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  graphContainer: {
    flex: 1,
    paddingLeft: 16,
  },
});
