import * as React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import SummaryScreen from "../screens/SummaryScreen";
import HistoryScreen from "../screens/HistoryScreen";

const HomeRoute = () => <SummaryScreen />;

const HistoryRoute = () => <HistoryScreen />;

const ProfileRoute = () => <Text>Profile</Text>;

const BottomAppBar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Summary",
      focusedIcon: "heart",
      unfocusedIcon: "heart-outline",
    },
    { key: "history", title: "History", focusedIcon: "history" },
    {
      key: "profile",
      title: "Profile",
      focusedIcon: "account-circle",
      unfocusedIcon: "account-circle-outline",
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    history: HistoryRoute,
    profile: ProfileRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomAppBar;
