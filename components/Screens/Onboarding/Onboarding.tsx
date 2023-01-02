import { View, Text } from "react-native";
import React, { useState } from "react";
import Container from "../../Container/Container";
import Title from "../../Typography/Title";
import TypographyBold from "../../Typography/TypographyBold";
import Portal from "../../Visualizations/Portal";
import { keyColourReference } from "../../../utils/constants";

const Onboarding: React.FC = () => {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  return (
    <Container>
      <View className="my-10">
        <TypographyBold>Welcome To</TypographyBold>
        <Title style={{ fontSize: 30, textTransform: "uppercase" }}>
          remaster
        </Title>
      </View>
      <View className="w-3/6 h-2/6 border-2 border-black rounded-2xl overflow-hidden shadow-2xl" onLayout={(event) => {
        setWidth(event.nativeEvent.layout.width);
        setHeight(event.nativeEvent.layout.height);
      }}>
        {width && height ? <Portal width={width} height={height} keys={Object.keys(keyColourReference)} /> : null}
      </View>
    </Container>
  );
};

export default Onboarding;
