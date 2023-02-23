import { View, ScrollView, NativeScrollEvent } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Resizeable from "../Resizeable/Resizeable";
import Ruler from "../Ruler/Ruler";
import { Loop } from "../../utils/types/remaster";
import { keyColourReference } from "../../utils/constants";
import TypographyBold from "../Typography/TypographyBold";
import Animated, { useAnimatedStyle, useDerivedValue, withTiming } from "react-native-reanimated";
import { calcVideoTimestamp } from "../../utils/calc";

interface TimelineProps {
  duration: number;
  playing: boolean;
  progressPosition: number;
  segmentWidth: number;
  unit: number;
  containerWidth: number;
  loops: Loop[];
}

const Timeline: React.FC<TimelineProps> = ({
  duration,
  playing,
  progressPosition,
  segmentWidth,
  unit,
  containerWidth,
  loops,
}) => {
  const snapTo = unit + segmentWidth;
  const sliderWidth = duration * snapTo + segmentWidth;
  const scrollRef = useRef<ScrollView | null>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [resizePosition, setResizePosition] = useState(0);
  const [showScrollDisplay, setShowScrollDisplay] = useState(false);
  const [showResizeDisplay, setShowResizeDisplay] = useState(false);

  const scrollDisplayOpacity = useDerivedValue(() => {
    return withTiming(showScrollDisplay ? 0.6 : 0);
  }, [showScrollDisplay]);
  const scrollDisplayStyle = useAnimatedStyle(() => {
    return {
      opacity: scrollDisplayOpacity.value,
    };
  });

  const resizeDisplayOpacity = useDerivedValue(() => {
    return withTiming(showResizeDisplay ? 0.6 : 0);
  }, [showResizeDisplay]);
  const resizeDisplayStyle = useAnimatedStyle(() => {
    return {
      opacity: resizeDisplayOpacity.value,
    };
  });

  useEffect(() => {
    if (scrollRef.current && playing) {
      const position = progressPosition * snapTo + segmentWidth;
      if (
        position > containerWidth / 2 ||
        scrollPosition * snapTo + segmentWidth > containerWidth / 2
      ) {
        if (position - containerWidth / 2 < sliderWidth - containerWidth) {
          scrollRef.current.scrollTo({
            x: position - containerWidth / 2,
          });
        }
      }
    }
    return () => {};
  }, [progressPosition, playing]);

  return (
    <>
      <ScrollView
        ref={scrollRef}
        horizontal={true}
        snapToInterval={snapTo}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}
        scrollEnabled={!playing}
        onScrollBeginDrag={() => {
          setShowScrollDisplay(true);
        }}
        onScroll={({ nativeEvent }) => {
          const position = Math.round(nativeEvent.contentOffset.x / snapTo);
          setScrollPosition(position);
          if (position === 0 || duration - position * snapTo === containerWidth) {
            setShowScrollDisplay(false);
          }
        }}
        onMomentumScrollEnd={() => {
          setShowScrollDisplay(false);
        }}
      >
        <View>
          <View
            style={{ right: sliderWidth - (progressPosition * snapTo + segmentWidth) }}
            className="absolute bg-stone-400 opacity-50 h-full left-0 top-0 bottom-0"
          />
          <View className="h-1/5">
            <Ruler
              segmentWidth={segmentWidth}
              numOfSegments={duration}
              unit={unit}
              width={sliderWidth}
            />
          </View>
          <View className="flex-row-reverse justify-end flex-1">
            {loops
              .slice(0)
              .reverse()
              .map((loop) => (
                <Resizeable
                  key={loop.id}
                  minWidth={unit + segmentWidth * 2}
                  defaultWidth={(loop.end - loop.start) * snapTo}
                  onResizeStart={() => setShowResizeDisplay(true)}
                  onResize={({ startWidth, translationX }) =>
                    setResizePosition(Math.floor((startWidth + translationX) / snapTo + loop.start))
                  }
                  onResizeEnd={() => setShowResizeDisplay(false)}
                  style={{
                    backgroundColor: `${keyColourReference[loop.key]}80`,
                  }}
                />
              ))}
          </View>
        </View>
      </ScrollView>
      {sliderWidth < containerWidth && (
        <View
          style={{ width: containerWidth - sliderWidth }}
          className="absolute h-full bg-black right-0"
        /> //add a pattern later
      )}
      <View className="absolute flex-row justify-between h-1/6 w-full mt-[2]">
        <Animated.View
          style={scrollDisplayStyle}
          className="h-full bg-black rounded-xl px-4 ml-[2] justify-center"
        >
          <TypographyBold style={{ fontSize: 15, color: "#ffffff" }}>
            {calcVideoTimestamp(scrollPosition)}
          </TypographyBold>
        </Animated.View>
        <Animated.View
          style={resizeDisplayStyle}
          className="h-full bg-black rounded-xl px-4 mr-[2] justify-center"
        >
          <TypographyBold style={{ fontSize: 15, color: "#ffffff" }}>
            {calcVideoTimestamp(resizePosition)}
          </TypographyBold>
        </Animated.View>
      </View>
    </>
  );
};

export default Timeline;
