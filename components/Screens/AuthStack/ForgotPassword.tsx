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
import { Formik } from "formik";
import * as yup from "yup";
import LoadingIndicator from "../../Visualizations/LoadingIndicator";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackParams } from "../../Navigators/RootStackNavigator";
import { useMutation } from "urql";
import { ForgotPasswordDocument } from "../../../generated/graphql";
import { trimString } from "../../../utils/helpers";

interface ForgotPasswordValues {
  email: string;
}

type ForgotPasswordProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParams, "ForgotPassword">,
  NativeStackScreenProps<RootStackParams>
>;

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ navigation }) => {
  const [, forgotPassword] = useMutation(ForgotPasswordDocument);
  return (
    <Container className="w-full h-full bg-stone-400 px-8 items-center">
      <BackHeader className="flex-row mt-10" />
      <View className="w-full flex-1 my-10 justify-center">
        <TypographyBold>Mistakes Made!</TypographyBold>
        <Title style={{ fontSize: 30, textTransform: "uppercase" }}>forgot password</Title>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={yup.object().shape({
            email: yup.string().email("Invalid Format").required("Required"),
          })}
          onSubmit={async (values: ForgotPasswordValues) => {
            await forgotPassword({ email: trimString(values.email) });
            navigation.replace("ChangeForgotPassword", { email: values.email });
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
              <View className="flex-row bg-stone-300 items-center border-2 border-black rounded-2xl p-3 mb-12">
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
              <Pressable
                onPress={() => handleSubmit()}
                disabled={isSubmitting}
                className="justify-center items-center p-5 rounded-2xl bg-black border-2 border-black"
              >
                {isSubmitting ? (
                  <LoadingIndicator size={15} colour="#ffffff" />
                ) : (
                  <TypographyBold style={{ fontSize: 15, color: "#ffffff" }}>
                    Send Email
                  </TypographyBold>
                )}
              </Pressable>
            </View>
          )}
        </Formik>
        <View className="w-full flex-row justify-center">
          <Typography>Memories Recovered?</Typography>
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

export default ForgotPassword;
