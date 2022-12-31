import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../../Header/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack/lib/typescript/src/types";
import { StackParams } from "../../Navigator/Navigator";
import Container from "../../Container/Container";
import Navbar from "../../Navbar/Navbar";

type HomeProps = NativeStackScreenProps<StackParams, "Home">;

const Home: React.FC<HomeProps> = ({ navigation }) => {
  return (
    <Container>
      <Header title="explore"/>
      <Navbar screen="home"/>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({});
