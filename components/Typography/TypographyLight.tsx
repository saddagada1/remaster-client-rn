import { StyleProp, Text, TextStyle } from "react-native";
import React from "react";

interface TypographyLightProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>
}

const TypographyLight: React.FC<TypographyLightProps> = ({children, style}) => {
  return (
    <Text style={[{fontFamily: "InterLight"}, style]}>{children}</Text>
  );
};

export default TypographyLight;