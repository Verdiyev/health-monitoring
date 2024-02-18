import React from "react";

import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { addSeconds, isBefore, isWithinInterval } from "date-fns";

import CardData from "./card/CardData";
import CardTitle from "./card/CardTitle";
import CardPreview from "./card/CardPreview";

import { DATA_RED } from "../../constants/colors";
import {
  ChartData,
  DataTimeframe,
  timeframeInterval,
  timeframeSeconds,
} from "../charts/ChartDataTypes";
import { generateData } from "./random";

const processHeartData = (
  timeframe: DataTimeframe,
  data: ChartData[]
): ChartData[] => {
  const latestData = data[data.length - 1];

  // Filter data based on timeframe
  const withinTimeframe = data.filter((hrData) =>
    isWithinInterval(hrData.timestamp, {
      start: latestData.timestamp,
      end: addSeconds(latestData.timestamp, -timeframeSeconds.get(timeframe)),
    })
  );

  let intervalStart = withinTimeframe[0].timestamp;
  let intervalEnd = addSeconds(intervalStart, timeframeInterval.get(timeframe));
  const filteredData = withinTimeframe.filter((hrData) => {
    // Interval window is before current data point, slide window to match current data
    while (isBefore(intervalEnd, hrData.timestamp)) {
      intervalStart = addSeconds(
        intervalStart,
        timeframeInterval.get(timeframe)
      );
      intervalEnd = addSeconds(intervalEnd, timeframeInterval.get(timeframe));
    }

    const within = isWithinInterval(hrData.timestamp, {
      start: intervalStart,
      end: intervalEnd,
    });

    // If within, interval is fulfilled, advance window
    if (within) {
      intervalStart = addSeconds(
        intervalStart,
        timeframeInterval.get(timeframe)
      );
      intervalEnd = addSeconds(intervalEnd, timeframeInterval.get(timeframe));
    }

    return within;
  });

  filteredData.push(latestData);
  return filteredData;
};

export default function HeartRateCard() {
  const [heartRateData, _] = React.useState(generateData(60, 120, 2000));
  const [openCard, setOpenCard] = React.useState(false);
  const [selectedTimeframe, setSelectedTimeframe] =
    React.useState<DataTimeframe>("5 mins");

  const displayedData = processHeartData(selectedTimeframe, heartRateData);

  return (
    <Card style={styles.cardContainer}>
      <CardTitle
        text={"Heart Rate"}
        icon={"heart-pulse"}
        isOpen={openCard}
        setOpen={setOpenCard}
      />
      {openCard ? (
        <CardData
          data={displayedData}
          color={DATA_RED}
          timeframe={selectedTimeframe}
          setTimeframe={setSelectedTimeframe}
        />
      ) : (
        <CardPreview data={displayedData} color={DATA_RED} />
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
  },
});
