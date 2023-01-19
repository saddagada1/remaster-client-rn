import { StyleProp, Text, TextStyle } from "react-native";
import React from "react";

interface TitleProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  className?: string;
}

const Title: React.FC<TitleProps> = ({ children, style, className }) => {
  return (
    <Text className={className} style={[{ fontFamily: "SyneBlack" }, style]}>
      {children}
    </Text>
  );
};

export default Title;
