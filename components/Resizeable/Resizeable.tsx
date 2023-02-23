import React from "react";
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { StyleProp, View, ViewStyle } from "react-native";
import { clamp } from "../../utils/calc";

interface onStartResponse {
  startWidth: number;
}

interface Response {
  startWidth: number;
  translationX: number;
}

interface onEndResponse {
  startWidth: number;
  endWidth: number;
}

interface ResizableProps {
  defaultWidth: number;
  minWidth: number;
  onResizeStart?: (response: onStartResponse) => void;
  onResize?: (response: Response) => void;
  onResizeEnd?: (response: onEndResponse) => void;
  style: StyleProp<ViewStyle>;
}

const Resizeable: React.FC<ResizableProps> = ({
  defaultWidth,
  minWidth,
  onResizeStart,
  onResize,
  onResizeEnd,
  style,
}) => {
  const width = useSharedValue(defaultWidth);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, ctx: any) => {
      ctx.startWidth = width.value;
      ("worklet");
      if (onResizeStart) {
        runOnJS(onResizeStart)({
          startWidth: width.value,
        });
      }
    },
    onActive: (event, ctx: any) => {
      width.value = clamp(ctx.startWidth + event.translationX, minWidth);
      ("worklet");
      if (onResize) {
        runOnJS(onResize)({
          startWidth: ctx.startWidth,
          translationX: event.translationX,
        });
      }
    },
    onFinish: (event, ctx: any) => {
      "worklet";
      if (onResizeEnd) {
        runOnJS(onResizeEnd)({
          startWidth: ctx.startWidth,
          endWidth: width.value,
        });
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });
  return (
    <Animated.View className="h-full justify-center rounded" style={[animatedStyle, style]}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View className="absolute right-[-12] w-6 h-3/5 rounded-2xl bg-stone-100 justify-center items-center">
          <View className="h-1/2 w-[2] rounded bg-stone-500" />
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

export default Resizeable;
