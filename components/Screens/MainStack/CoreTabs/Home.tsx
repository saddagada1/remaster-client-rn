import React from "react";
import Header from "../../../Header/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import Container from "../../../Container/Container";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackParams } from "../../../Navigators/RootStackNavigator";
import { Pressable, View } from "react-native";
import Title from "../../../Typography/Title";
import { delAuthKeys } from "../../../../utils/secureStore";
import { useAppDispatch } from "../../../../utils/hooks/reduxHooks";
import { setAuthentication } from "../../../../redux/slices/authSlice";
import { useQuery } from "urql";
import { UsersDocument } from "../../../../generated/graphql";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CoreTabsParams } from "../../../Navigators/CoreTabsNavigator";

type HomeProps = CompositeScreenProps<
  BottomTabScreenProps<CoreTabsParams, "Home">,
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
  const [{ data, fetching }, reexecuteQuery] = useQuery({
    query: UsersDocument,
    requestPolicy: "network-only",
  });
  return (
    <Container>
      <Header title="home" />
      <Pressable onPress={async () => await logout()}>
        <Title>Log Out</Title>
      </Pressable>
      <View className="flex-1 justify-center items-center">
        <Pressable onPress={() => reexecuteQuery()}>
          <Title>
            {data && data.users
              ? fetching
                ? "fetching..."
                : data.users[0].username
              : "no data"}
          </Title>
        </Pressable>
      </View>
    </Container>
  );
};

export default Home;
