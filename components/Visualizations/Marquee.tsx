import { View } from "react-native";
import React, { useEffect, useState } from "react";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface MarqueeProps {
  children: React.ReactNode;
  clones: number;
}

const Marquee: React.FC<MarqueeProps> = ({ children, clones }) => {
  const [width, setWidth] = useState(0);
  const translateX = useSharedValue(0);

  const marqueeStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: -translateX.value }],
    };
  });

  console.log("marquee call: ", width);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width, { duration: 10000, easing: Easing.linear }),
      -1
    );
    return () => {
      cancelAnimation(translateX);
    };
  }, [width]);

  return (
    <View className="w-full bg-black py-2 border-y-2 border-white">
      <Animated.View className="flex-row" style={marqueeStyle}>
        {Array(clones)
          .fill(null)
          .map((_, index) => (
            <View
              key={index}
              className="flex-row"
              onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
            >
              {children}
            </View>
          ))}
      </Animated.View>
    </View>
  );
};

export default Marquee;
