import { View, Pressable } from "react-native";
import React, { useState } from "react";
import Container from "../../Container/Container";
import Title from "../../Typography/Title";
import TypographyBold from "../../Typography/TypographyBold";
import Icon from "react-native-vector-icons/FontAwesome";
import Portal from "../../Visualizations/Portal";
import { keyColourReference } from "../../../utils/constants";
import Typography from "../../Typography/Typography";

const Onboarding: React.FC = () => {
  const [portalWidth, setPortalWidth] = useState(0);
  const [portalHeight, setPortalHeight] = useState(0);

  return (
    <Container>
      <View className="my-10">
        <TypographyBold>Welcome To</TypographyBold>
        <Title style={{ fontSize: 30, textTransform: "uppercase" }}>
          remaster
        </Title>
      </View>
      <View className="w-full flex-1 items-center mb-2">
        <View
          className="w-[60%] h-full border-2 border-black rounded-2xl overflow-hidden shadow"
          onLayout={(event) => {
            setPortalWidth(event.nativeEvent.layout.width);
            setPortalHeight(event.nativeEvent.layout.height);
          }}
        >
          {portalWidth && portalHeight ? (
            <Portal
              width={portalWidth}
              height={portalHeight}
              keys={Object.keys(keyColourReference)}
            />
          ) : null}
        </View>
      </View>
      <View className="w-full items-center my-10">
        <Pressable className="w-[90%] flex-row justify-center items-center p-5 mb-5 rounded-2xl bg-black border-2 border-black">
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
          <Pressable onPress={() => console.log("sign in")}>
            <TypographyBold
              style={{ marginLeft: 5, textDecorationLine: "underline" }}
            >
              Sign In
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
      </View>
    </Container>
  );
};

export default Onboarding;
