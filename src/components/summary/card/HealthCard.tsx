import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";

import CardTitle from "./CardTitle";
import { ChartData, DataTimeframe } from "../../charts/ChartDataTypes";
import { sampleDataWithTimeframe } from "../../../utils/SummaryUtils";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";
import CardDataValue from "./CardDataValue";
import DataLineGraph from "../../charts/DataLineGraph";
import LineGraphPreview from "../../charts/LineGraphPreview";
import TimeframeMenu from "./TimeframeMenu";

type HealthCardProps = {
  title: string;
  titleIcon: string;
  data: ChartData[];
  data2?: ChartData[];
  unit: string;
  unit2?: string;
  color: string;
};

const getLastValue = (data: ChartData[]): number => {
  if (!data) return 0;
  if (data.length == 0) return 0;
  return data[data.length - 1].value;
};

const getLastTimestamp = (data: ChartData[]): Date => {
  if (!data) return new Date();
  if (data.length == 0) return new Date();
  return data[data.length - 1].timestamp;
};

export default function HealthCard(props: HealthCardProps) {
  const { title, titleIcon, color, data, data2, unit, unit2 } = props;

  const [openCard, setOpenCard] = React.useState(false);
  const [selectedTimeframe, setSelectedTimeframe] =
    React.useState<DataTimeframe>("5 mins");

  const isActive = useSharedValue(false); // Track if pan gesture active
  const lastData = getLastValue(data) ?? 0;
  const lastData2 = getLastValue(data2) ?? 0;
  const lastDateString = getLastTimestamp(data).toISOString();

  const graphValue = useSharedValue<number>(lastData);
  const graphValue2 = data2 ? useSharedValue<number>(lastData2) : undefined;
  const graphDate = useSharedValue<string>(lastDateString);

  const shownValue = useDerivedValue(() =>
    isActive.value ? graphValue.value : lastData
  );
  const shownValue2 = graphValue2
    ? useDerivedValue(() => (isActive.value ? graphValue2.value : lastData2))
    : undefined;
  const shownTimestamp = useDerivedValue(() =>
    isActive.value ? graphDate.value : lastDateString
  );

  const displayedData =
    data && data.length > 0
      ? sampleDataWithTimeframe(selectedTimeframe, data)
      : [];
  const displayedData2 =
    data2 && data2.length > 0
      ? sampleDataWithTimeframe(selectedTimeframe, data2)
      : undefined;

  return (
    <Card style={styles.cardContainer}>
      <CardTitle
        text={title}
        icon={titleIcon}
        isOpen={openCard}
        setOpen={setOpenCard}
      />
      {displayedData.length == 0 ? (
        <View style={styles.circularLoadingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <View style={{ flexDirection: "column" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CardDataValue
              value={shownValue}
              value2={shownValue2}
              timestamp={shownTimestamp}
              isActive={isActive}
              unit={unit}
              unit2={unit2}
              color={color}
            />
            {openCard ? (
              <TimeframeMenu
                timeframe={selectedTimeframe}
                setTimeframe={setSelectedTimeframe}
              />
            ) : (
              <LineGraphPreview
                data={displayedData}
                data2={displayedData2}
                color={color}
              />
            )}
          </View>
          {openCard && (
            <DataLineGraph
              data={displayedData}
              data2={displayedData2}
              color={color}
              isActive={isActive}
              graphValue={graphValue}
              graphValue2={graphValue2}
              graphDate={graphDate}
            />
          )}
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 16,
  },
  circularLoadingContainer: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
