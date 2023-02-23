import { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateComp, CreateInit } from "../Screens/MainStack/Create";
import Editor from "../Screens/MainStack/Editor";
import CoreTabsNavigator, { CoreTabsParams } from "./CoreTabsNavigator";

export type MainStackParams = {
  CoreTabs: NavigatorScreenParams<CoreTabsParams>;
  CreateInit: undefined;
  CreateComp: { name: string; playbackURL: string; artist: string };
  Editor: undefined;
};

const MainStack = createNativeStackNavigator<MainStackParams>();

const MainStackNavigator: React.FC = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="CoreTabs">
      <MainStack.Screen name="CoreTabs" component={CoreTabsNavigator} />
      <MainStack.Screen name="CreateInit" component={CreateInit} />
      <MainStack.Screen name="CreateComp" component={CreateComp} />
      <MainStack.Screen name="Editor" component={Editor} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
