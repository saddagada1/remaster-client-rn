import React from "react";
import Header from "../../../Header/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Container from "../../../Container/Container";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackParams } from "../../../Navigators/RootStackNavigator";
import { Pressable, View } from "react-native";
import Title from "../../../Typography/Title";
import { useAppSelector } from "../../../../utils/hooks/reduxHooks";
import { useQuery } from "urql";
import { UsersDocument } from "../../../../generated/graphql";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CoreTabsParams } from "../../../Navigators/CoreTabsNavigator";

type HomeProps = CompositeScreenProps<
  BottomTabScreenProps<CoreTabsParams, "Home">,
  NativeStackScreenProps<RootStackParams>
>;

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const loggedUser = useAppSelector((store) => store.auth.user);

  const [{ data, fetching }, reexecuteQuery] = useQuery({
    query: UsersDocument,
    requestPolicy: "network-only",
  });
  return (
    <Container noPadding={true}>
      <Header title="home" />
      <View className="flex-1 justify-center items-center">
        <Pressable onPress={() => reexecuteQuery()}>
          {data && data.users ? (
            fetching ? (
              <Title>fetching...</Title>
            ) : (
              data.users.map((user, index) => (
                <Title
                  key={index}
                  className={loggedUser?._id === user._id ? "text-red-500" : undefined}
                >
                  {user._id + ":" + user.username + ":" + user.verified}
                </Title>
              ))
            )
          ) : (
            <Title>no data</Title>
          )}
        </Pressable>
      </View>
    </Container>
  );
};

export default Home;
