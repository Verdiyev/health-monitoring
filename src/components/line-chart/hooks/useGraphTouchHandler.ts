import React from "react";
import { Gesture, PanGesture } from "react-native-gesture-handler";
import {
  SharedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { snapPoint } from "react-native-redash";

type PanGestureResult = {
  panX: SharedValue<number>;
  panGesture: PanGesture;
};

type GraphPanGestureParams = {
  isActive: SharedValue<boolean>;
  startSpacing: number;
  enabled: boolean;
  xIndices: number[];
};

export const useGraphPanGesture = ({
  isActive,
  enabled,
  startSpacing,
  xIndices,
}: GraphPanGestureParams): PanGestureResult => {
  const panX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .enabled(enabled)
    .onBegin((pos) => {
      isActive.value = true;
      panX.value = withTiming(pos.x + startSpacing);
    })
    .onChange((pos) => {
      const newX = pos.x + startSpacing;
      const xValue = snapPoint(newX, 0, xIndices);

      panX.value = withSpring(xValue, {
        damping: 50,
        stiffness: 200,
      });
    })
    .onFinalize(() => {
      isActive.value = false;
      const lastX = xIndices[xIndices.length - 1];
      panX.value = withTiming(lastX);
    });

  return {
    panX: panX,
    panGesture: panGesture,
  };
};
