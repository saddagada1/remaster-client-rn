import { View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import Container from "../../Container/Container";
import Title from "../../Typography/Title";
import TypographyBold from "../../Typography/TypographyBold";
import Icon from "react-native-vector-icons/FontAwesome";
import Portal from "../../Visualizations/Portal";
import { keyColourReference } from "../../../utils/constants";
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
import { useIsFocused } from "@react-navigation/native";

type OnboardingProps = NativeStackScreenProps<AuthStackParams, "Onboarding">;

const Onboarding: React.FC<OnboardingProps> = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [portalWidth, setPortalWidth] = useState(0);
  const [portalHeight, setPortalHeight] = useState(0);
  const uiRevealTranslateY = useSharedValue(50);
  const uiRevealOpacity = useSharedValue(0);
  const portalRevealTranslateX = useSharedValue(0);
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
      transform: [
        { translateX: portalRevealTranslateX.value * -1 },
        { scaleY: portalRevealScaleY.value },
      ],
    };
  });

  const portalRevealRightAnimStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: portalRevealTranslateX.value },
        { scaleY: portalRevealScaleY.value },
      ],
    };
  });

  const portalRevealAnimStyles = useAnimatedStyle(() => {
    return {
      opacity: portalRevealOpacity.value,
    };
  });

  useEffect(() => {
    uiRevealTranslateY.value = withDelay(1000, withSpring(0));
    uiRevealOpacity.value = withDelay(1000, withSpring(1));
    portalRevealTranslateX.value = withDelay(
      2000,
      withTiming(100, { duration: 1000 }, () => {
        portalRevealScaleY.value = withTiming(
          0,
          {
            duration: 1000,
            easing: Easing.bezier(1, 0.1, 0.25, 1),
          },
          () => {
            portalRevealOpacity.value = withTiming(1, { duration: 1000 });
          }
        );
      })
    );
  }, []);

  return (
    <Container>
      <Animated.View className="my-10" style={uiRevealTopAnimStyles}>
        <TypographyBold>Welcome To</TypographyBold>
        <Title style={{ fontSize: 30, textTransform: "uppercase" }}>
          remaster
        </Title>
      </Animated.View>
      <View className="w-full flex-1 flex-row justify-center mb-2">
        <View
          className="w-[60%] h-full absolute border-2 border-black rounded-2xl overflow-hidden"
          onLayout={(event) => {
            setPortalWidth(event.nativeEvent.layout.width);
            setPortalHeight(event.nativeEvent.layout.height);
          }}
        >
          <Animated.View
            className="w-full h-full"
            style={portalRevealAnimStyles}
          >
            {portalWidth && portalHeight ? (
              <Portal
                width={portalWidth}
                height={portalHeight}
                keys={Object.keys(keyColourReference)}
                animate={isFocused}
              />
            ) : null}
          </Animated.View>
        </View>
        <Animated.View
          className="w-[30%] h-full bg-stone-400"
          style={portalRevealLeftAnimStyles}
        />
        <Animated.View
          className="w-[30%] h-full bg-stone-400"
          style={portalRevealRightAnimStyles}
        />
      </View>
      <Animated.View
        className="w-full items-center my-10"
        style={uiRevealBottomAnimStyles}
      >
        <Pressable
          className="w-[90%] flex-row justify-center items-center p-5 mb-5 rounded-2xl bg-black border-2 border-black"
          onPress={() => navigation.push("Register")}
        >
          <Icon name="envelope" size={20} color="#fff" />
          <TypographyBold
            style={{ fontSize: 15, color: "#fff", marginLeft: 15 }}
          >
            Sign Up with Email
          </TypographyBold>
        </Pressable>
        <Pressable className="w-[90%] flex-row justify-center items-center p-5 mb-5 rounded-2xl bg-stone-300 border-2 border-black">
          <Icon name="google" size={20} />
          <TypographyBold style={{ fontSize: 15, marginLeft: 15 }}>
            Sign Up with Google
          </TypographyBold>
        </Pressable>
        <View className="flex-row mb-3">
          <Typography>Already have an account?</Typography>
          <Pressable onPress={() => navigation.push("Login")}>
            <TypographyBold
              style={{ marginLeft: 5, textDecorationLine: "underline" }}
            >
              Login
            </TypographyBold>
          </Pressable>
        </View>
        <View className="flex-row">
          <Typography>Explore with</Typography>
          <Pressable onPress={() => console.log("guest")}>
            <TypographyBold
              style={{ marginLeft: 5, textDecorationLine: "underline" }}
            >
              Guest Access
            </TypographyBold>
          </Pressable>
        </View>
      </Animated.View>
    </Container>
  );
};

export default Onboarding;
