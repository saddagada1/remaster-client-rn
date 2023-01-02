import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Screens/Home/Home';
import Onboarding from '../Screens/Onboarding/Onboarding';

export type StackParams = {
    Onboarding: undefined
    Home: undefined
};

const Stack = createNativeStackNavigator<StackParams>();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Onboarding' component={Onboarding}/>
        <Stack.Screen name='Home' component={Home}/>
    </Stack.Navigator>
  )
}

export default Navigator