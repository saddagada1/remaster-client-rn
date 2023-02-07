import { NavigatorScreenParams, StackActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStackNavigator, { AuthStackParams } from "./AuthStackNavigator";
import MainStackNavigator, { MainStackParams } from "./MainStackNavigator";
import { createNavigationContainerRef } from "@react-navigation/native";
import Loading from "../Screens/Loading";

export type RootStackParams = {
  Loading: undefined;
  Auth: NavigatorScreenParams<AuthStackParams>;
  Main: NavigatorScreenParams<MainStackParams>;
};

const RootStack = createNativeStackNavigator<RootStackParams>();

const RootStackNavigator: React.FC = () => {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Loading"
    >
      <RootStack.Screen name="Loading" component={Loading} />
      <RootStack.Screen name="Main" component={MainStackNavigator} />
      <RootStack.Screen name="Auth" component={AuthStackNavigator} />
    </RootStack.Navigator>
  );
};

export const navigationRef = createNavigationContainerRef<RootStackParams>();

export const MainNavigator = (
  name: "Main",
  params: NavigatorScreenParams<MainStackParams>,
  method: string
) => {
  if (navigationRef.isReady()) {
    if (method === "navigate") {
      navigationRef.navigate(name, params);
    } else if (method === "push") {
      navigationRef.dispatch(StackActions.push(name, params));
    } else if (method === "replace") {
      navigationRef.dispatch(StackActions.replace(name, params));
    }
  }
};

export const AuthNavigator = (
  name: "Auth",
  params: NavigatorScreenParams<AuthStackParams>,
  method: string
) => {
  if (navigationRef.isReady()) {
    if (method === "navigate") {
      navigationRef.navigate(name, params);
    } else if (method === "push") {
      navigationRef.dispatch(StackActions.push(name, params));
    } else if (method === "replace") {
      navigationRef.dispatch(StackActions.replace(name, params));
    }
  }
};

export default RootStackNavigator;
