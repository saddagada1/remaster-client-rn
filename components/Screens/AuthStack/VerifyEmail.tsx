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
import { useMutation } from "urql";
import { VerifyEmailDocument } from "../../../generated/graphql";
import { toErrorMap } from "../../../utils/toErrorMap";
import { useAppDispatch } from "../../../utils/hooks/reduxHooks";
import { setUserKey } from "../../../utils/secureStore";
import { setUser } from "../../../redux/slices/authSlice";

interface VerifyEmailValues {
  token: string;
}

type VerifyEmailProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParams, "VerifyEmail">,
  NativeStackScreenProps<RootStackParams>
>;

const VerifyEmail: React.FC<VerifyEmailProps> = ({ navigation }) => {
  const [, verifyEmail] = useMutation(VerifyEmailDocument);
  const dispatch = useAppDispatch();
  return (
    <Container className="w-full h-full bg-stone-400 px-8 items-center">
      <BackHeader className="flex-row mt-10" />
      <View className="w-full flex-1 my-10 justify-center">
        <TypographyBold>Almost There!</TypographyBold>
        <Title style={{ fontSize: 30, textTransform: "uppercase" }}>verify email</Title>
        <Formik
          initialValues={{ token: "" }}
          validationSchema={yup.object().shape({
            token: yup.string().min(6, "Token Must be 6 Chars").required("Required"),
          })}
          onSubmit={async (
            values: VerifyEmailValues,
            { setErrors }: FormikHelpers<VerifyEmailValues>
          ) => {
            const response = await verifyEmail(values);
            if (response.data?.verifyEmail.errors) {
              setErrors(toErrorMap(response.data.verifyEmail.errors));
            } else if (response.data?.verifyEmail.user) {
              await setUserKey(response.data.verifyEmail.user);
              dispatch(setUser({ user: response.data.verifyEmail.user }));
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
                <TypographyBold style={{ fontSize: 15 }}>Token</TypographyBold>
                {touched.token && errors.token && (
                  <Typography className="text-red-800">{errors.token}</Typography>
                )}
              </View>
              <View className="flex-row bg-stone-300 items-center border-2 border-black rounded-2xl p-3 mb-12">
                <AntDesign name="key" size={25} />
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
                  autoCorrect={false}
                  allowFontScaling={false}
                />
              </View>
              <Pressable
                onPress={() => handleSubmit()}
                disabled={isSubmitting}
                className="justify-center items-center p-5 rounded-2xl bg-black border-2 border-black"
              >
                {isSubmitting ? (
                  <LoadingIndicator size={15} colour="#ffffff" />
                ) : (
                  <TypographyBold style={{ fontSize: 15, color: "#ffffff" }}>Verify</TypographyBold>
                )}
              </Pressable>
            </View>
          )}
        </Formik>
        <View className="w-full flex-row justify-center">
          <Typography>Too Lazy?</Typography>
          <Pressable
            onPress={() =>
              navigation.replace("Main", {
                screen: "CoreTabs",
                params: { screen: "Home" },
              })
            }
          >
            <TypographyBold style={{ marginLeft: 5, textDecorationLine: "underline" }}>
              Do it Later
            </TypographyBold>
          </Pressable>
        </View>
      </View>
    </Container>
  );
};

export default VerifyEmail;
