import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/Home/Home";
import Onboarding from "../Screens/AuthStack/Onboarding";
import Register from "../Screens/AuthStack/Register";
import Login from "../Screens/AuthStack/Login";

export type AuthStackParams = {
  Onboarding: undefined;
  Register: undefined;
  Login: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParams>();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Onboarding">
      <AuthStack.Screen name="Onboarding" component={Onboarding} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="Login" component={Login} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
