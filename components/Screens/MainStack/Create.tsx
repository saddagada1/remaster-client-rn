import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Container from "../../Container/Container";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackParams } from "../../Navigators/RootStackNavigator";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { Pressable, TextInput, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Typography from "../../Typography/Typography";
import TypographyBold from "../../Typography/TypographyBold";
import LoadingIndicator from "../../Visualizations/LoadingIndicator";
import { MainStackParams } from "../../Navigators/MainStackNavigator";
import BackHeader from "../../Header/BackHeader";
import Title from "../../Typography/Title";
import { SvgXml } from "react-native-svg";
import Chord from "../../Chord/Chord";
import { Chord as ChordType } from "../../../utils/types/remaster";

interface CreateInitValues {
  name: string;
  playbackURL: string;
  artist: string;
}

type CreateInitProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParams, "CreateInit">,
  NativeStackScreenProps<RootStackParams>
>;

const test: ChordType = {
  title: "C",
  fingers: [
    [1, 0],
    [2, 1],
    [3, 0],
    [4, 2],
    [5, 3],
    [6, "x"],
  ],
  barres: [],
  position: 1,
};
const test2: ChordType = {
  title: "C",
  fingers: [
    [1, 2],
    [2, 2],
    [3, "x"],
    [4, "x"],
    [5, 1],
    [6, 2],
  ],
  barres: [],
  position: 7,
};
const testWBarres: ChordType = {
  title: "C",
  fingers: [
    [1, "x"],
    [2, 4],
    [5, 3],
    [6, 4],
  ],
  barres: [{ fromString: 4, toString: 3, fret: 1 }],
  position: 17,
};

export const CreateInit: React.FC<CreateInitProps> = ({ navigation }) => {
  return (
    <Container>
      <BackHeader />
      <View className="w-full h-fit px-4  border-2 border-black rounded-2xl">
        <Chord colour="#000000" numFrets={5} numStrings={6} chord={test} />
      </View>
      <View className="w-full h-fit px-4  border-2 border-black rounded-2xl">
        <Chord colour="#000000" numFrets={5} numStrings={6} chord={test2} />
      </View>
      <View className="w-full h-fit px-4  border-2 border-black rounded-2xl">
        <Chord colour="#000000" numFrets={5} numStrings={6} chord={testWBarres} />
      </View>
      {/* <View className="w-[90%] flex-1 my-10 justify-start">
        <TypographyBold>Get Started!</TypographyBold>
        <Title style={{ fontSize: 30, textTransform: "uppercase" }}>create remaster</Title>
        <Formik
          initialValues={{
            name: "",
            playbackURL: "",
            artist: "",
          }}
          validationSchema={yup.object().shape({
            // name: yup.string().min(5, "Min 5 Chars Required").required("Required"),
            // playbackURL: yup.string().min(5, "Min 5 Chars Required").required("Required"),
          })}
          onSubmit={async (
            values: CreateInitValues,
            { setErrors }: FormikHelpers<CreateInitValues>
          ) => {
            navigation.navigate("Main", { screen: "CreateComp", params: values });
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
            <View className="w-full mt-8">
              <View className="flex-row items-center justify-between mb-2 px-1">
                <TypographyBold style={{ fontSize: 15 }}>Name</TypographyBold>
                {touched.name && errors.name && (
                  <Typography className="text-red-800">{errors.name}</Typography>
                )}
              </View>
              <View className="flex-row bg-stone-300 items-center border-2 border-black rounded-2xl p-3 mb-5">
                <AntDesign name="tago" size={25} />
                <TextInput
                  className="ml-3 flex-1"
                  onChangeText={handleChange("name")}
                  onBlur={() => {
                    handleBlur("name");
                    setFieldTouched("name");
                  }}
                  value={values.name}
                  style={{ fontFamily: "Inter", fontSize: 15 }}
                  placeholder="Purple Haze (Live at the Atlanta Pop Festival)"
                  autoCorrect={false}
                  allowFontScaling={false}
                />
              </View>
              <TypographyBold className="mb-2 px-1" style={{ fontSize: 15 }}>
                Artist
              </TypographyBold>
              <View className="flex-row bg-stone-300 items-center border-2 border-black rounded-2xl p-3 mb-5">
                <AntDesign name="meh" size={25} />
                <TextInput
                  className="ml-3 flex-1"
                  onChangeText={handleChange("artist")}
                  onBlur={() => {
                    handleBlur("artist");
                    setFieldTouched("artist");
                  }}
                  value={values.artist}
                  style={{ fontFamily: "Inter", fontSize: 15 }}
                  placeholder="Jimi Hendrix"
                  autoCorrect={false}
                  allowFontScaling={false}
                />
              </View>
              <View className="flex-row items-center justify-between mb-2 px-1">
                <TypographyBold style={{ fontSize: 15 }}>PlaybackURL</TypographyBold>
                {touched.playbackURL && errors.playbackURL && (
                  <Typography className="text-red-800">{errors.playbackURL}</Typography>
                )}
              </View>
              <View className="flex-row bg-stone-300 items-center border-2 border-black rounded-2xl p-3 mb-12">
                <AntDesign name="link" size={25} />
                <TextInput
                  className="ml-3 flex-1"
                  onChangeText={handleChange("playbackURL")}
                  onBlur={() => {
                    handleBlur("playbackURL");
                    setFieldTouched("playbackURL");
                  }}
                  value={values.playbackURL}
                  style={{ fontFamily: "Inter", fontSize: 15 }}
                  placeholder="https://www.youtube.com/watch?v=cJunCsrhJjg&ab_channel=JimiHendrixVEVO"
                  keyboardType="url"
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
                  <TypographyBold style={{ fontSize: 15, color: "#ffffff" }}>Next</TypographyBold>
                )}
              </Pressable>
            </View>
          )}
        </Formik>
      </View> */}
    </Container>
  );
};

interface CreateCompValues {
  key: string;
  tuning: string[];
}

type CreateCompProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParams, "CreateComp">,
  NativeStackScreenProps<RootStackParams>
>;

export const CreateComp: React.FC<CreateCompProps> = ({ navigation }) => {
  return (
    <Container>
      <BackHeader />
      <View className="w-[90%] flex-1 my-10 justify-start">
        <TypographyBold>Almost There!</TypographyBold>
        <Title style={{ fontSize: 30, textTransform: "uppercase" }}>create remaster</Title>
        <Formik
          initialValues={{
            key: "",
            tuning: ["", "", "", "", "", ""],
          }}
          validationSchema={yup.object().shape({})}
          onSubmit={async (
            values: CreateCompValues,
            { setErrors }: FormikHelpers<CreateCompValues>
          ) => {
            navigation.navigate("Main", { screen: "Editor" });
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
            <View className="w-full mt-8">
              <TypographyBold className="mb-2 px-1" style={{ fontSize: 15 }}>
                Tuning
              </TypographyBold>
              <View className="flex-row mb-5">
                {values.tuning.map((_, index) => (
                  <TextInput
                    key={index}
                    className="mx-1 flex-1 bg-stone-300 border-2 border-black rounded-2xl p-3"
                    onChangeText={handleChange(`tuning[${index}]`)}
                    onBlur={() => {
                      handleBlur(`tuning[${index}]`);
                      setFieldTouched(`tuning[${index}]`);
                    }}
                    value={values.tuning[index]}
                    style={{ fontFamily: "Inter", fontSize: 15 }}
                    placeholder="E"
                    autoCorrect={false}
                    allowFontScaling={false}
                    maxLength={1}
                  />
                ))}
              </View>
              <TypographyBold className="mb-2 px-1" style={{ fontSize: 15 }}>
                Key
              </TypographyBold>
              <View className="flex-row bg-stone-300 items-center border-2 border-black rounded-2xl p-3 mb-12">
                <AntDesign name="key" size={25} />
                <TextInput
                  className="ml-3 flex-1"
                  onChangeText={handleChange("key")}
                  onBlur={() => {
                    handleBlur("key");
                    setFieldTouched("key");
                  }}
                  value={values.key}
                  style={{ fontFamily: "Inter", fontSize: 15 }}
                  placeholder="E Major"
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
                  <TypographyBold style={{ fontSize: 15, color: "#ffffff" }}>Create</TypographyBold>
                )}
              </Pressable>
            </View>
          )}
        </Formik>
      </View>
    </Container>
  );
};
