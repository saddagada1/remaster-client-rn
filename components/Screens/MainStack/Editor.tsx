import React, { useEffect, useRef, useState } from "react";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MainStackParams } from "../../Navigators/MainStackNavigator";
import { RootStackParams } from "../../Navigators/RootStackNavigator";
import YoutubePlayer, { YoutubeIframeRef } from "react-native-youtube-iframe";
import Container from "../../Container/Container";
import { Pressable, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Timeline from "../../Timeline/Timeline";
import Scrubber from "react-native-scrubber";
import TypographyBold from "../../Typography/TypographyBold";
import AntDesign from "@expo/vector-icons/AntDesign";
import Heading from "../../Typography/Heading";
import Title from "../../Typography/Title";
import { calcVideoTimestamp } from "../../../utils/calc";
import CreateLoopModal from "../../Modals/CreateLoopModal";

type EditorProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParams, "Editor">,
  NativeStackScreenProps<RootStackParams>
>;

const loops = [
  {
    id: 1,
    name: "Intro",
    key: "G",
    type: "chord",
    start: 0,
    end: 2,
  },
  {
    id: 2,
    name: "Verse",
    key: "C",
    type: "chord",
    start: 2,
    end: 4,
  },
  {
    id: 3,
    name: "Chorus",
    key: "B",
    type: "chord",
    start: 4,
    end: 6,
  },
  {
    id: 4,
    name: "Verse",
    key: "A",
    type: "chord",
    start: 6,
    end: 8,
  },
  {
    id: 5,
    name: "Outro",
    key: "E",
    type: "chord",
    start: 8,
    end: 10,
  },
];

const Editor: React.FC<EditorProps> = ({ navigation }) => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [duration, setDuration] = useState(0);
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
    <Container noPadding={true}>
      <CreateLoopModal trigger={createLoop} setTrigger={setCreateLoop} />
      <View style={{ width: width }} className="h-[5%] flex-row justify-between items-center px-2">
        <Pressable className="flex-row items-center" onPress={() => console.log("profile")}>
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
      <Pressable onPress={() => setPlaying(!playing)} onLongPress={() => setMute(!mute)}>
        <View className="border-y-2 border-black" pointerEvents="none">
          <YoutubePlayer
            ref={playerRef}
            initialPlayerParams={{ controls: false }}
            width={width}
            height={width / 1.778}
            play={playing}
            mute={mute}
            playbackRate={playbackRate}
            onPlaybackRateChange={(rate) => setPlaybackRate(parseInt(rate))}
            videoId={"cJunCsrhJjg"}
            onReady={async () => {
              setDuration(await playerRef.current!.getDuration());
              const currentPlaybackRate = await playerRef.current!.getPlaybackRate();
              if (currentPlaybackRate !== playbackRate) {
                setPlaybackRate(currentPlaybackRate);
              }
              setAvailablePlaybackRates(await playerRef.current!.getAvailablePlaybackRates());
            }}
            onChangeState={(event) => {
              if (event === "playing") {
                setPlaying(true);
              } else if (event === "paused") {
                setPlaying(false);
              } else if (event === "ended") {
                setPlaying(false);
                setProgressPosition(duration);
              }
            }}
            webViewProps={{ setSupportMultipleWindows: true }}
          />
        </View>
      </Pressable>
      <View className="flex-1 w-full bg-black" style={{ paddingBottom: insets.bottom }}>
        <View className="h-[40%] bg-stone-300">
          {playerRef.current && duration !== 0 && (
            <View style={{ transform: [{ translateY: -10 }] }} className="w-full z-10">
              <Scrubber
                value={progressPosition}
                onSlidingStart={() => setIsScrubbing(true)}
                onSlide={(position) => {
                  setProgressPosition(position);
                  playerRef.current!.seekTo(position, true);
                }}
                onSlidingComplete={() => setIsScrubbing(false)}
                totalDuration={duration}
                trackBackgroundColor="#a8a29e"
                trackColor="#ef4444"
                scrubbedColor="#ef4444"
                displayValues={false}
                tapNavigation={true}
              />
            </View>
          )}
        </View>
        <View className="h-[25%] flex-row items-center bg-stone-400 border-y-2 border-black p-2">
          <Pressable
            className="h-full aspect-square justify-center items-center border-2 border-black rounded-xl"
            onPress={() => setCreateLoop(true)}
          >
            <AntDesign name="pluscircle" size={50} />
          </Pressable>
        </View>
        <View className="h-[25%] bg-stone-300">
          {duration !== 0 && (
            <Timeline
              duration={duration}
              playing={playing}
              progressPosition={progressPosition}
              segmentWidth={2}
              unit={20}
              containerWidth={width}
              loops={loops}
            />
          )}
        </View>
        <View className="h-[10%] flex-row items-center justify-end p-2">
          {duration !== 0 && (
            <>
              <Pressable
                className="bg-red-500 h-full px-4 justify-center items-center rounded-md"
                onPress={() => console.log("publish")}
              >
                <TypographyBold>Publish</TypographyBold>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </Container>
  );
};

export default Editor;
