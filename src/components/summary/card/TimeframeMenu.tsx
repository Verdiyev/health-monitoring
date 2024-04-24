import React from "react";

import { StyleSheet } from "react-native";
import { Menu, Button, useTheme, MD3Theme } from "react-native-paper";
import { DataTimeframe } from "../../charts/ChartDataTypes";

type TimeframeMenuProps = {
  timeframe: DataTimeframe;
  setTimeframe: (x: DataTimeframe) => void;
};

export default function TimeframeMenu(props: TimeframeMenuProps) {
  const theme = useTheme();
  const [menuVisible, setMenuVisible] = React.useState(false);

  const openMenu = () => setMenuVisible(true);

  const closeMenu = () => setMenuVisible(false);

  const setDisabled = (timeframe: DataTimeframe) =>
    props.timeframe == timeframe;

  const handleTimeframePress = (timeframe: DataTimeframe) => () => {
    props.setTimeframe(timeframe);
    closeMenu();
  };

  return (
    <Menu
      visible={menuVisible}
      onDismiss={closeMenu}
      anchorPosition="bottom"
      anchor={
        <Button
          icon={menuVisible ? "menu-up-outline" : "menu-down-outline"}
          mode="outlined"
          onPress={openMenu}
          style={styles(theme).timeframeButton}
        >
          {props.timeframe}
        </Button>
      }
    >
      <Menu.Item
        onPress={handleTimeframePress("5 mins")}
        disabled={setDisabled("5 mins")}
        title="5 mins"
      />
      <Menu.Item
        onPress={handleTimeframePress("30 mins")}
        disabled={setDisabled("30 mins")}
        title="30 mins"
      />
      <Menu.Item
        onPress={handleTimeframePress("1 hour")}
        disabled={setDisabled("1 hour")}
        title="1 hour"
      />
      <Menu.Item
        onPress={handleTimeframePress("4 hours")}
        disabled={setDisabled("4 hours")}
        title="4 hours"
      />
      <Menu.Item
        onPress={handleTimeframePress("1 day")}
        disabled={setDisabled("1 day")}
        title="1 day"
      />
    </Menu>
  );
}

const styles = (theme: MD3Theme) =>
  StyleSheet.create({
    timeframeButton: {
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.colors.primaryContainer,
    },
  });
