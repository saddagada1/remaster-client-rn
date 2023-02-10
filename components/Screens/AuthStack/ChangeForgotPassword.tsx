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
import { ChangeForgotPasswordDocument } from "../../../generated/graphql";
import { useMutation } from "urql";
import { setAuthentication } from "../../../redux/slices/authSlice";
import { setAuthKeys } from "../../../utils/secureStore";
import { toErrorMap } from "../../../utils/toErrorMap";
import { useAppDispatch } from "../../../utils/hooks/reduxHooks";
import { calcExpiresIn } from "../../../utils/calcExpiresIn";

interface ChangeForgotPasswordValues {
  email: string;
  token: string;
  password: string;
  confirmPassword: string;
}

type ChangeForgotPasswordProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParams, "ChangeForgotPassword">,
  NativeStackScreenProps<RootStackParams>
>;

const ChangeForgotPassword: React.FC<ChangeForgotPasswordProps> = ({
  navigation,
  route,
}) => {
  const { email } = route.params;
  const [, changeForgotPassword] = useMutation(ChangeForgotPasswordDocument);
  const dispatch = useAppDispatch();

  return (
    <Container>
      <BackHeader />
      <View className="w-[90%] flex-1 my-10 justify-center">
        <TypographyBold>Problem Solved!</TypographyBold>
        <Title style={{ fontSize: 30, textTransform: "uppercase" }}>
          forgot password
        </Title>
        <View className="bg-green-300 rounded-xl items-center justify-center mt-5 p-2">
          <TypographyBold style={{ fontSize: 15 }}>
            Success! We sent you a Token.
          </TypographyBold>
        </View>
        <Formik
          initialValues={{
            email: email,
            token: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={yup.object().shape({
            token: yup
              .string()
              .min(6, "Token Must be 6 Chars")
              .required("Required"),
            password: yup
              .string()
              .min(8, "Min 8 Chars Required")
              .required("Required"),
            confirmPassword: yup
              .string()
              .oneOf([yup.ref("password"), null], "Entries Do Not Match"),
          })}
          onSubmit={async (
            values: ChangeForgotPasswordValues,
            { setErrors }: FormikHelpers<ChangeForgotPasswordValues>
          ) => {
            const request = {
              changeForgotPasswordOptions: {
                email: values.email,
                token: values.token,
                password: values.password,
              },
            };
            const response = await changeForgotPassword(request);
            if (response.data?.changeForgotPassword.errors) {
              setErrors(toErrorMap(response.data.changeForgotPassword.errors));
            } else if (
              response.data?.changeForgotPassword.auth &&
              response.data.changeForgotPassword.user
            ) {
              await setAuthKeys({
                access_token:
                  response.data.changeForgotPassword.auth.access_token,
                refresh_token:
                  response.data.changeForgotPassword.auth.refresh_token,
                expires_in: response.data.changeForgotPassword.auth.expires_in,
                user: response.data.changeForgotPassword.user,
              });
              dispatch(
                setAuthentication({
                  isAuthenticated: true,
                  access_token:
                    response.data.changeForgotPassword.auth.access_token,
                  refresh_token:
                    response.data.changeForgotPassword.auth.refresh_token,
                  expires_in: calcExpiresIn(
                    response.data.changeForgotPassword.auth.expires_in
                  ),
                  user: response.data.changeForgotPassword.user,
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
            touched,
            errors,
            setFieldTouched,
            isSubmitting,
          }) => (
            <View className="w-full mt-6 mb-10">
              <View className="flex-row items-center justify-between mb-2 px-1">
                <TypographyBold style={{ fontSize: 15 }}>Token</TypographyBold>
                {touched.token && errors.token && (
                  <Typography className="text-red-800">
                    {errors.token}
                  </Typography>
                )}
              </View>
              <View className="flex-row items-center border-2 border-black rounded-2xl p-3 mb-5">
                <Icon name="key" size={25} />
                <TextInput
                  className="ml-3 flex-1"
                  onChangeText={handleChange("token")}
                  onBlur={() => {
                    handleBlur("token");
                    setFieldTouched("token");
                  }}
                  value={values.token}
                  style={{ fontFamily: "Inter", fontSize: 15 }}
                  placeholder="######"
                  keyboardType="numeric"
                  maxLength={6}
                  allowFontScaling={false}
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
                  allowFontScaling={false}
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
                    Update
                  </TypographyBold>
                )}
              </Pressable>
            </View>
          )}
        </Formik>
        <View className="w-full flex-row justify-center">
          <Typography>No Email or Token Expired?</Typography>
          <Pressable onPress={() => navigation.replace("ForgotPassword")}>
            <TypographyBold
              style={{ marginLeft: 5, textDecorationLine: "underline" }}
            >
              Retry
            </TypographyBold>
          </Pressable>
        </View>
      </View>
    </Container>
  );
};

export default ChangeForgotPassword;
