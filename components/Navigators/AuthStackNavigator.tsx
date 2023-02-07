import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../Screens/AuthStack/Onboarding";
import Register from "../Screens/AuthStack/Register";
import Login from "../Screens/AuthStack/Login";
import ForgotPassword from "../Screens/AuthStack/ForgotPassword";
import ChangeForgotPassword from "../Screens/AuthStack/ChangeForgotPassword";
import RegisterWithGoogle from "../Screens/AuthStack/RegisterWithGoogle";
import VerifyEmail from "../Screens/AuthStack/VerifyEmail";

export type AuthStackParams = {
  Onboarding: undefined;
  Register: undefined;
  VerifyEmail: undefined;
  RegisterWithGoogle: { access_token: string };
  Login: undefined;
  ForgotPassword: undefined;
  ChangeForgotPassword: { email: string };
};

const AuthStack = createNativeStackNavigator<AuthStackParams>();

const AuthStackNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Onboarding"
    >
      <AuthStack.Screen name="Onboarding" component={Onboarding} />
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="VerifyEmail" component={VerifyEmail} />
      <AuthStack.Screen
        name="RegisterWithGoogle"
        component={RegisterWithGoogle}
      />
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <AuthStack.Screen
        name="ChangeForgotPassword"
        component={ChangeForgotPassword}
      />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
