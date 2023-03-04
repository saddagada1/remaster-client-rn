import { View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../Container/Container";
import Title from "../../Typography/Title";
import TypographyBold from "../../Typography/TypographyBold";
import AntDesign from "@expo/vector-icons/AntDesign";
import Portal from "../../Visualizations/Portal";
import { keyReference } from "../../../utils/constants";
import Typography from "../../Typography/Typography";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../Navigators/AuthStackNavigator";
import { CompositeScreenProps, useIsFocused } from "@react-navigation/native";
import { RootStackParams } from "../../Navigators/RootStackNavigator";
import * as Google from "expo-auth-session/providers/google";
import { GOOGLE_OAUTH_CLIENT_ID } from "@env";
import { useMutation } from "urql";
import { LoginWithGuestAccessDocument } from "../../../generated/graphql";
import { useAppDispatch } from "../../../utils/hooks/reduxHooks";
import { setSpotifyKeys } from "../../../utils/secureStore";
import { setSpotifyAuthentication } from "../../../redux/slices/authSlice";
import { calcExpiresIn } from "../../../utils/calc";

type OnboardingProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParams, "Onboarding">,
  NativeStackScreenProps<RootStackParams>
>;

const Onboarding: React.FC<OnboardingProps> = ({ navigation }) => {
  // animations
  const isFocused = useIsFocused();
  const [portalWidth, setPortalWidth] = useState(0);
  const [portalHeight, setPortalHeight] = useState(0);
  const uiRevealTranslateY = useSharedValue(50);
  const uiRevealOpacity = useSharedValue(0);
  const portalRevealTranslateX = useSharedValue(50);
  const portalRevealScaleY = useSharedValue(1);
  const portalRevealOpacity = useSharedValue(0);

  const uiRevealTopAnimStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: uiRevealTranslateY.value * -1 }],
      opacity: uiRevealOpacity.value,
    };
  });

  const uiRevealBottomAnimStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: uiRevealTranslateY.value }],
      opacity: uiRevealOpacity.value,
    };
  });

  const portalRevealLeftAnimStyles = useAnimatedStyle(() => {
    return {
      right: `${portalRevealTranslateX.value}%`,
      transform: [{ scaleY: portalRevealScaleY.value }],
    };
  });

  const portalRevealRightAnimStyles = useAnimatedStyle(() => {
    return {
      left: `${portalRevealTranslateX.value}%`,
      transform: [{ scaleY: portalRevealScaleY.value }],
    };
  });

  const portalRevealAnimStyles = useAnimatedStyle(() => {
    return {
      opacity: portalRevealOpacity.value,
    };
  });

  useEffect(() => {
    portalRevealTranslateX.value = withDelay(
      1000,
      withTiming(100, { duration: 1000 }, () => {
        portalRevealScaleY.value = withTiming(
          0,
          {
            duration: 1000,
            easing: Easing.bezier(1, 0.1, 0.25, 1),
          },
          () => {
            portalRevealOpacity.value = withTiming(1, { duration: 1000 });
            uiRevealTranslateY.value = withSpring(0);
            uiRevealOpacity.value = withSpring(1);
          }
        );
      })
    );
  }, []);

  //oauth

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_OAUTH_CLIENT_ID,
    selectAccount: true,
    responseType: "id_token",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const id_token = response.params.id_token;
      navigation.navigate("RegisterWithGoogle", {
        id_token: id_token,
      });
    }
  }, [response]);

  //guest access
  const [, loginWithGuestAccess] = useMutation(LoginWithGuestAccessDocument);
  const dispatch = useAppDispatch();

  return (
    <Container className="w-full h-full bg-stone-400 px-8 items-center">
      <Animated.View className="my-10" style={uiRevealTopAnimStyles}>
        <TypographyBold>Welcome To</TypographyBold>
        <Title style={{ fontSize: 30, textTransform: "uppercase" }}>remaster</Title>
      </Animated.View>
      <View
        style={{ width: portalWidth === 0 ? "100%" : portalWidth - 16 }}
        className="flex-1 flex-row mb-2 justify-center relative"
      >
        <View
          className="aspect-[3/5] h-full border-2 border-black rounded-2xl overflow-hidden"
          onLayout={(event) => {
            setPortalWidth(event.nativeEvent.layout.width);
            setPortalHeight(event.nativeEvent.layout.height);
          }}
        >
          <Animated.View className="w-full h-full" style={portalRevealAnimStyles}>
            {portalWidth !== 0 && portalHeight !== 0 ? (
              <Portal
                width={portalWidth}
                height={portalHeight}
                keys={keyReference}
                animate={isFocused}
              />
            ) : null}
          </Animated.View>
        </View>
        <Animated.View
          className="h-full absolute bg-stone-400"
          style={[portalRevealLeftAnimStyles, { width: portalWidth === 0 ? "100%" : portalWidth }]}
        />
        <Animated.View
          className="h-full absolute bg-stone-400"
          style={[portalRevealRightAnimStyles, { width: portalWidth === 0 ? "100%" : portalWidth }]}
        />
      </View>
      <Animated.View className="w-full items-center my-10" style={uiRevealBottomAnimStyles}>
        <Pressable
          className="w-full flex-row justify-center items-center p-5 mb-5 rounded-2xl bg-black border-2 border-black"
          onPress={() => navigation.navigate("Register")}
        >
          <AntDesign name="mail" size={20} color="#ffffff" />
          <TypographyBold style={{ fontSize: 15, color: "#ffffff", marginLeft: 15 }}>
            Sign Up with Email
          </TypographyBold>
        </Pressable>
        <Pressable
          className="w-full flex-row justify-center items-center p-5 mb-5 rounded-2xl bg-stone-300 border-2 border-black"
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        >
          <AntDesign name="google" size={20} />
          <TypographyBold style={{ fontSize: 15, marginLeft: 15 }}>
            Sign Up with Google
          </TypographyBold>
        </Pressable>
        <View className="flex-row mb-3">
          <Typography>Already have an account?</Typography>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <TypographyBold style={{ marginLeft: 5, textDecorationLine: "underline" }}>
              Login
            </TypographyBold>
          </Pressable>
        </View>
        <View className="flex-row">
          <Typography>Explore with</Typography>
          <Pressable
            onPress={async () => {
              const response = await loginWithGuestAccess({});
              await setSpotifyKeys({
                spotify_access_token: response.data?.loginWithGuestAccess.spotify_access_token,
                spotify_expires_in: response.data?.loginWithGuestAccess.spotify_expires_in,
              });
              dispatch(
                setSpotifyAuthentication({
                  spotify_access_token: response.data?.loginWithGuestAccess.spotify_access_token,
                  spotify_expires_in: response.data?.loginWithGuestAccess.spotify_expires_in
                    ? calcExpiresIn(response.data.loginWithGuestAccess.spotify_expires_in)
                    : null,
                })
              );
              navigation.navigate("Main", {
                screen: "CoreTabs",
                params: { screen: "Home" },
              });
            }}
          >
            <TypographyBold style={{ marginLeft: 5, textDecorationLine: "underline" }}>
              Guest Access
            </TypographyBold>
          </Pressable>
        </View>
      </Animated.View>
    </Container>
  );
};

export default Onboarding;
