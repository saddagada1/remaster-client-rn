import { StyleProp, Text, TextStyle } from "react-native";
import React from "react";

interface TypographyProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>
}

const Typography: React.FC<TypographyProps> = ({children, style}) => {
  return (
    <Text style={[{fontFamily: "Inter"}, style]}>{children}</Text>
  );
};

export default Typography;
