import { StyleProp, Text, TextStyle } from "react-native";
import React from "react";

interface HeadingProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({ children, style, className }) => {
  return (
    <Text className={className} style={[{ fontFamily: "Syne" }, style]}>
      {children}
    </Text>
  );
};

export default Heading;
