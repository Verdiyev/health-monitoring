export type ChartData = {
    value: number;
    timestamp: Date;
}

export type DataTimeframe = "5 mins" | "30 mins" | "1 hour" | "4 hours" | "1 day";

export const timeframeSeconds = new Map<DataTimeframe, number>([
    ["5 mins", 300],
    ["30 mins", 1800],
    ["1 hour", 3600],
    ["4 hours", 14400],
    ["1 day", 86400],
]);

export const timeframeInterval = new Map<DataTimeframe, number>([
    ["5 mins", 5],      // Every 5 seconds
    ["30 mins", 30],    // Every 30 seconds
    ["1 hour", 60],     // Every 1 minute
    ["4 hours", 300],   // Every 5 minutes
    ["1 day", 1800],    // Every 30 minutes
]);

