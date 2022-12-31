import { StyleProp, Text, TextStyle } from "react-native";
import React from "react";

interface HeadingProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>
}

const Heading: React.FC<HeadingProps> = ({children, style}) => {
  return (
    <Text style={[{fontFamily: "Syne"}, style]}>{children}</Text>
  );
};

export default Heading;
