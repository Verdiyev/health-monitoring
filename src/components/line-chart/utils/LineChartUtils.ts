import {
  ScaleLinear,
  ScaleTime,
  curveBasis,
  line,
  scaleLinear,
  scaleTime,
} from "d3";
import { LineDataPoint } from "./LineChartTypes";

/**
 * Generates an array of evenly spaced numbers over a specified interval.
 * Inclusive of `start` value. If `endpoint` is true, `stop` value is inclusive as well,
 * default `stop` value exclusive of result
 *
 * @param {number} start - The starting value of the sequence.
 * @param {number} stop - The end value of the sequence.
 * @param {number} num - The number of samples to generate.
 * @param {boolean} [endpoint=false] - If true, 'stop' is the last sample. Otherwise, it's not included.
 * @returns {number[]} An array of length 'num' containing evenly spaced samples.
 */
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

/**
 * Calculates the minimum and maximum values from an array of LineDataPoint objects.
 *
 * @param {LineDataPoint[]} data - An array of LineDataPoint objects.
 * @param {LineDataPoint[]} [data2] - An optional array of LineDataPoint objects.
 * @returns {{ minData: number, maxData: number }} An object containing the minimum and maximum values.
 */
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

/**
 * Converts a hexadecimal color string to its RGB or RGBA equivalent.
 *
 * @param {string} hexString - The hexadecimal color string to convert.
 * @param {number} [alpha] - Optional alpha value (opacity) for RGBA. Should be a number between 0 and 1.
 * @returns {string} The RGB or RGBA representation of the color string.
 */
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

/**
 * Generates a SVG string representation of line graph using D3 based on data ranges provided.
 *
 * @param {GenerateGraphParams} params - The parameters for generating the graph.
 * @returns {GenerateGraphResult} An object containing the generated graph properties.
 */
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
