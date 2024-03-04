import React from "react";
import { Circle, Group, Shadow, Skia, vec } from "@shopify/react-native-skia";
import {
  SharedValue,
  useDerivedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

interface CursorProps {
  x: SharedValue<number>;
  y: SharedValue<number | null>;
  active: SharedValue<boolean>;
  color: string;
}

export default function Cursor({ x, y, active, color }: CursorProps) {
  const transform = useDerivedValue(() => [
    { translateX: x.value },
    { translateY: y.value ?? 0 },
  ]);

  const cursorLine = Skia.Path.Make();
  cursorLine.addPoly([vec(0, 0), vec(0, -(y.value ?? 0))], true);

  const disappearDelay = 300;
  const defaultFadeDelay = 100;
  const grow = (max: number, fadeDelay?: number) =>
    useDerivedValue(() =>
      active.value
        ? withTiming(max, { duration: fadeDelay ?? defaultFadeDelay })
        : withDelay(
            disappearDelay,
            withTiming(0, { duration: fadeDelay ?? defaultFadeDelay })
          )
    );

  return (
    <Group transform={transform}>
      <Circle
        cx={0}
        cy={0}
        r={grow(27, 300)}
        opacity={grow(0.15, 300)}
        color={color}
      />
      <Circle
        cx={0}
        cy={0}
        r={grow(18, 200)}
        opacity={grow(0.15, 200)}
        color={color}
      />
      <Circle cx={0} cy={0} r={grow(6)} opacity={grow(1)} color={color}>
        <Shadow dx={1} dy={1} blur={4} color="gray" />
      </Circle>
    </Group>
  );
}
