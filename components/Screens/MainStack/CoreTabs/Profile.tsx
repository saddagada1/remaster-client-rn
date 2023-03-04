import React, { useEffect, useState } from "react";
import Header from "../../../Header/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Container from "../../../Container/Container";
import { CompositeScreenProps, useIsFocused } from "@react-navigation/native";
import { RootStackParams } from "../../../Navigators/RootStackNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CoreTabsParams } from "../../../Navigators/CoreTabsNavigator";
import { Pressable, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import TypographyBold from "../../../Typography/TypographyBold";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks/reduxHooks";
import Heading from "../../../Typography/Heading";
import { Layout } from "../../../../utils/types/helpers";
import Portal from "../../../Visualizations/Portal";
import { keyReference } from "../../../../utils/constants";
import Typography from "../../../Typography/Typography";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { useQuery } from "urql";
import { UserRemastersDocument } from "../../../../generated/graphql";
import { ScrollView } from "react-native-gesture-handler";
import LoadingIndicator from "../../../Visualizations/LoadingIndicator";
import RemasterCard from "../../../Cards/RemasterCard";
import { setEditor } from "../../../../redux/slices/editorSlice";

type ProfileProps = CompositeScreenProps<
  BottomTabScreenProps<CoreTabsParams, "Profile">,
  NativeStackScreenProps<RootStackParams>
>;

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
  const user = useAppSelector((store) => store.auth.user);
  const [{ data, fetching }] = useQuery({ query: UserRemastersDocument });
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const [portalLayout, setPortalLayout] = useState<Layout | null>(null);
  const [usernameLayout, setUsernameLayout] = useState<Layout | null>(null);
  const [usernameWidth, setUsernameWidth] = useState<number | null>(null);

  const usernameOffsetX = useSharedValue(0);

  const usernameProps = useAnimatedProps(() => {
    return {
      contentOffset: {
        x: usernameOffsetX.value,
        y: 0,
      },
    };
  });

  useEffect(() => {
    if (usernameLayout && usernameWidth && usernameWidth > usernameLayout.width) {
      usernameOffsetX.value = withRepeat(
        withDelay(
          2500,
          withSequence(
            withTiming(usernameWidth - usernameLayout.width, {
              duration: 5000,
              easing: Easing.linear,
            }),
            withTiming(usernameWidth - usernameLayout.width, {
              duration: 2500,
            })
          )
        ),
        -1
      );
    }
    return () => {
      cancelAnimation(usernameOffsetX);
    };
  }, [usernameLayout, usernameWidth]);

  return (
    <Container className="w-full h-full bg-stone-400 items-center">
      <Header className="w-full px-4 mt-10" title="profile" />
      <View className="w-full flex-1">
        <View className="h-[25%] flex-row px-4 pb-4 pt-2">
          <View
            onLayout={({ nativeEvent }) => setPortalLayout(nativeEvent.layout)}
            className="w-[25%] shadow-lg rounded-xl overflow-hidden"
          >
            {portalLayout ? (
              <Portal
                width={portalLayout.width}
                height={portalLayout.height}
                keys={keyReference.filter((_, index) => index % 2 === 0)}
                animate={isFocused}
              />
            ) : null}
          </View>
          <View className="flex-1 ml-2">
            <View className="h-[30%] flex-row items-center shadow-lg bg-stone-500/50 rounded-xl p-2">
              <View className="h-full aspect-square items-center justify-center shadow bg-stone-400 rounded-lg">
                <Heading style={{ fontSize: 20 }}>@</Heading>
              </View>
              <Animated.ScrollView
                className="ml-2 mr-1"
                onLayout={({ nativeEvent }) => setUsernameLayout(nativeEvent.layout)}
                onContentSizeChange={(width) => setUsernameWidth(width)}
                scrollEnabled={false}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                animatedProps={usernameProps}
              >
                <Heading
                  className="whitespace-nowrap"
                  style={{
                    fontSize: 20,
                  }}
                >
                  {user!.username}
                </Heading>
              </Animated.ScrollView>
            </View>
            <View className="flex-1 flex-row my-2">
              <Pressable
                className="rounded-xl flex-1 items-center justify-center shadow-lg bg-stone-500/50 p-1 mr-1"
                onPress={() => {}}
              >
                <TypographyBold className="mb-2" style={{ fontSize: 16 }}>
                  0
                </TypographyBold>
                <Typography className="absolute bottom-1" style={{ fontSize: 10 }}>
                  Remasters
                </Typography>
              </Pressable>
              <Pressable
                className="rounded-xl flex-1 items-center justify-center shadow-lg bg-stone-500/50 p-1 mx-1"
                onPress={() => {}}
              >
                <TypographyBold className="mb-2" style={{ fontSize: 16 }}>
                  0
                </TypographyBold>
                <Typography className="absolute bottom-1" style={{ fontSize: 10 }}>
                  Followers
                </Typography>
              </Pressable>
              <Pressable
                className="rounded-xl flex-1 items-center justify-center shadow-lg bg-stone-500/50 p-1 ml-1"
                onPress={() => {}}
              >
                <TypographyBold className="mb-2" style={{ fontSize: 16 }}>
                  0
                </TypographyBold>
                <Typography className="absolute bottom-1" style={{ fontSize: 10 }}>
                  Following
                </Typography>
              </Pressable>
            </View>
            <View className="h-[25%] flex-row items-center">
              <Pressable
                className="h-full rounded-xl flex-1 items-center justify-center shadow-lg bg-stone-500/50 p-1 mr-1"
                onPress={() => {}}
              >
                <TypographyBold>Notifications</TypographyBold>
              </Pressable>
              <Pressable
                className="h-full aspect-square rounded-xl items-center justify-center shadow-lg bg-stone-500/50 p-1 ml-1"
                onPress={() => {}}
              >
                <AntDesign name="setting" size={25} />
              </Pressable>
            </View>
          </View>
        </View>
        <View className="flex-1">
          <View className="flex-row items-center py-2 px-4 border-y-2 border-stone-500 bg-stone-500/50">
            <Pressable
              className="rounded-xl flex-1 items-center py-3 mr-1 bg-stone-400 shadow-lg"
              onPress={() => {}}
            >
              <TypographyBold>Published</TypographyBold>
            </Pressable>
            <Pressable
              className="rounded-xl flex-1 items-center py-3 ml-1 bg-stone-400 shadow-lg"
              onPress={() => {}}
            >
              <TypographyBold>In Progress</TypographyBold>
            </Pressable>
          </View>
          <View className="flex-1 items-center justify-center mx-4">
            {fetching ? (
              <LoadingIndicator size={30} colour="#000000" />
            ) : data && data.userRemasters ? (
              <ScrollView className="w-full" showsVerticalScrollIndicator={false}>
                {data.userRemasters.map((remaster, index) => (
                  <RemasterCard
                    key={index}
                    name={remaster.name}
                    artist={remaster.artist.name}
                    keySig={remaster.key}
                    tuning={remaster.tuning}
                    likes={remaster.likes}
                    onPress={() => {
                      dispatch(
                        setEditor({
                          id: remaster.id,
                          creatorID: remaster.creator_id,
                          name: remaster.name,
                          videoID: remaster.video_id,
                          duration: remaster.duration,
                          artistID: remaster.artist_id,
                          artist: remaster.artist.name,
                          key: remaster.key,
                          tuning: remaster.tuning,
                          loops: remaster.loops,
                          selectedLoop: null,
                          playingLoop: null,
                        })
                      );
                      navigation.navigate("Main", { screen: "Editor" });
                    }}
                    style={{ marginBottom: 16, marginTop: index === 0 ? 16 : 0 }}
                  />
                ))}
              </ScrollView>
            ) : null}
          </View>
        </View>
      </View>
      {/* <Pressable
          onPress={() => navigation.goBack()}
          className="border-2 border-black rounded-2xl p-2 justify-center items-center"
        >
          <AntDesign name="setting" size={25} />
        </Pressable> */}
    </Container>
  );
};

export default Profile;
