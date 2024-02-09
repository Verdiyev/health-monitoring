import React from "react";

import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { LineChart, yAxisSides } from "react-native-gifted-charts";
import { getChartMax, getChartSpacing, getChartYOffset } from "./ChartUtils";

type LineGraphPreviewProps = {
  color: string;
};

export default function LineGraphPreview(props: LineGraphPreviewProps) {
  const [chartParentWidth, setChartParentWidth] = React.useState(0);

  const heartRateData = [
    72, 85, 68, 77, 93, 62, 80, 75, 88, 71, 79, 84, 67, 90, 73, 81, 76, 69, 82,
    78, 85, 87, 89, 91, 93, 95, 97, 99, 101, 103, 75, 77, 80, 82, 85, 87, 90,
    92, 95, 97,
  ];

  const customLabel = (val) => () => {
    return (
      <View style={{ width: 70, marginLeft: 7 }}>
        <Text variant="labelSmall">{val}</Text>
      </View>
    );
  };

  const displayedData = heartRateData.map((bpm, index) => {
    const NO_X_INTERVAL = 9;
    return index % NO_X_INTERVAL
      ? {
          value: bpm,
        }
      : { value: bpm, labelComponent: customLabel(index + 1) };
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
        color={props.color}
        height={80}
        width={chartParentWidth - 28}
        spacing={getChartSpacing(heartRateData, chartParentWidth)}
        disableScroll
        hideYAxisText
        hideDataPoints
        hideRules
        maxValue={getChartMax(heartRateData)}
        yAxisOffset={getChartYOffset(heartRateData)}
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
