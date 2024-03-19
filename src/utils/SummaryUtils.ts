import { isWithinInterval, addSeconds, isBefore } from "date-fns";
import {
  DataTimeframe,
  ChartData,
  timeframeSeconds,
  timeframeInterval,
} from "../components/charts/ChartDataTypes";

export const sampleDataWithTimeframe = (
  timeframe: DataTimeframe,
  data: ChartData[]
): ChartData[] => {
  const latestData = data[data.length - 1];

  // Filter data based on timeframe
  const withinTimeframe = data.filter((hrData) =>
    isWithinInterval(hrData.timestamp, {
      start: latestData.timestamp,
      end: addSeconds(latestData.timestamp, -timeframeSeconds.get(timeframe)!),
    })
  );

  let intervalStart = withinTimeframe[0].timestamp;
  let intervalEnd = addSeconds(
    intervalStart,
    timeframeInterval.get(timeframe)!
  );
  const filteredData = withinTimeframe.filter((hrData) => {
    // Interval window is before current data point, slide window to match current data
    while (isBefore(intervalEnd, hrData.timestamp)) {
      intervalStart = addSeconds(
        intervalStart,
        timeframeInterval.get(timeframe)!
      );
      intervalEnd = addSeconds(intervalEnd, timeframeInterval.get(timeframe)!);
    }

    const within = isWithinInterval(hrData.timestamp, {
      start: intervalStart,
      end: intervalEnd,
    });

    // If within, interval is fulfilled, advance window
    if (within) {
      intervalStart = addSeconds(
        intervalStart,
        timeframeInterval.get(timeframe)!
      );
      intervalEnd = addSeconds(intervalEnd, timeframeInterval.get(timeframe)!);
    }

    return within;
  });

  filteredData.push(latestData);
  return filteredData;
};
