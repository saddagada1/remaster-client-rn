import { StyleProp, Text, TextStyle } from "react-native";
import React from "react";

interface TypographyBoldProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>
}

const TypographyBold: React.FC<TypographyBoldProps> = ({children, style}) => {
  return (
    <Text style={[{fontFamily: "InterBold"}, style]}>{children}</Text>
  );
};

export default TypographyBold;