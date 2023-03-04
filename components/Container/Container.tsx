import { StyleProp, View, ViewProps, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";

interface ContainerProps extends ViewProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Container: React.FC<ContainerProps> = ({ children, style, ...ViewProps }) => {
  const insets = useSafeAreaInsets();
  return (
    <View {...ViewProps} style={[{ paddingTop: insets.top }, style]}>
      {children}
    </View>
  );
};

export default Container;
