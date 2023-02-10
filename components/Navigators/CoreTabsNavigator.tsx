import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Create from "../Screens/MainStack/CoreTabs/Create";
import Explore from "../Screens/MainStack/CoreTabs/Explore";
import Home from "../Screens/MainStack/CoreTabs/Home";
import Library from "../Screens/MainStack/CoreTabs/Library";
import Profile from "../Screens/MainStack/CoreTabs/Profile";
import Tabbar from "../Tabbar/Tabbar";

export type CoreTabsParams = {
  Home: undefined;
  Explore: undefined;
  Create: undefined;
  Library: undefined;
  Profile: undefined;
};

const CoreTabs = createBottomTabNavigator<CoreTabsParams>();

const CoreTabsNavigator: React.FC = () => {
  return (
    <CoreTabs.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <Tabbar {...props} />}
      initialRouteName="Home"
    >
      <CoreTabs.Screen name="Home" component={Home} />
      <CoreTabs.Screen name="Explore" component={Explore} />
      <CoreTabs.Screen name="Create" component={Create} />
      <CoreTabs.Screen name="Library" component={Library} />
      <CoreTabs.Screen name="Profile" component={Profile} />
    </CoreTabs.Navigator>
  );
};

export default CoreTabsNavigator;
