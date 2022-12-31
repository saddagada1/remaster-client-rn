import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../Screens/Home/Home';

export type StackParams = {
    Home: undefined
};

const Stack = createNativeStackNavigator<StackParams>();

const Navigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name='Home' component={Home}/>
    </Stack.Navigator>
  )
}

export default Navigator