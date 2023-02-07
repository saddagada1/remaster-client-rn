import React from "react";
import Header from "../../Header/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import Container from "../../Container/Container";
import Navbar from "../../Navbar/Navbar";
import { CompositeScreenProps } from "@react-navigation/native";
import { MainStackParams } from "../../Navigators/MainStackNavigator";
import { RootStackParams } from "../../Navigators/RootStackNavigator";
import { Pressable } from "react-native";
import Title from "../../Typography/Title";
import { delAuthKeys } from "../../../utils/secureStore";
import { useAppDispatch } from "../../../utils/hooks/reduxHooks";
import { setAuthentication } from "../../../redux/slices/authSlice";

type HomeProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParams, "Home">,
  NativeStackScreenProps<RootStackParams>
>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const logout = async () => {
    await delAuthKeys();
    dispatch(
      setAuthentication({
        isAuthenticated: false,
        access_token: null,
        refresh_token: null,
        expires_in: null,
        user: null,
      })
    );
    navigation.replace("Auth", { screen: "Onboarding" });
  };
  return (
    <Container>
      <Header title="explore" />
      <Navbar screen="home" />
      <Pressable onPress={async () => await logout()}>
        <Title>Log Out</Title>
      </Pressable>
    </Container>
  );
};

export default Home;
