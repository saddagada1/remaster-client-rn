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
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import LoadingIndicator from "../../Visualizations/LoadingIndicator";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackParams } from "../../Navigators/RootStackNavigator";
import { useMutation } from "urql";
import { RegisterWithGoogleDocument } from "../../../generated/graphql";
import { setAuthentication } from "../../../redux/slices/authSlice";
import { calcExpiresIn } from "../../../utils/calcExpiresIn";
import { useAppDispatch } from "../../../utils/hooks/reduxHooks";
import { setAuthKeys } from "../../../utils/secureStore";
import { toErrorMap } from "../../../utils/toErrorMap";

interface RegisterWithGoogleValues {
  access_token: string;
  username: string;
}

type RegisterWithGoogleProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParams, "RegisterWithGoogle">,
  NativeStackScreenProps<RootStackParams>
>;

const RegisterWithGoogle: React.FC<RegisterWithGoogleProps> = ({
  navigation,
  route,
}) => {
  const { access_token } = route.params;
  const [, registerWithGoogle] = useMutation(RegisterWithGoogleDocument);
  const dispatch = useAppDispatch();

  return (
    <Container>
      <BackHeader />
      <View className="w-[90%] flex-1 my-10 justify-center">
        <TypographyBold>Almost There!</TypographyBold>
        <Title style={{ fontSize: 30, textTransform: "uppercase" }}>
          sign up
        </Title>
        <Formik
          initialValues={{ access_token: access_token, username: "" }}
          validationSchema={yup.object().shape({
            username: yup
              .string()
              .min(5, "Min 5 Chars Required")
              .required("Required"),
          })}
          onSubmit={async (
            values: RegisterWithGoogleValues,
            { setErrors }: FormikHelpers<RegisterWithGoogleValues>
          ) => {
            const response = await registerWithGoogle({
              registerWithGoogleOptions: values,
            });
            if (response.data?.registerWithGoogle.errors) {
              setErrors(toErrorMap(response.data.registerWithGoogle.errors));
            } else if (
              response.data?.registerWithGoogle.auth &&
              response.data.registerWithGoogle.user
            ) {
              await setAuthKeys({
                access_token:
                  response.data.registerWithGoogle.auth.access_token,
                refresh_token:
                  response.data.registerWithGoogle.auth.refresh_token,
                expires_in: response.data.registerWithGoogle.auth.expires_in,
                user: response.data.registerWithGoogle.user,
              });
              dispatch(
                setAuthentication({
                  isAuthenticated: true,
                  access_token:
                    response.data.registerWithGoogle.auth.access_token,
                  refresh_token:
                    response.data.registerWithGoogle.auth.refresh_token,
                  expires_in: calcExpiresIn(
                    response.data.registerWithGoogle.auth.expires_in
                  ),
                  user: response.data.registerWithGoogle.user,
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
              <View className="flex-row items-center border-2 border-black rounded-2xl p-3 mb-12">
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
      </View>
    </Container>
  );
};

export default RegisterWithGoogle;
