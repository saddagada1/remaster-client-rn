import { View, Image } from "react-native";
import React from "react";
import { AlbumObjectSimplified } from "../../utils/types/spotify";
import TypographyBold from "../Typography/TypographyBold";
import Entypo from "@expo/vector-icons/Entypo";
import Typography from "../Typography/Typography";
import { keyReference } from "../../utils/constants";
import Portal from "../Visualizations/Portal";

interface AlbumResultProps {
  album: AlbumObjectSimplified;
}

const AlbumResult: React.FC<AlbumResultProps> = ({ album }) => {
  const image = album.images.find((image) => image.url !== undefined);
  return (
    <View className="mr-4 my-2 flex-row rounded-lg border-2 border-black bg-stone-300 shadow overflow-hidden">
      <View className="w-[100] h-[100] border-r-2 border-black">
        {image ? (
          <Image
            style={{
              width: "100%",
              height: "100%",
            }}
            source={{ uri: image.url }}
          />
        ) : (
          <Portal width={100} height={100} keys={keyReference} animate={false} />
        )}
      </View>
      <View className="py-[6] pr-2 ml-2 justify-between">
        <View>
          <TypographyBold
            numberOfLines={1}
            ellipsizeMode="tail"
            className="mb-1"
            style={{ width: 200, fontSize: 16 }}
          >
            {album.name}
          </TypographyBold>
          <Typography numberOfLines={1} ellipsizeMode="tail" style={{ width: 200 }}>
            {album.artists.map((artist, index) => (
              <Typography key={index}>
                {index === album.artists.length - 1 ? artist.name : `${artist.name}, `}
              </Typography>
            ))}
          </Typography>
        </View>
        <View className="items-end">
          <Entypo name="spotify-with-circle" size={25} />
        </View>
      </View>
    </View>
  );
};

export default AlbumResult;
