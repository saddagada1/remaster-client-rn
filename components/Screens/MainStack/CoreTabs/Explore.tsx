import React, { useState } from "react";
import Header from "../../../Header/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Container from "../../../Container/Container";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackParams } from "../../../Navigators/RootStackNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CoreTabsParams } from "../../../Navigators/CoreTabsNavigator";
import { useQuery } from "react-query";
import { searchSpotify } from "../../../../utils/createSpotifyClient";
import { Pressable, TextInput, View, ScrollView } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import TypographyBold from "../../../Typography/TypographyBold";
import All from "../../../Search/All";
import Animated, { useAnimatedStyle, useDerivedValue, withSpring } from "react-native-reanimated";
import LoadingIndicator from "../../../Visualizations/LoadingIndicator";

type ExploreProps = CompositeScreenProps<
  BottomTabScreenProps<CoreTabsParams, "Explore">,
  NativeStackScreenProps<RootStackParams>
>;

const Explore: React.FC<ExploreProps> = ({ navigation }) => {
  const [query, setQuery] = useState("");
  const { isLoading, data, refetch } = useQuery("searchSpotify", async () => searchSpotify(query), {
    enabled: false,
  });
  const filters = ["All", "Remasters", "Users", "Tracks", "Artists", "Albums"];
  const [selectedFilter, setSelectedFilter] = useState("All");

  return (
    <Container className="w-full h-full bg-stone-400 items-center">
      <Header className="w-full px-4 pt-10" title="explore" />
      <View className="flex-row mt-2 mx-4 bg-stone-300 items-center border-2 border-black rounded-2xl p-3">
        <AntDesign name="search1" size={25} />
        <TextInput
          className="ml-3 flex-1"
          onChangeText={(value) => setQuery(value)}
          value={query}
          placeholder="remasters, users, tracks, artists..."
          style={{ fontFamily: "Inter", fontSize: 15 }}
          returnKeyType="search"
          onSubmitEditing={async () => await refetch()}
          autoCorrect={false}
          allowFontScaling={false}
        />
      </View>
      <View className="flex-row items-center mt-4 py-2 border-y-2 border-black bg-stone-500">
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {filters.map((filter, index) => (
            <Pressable
              key={index}
              style={{
                marginLeft: index === 0 ? 16 : 8,
                marginRight: index === filters.length - 1 ? 16 : 0,
              }}
              className={
                filter === selectedFilter
                  ? "rounded-xl px-8 py-3 bg-black border-2 border-black"
                  : "rounded-xl px-8 py-3 bg-stone-400 border-2 border-black"
              }
              onPress={() => setSelectedFilter(filter)}
            >
              <TypographyBold style={{ color: filter === selectedFilter ? "#ffffff" : "#000000" }}>
                {filter}
              </TypographyBold>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      <View className="w-full flex-1 items-center justify-center">
        {isLoading ? (
          <LoadingIndicator size={30} colour="#000000" />
        ) : (
          <ScrollView className="w-full" showsVerticalScrollIndicator={false}>
            {data && !("error" in data) && <All spotifyData={data} />}
          </ScrollView>
        )}
      </View>
    </Container>
  );
};

export default Explore;
