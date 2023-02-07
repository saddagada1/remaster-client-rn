import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "urql";
import { useMemo } from "react";
import { createUrqlClient } from "./utils/createUrqlClient";
import RootStackNavigator, {
  navigationRef,
} from "./components/Navigators/RootStackNavigator";
import { useAppSelector } from "./utils/hooks/reduxHooks";

const App: React.FC = () => {
  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated);
  const client = useMemo(() => {
    return createUrqlClient(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <Provider value={client}>
      <NavigationContainer ref={navigationRef}>
        <StatusBar style="auto" />
        <RootStackNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
