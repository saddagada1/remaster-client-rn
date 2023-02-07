import { View } from "react-native";
import React, { useEffect } from "react";
import LoadingIndicator from "../Visualizations/LoadingIndicator";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParams } from "../Navigators/RootStackNavigator";
import { useAppDispatch } from "../../utils/hooks/reduxHooks";
import { setAuthentication } from "../../redux/slices/authSlice";
import { getAuthKeys } from "../../utils/secureStore";
import { sleep } from "../../utils/sleep";

type LoadingProps = CompositeScreenProps<
  NativeStackScreenProps<RootStackParams, "Loading">,
  NativeStackScreenProps<RootStackParams>
>;

const Loading: React.FC<LoadingProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  console.log("loading");
  useEffect(() => {
    const checkAuthentication = async () => {
      await sleep(5000);
      const values = await getAuthKeys();
      if (!values) {
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
      } else {
        dispatch(
          setAuthentication({
            isAuthenticated: true,
            access_token: values.access_token,
            refresh_token: values.refresh_token,
            expires_in: values.expires_in,
            user: values.user,
          })
        );
        navigation.replace("Main", { screen: "Home" });
      }
    };

    checkAuthentication();
  }, []);

  return (
    <View className="w-full h-full bg-stone-400 items-center justify-center">
      <LoadingIndicator size={30} colour="#000000" />
    </View>
  );
};

export default Loading;
