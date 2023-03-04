import { View, ViewProps } from "react-native";
import React from "react";
import Title from "../Typography/Title";

interface HeaderProps extends ViewProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title, ...ViewProps }) => {
  return (
    <View {...ViewProps}>
      <Title style={{ fontSize: 30, textTransform: "uppercase" }}>{title}</Title>
    </View>
  );
};

export default Header;
