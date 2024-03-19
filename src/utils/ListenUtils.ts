function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export const divideDataInGroups = (
  data: number[],
  noOfChunks: number
): number[][] => {
  const results: number[][] = [];
  const interval = Math.max(1, data.length / noOfChunks);

  let intervalIndex = 0;
  for (let i = 0; i < data.length; i += interval) {
    // Max number of chunks reached, put remaining in last chunk
    if (intervalIndex == noOfChunks - 1) {
      const arrayChunk = data.slice(i, data.length);
      results.push(arrayChunk);
      break;
    }
    const arrayChunk = data.slice(i, i + interval);
    results.push(arrayChunk);
    intervalIndex++;
  }
  return results;
};

export const addNewData = (incomingData: number[], height: number) => {
  const DELAY_INTERVAL = 1;
  const NO_OF_BURST = 300;
  const NO_DATA_PER_BURST = 5;
  let prevData = 0;

  for (let i = 0; i < NO_OF_BURST; i++) {
    setTimeout(() => {
      for (let j = 0; j < NO_DATA_PER_BURST; j++) {
        let data = getRandomInt(height) - height / 2;
        while (Math.abs(data - prevData) > 5)
          data = getRandomInt(height) - height / 2;

        incomingData.push(data);
        prevData = data;
      }
    }, DELAY_INTERVAL * i);
  }
};
