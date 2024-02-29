import { SharedValue } from "react-native-reanimated";
import { ScaleTime, ScaleLinear } from "d3";

export type DataPoint = {
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
  data: DataPoint[];
  data2?: DataPoint[];
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
  areaChart?: boolean;
  hideYLabels?: boolean;
  hideYAxisLine?: boolean;
  hideYGridLines?: boolean;
  hideXGridLines?: boolean;
  disablePanGesture?: boolean;
  shownValue?: SharedValue<number>;
  shownValue2?: SharedValue<number>;
  shownDate?: SharedValue<string>;
};

export type DefaultLineChartProps = {
  data: DataPoint[];
  data2: DataPoint[];
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
  hideYLabels: boolean;
  hideYAxisLine: boolean;
  hideYGridLines: boolean;
  hideXGridLines: boolean;
  disablePanGesture: boolean;
  shownValue: SharedValue<number>;
  shownValue2: SharedValue<number>;
  shownDate: SharedValue<string>;
};

export type GenerateGraphData = {
  x: ScaleTime<number, number>;
  y: ScaleLinear<number, number>;
  path: string;
};
