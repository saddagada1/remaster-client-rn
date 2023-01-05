import { View, Text } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../Navigators/AuthStackNavigator";
import Container from '../../Container/Container';

type LoginProps = NativeStackScreenProps<AuthStackParams, "Login">;

const Login: React.FC<LoginProps> = ({navigation}) => {
  return (
    <Container>
      <Text>Login</Text>
    </Container>
  )
}

export default Login