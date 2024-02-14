import { addSeconds } from "date-fns";
import { ChartData } from "../charts/ChartDataTypes";

var m_w = 123456789;
var m_z = 987654321;
var mask = 0xffffffff;

// Takes any integer
export function seed(i) {
  m_w = (123456789 + i) & mask;
  m_z = (987654321 - i) & mask;
}

// Returns number between 0 (inclusive) and 1.0 (exclusive),
// just like Math.random().
export function random() {
  m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
  m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
  var result = ((m_z << 16) + (m_w & 65535)) >>> 0;
  result /= 4294967296;
  return result;
}

export const generateData = (
  lower: number,
  upper: number,
  limit: number
): ChartData[] => {
  const data = [85]; // Populate first value to compare

  seed(50);
  for (let i = 0; i < limit - 1; i++) {
    let randomData = Math.floor(random() * (upper - lower + 1)) + lower;
    while (Math.abs(randomData - data[i]) > 5) {
      randomData = Math.floor(random() * (upper - lower + 1)) + lower;
    }
    data.push(randomData);
  }

  const currentTime = new Date();
  return data.map(
    (bpm, index): ChartData => ({
      value: bpm,
      timestamp: addSeconds(currentTime, index - limit),
    })
  );
};
