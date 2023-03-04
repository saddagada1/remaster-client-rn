import { Pressable, StyleProp, View, ViewStyle } from "react-native";
import React, { useState } from "react";
import { Key, Tuning } from "../../generated/graphql";
import Portal from "../Visualizations/Portal";
import { keyReference } from "../../utils/constants";
import TypographyBold from "../Typography/TypographyBold";
import { Layout } from "../../utils/types/helpers";
import Heading from "../Typography/Heading";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";

interface RemasterCardProps {
  name: string;
  creator?: string;
  artist: string;
  keySig: Key;
  tuning: Tuning;
  likes: number;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const RemasterCard: React.FC<RemasterCardProps> = ({
  name,
  creator,
  artist,
  keySig,
  tuning,
  likes,
  onPress,
  style,
}) => {
  const [layout, setLayout] = useState<Layout | null>(null);
  return (
    <Pressable
      onPress={() => onPress && onPress()}
      onLayout={({ nativeEvent }) => setLayout(nativeEvent.layout)}
      style={style}
      className="w-full max-w-[500] h-fit min-h-[200] rounded-xl bg-stone-300 shadow-xl overflow-hidden"
    >
      {layout && (
        <Portal
          width={layout.width}
          height={layout.height}
          radius={layout.width * 0.25}
          keys={keyReference.filter((_, index) => index % 2 === 0)}
          animate={true}
        />
      )}
      <View className="w-full h-full absolute justify-end">
        <LinearGradient colors={["transparent", "#000000BF"]} className="w-full h-full absolute" />
        <View className="w-full h-[60%] justify-between bg-stone-300/50 p-4">
          <View className="flex-row justify-between items-start">
            <View>
              <Heading
                numberOfLines={1}
                ellipsizeMode="tail"
                className="w-full mb-1"
                style={{ fontSize: 20 }}
              >
                {name}
              </Heading>
              <Heading className="w-full" numberOfLines={1} ellipsizeMode="tail">
                {artist}
              </Heading>
            </View>
            <Pressable className="flex-row items-center" onPress={() => console.log("like")}>
              <TypographyBold className=" mr-2">{likes}</TypographyBold>
              <AntDesign name="staro" size={25} />
            </Pressable>
          </View>
          <View className="flex-row justify-between">
            <View className="flex-row mr-4">
              <TypographyBold className=" mr-4">{keySig.note}</TypographyBold>
              <TypographyBold className="">
                {tuning.name !== "Custom"
                  ? "[ " + tuning.notes.toString().replaceAll(",", " ") + " ]"
                  : tuning.name}
              </TypographyBold>
            </View>
            <TypographyBold className="flex-1  text-right" numberOfLines={1} ellipsizeMode="tail">
              {"crafty"}
            </TypographyBold>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default RemasterCard;
