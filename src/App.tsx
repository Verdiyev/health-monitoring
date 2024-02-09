import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";

import BottomAppBar from "./components/BottomNavBar";
import AppBar from "./components/AppBar";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar />
      <AppBar />
      <BottomAppBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",
  },
});
