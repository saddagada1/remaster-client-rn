import React, { useEffect } from "react";
import LoadingIndicator from "../Visualizations/LoadingIndicator";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../Navigators/RootStackNavigator";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { resetAuthentication, setAuthentication } from "../../redux/slices/authSlice";
import { getAuthKeys } from "../../utils/secureStore";
import { sleep } from "../../utils/sleep";
import Container from "../Container/Container";

type LoadingProps = CompositeScreenProps<
  NativeStackScreenProps<RootStackParams, "Loading">,
  NativeStackScreenProps<RootStackParams>
>;

const Loading: React.FC<LoadingProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  console.log("loading");
  useEffect(() => {
    const checkAuthentication = async () => {
      await sleep(1000);
      const values = await getAuthKeys();
      if (!values) {
        dispatch(resetAuthentication());
        navigation.replace("Auth", { screen: "Onboarding" });
      } else {
        dispatch(
          setAuthentication({
            isAuthenticated: true,
            access_token: values.access_token,
            refresh_token: values.refresh_token,
            expires_in: values.expires_in,
            user: values.user,
            spotify_access_token: values.spotify_access_token,
            spotify_expires_in: values.spotify_expires_in,
          })
        );
        navigation.replace("Main", {
          screen: "CoreTabs",
          params: { screen: "Home" },
        });
      }
    };

    checkAuthentication();
  }, []);

  return (
    <Container className="w-full h-full bg-stone-400 items-center justify-center">
      <LoadingIndicator size={30} colour="#000000" />
    </Container>
  );
};

export default Loading;
