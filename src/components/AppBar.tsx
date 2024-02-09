import * as React from "react";
import { StyleSheet } from "react-native";
import { Appbar, Text } from "react-native-paper";

const ContentTitle = ({ title }) => (
  <Appbar.Content
    title={
      <Text variant="titleLarge" style={styles.appbarTitle}>
        {title}
      </Text>
    }
    style={{ alignItems: "flex-start" }}
  />
);

export default function AppBar() {
  return (
    <Appbar.Header>
      <ContentTitle title="VitaSense" />
      <Appbar.Action icon="cog-outline" onPress={() => {}} />
      <Appbar.Action icon="dots-vertical" onPress={() => {}} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  appbarTitle: {
    fontWeight: "bold",
    marginStart: 12,
  },
});
