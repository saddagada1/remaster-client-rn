import React, { useRef, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Container from "../../Container/Container";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackParams } from "../../Navigators/RootStackNavigator";
import { Formik } from "formik";
import * as yup from "yup";
import { Pressable, TextInput, View, Image } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Typography from "../../Typography/Typography";
import TypographyBold from "../../Typography/TypographyBold";
import LoadingIndicator from "../../Visualizations/LoadingIndicator";
import { MainStackParams } from "../../Navigators/MainStackNavigator";
import BackHeader from "../../Header/BackHeader";
import Title from "../../Typography/Title";
import YoutubePlayer, { YoutubeIframeRef, getYoutubeMeta } from "react-native-youtube-iframe";
import { extractYoutubeVideoID, validateYoutubeURL } from "../../../utils/youtube";
import Select from "../../Select/Select";
import { keyReference, tuningReference } from "../../../utils/constants";
import { CreateRemasterDocument, KeyInput, TuningInput } from "../../../generated/graphql";
import { useMutation } from "urql";
import { trimString } from "../../../utils/helpers";
import { useAppDispatch } from "../../../utils/hooks/reduxHooks";
import { setEditor } from "../../../redux/slices/editorSlice";

interface CreateInitValues {
  name: string;
  playbackURL: string;
  duration: number;
  artist: string;
}

type CreateInitProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParams, "CreateInit">,
  NativeStackScreenProps<RootStackParams>
>;

