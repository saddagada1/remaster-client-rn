import React from "react";
import Header from "../../../Header/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Container from "../../../Container/Container";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackParams } from "../../../Navigators/RootStackNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CoreTabsParams } from "../../../Navigators/CoreTabsNavigator";
import { Pressable } from "react-native";
import TypographyBold from "../../../Typography/TypographyBold";

type ProfileProps = CompositeScreenProps<
  BottomTabScreenProps<CoreTabsParams, "Profile">,
  NativeStackScreenProps<RootStackParams>
>;

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  return (
    <Container noPadding={true}>
      <Header title="profile" />
      <Pressable
        onPress={() => navigation.navigate("Main", { screen: "Editor" })}
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

export default Profile;
