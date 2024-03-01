import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";

import CardTitle from "./CardTitle";
import { ChartData, DataTimeframe } from "../../charts/ChartDataTypes";
import { sampleDataWithTimeframe } from "../../../utils/SummaryUtils";
import { useSharedValue } from "react-native-reanimated";
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

export default function HealthCard(props: HealthCardProps) {
  const { title, titleIcon, color, data, data2, unit, unit2 } = props;

  const [openCard, setOpenCard] = React.useState(false);
  const [selectedTimeframe, setSelectedTimeframe] =
    React.useState<DataTimeframe>("5 mins");

  const graphValue = useSharedValue<number>(data[data.length - 1]?.value ?? 0);
  const graphValue2 = data2
    ? useSharedValue<number>(data2[data2.length - 1]?.value ?? 0)
    : undefined;
  const graphDate = useSharedValue<string>(
    data[data.length - 1]?.timestamp.toISOString() ?? new Date().toISOString()
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
              value={graphValue}
              value2={graphValue2}
              timestamp={graphDate}
              unit={unit}
              unit2={unit2}
              color={color}
              showExactTime={false}
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
