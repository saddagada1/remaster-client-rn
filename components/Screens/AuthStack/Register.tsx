import { View, Pressable, TextInput } from "react-native";
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
import LoadingIndicator from "../../Visualizations/LoadingIndicator";

type RegisterProps = NativeStackScreenProps<AuthStackParams, "Register">;

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  return (
    <Container>
      <BackHeader />
      <View className="w-[90%] flex-1 my-10 justify-center">
        <TypographyBold>Welcome Aboard!</TypographyBold>
        <Title style={{ fontSize: 30, textTransform: "uppercase" }}>
          sign up
        </Title>
        <Formik
          initialValues={{
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={yup.object().shape({
            email: yup.string().email("Invalid Format").required("Required"),
            username: yup
              .string()
              .min(5, "Min 5 Chars Required")
              .required("Required"),
            password: yup
              .string()
              .min(8, "Min 8 Chars Required")
              .required("Required"),
            confirmPassword: yup
              .string()
              .oneOf([yup.ref("password"), null], "Entries Do Not Match"),
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
            touched,
            errors,
            setFieldTouched,
            isSubmitting,
          }) => (
            <View className="w-full mt-6 mb-10">
              <View className="flex-row items-center justify-between mb-2 px-1">
                <TypographyBold style={{ fontSize: 15 }}>
                  Username
                </TypographyBold>
                {touched.username && errors.username && (
                  <Typography className="text-red-800">
                    {errors.username}
                  </Typography>
                )}
              </View>
              <View className="flex-row items-center border-2 border-black rounded-2xl p-3 mb-5">
                <Icon name="meh" size={25} />
                <TextInput
                  className="ml-3 flex-1"
                  onChangeText={handleChange("username")}
                  onBlur={() => {
                    handleBlur("username");
                    setFieldTouched("username");
                  }}
                  value={values.username}
                  style={{ fontFamily: "Inter", fontSize: 15 }}
                  placeholder="e.g. xs3-_-crafty"
                />
              </View>
              <View className="flex-row items-center justify-between mb-2 px-1">
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
              <View className="flex-row items-center justify-between mb-2 px-1">
                <TypographyBold style={{ fontSize: 15 }}>
                  Password
                </TypographyBold>
                {touched.password && errors.password && (
                  <Typography className="text-red-800">
                    {errors.password}
                  </Typography>
                )}
              </View>
              <View className="flex-row items-center border-2 border-black rounded-2xl p-3 mb-5">
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
              <View className="flex-row items-center justify-between mb-2 px-1">
                <TypographyBold style={{ fontSize: 15 }}>
                  Confirm Password
                </TypographyBold>
                {errors.confirmPassword && (
                  <Typography className="text-red-800">
                    {errors.confirmPassword}
                  </Typography>
                )}
              </View>
              <View className="flex-row items-center border-2 border-black rounded-2xl p-3 mb-12">
                <Icon name="key" size={25} />
                <TextInput
                  className="ml-3 flex-1"
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={() => {
                    handleBlur("confirmPassword");
                    setFieldTouched("confirmPassword");
                  }}
                  value={values.confirmPassword}
                  style={{ fontFamily: "Inter", fontSize: 15 }}
                  placeholder="########"
                  secureTextEntry={true}
                />
              </View>
              <Pressable
                onPress={() => handleSubmit()}
                className="flex-row justify-center items-center p-5 rounded-2xl bg-black border-2 border-black"
              >
                {isSubmitting ? (
                  <LoadingIndicator />
                ) : (
                  <TypographyBold style={{ fontSize: 15, color: "#fff" }}>
                    Sign Up
                  </TypographyBold>
                )}
              </Pressable>
            </View>
          )}
        </Formik>
        <View className="w-full flex-row justify-center">
          <Typography>Already have an account?</Typography>
          <Pressable onPress={() => navigation.replace("Login")}>
            <TypographyBold
              style={{ marginLeft: 5, textDecorationLine: "underline" }}
            >
              Login
            </TypographyBold>
          </Pressable>
        </View>
      </View>
    </Container>
  );
};

export default Register;
