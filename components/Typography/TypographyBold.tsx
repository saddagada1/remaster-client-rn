import { StyleProp, Text, TextStyle } from "react-native";
import React from "react";

interface TypographyBoldProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
  className?: string;
}

const TypographyBold: React.FC<TypographyBoldProps> = ({
  children,
  style,
  className,
}) => {
  return (
    <Text
      allowFontScaling={false}
      className={className}
      style={[{ fontFamily: "InterBold" }, style]}
    >
      {children}
    </Text>
  );
};

export default TypographyBold;
