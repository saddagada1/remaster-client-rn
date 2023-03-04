import React from "react";
import Header from "../../../Header/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Container from "../../../Container/Container";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackParams } from "../../../Navigators/RootStackNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CoreTabsParams } from "../../../Navigators/CoreTabsNavigator";
import { Pressable } from "react-native";
import { resetAuthentication } from "../../../../redux/slices/authSlice";
import { useAppDispatch } from "../../../../utils/hooks/reduxHooks";
import { delAuthKeys } from "../../../../utils/secureStore";
import Title from "../../../Typography/Title";
import { SvgXml } from "react-native-svg";
import TypographyBold from "../../../Typography/TypographyBold";

type LibraryProps = CompositeScreenProps<
  BottomTabScreenProps<CoreTabsParams, "Library">,
  NativeStackScreenProps<RootStackParams>
>;

const Library: React.FC<LibraryProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const logout = async () => {
    await delAuthKeys();
    dispatch(resetAuthentication());
    navigation.replace("Auth", { screen: "Onboarding" });
  };
  return (
    <Container className="w-full h-full bg-stone-400 items-center">
      <Header className="w-full px-4 pt-10" title="library" />
      <Pressable onPress={async () => await logout()}>
        <Title>Log Out</Title>
      </Pressable>
      <Pressable
        onPress={() => navigation.replace("Main", { screen: "Editor" })}
        className="flex-row justify-center items-center p-5 rounded-2xl bg-black border-2 border-black"
      >
        <TypographyBold style={{ fontSize: 15, color: "#ffffff" }}>Editor</TypographyBold>
      </Pressable>
      <Pressable
        onPress={() => navigation.navigate("Main", { screen: "CreateInit" })}
        className="flex-row justify-center items-center p-5 rounded-2xl bg-black border-2 border-black"
      >
        <TypographyBold style={{ fontSize: 15, color: "#ffffff" }}>Create Remaster</TypographyBold>
      </Pressable>
    </Container>
  );
};

export default Library;
