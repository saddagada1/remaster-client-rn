import { View, Pressable, StyleProp, ViewStyle, ScrollView } from "react-native";
import React, { ReactElement, useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Typography from "../Typography/Typography";

interface SelectProps {
  data: string[];
  onSelect: (value: string) => void;
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

const Select: React.FC<SelectProps> = ({
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
  const [dropdown, setDropdown] = useState(false);
  return (
    <View className={containerClassName} style={containerStyles}>
      <View className={boxClassName} style={boxStyles}>
        <Pressable className="flex-row items-center" onPress={() => setDropdown(!dropdown)}>
          {icon}
          <Typography className="ml-3 flex-1" style={{ fontSize: 15 }}>
            {value}
          </Typography>
          <AntDesign name={dropdown ? "up" : "down"} size={15} />
        </Pressable>
      </View>
      {dropdown && (
        <View className={dropdownClassName + " absolute w-full"} style={dropdownStyles}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {data.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  onSelect(item);
                  setDropdown(false);
                }}
                className={itemClassName}
                style={[itemStyles, { marginTop: index === 0 ? 12 : 0, marginBottom: 12 }]}
              >
                <Typography style={{ fontSize: 15 }}>{item}</Typography>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Select;
