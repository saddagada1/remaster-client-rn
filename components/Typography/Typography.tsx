import { StyleProp, Text, TextStyle } from "react-native";
import React from "react";

interface TypographyProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  className?: string;
}

const Typography: React.FC<TypographyProps> = ({
  children,
  style,
  className,
}) => {
  return (
    <Text className={className} style={[{ fontFamily: "Inter" }, style]}>
      {children}
    </Text>
  );
};

export default Typography;
