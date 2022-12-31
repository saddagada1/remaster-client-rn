import { StyleProp, Text, TextStyle } from "react-native";
import React from "react";

interface TitleProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>
}

const Title: React.FC<TitleProps> = ({children, style}) => {
  return (
    <Text style={[{fontFamily: "SyneBlack"}, style]}>{children}</Text>
  );
};

export default Title;
