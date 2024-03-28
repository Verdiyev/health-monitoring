import React from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { Text, MD3Theme, Menu, useTheme, Icon } from "react-native-paper";

export default function SensorSelector() {
  const theme = useTheme();
  const [menuVisible, setMenuVisible] = React.useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const sensorList = ["Heart Rate"];
  const [selectedSensor, setSelectedSensor] = React.useState("");

  const handleMenuItemPress = (sensor: string) => () => {
    setSelectedSensor(sensor);
    closeMenu();
  };

  return (
    <Menu
      visible={menuVisible}
      onDismiss={closeMenu}
      anchorPosition="bottom"
      style={{ marginLeft: 12 }}
      anchor={
        <TouchableOpacity onPress={openMenu}>
          <View style={styles(theme).selectSensorButton}>
            <Text variant="labelLarge" style={styles(theme).sensorText}>
              Sensor
            </Text>
            <Text variant="bodyLarge">{selectedSensor}</Text>
            <View style={{ flex: 1 }} />
            <Icon size={20} source={menuVisible ? "menu-up" : "menu-down"} />
          </View>
        </TouchableOpacity>
      }
    >
      {sensorList.map((sensor: string, index: number) => (
        <Menu.Item
          key={index}
          title={sensor}
          onPress={handleMenuItemPress(sensor)}
        />
      ))}
    </Menu>
  );
}

const styles = (theme: MD3Theme) =>
  StyleSheet.create({
    selectSensorButton: {
      position: "relative",
      width: "45%",
      borderRadius: 12,
      borderWidth: 2,
      borderColor: theme.colors.primaryContainer,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 12,
      marginTop: 6,
      marginLeft: 12,
    },
    sensorText: {
      position: "absolute",
      top: -12,
      left: 12,
      backgroundColor: "white",
      paddingHorizontal: 8,
    },
  });
