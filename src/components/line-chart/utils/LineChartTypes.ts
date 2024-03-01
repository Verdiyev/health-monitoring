import { SharedValue } from "react-native-reanimated";
import { ScaleTime, ScaleLinear } from "d3";

export type LineDataPoint = {
  value: number;
  timestamp: Date;
};

export type GraphDimensions = {
  canvasWidth: number;
  canvasHeight: number;
  graphWidth: number;
  graphHeight: number;
};

export type LineChartProps = {
  data: LineDataPoint[];
  data2?: LineDataPoint[];
  color: string;
  height?: number;
  noOfSteps?: number;
  noOfLabels?: number;
  xLabelHeight?: number;
  yLabelWidth?: number;
  startSpacing?: number;
  endSpacing?: number;
  topSpacing?: number;
  labelFontSize?: number;
  upperOffset?: number;
  lowerOffset?: number;
  xLabelAngle?: number;
  areaChart?: boolean;
  hideYLabels?: boolean;
  hideYAxisLine?: boolean;
  hideYGridLines?: boolean;
  hideXLabels?: boolean;
  hideXGridLines?: boolean;
  disablePanGesture?: boolean;
  isActive?: SharedValue<boolean>;
  shownValue?: SharedValue<number>;
  shownValue2?: SharedValue<number>;
  shownDate?: SharedValue<string>;
};

export type DefaultLineChartProps = {
  data: LineDataPoint[];
  data2: LineDataPoint[];
  color: string;
  height: number;
  noOfSteps: number;
  noOfLabels: number;
  xLabelHeight: number;
  yLabelWidth: number;
  startSpacing: number;
  endSpacing: number;
  topSpacing: number;
  upperOffset: number;
  lowerOffset: number;
  labelFontSize: number;
  areaChart: boolean;
  xLabelAngle: number;
  hideYLabels: boolean;
  hideYAxisLine: boolean;
  hideYGridLines: boolean;
  hideXLabels: boolean;
  hideXGridLines: boolean;
  disablePanGesture: boolean;
  isActive: SharedValue<boolean>;
  shownValue: SharedValue<number>;
  shownValue2: SharedValue<number>;
  shownDate: SharedValue<string>;
};

export type GenerateGraphData = {
  x: ScaleTime<number, number>;
  y: ScaleLinear<number, number>;
  path: string;
};
