import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import AuthStackNavigator from './components/Navigators/AuthStackNavigator';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter: require('./assets/fonts/Inter-Medium.ttf'),
    InterBold: require('./assets/fonts/Inter-Bold.ttf'),
    Syne: require('./assets/fonts/Syne-Bold.ttf'),
    SyneBlack: require('./assets/fonts/Syne-ExtraBold.ttf')
  });
  
  return (
    fontsLoaded ?
    <NavigationContainer>
      <StatusBar style="auto" />
      <AuthStackNavigator/>
    </NavigationContainer>
    : null
  );
}


