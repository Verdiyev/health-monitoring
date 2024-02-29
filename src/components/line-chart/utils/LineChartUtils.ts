import { curveBasis, line, scaleLinear, scaleTime } from "d3";
import { DataPoint } from "./ChartTypes";

export function linspace(
  start: number,
  stop: number,
  num: number,
  endpoint?: boolean
) {
  const div = endpoint ? num - 1 : num;
  const step = (stop - start) / div;
  return Array.from({ length: num }, (_, i) => start + step * i);
}

export const getDataRange = (data: DataPoint[], data2?: DataPoint[]) => {
  const minData = Math.min(
    ...data.map((val) => val.value),
    ...(data2 ?? []).map((val) => val.value)
  );
  const maxData = Math.max(
    ...data.map((val) => val.value),
    ...(data2 ?? []).map((val) => val.value)
  );
  return { minData, maxData };
};

export const hexToRGB = (hexString: string, alpha?: number) => {
  const r = parseInt(hexString.slice(1, 3), 16);
  const g = parseInt(hexString.slice(3, 5), 16);
  const b = parseInt(hexString.slice(5, 7), 16);
  return alpha ? `rgba(${r}, ${g}, ${b}, ${alpha})` : `rgb(${r}, ${g}, ${b})`;
};

type GenerateGraphParams = {
  data: DataPoint[];
  yFrom: number[];
  yTo: number[];
  xFrom: Date[];
  xTo: number[];
};

export function generateGraph(params: GenerateGraphParams) {
  const x = scaleTime().domain(params.xFrom).range(params.xTo);
  const y = scaleLinear().domain(params.yFrom).range(params.yTo);

  const curvedLine = line<DataPoint>()
    .x((d: DataPoint) => x(new Date(d.timestamp)))
    .y((d: DataPoint) => y(d.value))
    .curve(curveBasis)(params.data);

  return {
    x: x,
    y: y,
    path: curvedLine ?? "",
  };
}
