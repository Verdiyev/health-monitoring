import React from "react";

import { StyleSheet, View } from "react-native";
import ListenChart from "../components/listen/ListenChart";
import SensorSelector from "../components/listen/SensorSelector";
import ListenSlider from "../components/listen/ListenSlider";
import { Card } from "react-native-paper";

const DEFAULT_TIMEBASE = 2; // Seconds

export default function ListenScreen() {
  const [timeBase, setTimeBase] = React.useState(DEFAULT_TIMEBASE);

  return (
    <View style={styles.container}>
      <SensorSelector />
      <ListenChart timeBase={timeBase} />
      <Card style={styles.cardContainer}>
        <ListenSlider
          title="Time base"
          unit="seconds"
          defaultValue={DEFAULT_TIMEBASE}
          minValue={1}
          maxValue={5}
          step={0.5}
          onChange={setTimeBase}
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  cardContainer: {
    padding: 16,
    marginBottom: 8,
    marginHorizontal: 12,
  },
});
