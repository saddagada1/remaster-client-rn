import { LayoutChangeEvent, Pressable, View } from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Animated, { useAnimatedStyle, useDerivedValue, withSpring } from "react-native-reanimated";

const tabIconIndex: { [key: string]: "home" | "earth" | "isv" | "meh" } = {
  Home: "home",
  Explore: "earth",
  Library: "isv",
  Profile: "meh",
};

const Tabbar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const [width, setWidth] = useState(0);
  const [offsets, setOffsets] = useState<{ index: number; x: number }[]>([]);
  const tabBarPadding = 12;
  const tabLinkMargin = 4;

  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    if (offsets.length >= state.routes.length) {
      return;
    }
    setOffsets([...offsets, { index, x: event.nativeEvent.layout.x }]);
  };

  const xOffset = useDerivedValue(() => {
    if (offsets.length !== state.routes.length) {
      return tabBarPadding + tabLinkMargin;
    }

    return offsets.find(({ index }) => index === state.index)!.x - tabLinkMargin;
  }, [state.index, offsets]);

  const selectedTabAnimStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(xOffset.value, { damping: 20 }) }],
    };
  });

  return (
    <View
      style={{
        padding: tabBarPadding,
      }}
      onLayout={(e) => setWidth(e.nativeEvent.layout.width / state.routes.length - tabLinkMargin)}
      className="mx-4 bg-black rounded-2xl absolute bottom-10 flex-row items-center shadow overflow-hidden"
    >
      <Animated.View
        style={[selectedTabAnimStyles, { width: width }]}
        className="bg-neutral-800 rounded-lg absolute h-full"
      />
      {state.routes.map((route, index) => (
        <Pressable
          key={route.key}
          accessibilityRole="button"
          accessibilityState={index === state.index ? { selected: true } : {}}
          accessibilityLabel={descriptors[route.key].options.tabBarAccessibilityLabel}
          onLayout={(e) => handleLayout(e, index)}
          onPress={() => navigation.navigate(route.name)}
          style={{ marginHorizontal: tabLinkMargin }}
          className="justify-center items-center flex-1 py-2"
        >
          <AntDesign name={tabIconIndex[route.name]} size={25} color="#ffffff" />
        </Pressable>
      ))}
    </View>
  );
};

export default Tabbar;
