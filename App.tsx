import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider as UrqlProvider } from "urql";
import { useMemo } from "react";
import { createUrqlClient } from "./utils/createUrqlClient";
import RootStackNavigator, { navigationRef } from "./components/Navigators/RootStackNavigator";
import { useAppSelector } from "./utils/hooks/reduxHooks";
import { QueryClient, QueryClientProvider as SpotifyProvider } from "react-query";

const spotifyClient = new QueryClient();

const App: React.FC = () => {
  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated);
  const urqlClient = useMemo(() => {
    spotifyClient.clear();
    return createUrqlClient(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <UrqlProvider value={urqlClient}>
      <SpotifyProvider client={spotifyClient}>
        <NavigationContainer ref={navigationRef}>
          <StatusBar style="auto" />
          <RootStackNavigator />
        </NavigationContainer>
      </SpotifyProvider>
    </UrqlProvider>
  );
};

export default App;
