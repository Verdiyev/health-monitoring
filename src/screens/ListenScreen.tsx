import { Canvas, Rect } from "@shopify/react-native-skia";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { useScanner } from "../components/listen/useScanner";
import { useSharedValue } from "react-native-reanimated";
import { Button } from "react-native-paper";

export default function ListenScreen() {
  const width = Dimensions.get("screen").width;

  const incoming = useSharedValue<number[]>([]);
  const { xValue } = useScanner({ maxWidth: width, duration: 5000 });

  return (
    <View style={styles.container}>
      <Text>ListenScreen</Text>
      <Canvas style={{ width: width, height: 100, backgroundColor: "green" }}>
        <Rect x={xValue} y={20} width={20} height={20} />
      </Canvas>
      <Button mode="contained" onPress={() => {}}>
        Add data
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
  },
});
