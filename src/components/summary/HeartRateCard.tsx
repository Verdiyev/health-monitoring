import React from "react";

import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";

import CardData from "./card/CardData";
import CardTitle from "./card/CardTitle";
import CardPreview from "./card/CardPreview";

import { DATA_RED } from "../../constants/colors";

export default function HeartRateCard() {
  const [openCard, setOpenCard] = React.useState(false);

  return (
    <Card style={styles.cardContainer}>
      <CardTitle
        text={"Heart Rate"}
        icon={"heart-pulse"}
        isOpen={openCard}
        setOpen={setOpenCard}
      />
      {openCard ? <CardData color={DATA_RED} /> : <CardPreview />}
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
  },
});
