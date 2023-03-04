import { View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  useValue,
  useComputedValue,
  vec,
  Canvas,
  Circle,
  RadialGradient,
  Group,
  SkiaMutableValue,
  runTiming,
  Rect,
  SkiaAnimation,
  LinearGradient,
} from "@shopify/react-native-skia";
import { rand } from "../../utils/rand";

interface PortalProps {
  width: number;
  height: number;
  radius?: number;
  keys: {
    note: string;
    colour: string;
  }[];
  animate: boolean;
}

const Portal: React.FC<PortalProps> = ({ width, height, radius, keys, animate }) => {
  const circlePositions = keys.map(() => {
    const circleXPosition = useValue(rand(0, width));
    const circleYPosition = useValue(rand(0, height));
    return [circleXPosition, circleYPosition];
  });
  const radialPositions = keys.map((_, index) => {
    const radialPosition = useComputedValue(() => {
      return vec(circlePositions[index][0].current, circlePositions[index][1].current);
    }, [circlePositions[index][0], circlePositions[index][1]]);
    return radialPosition;
  });
  const [timings, setTimings] = useState<SkiaAnimation[][]>([]);

  const createXTiming = (x: SkiaMutableValue<number>) => {
    const randomX = rand(0, width);
    const timing = runTiming(
      x,
      { to: randomX, loop: true, yoyo: true },
      { duration: Math.abs(((x.current - randomX) / 10) * 1000) }
    );

    return timing;
  };

  const createYTiming = (y: SkiaMutableValue<number>) => {
    const randomY = rand(0, height);
    const timing = runTiming(
      y,
      { to: randomY, loop: true, yoyo: true },
      { duration: Math.abs(((y.current - randomY) / 10) * 1000) }
    );

    return timing;
  };

  useEffect(() => {
    if (animate) {
      setTimings(
        keys.map((_, index) => {
          return [
            createXTiming(circlePositions[index][0]),
            createYTiming(circlePositions[index][1]),
          ];
        })
      );
    } else {
      timings.length !== 0 &&
        timings.map((timing) => {
          timing[0].cancel();
          timing[1].cancel();
        });
      setTimings([]);
    }
  }, [animate]);

  return (
    <View className="w-full h-full">
      <Canvas style={{ flex: 1 }}>
        <Group blendMode="saturation">
          {keys.map((key, index) => (
            <Circle
              cx={circlePositions[index][0]}
              cy={circlePositions[index][1]}
              r={!radius ? width * 0.5 : radius}
              key={index}
            >
              <RadialGradient
                c={radialPositions[index]}
                r={!radius ? width * 0.5 : radius}
                colors={[key.colour, key.colour + "00"]}
              />
            </Circle>
          ))}
          <Rect x={0} y={0} width={width} height={height}>
            <LinearGradient
              start={vec(width / 2, 0)}
              end={vec(width / 2, height)}
              colors={keys.map((key) => {
                return key.colour + "80";
              })}
            />
          </Rect>
        </Group>
      </Canvas>
    </View>
  );
};

export default Portal;
