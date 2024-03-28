import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Slider from "@react-native-community/slider";

type ListenSliderProps = {
  title: string;
  unit: string;
  defaultValue: number;
  minValue: number;
  maxValue: number;
  step?: number;
  onChange: (v: number) => void;
};

export default function ListenSlider(props: ListenSliderProps) {
  const [value, setValue] = React.useState(props.defaultValue);

  const handleOnValueChange = (v: number) => {
    setValue(v);
    props.onChange(v);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textRowContainer}>
        <Text variant="labelLarge">{props.title}</Text>
        <Text variant="labelLarge">
          {value} {props.unit}
        </Text>
      </View>
      <Slider
        value={value}
        step={props.step ?? 0}
        minimumValue={props.minValue}
        maximumValue={props.maxValue}
        onValueChange={handleOnValueChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  textRowContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },
});
