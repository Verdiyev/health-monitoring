import React from "react";

import { StyleSheet, View } from "react-native";
import { Button, Menu, useTheme } from "react-native-paper";
import CardDataValue from "./CardDataValue";
import DataLineGraph from "../../charts/DataLineGraph";

type CardDataProps = {
  color: string;
};

type DataTimeframe = "1 hour" | "4 hours" | "1 day";

export default function CardData(props: CardDataProps) {
  const theme = useTheme();
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [selectedTimeframe, setSelectedTimeframe] =
    React.useState<DataTimeframe>("1 hour");

  const openMenu = () => setMenuVisible(true);

  const closeMenu = () => setMenuVisible(false);

  const handleTimeframePress = (timeframe: DataTimeframe) => () => {
    setSelectedTimeframe(timeframe);
    closeMenu();
  };

  return (
    <View>
      <View style={styles(theme).dataTimeframeContainer}>
        <CardDataValue
          color={props.color}
          heartRate={100}
          lastUpdatedSec={45}
        />
        <View>
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
                {selectedTimeframe}
              </Button>
            }
          >
            <Menu.Item
              onPress={handleTimeframePress("1 hour")}
              title="1 hour"
            />
            <Menu.Item
              onPress={handleTimeframePress("4 hours")}
              title="4 hours"
            />
            <Menu.Item onPress={handleTimeframePress("1 day")} title="1 day" />
          </Menu>
        </View>
      </View>

      <DataLineGraph color={props.color} />
    </View>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    dataTimeframeContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 24,
    },
    timeframeButton: {
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.colors.primaryContainer,
    },
  });
