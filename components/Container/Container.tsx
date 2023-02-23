import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  noPadding?: boolean;
  bottomInset?: boolean;
}

const Container: React.FC<ContainerProps> = ({ children, noPadding, bottomInset }) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ paddingTop: insets.top, paddingBottom: bottomInset ? insets.bottom : undefined }}
      className={
        noPadding
          ? "w-full h-full bg-stone-400 items-center"
          : "w-full h-full bg-stone-400 p-4 items-center"
      }
    >
      {children}
    </View>
  );
};

export default Container;
