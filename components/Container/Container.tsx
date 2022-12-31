import { View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from "react";

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{paddingTop: insets.top}} className="w-full h-full bg-stone-400 p-4 items-center">{children}</View>
  );
};

export default Container;