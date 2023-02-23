import { View, Pressable, TextInput } from "react-native";
import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParams } from "../../Navigators/AuthStackNavigator";
import Container from "../../Container/Container";
import TypographyBold from "../../Typography/TypographyBold";
import Typography from "../../Typography/Typography";
import BackHeader from "../../Header/BackHeader";
import AntDesign from "@expo/vector-icons/AntDesign";
import Title from "../../Typography/Title";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import LoadingIndicator from "../../Visualizations/LoadingIndicator";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackParams } from "../../Navigators/RootStackNavigator";
import { RegisterDocument } from "../../../generated/graphql";
import { useMutation } from "urql";
import { setAuthentication } from "../../../redux/slices/authSlice";
import { setAuthKeys } from "../../../utils/secureStore";
import { toErrorMap } from "../../../utils/toErrorMap";
import { useAppDispatch } from "../../../utils/hooks/reduxHooks";
import { calcExpiresIn } from "../../../utils/calc";

interface RegisterValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type RegisterProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParams, "Register">,
  NativeStackScreenProps<RootStackParams>
>;

const Register: React.FC<RegisterProps> = ({ navigation }) => {
  const [, register] = useMutation(RegisterDocument);
  const dispatch = useAppDispatch();

  return (
    <Container>
      <BackHeader />
      <View className="w-[90%] flex-1 my-10 justify-center">
        <TypographyBold>Welcome Aboard!</TypographyBold>
        <Title style={{ fontSize: 30, textTransform: "uppercase" }}>sign up</Title>
        <Formik
          initialValues={{
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={yup.object().shape({
            email: yup.string().email("Invalid Format").required("Required"),
            username: yup.string().min(5, "Min 5 Chars Required").required("Required"),
            password: yup.string().min(8, "Min 8 Chars Required").required("Required"),
            confirmPassword: yup
              .string()
              .oneOf([yup.ref("password"), null], "Entries Do Not Match"),
          })}
          onSubmit={async (
            values: RegisterValues,
            { setErrors }: FormikHelpers<RegisterValues>
          ) => {
            const request = {
              registerOptions: {
                username: values.username,
                email: values.email,
                password: values.password,
              },
            };
            const response = await register(request);
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.auth && response.data?.register.user) {
              await setAuthKeys({
                access_token: response.data.register.auth.access_token,
                refresh_token: response.data.register.auth.refresh_token,
                expires_in: response.data.register.auth.expires_in,
                user: response.data.register.user,
                spotify_access_token: response.data.register.spotify_auth?.spotify_access_token,
                spotify_expires_in: response.data.register.spotify_auth?.spotify_expires_in,
              });
              dispatch(
                setAuthentication({
                  isAuthenticated: true,
                  access_token: response.data.register.auth.access_token,
                  refresh_token: response.data.register.auth.refresh_token,
                  expires_in: calcExpiresIn(response.data.register.auth.expires_in),
                  user: response.data.register.user,
                  spotify_access_token: response.data.register.spotify_auth?.spotify_access_token,
                  spotify_expires_in: response.data.register.spotify_auth?.spotify_expires_in
                    ? calcExpiresIn(response.data.register.spotify_auth.spotify_expires_in)
                    : null,
                })
              );
              navigation.replace("VerifyEmail");
            }
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
            <View className="w-full my-10">
              <View className="flex-row items-center justify-between mb-2 px-1">
                <TypographyBold style={{ fontSize: 15 }}>Username</TypographyBold>
                {touched.username && errors.username && (
                  <Typography className="text-red-800">{errors.username}</Typography>
                )}
              </View>
              <View className="flex-row bg-stone-300 items-center border-2 border-black rounded-2xl p-3 mb-5">
                <AntDesign name="meh" size={25} />
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
                  autoCorrect={false}
                  allowFontScaling={false}
                />
              </View>
              <View className="flex-row items-center justify-between mb-2 px-1">
                <TypographyBold style={{ fontSize: 15 }}>Email</TypographyBold>
                {touched.email && errors.email && (
                  <Typography className="text-red-800">{errors.email}</Typography>
                )}
              </View>
              <View className="flex-row bg-stone-300 items-center border-2 border-black rounded-2xl p-3 mb-5">
                <AntDesign name="mail" size={25} />
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
                  keyboardType="email-address"
                  autoCorrect={false}
                  allowFontScaling={false}
                />
              </View>
              <View className="flex-row items-center justify-between mb-2 px-1">
                <TypographyBold style={{ fontSize: 15 }}>Password</TypographyBold>
                {touched.password && errors.password && (
                  <Typography className="text-red-800">{errors.password}</Typography>
                )}
              </View>
              <View className="flex-row bg-stone-300 items-center border-2 border-black rounded-2xl p-3 mb-5">
                <AntDesign name="key" size={25} />
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
                  autoCorrect={false}
                  allowFontScaling={false}
                />
              </View>
              <View className="flex-row items-center justify-between mb-2 px-1">
                <TypographyBold style={{ fontSize: 15 }}>Confirm Password</TypographyBold>
                {errors.confirmPassword && touched.confirmPassword && (
                  <Typography className="text-red-800">{errors.confirmPassword}</Typography>
                )}
              </View>
              <View className="flex-row bg-stone-300 items-center border-2 border-black rounded-2xl p-3 mb-12">
                <AntDesign name="key" size={25} />
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
                  autoCorrect={false}
                  allowFontScaling={false}
                />
              </View>
              <Pressable
                onPress={() => handleSubmit()}
                disabled={isSubmitting}
                className="flex-row justify-center items-center p-5 rounded-2xl bg-black border-2 border-black"
              >
                {isSubmitting ? (
                  <LoadingIndicator size={15} colour="#ffffff" />
                ) : (
                  <TypographyBold style={{ fontSize: 15, color: "#ffffff" }}>
                    Sign Up
                  </TypographyBold>
                )}
              </Pressable>
            </View>
          )}
        </Formik>
        <View className="w-full flex-row justify-center">
          <Typography>Already have an account?</Typography>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <TypographyBold style={{ marginLeft: 5, textDecorationLine: "underline" }}>
              Login
            </TypographyBold>
          </Pressable>
        </View>
      </View>
    </Container>
  );
};

export default Register;
