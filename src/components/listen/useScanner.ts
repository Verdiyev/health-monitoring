import {
  Easing,
  SharedValue,
  useDerivedValue,
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

  xValue.value = 0; // Reset to 0 every hook rebuild
  xValue.value = withRepeat(
    withTiming(maxWidth, { duration: duration, easing: Easing.linear }),
    -1
  );

  return {
    xValue: xValue,
  };
};
