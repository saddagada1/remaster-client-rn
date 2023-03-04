import React, { useEffect, useRef, useState } from "react";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParams } from "../../Navigators/MainStackNavigator";
import { RootStackParams } from "../../Navigators/RootStackNavigator";
import YoutubePlayer, { YoutubeIframeRef } from "react-native-youtube-iframe";
import Container from "../../Container/Container";
import { Pressable, ScrollView, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Timeline from "../../Timeline/Timeline";
import Scrubber from "react-native-scrubber";
import TypographyBold from "../../Typography/TypographyBold";
import AntDesign from "@expo/vector-icons/AntDesign";
import Heading from "../../Typography/Heading";
import Title from "../../Typography/Title";
import { calcVideoTimestamp } from "../../../utils/calc";
import CreateLoopModal from "../../Modals/CreateLoopModal";
import ChordEditor from "../../Editors/ChordEditor";
import { useAppSelector } from "../../../utils/hooks/reduxHooks";
import Orb from "../../Visualizations/Orb";

type EditorProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParams, "Editor">,
  NativeStackScreenProps<RootStackParams>
>;

const Editor: React.FC<EditorProps> = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const state = useAppSelector((store) => store.editor);
  const [progressPosition, setProgressPosition] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [mute, setMute] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [availablePlaybackRates, setAvailablePlaybackRates] = useState<number[]>([]);
  const [createLoop, setCreateLoop] = useState(false);
  const playerRef = useRef<YoutubeIframeRef>(null);

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (playerRef.current && playing && !isScrubbing) {
      interval = setInterval(async () => {
        setProgressPosition(await playerRef.current!.getCurrentTime());
      }, 100); // 100 ms refresh
    }
    return () => {
      clearInterval(interval);
    };
  }, [playing, isScrubbing]);

  return (
    <Container className="w-full h-full bg-stone-400 items-center">
      <CreateLoopModal trigger={createLoop} setTrigger={setCreateLoop} />
      <View style={{ width: width }} className="h-[5%] flex-row justify-between items-center px-2">
        <Pressable
          className="flex-row items-center"
          onPress={() => navigation.navigate("CoreTabs", { screen: "Profile" })}
        >
          <AntDesign name="arrowleft" size={25} />
          <Heading style={{ fontSize: 18 }} className="ml-2">
            Profile
          </Heading>
        </Pressable>
        <View className="flex-row items-center">
          <Title style={{ fontSize: 18, textTransform: "uppercase" }}>Remaster</Title>
          <Pressable
            className="border-l-2 border-black ml-2 pl-2"
            onPress={() => console.log("settings")}
          >
            <AntDesign name="setting" size={25} />
          </Pressable>
        </View>
      </View>
      <View className="z-10">
        <Pressable onPress={() => setPlaying(!playing)} onLongPress={() => setMute(!mute)}>
          <View className="border-t-2 border-stone-500" pointerEvents="none">
            <YoutubePlayer
              ref={playerRef}
              initialPlayerParams={{ controls: false }}
              width={width}
              height={width / 1.778}
              play={playing}
              mute={mute}
              playbackRate={playbackRate}
              onPlaybackRateChange={(rate) => setPlaybackRate(parseInt(rate))}
              videoId={state.videoID}
              onReady={async () => {
                const currentPlaybackRate = await playerRef.current!.getPlaybackRate();
                if (currentPlaybackRate !== playbackRate) {
                  setPlaybackRate(currentPlaybackRate);
                }
                setAvailablePlaybackRates(await playerRef.current!.getAvailablePlaybackRates());
              }}
              onError={(error) => console.log("error: ", error)}
              onChangeState={(event) => {
                if (event === "playing") {
                  setPlaying(true);
                } else if (event === "paused") {
                  setPlaying(false);
                } else if (event === "ended") {
                  setPlaying(false);
                  setProgressPosition(state.duration);
                }
              }}
              webViewProps={{ setSupportMultipleWindows: true }}
            />
          </View>
        </Pressable>
        {playerRef.current && (
          <View style={{ transform: [{ translateY: 10 }] }} className="w-full absolute bottom-0">
            <Scrubber
              value={progressPosition}
              onSlidingStart={() => setIsScrubbing(true)}
              onSlide={(position) => {
                setProgressPosition(position);
                playerRef.current!.seekTo(position, true);
              }}
              onSlidingComplete={() => setIsScrubbing(false)}
              totalDuration={state.duration}
              trackBackgroundColor="#a8a29e"
              trackColor="#ef4444"
              scrubbedColor="#ef4444"
              displayValues={false}
              tapNavigation={true}
            />
          </View>
        )}
      </View>
      <View className="flex-1 w-full bg-black" style={{ paddingBottom: insets.bottom }}>
        <View className="h-[50%] bg-stone-300">
          <ChordEditor />
        </View>
        <View className="h-[20%] flex-row items-center bg-stone-400 border-y-2 border-stone-500">
          <View className="p-2 border-r-2 border-stone-500">
            <Pressable
              className="h-full aspect-square justify-center items-center bg-stone-300 shadow-md rounded-lg"
              onPress={() => setCreateLoop(true)}
            >
              <AntDesign name="pluscircle" size={35} />
            </Pressable>
          </View>
          <ScrollView className="p-2" showsHorizontalScrollIndicator={false} horizontal={true}>
            {state.loops.map((loop, index) => (
              <View
                key={index}
                style={{ backgroundColor: loop.key.colour + "80", marginLeft: index !== 0 ? 8 : 0 }}
                className="h-full aspect-square justify-center items-center shadow-md rounded-lg"
              >
                <TypographyBold className="absolute left-2 top-2">{loop.id}</TypographyBold>
                <TypographyBold className="absolute bottom-2">{loop.key.note}</TypographyBold>
              </View>
            ))}
          </ScrollView>
        </View>
        <View className="h-[20%] bg-stone-300">
          <Timeline
            playing={playing}
            progressPosition={progressPosition}
            segmentWidth={2}
            unit={20}
            containerWidth={width}
          />
        </View>
        <View className="h-[10%] flex-row items-center justify-end p-2">
          <Pressable
            className="bg-red-500 h-full px-4 justify-center items-center rounded-md"
            onPress={() => console.log("publish")}
          >
            <TypographyBold>Publish</TypographyBold>
          </Pressable>
        </View>
      </View>
    </Container>
  );
};

export default Editor;
