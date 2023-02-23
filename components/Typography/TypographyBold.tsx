import { StyleProp, Text, TextProps, TextStyle } from "react-native";
import React from "react";

interface TypographyBoldProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const TypographyBold: React.FC<TypographyBoldProps> = ({ children, style, ...TextProps }) => {
  return (
    <Text allowFontScaling={false} {...TextProps} style={[{ fontFamily: "InterBold" }, style]}>
      {children}
    </Text>
  );
};

export default TypographyBold;
