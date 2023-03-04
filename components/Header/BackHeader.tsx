import { View, Pressable, ViewProps } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Title from "../Typography/Title";

interface BackHeaderProps extends ViewProps {
  title?: string;
}

const BackHeader: React.FC<BackHeaderProps> = ({ title, ...ViewProps }) => {
  const navigation = useNavigation();
  return (
    <View {...ViewProps}>
      <Pressable
        onPress={() => navigation.goBack()}
        className="border-2 border-black rounded-2xl p-2 justify-center items-center"
      >
        <AntDesign name="arrowleft" size={25} />
      </Pressable>
      <Title style={{ fontSize: 30, textTransform: "uppercase" }} className="flex-1">
        {title}
      </Title>
    </View>
  );
};

export default BackHeader;
