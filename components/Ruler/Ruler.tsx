import { View } from "react-native";
import React from "react";

interface RulerProps {
  start?: number;
  segmentWidth: number;
  numOfSegments: number;
  unit: number;
  unitFocus?: number;
  width: number;
}

const Ruler: React.FC<RulerProps> = ({
  start,
  segmentWidth,
  numOfSegments,
  unit,
  unitFocus,
  width,
}) => {
  const segments = Array(numOfSegments + 1)
    .fill(null)
    .map((_, index) => index + (!start ? 0 : start));
  return (
    <View style={{ width: width }} className="flex-row h-full">
      {segments.map((segment) => {
        const focus = segment % (!unitFocus ? 10 : unitFocus) === 0;
        return (
          <View
            key={segment}
            className={focus ? "bg-stone-700 h-full" : "bg-stone-500 h-3/4"}
            style={{ width: segmentWidth, marginRight: segment === segments.length - 1 ? 0 : unit }}
          />
        );
      })}
    </View>
  );
};

export default Ruler;
