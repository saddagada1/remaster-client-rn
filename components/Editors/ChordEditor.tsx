import { Pressable, View } from "react-native";
import React, { useState } from "react";
import Heading from "../Typography/Heading";
import SelectChordModal from "../Modals/SelectChordModal";

const ChordEditor: React.FC = () => {
  const [selectChord, setSelectChord] = useState(false);
  return (
    <View className="w-full h-full justify-center items-center">
      <SelectChordModal trigger={selectChord} setTrigger={setSelectChord} />
      <Pressable
        className="p-4 flex-row justify-center items-center bg-black rounded-lg"
        onPress={() => setSelectChord(true)}
      >
        <Heading style={{ fontSize: 15, color: "#ffffff" }}>Select a Chord</Heading>
      </Pressable>
    </View>
  );
};

export default ChordEditor;
