import { Pressable, View } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import React from 'react'

interface NavbarProps {
    screen?: string;
}

const Navbar: React.FC<NavbarProps> = ({screen}) => {
  return (
    <View className='w-5/6 p-4 bg-black rounded-2xl absolute bottom-10 flex-row opacity-80 shadow'>
      <Pressable className='justify-center items-center flex-1'>
        <Icon name="home" size={25} color={screen === "home" ? "#fff" : "#383838"}/>
      </Pressable>
      <Pressable className='justify-center items-center flex-1'>
        <Icon name="isv" size={25} color={screen === "library" ? "#fff" : "#383838"}/>
      </Pressable>
      <Pressable className='justify-center items-center flex-1'>
        <Icon name="meh" size={25} color={screen === "profile" ? "#fff" : "#383838"}/>
      </Pressable>
    </View>
  )
}

export default Navbar