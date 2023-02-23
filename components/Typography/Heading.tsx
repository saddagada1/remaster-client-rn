import { StyleProp, Text, TextProps, TextStyle } from "react-native";
import React from "react";

interface HeadingProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const Heading: React.FC<HeadingProps> = ({ children, style, ...TextProps }) => {
  return (
    <Text allowFontScaling={false} {...TextProps} style={[{ fontFamily: "Syne" }, style]}>
      {children}
    </Text>
  );
};

export default Heading;
