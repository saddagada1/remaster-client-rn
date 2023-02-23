import { StyleProp, Text, TextProps, TextStyle } from "react-native";
import React from "react";

interface TypographyProps extends TextProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const Typography: React.FC<TypographyProps> = ({ children, style, ...TextProps }) => {
  return (
    <Text allowFontScaling={false} {...TextProps} style={[{ fontFamily: "Inter" }, style]}>
      {children}
    </Text>
  );
};

export default Typography;
