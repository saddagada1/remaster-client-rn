import { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CoreTabsNavigator, { CoreTabsParams } from "./CoreTabsNavigator";

export type MainStackParams = {
  CoreTabs: NavigatorScreenParams<CoreTabsParams>;
};

const MainStack = createNativeStackNavigator<MainStackParams>();

const MainStackNavigator: React.FC = () => {
  return (
    <MainStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="CoreTabs"
    >
      <MainStack.Screen name="CoreTabs" component={CoreTabsNavigator} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
