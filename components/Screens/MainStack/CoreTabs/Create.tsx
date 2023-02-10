import React from "react";
import Header from "../../../Header/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import Container from "../../../Container/Container";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackParams } from "../../../Navigators/RootStackNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CoreTabsParams } from "../../../Navigators/CoreTabsNavigator";

type CreateProps = CompositeScreenProps<
  BottomTabScreenProps<CoreTabsParams, "Create">,
  NativeStackScreenProps<RootStackParams>
>;

const Create: React.FC<CreateProps> = ({ navigation }) => {
  return (
    <Container>
      <Header title="create" />
    </Container>
  );
};

export default Create;