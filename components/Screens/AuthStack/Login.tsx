import {
  View,
  Pressable,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../Navigators/AuthStackNavigator";
import Container from "../../Container/Container";
import TypographyBold from "../../Typography/TypographyBold";
import Typography from "../../Typography/Typography";
import BackHeader from "../../Header/BackHeader";
import Icon from "react-native-vector-icons/AntDesign";
import Title from "../../Typography/Title";
import { Formik } from "formik";
import * as yup from "yup";

type LoginProps = NativeStackScreenProps<AuthStackParams, "Login">;

const Login: React.FC<LoginProps> = ({ navigation }) => {
  return (
    <Container>
      <BackHeader />
      <View className="w-[90%] flex-1 my-10 justify-center">
        <TypographyBold>Welcome Back!</TypographyBold>
        <Title style={{ fontSize: 30, textTransform: "uppercase" }}>
          login
        </Title>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={yup.object().shape({
            email: yup.string().email("Invalid Format").required("Required"),
          })}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldTouched,
            isSubmitting,
          }) => (
            <View className="w-full my-10">
              <View className="flex-row justify-between items-center mb-2 px-1">
                <TypographyBold style={{ fontSize: 15 }}>Email</TypographyBold>
                {touched.email && errors.email && (
                  <Typography className="text-red-800">
                    {errors.email}
                  </Typography>
                )}
              </View>
              <View className="flex-row items-center border-2 border-black rounded-2xl p-3 mb-5">
                <Icon name="mail" size={25} />
                <TextInput
                  className="ml-3 flex-1"
                  onChangeText={handleChange("email")}
                  onBlur={() => {
                    handleBlur("email");
                    setFieldTouched("email");
                  }}
                  value={values.email}
                  style={{ fontFamily: "Inter", fontSize: 15 }}
                  placeholder="remaster@acme.com"
                />
              </View>
              <View className="flex-row justify-between items-center mb-2 px-1">
                <TypographyBold style={{ fontSize: 15 }}>
                  Password
                </TypographyBold>
                {touched.password && errors.password && (
                  <Typography className="text-red-800">
                    {errors.password}
                  </Typography>
                )}
              </View>
              <View className="flex-row items-center border-2 border-black rounded-2xl p-3 mb-3">
                <Icon name="key" size={25} />
                <TextInput
                  className="ml-3 flex-1"
                  onChangeText={handleChange("password")}
                  onBlur={() => {
                    handleBlur("password");
                    setFieldTouched("password");
                  }}
                  value={values.password}
                  style={{ fontFamily: "Inter", fontSize: 15 }}
                  placeholder="########"
                  secureTextEntry={true}
                />
              </View>
              <Pressable
                className="w-full items-end mb-10"
                onPress={() => console.log("forgot")}
              >
                <TypographyBold style={{ textDecorationLine: "underline" }}>
                  Forgot Password?
                </TypographyBold>
              </Pressable>
              <Pressable
                onPress={() => handleSubmit()}
                className="flex-row justify-center items-center p-5 rounded-2xl bg-black border-2 border-black"
              >
                {isSubmitting ? (
                  <ActivityIndicator className="mx-2" color="#fff" />
                ) : (
                  <TypographyBold style={{ fontSize: 15, color: "#fff" }}>
                    Login
                  </TypographyBold>
                )}
              </Pressable>
            </View>
          )}
        </Formik>
        <View className="w-full flex-row items-center">
          <View
            className="flex-1 bg-stone-500"
            style={{
              height: StyleSheet.hairlineWidth,
            }}
          />
          <Typography className="mx-2">Or Login With</Typography>
          <View
            className="flex-1 bg-stone-500"
            style={{
              height: StyleSheet.hairlineWidth,
            }}
          />
        </View>
        <Pressable className="flex-row justify-center items-center my-10 p-5 rounded-2xl bg-stone-300 border-2 border-black">
          <Icon name="google" size={20} />
          <TypographyBold style={{ fontSize: 15, marginLeft: 15 }}>
            Login with Google
          </TypographyBold>
        </Pressable>
        <View className="w-full flex-row justify-center">
          <Typography>Don't have an account?</Typography>
          <Pressable onPress={() => navigation.replace("Register")}>
            <TypographyBold
              style={{ marginLeft: 5, textDecorationLine: "underline" }}
            >
              Sign Up
            </TypographyBold>
          </Pressable>
        </View>
      </View>
    </Container>
  );
};

export default Login;
