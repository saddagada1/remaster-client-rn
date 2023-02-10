import { View } from "react-native";
import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
  withDelay,
  cancelAnimation,
} from "react-native-reanimated";

interface LoadingIndicatorProps {
  size: number;
  colour: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  size,
  colour,
}) => {
  const barScale = Array(10)
    .fill(null)
    .map((_) => {
      return useSharedValue(0.5);
    });

  const barAnimStyles = Array(10)
    .fill(null)
    .map((_, index) => {
      return useAnimatedStyle(() => {
        return {
          transform: [{ scaleY: barScale[index].value }],
        };
      });
    });

  useEffect(() => {
    for (let i = 0; i < barScale.length; i++) {
      barScale[i].value = withDelay(
        ((i + 1) / 100) * 10000,
        withRepeat(withSpring(1), -1, true)
      );
    }

    return () => {
      for (let i = 0; i < barScale.length; i++) {
        cancelAnimation(barScale[i]);
      }
    };
  }, []);

  return (
    <View className="w-full flex-row justify-center items-center">
      {Array(10)
        .fill(null)
        .map((_, index) => (
          <Animated.Text
            key={index}
            style={[
              {
                fontFamily: "InterBold",
                fontSize: size,
                color: colour,
              },
              barAnimStyles[index],
            ]}
            allowFontScaling={false}
          >
            |
          </Animated.Text>
        ))}
    </View>
  );
};

export default LoadingIndicator;
