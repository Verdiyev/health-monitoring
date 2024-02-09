import React from "react";
import { registerRootComponent } from "expo";
import { PaperProvider } from "react-native-paper";

import App from "./src/App";

const Main = () => {
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
};

export default registerRootComponent(Main);
