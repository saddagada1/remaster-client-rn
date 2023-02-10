import React from "react";
import Header from "../../../Header/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import Container from "../../../Container/Container";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackParams } from "../../../Navigators/RootStackNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CoreTabsParams } from "../../../Navigators/CoreTabsNavigator";

type ProfileProps = CompositeScreenProps<
  BottomTabScreenProps<CoreTabsParams, "Profile">,
  NativeStackScreenProps<RootStackParams>
>;

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  return (
    <Container>
      <Header title="profile" />
    </Container>
  );
};

export default Profile;
