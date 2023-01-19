import { View, Text, Pressable } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/AntDesign";
import TypographyBold from "../Typography/TypographyBold";
import { useNavigation } from "@react-navigation/native";

interface BackHeaderProps {
  title?: string;
}

const BackHeader: React.FC<BackHeaderProps> = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View className="w-[90%] pt-10 flex-row">
      <Pressable
        onPress={() => navigation.goBack()}
        className="border-2 border-black rounded-2xl p-2 justify-center items-center"
      >
        <Icon name="arrowleft" size={25} />
      </Pressable>
      <TypographyBold className="flex-1">{title}</TypographyBold>
    </View>
  );
};

export default BackHeader;
