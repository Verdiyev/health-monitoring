import {
  ScaleLinear,
  ScaleTime,
  curveBasis,
  line,
  scaleLinear,
  scaleTime,
} from "d3";
import { LineDataPoint } from "./LineChartTypes";

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

export const getDataRange = (
  data: LineDataPoint[],
  data2?: LineDataPoint[]
) => {
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
  data: LineDataPoint[];
  yFrom: number[];
  yTo: number[];
  xFrom: Date[];
  xTo: number[];
};

type GenerateGraphResult = {
  x: ScaleTime<number, number, never>;
  y: ScaleLinear<number, number, never>;
  path: string;
};

export function generateGraph(
  params: GenerateGraphParams
): GenerateGraphResult {
  const x = scaleTime().domain(params.xFrom).range(params.xTo);
  const y = scaleLinear().domain(params.yFrom).range(params.yTo);

  const curvedLine = line<LineDataPoint>()
    .x((d: LineDataPoint) => x(new Date(d.timestamp)))
    .y((d: LineDataPoint) => y(d.value))
    .curve(curveBasis)(params.data);

  return {
    x: x,
    y: y,
    path: curvedLine ?? "",
  };
}
