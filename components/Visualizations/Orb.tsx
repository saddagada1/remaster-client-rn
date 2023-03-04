import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { Layout } from "../../utils/types/helpers";
import {
  Canvas,
  Circle,
  RadialGradient,
  runTiming,
  SkiaAnimation,
  SkiaMutableValue,
  useComputedValue,
  useValue,
  vec,
} from "@shopify/react-native-skia";
import { rand } from "../../utils/rand";

interface OrbProps {
  colour: string;
}

const Orb: React.FC<OrbProps> = ({ colour }) => {
  const [layout, setLayout] = useState<Layout | null>(null);
  const circleXPosition = useValue(0);
  const circleYPosition = useValue(0);
  const radialPosition = useComputedValue(() => {
    return vec(circleXPosition.current, circleYPosition.current);
  }, [circleXPosition, circleYPosition]);

  const createXTiming = (x: SkiaMutableValue<number>) => {
    const randomX = rand(layout!.width / 2, layout!.width / 2 + 10);
    const timing = runTiming(
      x,
      { to: randomX, loop: true, yoyo: true },
      { duration: Math.abs(((x.current - randomX) / 10) * 1000) }
    );

    return timing;
  };

  const createYTiming = (y: SkiaMutableValue<number>) => {
    const randomY = rand(layout!.height / 2, layout!.height / 2 + 10);
    const timing = runTiming(
      y,
      { to: randomY, loop: true, yoyo: true },
      { duration: Math.abs(((y.current - randomY) / 10) * 1000) }
    );

    return timing;
  };

  useEffect(() => {
    let xTiming: SkiaAnimation | null = null;
    let yTiming: SkiaAnimation | null = null;
    if (layout) {
      circleXPosition.current = layout.width / 2;
      circleYPosition.current = layout.height / 2;
      xTiming = createXTiming(circleXPosition);
      yTiming = createYTiming(circleYPosition);
    }

    return () => {
      if (xTiming && yTiming) {
        xTiming.cancel();
        yTiming.cancel();
      }
    };
  }, [layout]);

  return (
    <View className="w-full h-full" onLayout={({ nativeEvent }) => setLayout(nativeEvent.layout)}>
      {layout && (
        <Canvas style={{ flex: 1 }}>
          <Circle cx={circleXPosition} cy={circleYPosition} r={layout.width * 0.35}>
            <RadialGradient
              c={radialPosition}
              r={layout.width * 0.35}
              colors={[colour + "80", colour + "00"]}
            />
          </Circle>
        </Canvas>
      )}
    </View>
  );
};

export default Orb;
