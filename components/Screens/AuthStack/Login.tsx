import { View, Pressable, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
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
import { useMutation } from "urql";
import { LoginDocument, LoginWithGoogleDocument } from "../../../generated/graphql";
import { useAppDispatch } from "../../../utils/hooks/reduxHooks";
import { toErrorMap } from "../../../utils/toErrorMap";
import { setAuthKeys } from "../../../utils/secureStore";
import { setAuthentication } from "../../../redux/slices/authSlice";
import { calcExpiresIn } from "../../../utils/calc";
import * as Google from "expo-auth-session/providers/google";
import { GOOGLE_OAUTH_CLIENT_ID } from "@env";
import { toBase64String } from "../../../utils/toBase64String";

interface LoginValues {
  email: string;
  password: string;
}

type LoginProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParams, "Login">,
  NativeStackScreenProps<RootStackParams>
>;

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const [, login] = useMutation(LoginDocument);
  const [{ fetching }, loginWithGoogle] = useMutation(LoginWithGoogleDocument);
  const [loginWithGoogleError, setLoginWithGoogleError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: GOOGLE_OAUTH_CLIENT_ID,
    selectAccount: true,
    responseType: "id_token",
  });

  useEffect(() => {
    const loginUserWithGoogle = async (id_token: string) => {
      const base64IdToken = toBase64String(id_token);
      const response = await loginWithGoogle(
        {},
        {
          fetchOptions: {
            headers: {
              Authorization: `Bearer ${base64IdToken}`,
            },
          },
        }
      );
      if (response.data?.loginWithGoogle.errors) {
        setLoginWithGoogleError(response.data.loginWithGoogle.errors[0].message);
      } else if (response.data?.loginWithGoogle.auth && response.data?.loginWithGoogle.user) {
        await setAuthKeys({
          access_token: response.data.loginWithGoogle.auth.access_token,
          refresh_token: response.data.loginWithGoogle.auth.refresh_token,
          expires_in: response.data.loginWithGoogle.auth.expires_in,
          user: response.data.loginWithGoogle.user,
          spotify_access_token: response.data.loginWithGoogle.spotify_auth?.spotify_access_token,
          spotify_expires_in: response.data.loginWithGoogle.spotify_auth?.spotify_expires_in,
        });
        dispatch(
          setAuthentication({
            isAuthenticated: true,
            access_token: response.data.loginWithGoogle.auth.access_token,
            refresh_token: response.data.loginWithGoogle.auth.refresh_token,
            expires_in: calcExpiresIn(response.data.loginWithGoogle.auth.expires_in),
            user: response.data.loginWithGoogle.user,
            spotify_access_token: response.data.loginWithGoogle.spotify_auth?.spotify_access_token,
            spotify_expires_in: response.data.loginWithGoogle.spotify_auth?.spotify_expires_in
              ? calcExpiresIn(response.data.loginWithGoogle.spotify_auth.spotify_expires_in)
              : null,
          })
        );
        navigation.replace("Main", {
          screen: "CoreTabs",
          params: { screen: "Home" },
        });
      }
    };

    if (response?.type === "success") {
      const id_token = response.params.id_token;
      loginUserWithGoogle(id_token);
    }
  }, [response]);

  return (
    <Container>
      <BackHeader />
      <View className="w-[90%] flex-1 my-10 justify-center">
        <TypographyBold>Welcome Back!</TypographyBold>
        <Title style={{ fontSize: 30, textTransform: "uppercase" }}>login</Title>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={yup.object().shape({
            email: yup.string().email("Invalid Format").required("Required"),
          })}
          onSubmit={async (values: LoginValues, { setErrors }: FormikHelpers<LoginValues>) => {
            const response = await login({ loginOptions: values });
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.auth && response.data?.login.user) {
              await setAuthKeys({
                access_token: response.data.login.auth.access_token,
                refresh_token: response.data.login.auth.refresh_token,
                expires_in: response.data.login.auth.expires_in,
                user: response.data.login.user,
                spotify_access_token: response.data.login.spotify_auth?.spotify_access_token,
                spotify_expires_in: response.data.login.spotify_auth?.spotify_expires_in,
              });
              dispatch(
                setAuthentication({
                  isAuthenticated: true,
                  access_token: response.data.login.auth.access_token,
                  refresh_token: response.data.login.auth.refresh_token,
                  expires_in: calcExpiresIn(response.data.login.auth.expires_in),
                  user: response.data.login.user,
                  spotify_access_token: response.data.login.spotify_auth?.spotify_access_token,
                  spotify_expires_in: response.data.login.spotify_auth?.spotify_expires_in
                    ? calcExpiresIn(response.data.login.spotify_auth.spotify_expires_in)
                    : null,
                })
              );
              navigation.replace("Main", {
                screen: "CoreTabs",
                params: { screen: "Home" },
              });
            }
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
              <View className="flex-row justify-between items-center mb-2 px-1">
                <TypographyBold style={{ fontSize: 15 }}>Password</TypographyBold>
                {touched.password && errors.password && (
                  <Typography className="text-red-800">{errors.password}</Typography>
                )}
              </View>
              <View className="flex-row bg-stone-300 items-center border-2 border-black rounded-2xl p-3 mb-3">
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
              <Pressable
                className="w-full items-end mb-10"
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <TypographyBold style={{ textDecorationLine: "underline" }}>
                  Forgot Password?
                </TypographyBold>
              </Pressable>
              <Pressable
                onPress={() => handleSubmit()}
                disabled={isSubmitting}
                className="flex-row justify-center items-center p-5 rounded-2xl bg-black border-2 border-black"
              >
                {isSubmitting ? (
                  <LoadingIndicator size={15} colour="#ffffff" />
                ) : (
                  <TypographyBold style={{ fontSize: 15, color: "#ffffff" }}>Login</TypographyBold>
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
          <Typography className={loginWithGoogleError ? "text-red-800 mx-2" : "mx-2"}>
            {loginWithGoogleError ? loginWithGoogleError : "Or Login With"}
          </Typography>
          <View
            className="flex-1 bg-stone-500"
            style={{
              height: StyleSheet.hairlineWidth,
            }}
          />
        </View>
        <Pressable
          className="flex-row justify-center items-center my-10 p-5 rounded-2xl bg-stone-300 border-2 border-black"
          disabled={!request}
          onPress={() => {
            promptAsync();
            setLoginWithGoogleError(null);
          }}
        >
          {fetching ? (
            <LoadingIndicator size={15} colour="#000000" />
          ) : (
            <>
              <AntDesign name="google" size={20} />
              <TypographyBold style={{ fontSize: 15, marginLeft: 15 }}>
                Login with Google
              </TypographyBold>
            </>
          )}
        </Pressable>
        <View className="w-full flex-row justify-center">
          <Typography>Don't have an account?</Typography>
          <Pressable onPress={() => navigation.navigate("Register")}>
            <TypographyBold style={{ marginLeft: 5, textDecorationLine: "underline" }}>
              Sign Up
            </TypographyBold>
          </Pressable>
        </View>
      </View>
    </Container>
  );
};

export default Login;
