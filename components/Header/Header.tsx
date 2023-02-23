import { View } from "react-native";
import React from "react";
import Title from "../Typography/Title";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View className="w-full px-4 pt-10">
      <Title style={{ fontSize: 30, textTransform: "uppercase" }}>{title}</Title>
    </View>
  );
};

export default Header;
