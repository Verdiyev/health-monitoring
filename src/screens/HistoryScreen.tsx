import React from "react";

import { StyleSheet, Text, View } from "react-native";
import { SegmentedButtons } from "react-native-paper";
import { TabScreen, Tabs, TabsProvider } from "react-native-paper-tabs";

import HistoryChart from "../components/charts/HistoryChart";

const TimeframeSelector = () => {
  const [value, setValue] = React.useState("day");

  return (
    <SegmentedButtons
      value={value}
      onValueChange={setValue}
      buttons={[
        {
          value: "day",
          label: "Day",
        },
        {
          value: "week",
          label: "Week",
        },
        { value: "month", label: "Month" },
        { value: "year", label: "Year" },
      ]}
    />
  );
};

export default function HistoryScreen() {
  return (
    <TabsProvider defaultIndex={0}>
      <Tabs mode="scrollable">
        <TabScreen label="Heart Rate">
          <View style={styles.container}>
            <TimeframeSelector />
            <View style={{ height: 24 }} />
            <HistoryChart />
          </View>
        </TabScreen>
        <TabScreen label="Blood pressure">
          <View style={{ backgroundColor: "black", flex: 1 }} />
        </TabScreen>
        <TabScreen label="Respiratory Rate">
          <View style={{ backgroundColor: "red", flex: 1 }} />
        </TabScreen>
      </Tabs>
    </TabsProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingHorizontal: 12,
    height: "100%",
  },
});
