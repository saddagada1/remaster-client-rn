import { View, Text } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../Navigators/AuthStackNavigator";
import Container from '../../Container/Container';

type RegisterProps = NativeStackScreenProps<AuthStackParams, "Register">;

const Register: React.FC<RegisterProps> = ({navigation}) => {
  return (
    <Container>
      <Text>Register</Text>
    </Container>
  )
}

export default Register