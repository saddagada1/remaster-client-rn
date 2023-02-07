import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../Screens/MainStack/Home";

export type MainStackParams = {
  Home: undefined;
};

const MainStack = createNativeStackNavigator<MainStackParams>();

const MainStackNavigator: React.FC = () => {
  return (
    <MainStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <MainStack.Screen name="Home" component={Home} />
    </MainStack.Navigator>
  );
};

export default MainStackNavigator;
