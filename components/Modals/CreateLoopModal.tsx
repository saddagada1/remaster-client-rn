import { View, Modal, Pressable, TextInput } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { Formik } from "formik";
import AntDesign from "@expo/vector-icons/AntDesign";
import Heading from "../Typography/Heading";
import Typography from "../Typography/Typography";
import TypographyBold from "../Typography/TypographyBold";
import LoadingIndicator from "../Visualizations/LoadingIndicator";
import * as yup from "yup";
import Select from "../Select/Select";
import { keyColourReference } from "../../utils/constants";

interface CreateLoopValues {
  name: string;
  key: string;
  type: string;
}

interface CreateLoopModalProps {
  trigger: boolean;
  setTrigger: Dispatch<SetStateAction<boolean>>;
}

const CreateLoopModal: React.FC<CreateLoopModalProps> = ({ trigger, setTrigger }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={trigger}>
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="w-3/4 p-4 items-center bg-stone-400 border-2 border-black rounded-2xl">
          <Heading style={{ fontSize: 25 }}>Create Loop</Heading>
          <Formik
            initialValues={{ name: "", key: "C Major", type: "Chord" }}
            validationSchema={yup.object().shape({
              name: yup.string().required("Required"),
            })}
            onSubmit={(values: CreateLoopValues) => {
              setTrigger(false);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldTouched,
              isSubmitting,
              setFieldValue,
            }) => (
              <View className="w-full mt-5">
                <View className="flex-row justify-between items-center mb-2 px-1">
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
                    placeholder="Solo"
                    placeholderTextColor="#0000004D"
                    autoCorrect={false}
                    allowFontScaling={false}
                  />
                </View>
                <TypographyBold className="mb-2 px-1" style={{ fontSize: 15 }}>
                  Key
                </TypographyBold>
                <Select
                  data={Object.keys(keyColourReference).flatMap((key) => {
                    return [key + " Major", key + " Minor"];
                  })}
                  onSelect={(value) => setFieldValue("key", value)}
                  icon={<AntDesign name="key" size={25} />}
                  value={values.key}
                  containerClassName="z-20"
                  boxClassName="bg-stone-300 border-2 border-black rounded-2xl p-3 mb-5"
                  dropdownClassName="bg-stone-300 border-2 border-black rounded-2xl px-3 h-[200]"
                  itemClassName="p-2 bg-stone-200/50 rounded-lg"
                />
                <TypographyBold className="mb-2 px-1" style={{ fontSize: 15 }}>
                  Type
                </TypographyBold>
                <Select
                  data={["Chord", "Tab"]}
                  onSelect={(value) => setFieldValue("type", value)}
                  icon={<AntDesign name="eyeo" size={25} />}
                  value={values.type}
                  containerClassName="z-10"
                  boxClassName="bg-stone-300 border-2 border-black rounded-2xl p-3 mb-7"
                  dropdownClassName="bg-stone-300 border-2 border-black rounded-2xl px-3"
                  itemClassName="p-2 bg-stone-200/50 rounded-lg"
                />
                <View className="flex-row">
                  <Pressable
                    disabled={isSubmitting}
                    onPress={() => setTrigger(false)}
                    className="flex-1 mr-1 justify-center items-center p-5 rounded-2xl bg-black border-2 border-black"
                  >
                    <TypographyBold style={{ fontSize: 15, color: "#ffffff" }}>Exit</TypographyBold>
                  </Pressable>
                  <Pressable
                    onPress={() => handleSubmit()}
                    disabled={isSubmitting}
                    className="flex-1 ml-1 justify-center items-center p-5 rounded-2xl bg-black border-2 border-black"
                  >
                    {isSubmitting ? (
                      <LoadingIndicator size={15} colour="#ffffff" />
                    ) : (
                      <TypographyBold style={{ fontSize: 15, color: "#ffffff" }}>
                        Create
                      </TypographyBold>
                    )}
                  </Pressable>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </Modal>
  );
};

export default CreateLoopModal;
