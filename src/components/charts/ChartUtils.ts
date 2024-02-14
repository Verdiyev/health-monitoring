import { ChartData } from "./ChartDataTypes";

export const getChartMax = (data) => {
  return Math.max(...data.map((item) => item.value)) - 20;
};

export const getChartYOffset = (data) => {
  const minValue = Math.min(...data.map((item) => item.value));
  return Math.ceil((minValue - 20) / 10) * 10;
};

export const getChartSpacing = (data, parentWidth: number) => {
  return parentWidth / data.length;
};