export const CreateInit: React.FC<CreateInitProps> = ({ navigation }) => {
  const playerRef = useRef<YoutubeIframeRef>(null);
  const [playerValidation, setPlayerValidation] = useState<{
    ok: boolean;
    error?: string;
    title?: string;
    image?: string;
  } | null>(null);

  return (
    <Container className="w-full h-full bg-stone-400 px-8 items-center">
      <BackHeader className="flex-row mt-10" />
      <View className="w-full flex-1 my-10 justify-start">
        <TypographyBold>Get Started!</TypographyBold>
        <Title style={{ fontSize: 30, textTransform: "uppercase" }}>create remaster</Title>
        <Formik
          initialValues={{
            name: "",
            playbackURL: "",
            duration: 0,
            artist: "",
          }}
          validationSchema={yup.object().shape({
            name: yup.string().min(5, "Min 5 Chars Required").required("Required"),
            artist: yup.string().required("Required"),
            playbackURL: yup
              .string()
              .test("valid-url", "Invalid URL", (value) =>
                value ? validateYoutubeURL(value) : false
              )
              .required("Required"),
          })}
          onSubmit={async (values: CreateInitValues) => {
            const videoID = extractYoutubeVideoID(values.playbackURL);
            if (playerValidation && playerValidation.ok && videoID && values.duration !== 0) {
              navigation.navigate("Main", {
                screen: "CreateComp",
                params: {
                  name: values.name,
                  artist: values.artist,
                  videoID: videoID,
                  duration: values.duration,
                },
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
            setFieldValue,
          }) => (
            <View className="w-full flex-1 mt-8">
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
              <View className="flex-row items-center justify-between mb-2 px-1">
                <TypographyBold style={{ fontSize: 15 }}>Artist</TypographyBold>
                {touched.artist && errors.artist && (
                  <Typography className="text-red-800">{errors.artist}</Typography>
                )}
              </View>
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
                <TypographyBold style={{ fontSize: 15 }}>Playback URL</TypographyBold>
                {touched.playbackURL && errors.playbackURL && (
                  <Typography className="text-red-800">{errors.playbackURL}</Typography>
                )}
              </View>
              <View className="flex-row bg-stone-300 items-center border-2 border-black rounded-2xl p-3 mb-7">
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
              <View
                pointerEvents="none"
                className="flex-1 flex-row items-center border-2 border-black rounded-2xl p-4 mb-10"
              >
                {!playerValidation ? (
                  <TypographyBold className="w-full text-center">
                    Playback URL Validation
                  </TypographyBold>
                ) : null}
                {validateYoutubeURL(values.playbackURL) && (
                  <YoutubePlayer
                    ref={playerRef}
                    height={0}
                    play={false}
                    videoId={extractYoutubeVideoID(values.playbackURL)}
                    onReady={async () => {
                      const duration = await playerRef.current!.getDuration();
                      setFieldValue("duration", duration);
                      if (duration !== 0) {
                        const metadata = await getYoutubeMeta(
                          extractYoutubeVideoID(values.playbackURL) as string
                        );
                        setPlayerValidation({
                          ok: true,
                          title: metadata.title,
                          image: metadata.thumbnail_url,
                        });
                      }
                    }}
                    onError={(error) => setPlayerValidation({ ok: false, error: error })}
                    webViewProps={{ setSupportMultipleWindows: true }}
                    webViewStyle={{ display: "none" }}
                  />
                )}
                {playerValidation &&
                  (playerValidation.ok ? (
                    <>
                      <View className="flex-1 rounded-lg overflow-hidden">
                        <Image
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                          source={{ uri: playerValidation.image }}
                        />
                      </View>
                      <View className="flex-1 h-full justify-between px-4">
                        <TypographyBold>Validation Success</TypographyBold>
                        <TypographyBold>
                          Ok: <Typography className="text-green-300">TRUE</Typography>
                        </TypographyBold>
                        <TypographyBold numberOfLines={1} ellipsizeMode="tail">
                          Title:
                          <Typography className="capitalize">
                            {" " + playerValidation.title}
                          </Typography>
                        </TypographyBold>
                      </View>
                    </>
                  ) : (
                    <>
                      <View className="aspect-square h-full rounded-lg bg-stone-300/50 items-center justify-center">
                        <AntDesign name="question" size={25} />
                      </View>
                      <View className="flex-1 h-full justify-between px-4">
                        <TypographyBold>Validation Error</TypographyBold>
                        <TypographyBold>
                          Ok: <Typography className="text-red-800">FALSE</Typography>
                        </TypographyBold>
                        <TypographyBold numberOfLines={1} ellipsizeMode="tail">
                          Error:
                          <Typography className="capitalize">
                            {" " + playerValidation.error?.replaceAll("_", " ")}
                          </Typography>
                        </TypographyBold>
                      </View>
                    </>
                  ))}
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
      </View>
    </Container>
  );
};

interface CreateCompValues {
  key: KeyInput;
  tuning: TuningInput;
}

type CreateCompProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParams, "CreateComp">,
  NativeStackScreenProps<RootStackParams>
>;

export const CreateComp: React.FC<CreateCompProps> = ({ navigation, route }) => {
  const [, createRemaster] = useMutation(CreateRemasterDocument);
  const dispatch = useAppDispatch();
  const { name, artist, videoID, duration } = route.params;
  return (
    <Container className="w-full h-full bg-stone-400 px-8 items-center">
      <BackHeader className="flex-row mt-10" />
      <View className="w-full flex-1 my-10 justify-start">
        <TypographyBold>Almost There!</TypographyBold>
        <Title style={{ fontSize: 30, textTransform: "uppercase" }}>create remaster</Title>
        <Formik
          initialValues={{
            key: keyReference[0],
            tuning: tuningReference[1],
          }}
          validationSchema={yup.object().shape({
            tuning: yup.object().shape({
              name: yup.string(),
              notes: yup.array().of(
                yup
                  .string()
                  .matches(/(?![EBeb]#)([A-Ga-g])([#])?/, "Invalid Note")
                  .required("Required")
              ),
            }),
          })}
          onSubmit={async (values: CreateCompValues) => {
            const request = {
              remasterInput: {
                name: trimString(name),
                artist: trimString(artist),
                videoID: videoID,
                duration: duration,
                tuning: values.tuning,
                key: values.key,
              },
            };
            const response = await createRemaster(request);
            if (response.data?.createRemaster) {
              dispatch(
                setEditor({
                  id: response.data.createRemaster.id,
                  creatorID: response.data.createRemaster.creator_id,
                  name: response.data.createRemaster.name,
                  videoID: response.data.createRemaster.video_id,
                  duration: response.data.createRemaster.duration,
                  artistID: response.data.createRemaster.artist_id,
                  artist: trimString(artist),
                  key: response.data.createRemaster.key,
                  tuning: response.data.createRemaster.tuning,
                  loops: response.data.createRemaster.loops,
                  selectedLoop: null,
                  playingLoop: null,
                })
              );
              navigation.replace("Main", { screen: "Editor" });
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
            setFieldValue,
          }) => (
            <View className="w-full mt-8">
              <View className="flex-row items-center justify-between mb-2 px-1">
                <TypographyBold style={{ fontSize: 15 }}>Tuning</TypographyBold>
                {touched.tuning && errors.tuning && errors.tuning.notes && (
                  <Typography className="text-red-800">
                    {typeof errors.tuning.notes === "string"
                      ? errors.tuning.notes
                      : errors.tuning.notes.find((error) => error)}
                  </Typography>
                )}
              </View>
              <Select
                data={tuningReference.map((tuning) => tuning.name)}
                onSelect={(_, index) => setFieldValue("tuning", tuningReference[index])}
                icon={<AntDesign name="bells" size={25} />}
                value={values.tuning.name}
                containerClassName="z-20"
                boxClassName="bg-stone-300 border-2 border-black rounded-2xl p-3 mb-5"
                dropdownClassName="bg-stone-300 border-2 border-black rounded-2xl px-3 h-[200]"
                itemClassName="p-2 bg-stone-200/50 rounded-lg"
              />
              <View className="flex-row mb-5 border-2 border-black rounded-2xl overflow-hidden">
                {values.tuning.notes.map((_, index) => (
                  <TextInput
                    key={index}
                    className="flex-1 bg-stone-300 border-black p-3 text-center"
                    editable={values.tuning.name === "Custom"}
                    selectTextOnFocus={values.tuning.name === "Custom"}
                    onChangeText={handleChange(`tuning.notes[${index}]`)}
                    onBlur={() => {
                      handleBlur(`tuning.notes[${index}]`);
                      setFieldTouched(`tuning.notes[${index}]`);
                    }}
                    value={values.tuning.notes[index]}
                    style={{
                      fontFamily: "Inter",
                      fontSize: 15,
                      borderLeftWidth: index === 0 ? 0 : 2,
                    }}
                    placeholder={`${Math.abs(index - values.tuning.notes.length)}`}
                    autoCorrect={false}
                    allowFontScaling={false}
                    maxLength={2}
                  />
                ))}
              </View>
              <TypographyBold className="mb-2 px-1" style={{ fontSize: 15 }}>
                Key
              </TypographyBold>
              <Select
                data={keyReference.map((key) => key.note)}
                onSelect={(_, index) => setFieldValue("key", keyReference[index])}
                icon={<AntDesign name="key" size={25} />}
                value={values.key.note}
                containerClassName="z-10"
                boxClassName="bg-stone-300 border-2 border-black rounded-2xl p-3 mb-12"
                dropdownClassName="bg-stone-300 border-2 border-black rounded-2xl px-3 h-[200]"
                itemClassName="p-2 bg-stone-200/50 rounded-lg"
              />
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
