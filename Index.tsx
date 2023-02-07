import { registerRootComponent } from "expo";
import { useFonts } from "expo-font";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";

const Index: React.FC = () => {
  const [fontsLoaded] = useFonts({
    Inter: require("./assets/fonts/Inter-Medium.ttf"),
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    Syne: require("./assets/fonts/Syne-Bold.ttf"),
    SyneBlack: require("./assets/fonts/Syne-ExtraBold.ttf"),
  });

  return fontsLoaded ? (
    <Provider store={store}>
      <App />
    </Provider>
  ) : null;
};

registerRootComponent(Index);
