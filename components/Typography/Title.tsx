import { StyleProp, Text, TextProps, TextStyle } from "react-native";
import React from "react";

interface TitleProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const Title: React.FC<TitleProps> = ({ children, style, ...TextProps }) => {
  return (
    <Text allowFontScaling={false} {...TextProps} style={[{ fontFamily: "SyneBlack" }, style]}>
      {children}
    </Text>
  );
};

export default Title;
