import { View, Modal, Pressable } from "react-native";
import React, { Dispatch, SetStateAction, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Heading from "../Typography/Heading";
import TypographyBold from "../Typography/TypographyBold";
import Select from "../Select/Select";
import SearchSelect from "../Select/SearchSelect";
import { ChordsObject, Chord as ChordType } from "../../utils/types/chords";
import ChordsData from "../../assets/data/chords.json";
import { ScrollView } from "react-native-gesture-handler";
import Chord from "../Chord/Chord";

interface SelectChordModalProps {
  trigger: boolean;
  setTrigger: Dispatch<SetStateAction<boolean>>;
}

const SelectChordModal: React.FC<SelectChordModalProps> = ({ trigger, setTrigger }) => {
  const [selectedKey, setSelectedKey] = useState("C");
  const [selectedVoicing, setSelectedVoicing] = useState("");
  const [selectedChord, setSelectedChord] = useState<ChordType | null>(null);
  const data = ChordsData as ChordsObject;
  return (
    <Modal animationType="fade" transparent={true} visible={trigger}>
      <View className="flex-1 bg-black/50 justify-center items-center p-4">
        <View className="w-full h-3/4 p-4 bg-stone-400 border-2 border-black rounded-2xl">
          <Heading className="w-full text-center mb-5" style={{ fontSize: 25 }}>
            Select Chord
          </Heading>
          <TypographyBold className="mb-2 px-1" style={{ fontSize: 15 }}>
            Key
          </TypographyBold>
          <Select
            data={["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]}
            onSelect={(value) => {
              setSelectedKey(value);
              setSelectedVoicing("");
            }}
            icon={<AntDesign name="key" size={25} />}
            value={selectedKey}
            containerClassName="z-20"
            boxClassName="bg-stone-300 border-2 border-black rounded-2xl p-3 mb-5"
            dropdownClassName="bg-stone-300 border-2 border-black rounded-2xl px-3 h-[200]"
            itemClassName="p-2 bg-stone-200/50 rounded-lg"
          />
          <TypographyBold className="mb-2 px-1" style={{ fontSize: 15 }}>
            Voicing
          </TypographyBold>
          <SearchSelect
            data={Object.keys(data).filter((key) => {
              const keyRegex = new RegExp(`^${selectedKey}`);
              const keySharpRegex = new RegExp(`^${selectedKey}#`);
              return keyRegex.test(key) && !keySharpRegex.test(key);
            })}
            onSelect={(value) => setSelectedVoicing(value)}
            icon={<AntDesign name="key" size={25} />}
            value={selectedVoicing}
            containerClassName="z-10"
            boxClassName="bg-stone-300 border-2 border-black rounded-2xl p-3 mb-5"
            dropdownClassName="bg-stone-300 border-2 border-black rounded-2xl px-3 h-[200]"
            itemClassName="p-2 bg-stone-200/50 rounded-lg"
          />
          <View className="flex-1 border-2 border-black rounded-2xl mb-5 px-4">
            {selectedVoicing !== "" && (
              <ScrollView showsVerticalScrollIndicator={false}>
                {data[selectedVoicing].map((chord, index) => (
                  <Pressable
                    key={index}
                    className={`w-full h-fit px-4 mb-4 ${index === 0 ? "mt-4" : ""} ${
                      chord === selectedChord ? "bg-black" : ""
                    } justify-center items-center border-2 border-black rounded-2xl`}
                    onPress={() => setSelectedChord(chord)}
                  >
                    <Chord
                      chord={{
                        ...chord,
                        fingers: chord.fingers.map((finger) => {
                          if (finger[1] === "x") {
                            return [finger[0], -1];
                          }
                          return [finger[0], finger[1]];
                        }),
                      }}
                      colour={chord === selectedChord ? "#ffffff" : "#000000"}
                      numFrets={5}
                      numStrings={6}
                    />
                  </Pressable>
                ))}
              </ScrollView>
            )}
          </View>
          <View className="flex-row">
            <Pressable
              onPress={() => setTrigger(false)}
              className="flex-1 mr-1 justify-center items-center p-5 rounded-2xl bg-black border-2 border-black"
            >
              <TypographyBold style={{ fontSize: 15, color: "#ffffff" }}>Exit</TypographyBold>
            </Pressable>
            <Pressable
              onPress={() => console.log("select")}
              className="flex-1 ml-1 justify-center items-center p-5 rounded-2xl bg-black border-2 border-black"
            >
              <TypographyBold style={{ fontSize: 15, color: "#ffffff" }}>Select</TypographyBold>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SelectChordModal;
