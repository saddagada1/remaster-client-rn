import { Pressable, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import React from "react";
import Title from "../Typography/Title";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View className="w-full pt-10">
      <Title style={{ fontSize: 30, textTransform: "uppercase" }}>
        {title}
      </Title>
      <View className="flex-row gap-2 pt-4">
        <View className="flex-row items-center border-2 border-black rounded-lg flex-1 p-2">
          <Icon name="search1" size={25} />
          <TextInput
            className="ml-2 flex-1"
            style={{ fontFamily: "Inter", fontSize: 15 }}
            placeholder="Search"
            placeholderTextColor="#000"
          />
        </View>
        <Pressable className="border-2 border-black rounded-lg py-2 px-3 justify-center items-center">
          <Icon name="bells" size={25} />
        </Pressable>
      </View>
    </View>
  );
};

export default Header;
