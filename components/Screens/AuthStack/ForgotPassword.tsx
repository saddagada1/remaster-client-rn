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
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackParams } from "../../Navigators/RootStackNavigator";
import { useMutation } from "urql";
import { ForgotPasswordDocument } from "../../../generated/graphql";

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
    <Container>
      <BackHeader />
      <View className="w-[90%] flex-1 my-10 justify-center">
        <TypographyBold>Mistakes Made!</TypographyBold>
        <Title style={{ fontSize: 30, textTransform: "uppercase" }}>
          forgot password
        </Title>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={yup.object().shape({
            email: yup.string().email("Invalid Format").required("Required"),
          })}
          onSubmit={async (values: ForgotPasswordValues) => {
            await forgotPassword(values);
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
                  <Typography className="text-red-800">
                    {errors.email}
                  </Typography>
                )}
              </View>
              <View className="flex-row items-center border-2 border-black rounded-2xl p-3 mb-12">
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

export default ForgotPassword;