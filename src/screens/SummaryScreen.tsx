import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import HeartRateCard from "../components/summary/HeartRateCard";
// import BloodPressureCard from "../components/summary/BloodPressureCard";
import RespiratoryRateCard from "../components/summary/RespiratoryRateCard";

export default function SummaryScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentsContainer}>
        <HeartRateCard />
        <View style={{ height: 12 }} />
        {/* <BloodPressureCard />
        <View style={{ height: 12 }} />
        <RespiratoryRateCard /> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  contentsContainer: {
    paddingTop: 2, // Account for elevation of first card
    paddingBottom: 12, // Account for space between last card and navbar
    paddingHorizontal: 12,
  },
});
