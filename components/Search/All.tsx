import { FlatList, ScrollView, View } from "react-native";
import React, { useMemo } from "react";
import { SearchResponse } from "../../utils/types/spotify";
import Heading from "../Typography/Heading";
import TrackResult from "../Spotify/TrackResult";
import Marquee from "../Visualizations/Marquee";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import AlbumResult from "../Spotify/AlbumResult";
import ArtistResult from "../Spotify/ArtistResult";

interface AllProps {
  spotifyData: SearchResponse;
}

const All: React.FC<AllProps> = ({ spotifyData }) => {
  const marqueeMemo = useMemo(() => {
    return (
      <Marquee clones={3}>
        <Entypo
          style={{ marginHorizontal: 8 }}
          name="spotify-with-circle"
          size={25}
          color="#ffffff"
        />
        <Heading className="text-white uppercase" style={{ fontSize: 20 }}>
          Displaying Spotify Content
        </Heading>
      </Marquee>
    );
  }, []);
  return (
    <View className="flex-1 mb-40">
      {spotifyData.tracks && spotifyData.tracks.items.length > 0 ? (
        <>
          <Heading className="m-4 uppercase underline" style={{ fontSize: 30 }}>
            Tracks
          </Heading>
          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <FlatList
              data={spotifyData.tracks.items}
              scrollEnabled={false}
              renderItem={({ item }) => <TrackResult track={item} />}
              contentContainerStyle={{ alignSelf: "flex-start" }}
              numColumns={Math.ceil(spotifyData.tracks.items.length / 2)}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              className="pl-4"
            />
          </ScrollView>
        </>
      ) : null}
      {spotifyData.albums && spotifyData.albums.items.length > 0 ? (
        <>
          <Heading className="m-4 uppercase underline" style={{ fontSize: 30 }}>
            Albums
          </Heading>
          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <FlatList
              data={spotifyData.albums.items}
              scrollEnabled={false}
              renderItem={({ item }) => <AlbumResult album={item} />}
              contentContainerStyle={{ alignSelf: "flex-start" }}
              numColumns={Math.ceil(spotifyData.albums.items.length / 2)}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              className="pl-4"
            />
          </ScrollView>
        </>
      ) : null}
      {spotifyData.artists && spotifyData.artists.items.length > 0 ? (
        <>
          <Heading className="m-4 uppercase underline" style={{ fontSize: 30 }}>
            Artists
          </Heading>
          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          >
            <FlatList
              data={spotifyData.artists.items}
              scrollEnabled={false}
              renderItem={({ item }) => <ArtistResult artist={item} />}
              contentContainerStyle={{ alignSelf: "flex-start" }}
              numColumns={Math.ceil(spotifyData.artists.items.length / 2)}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              className="pl-4"
            />
          </ScrollView>
        </>
      ) : null}
    </View>
  );
};

export default All;
