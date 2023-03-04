import { View, Pressable, StyleProp, ViewStyle, Keyboard, FlatList } from "react-native";
import React, { ReactElement, useCallback, useRef, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Typography from "../Typography/Typography";
import { TextInput } from "react-native-gesture-handler";

interface SearchSelectProps {
  data: string[];
  onSelect: (value: string, index: number) => void;
  value: string;
  icon: ReactElement<any, any>;
  containerClassName: string;
  containerStyles?: StyleProp<ViewStyle>;
  boxClassName: string;
  boxStyles?: StyleProp<ViewStyle>;
  dropdownClassName: string;
  dropdownStyles?: StyleProp<ViewStyle>;
  itemClassName: string;
  itemStyles?: StyleProp<ViewStyle>;
}

const SearchSelect: React.FC<SearchSelectProps> = ({
  data,
  onSelect,
  icon,
  value,
  containerClassName,
  containerStyles,
  boxClassName,
  boxStyles,
  dropdownClassName,
  dropdownStyles,
  itemClassName,
  itemStyles,
}) => {
  const inputRef = useRef<TextInput | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState("");

  const renderItem = useCallback(
    ({ item, index }: { item: string; index: number }) => (
      <Pressable
        key={index}
        onPress={() => {
          onSelect(item, index);
          setQuery("");
          setIsSearching(false);
          Keyboard.dismiss();
        }}
        className={itemClassName}
        style={[itemStyles, { marginTop: index === 0 ? 12 : 0, marginBottom: 12 }]}
      >
        <Typography style={{ fontSize: 15 }}>{item}</Typography>
      </Pressable>
    ),
    []
  );

  return (
    <View className={containerClassName} style={containerStyles}>
      <View
        className={boxClassName}
        style={boxStyles}
        onLayout={({ nativeEvent }) => setHeight(nativeEvent.layout.height)}
      >
        <View className="flex-row items-center">
          {icon}
          <TextInput
            ref={inputRef}
            className="ml-3 flex-1"
            onChangeText={(value) => setQuery(value)}
            value={isSearching ? query : value}
            onPressIn={() => {
              inputRef.current?.clear();
              setIsSearching(true);
            }}
            style={{ fontFamily: "Inter", fontSize: 15 }}
            autoCorrect={false}
            allowFontScaling={false}
          />
          <AntDesign name={isSearching ? "up" : "down"} size={15} />
        </View>
      </View>
      {isSearching && height && (
        <View
          className={dropdownClassName + " absolute w-full mt-2"}
          style={[{ transform: [{ translateY: height }] }, dropdownStyles]}
        >
          <FlatList
            data={data.filter((item) => item.toLowerCase().includes(query.toLowerCase()))}
            renderItem={renderItem}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="always"
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
    </View>
  );
};

export default SearchSelect;
