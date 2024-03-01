import {
  Easing,
  SharedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type ScannerParams = {
  maxWidth: number;
  duration: number;
};

type ScannerResult = {
  xValue: SharedValue<number>;
};

export const useScanner = (params: ScannerParams): ScannerResult => {
  const { maxWidth, duration } = params;
  const xValue = useSharedValue(0);

  xValue.value = withRepeat(
    withTiming(maxWidth, { duration: duration, easing: Easing.linear }),
    -1
  );

  return {
    xValue: xValue,
  };
};
