import React from "react";

import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, Icon, Divider } from "react-native-paper";

type CardTitleProps = {
  text: string;
  icon: string;
  isOpen: boolean;
  setOpen: (x: boolean) => void;
};

export default function CardTitle(props: CardTitleProps) {
  const handleTitleOnPress = () => {
    props.setOpen(!props.isOpen);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.titleContainer}
        onPress={handleTitleOnPress}
      >
        <Icon source={props.icon} size={20} />
        <View style={{ width: 8 }} />
        <Text variant="titleMedium">{props.text}</Text>
        <View style={{ flex: 1 }} />
        <Icon source={props.isOpen ? "chevron-up" : "chevron-down"} size={24} />
      </TouchableOpacity>
      <View style={{ height: 12 }} />
      <Divider />
      <View style={{ height: 12 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
