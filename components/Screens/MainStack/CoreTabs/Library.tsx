import React from "react";
import Header from "../../../Header/Header";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Container from "../../../Container/Container";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackParams } from "../../../Navigators/RootStackNavigator";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { CoreTabsParams } from "../../../Navigators/CoreTabsNavigator";
import { Pressable } from "react-native";
import { resetAuthentication } from "../../../../redux/slices/authSlice";
import { useAppDispatch } from "../../../../utils/hooks/reduxHooks";
import { delAuthKeys } from "../../../../utils/secureStore";
import Title from "../../../Typography/Title";
import { SvgXml } from "react-native-svg";

type LibraryProps = CompositeScreenProps<
  BottomTabScreenProps<CoreTabsParams, "Library">,
  NativeStackScreenProps<RootStackParams>
>;

const xmltest = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.com/svgjs" preserveAspectRatio="xMidYMid meet" viewBox="0 0 400 530.4666778564454"><text x="200" y="1.5333340167999268" font-family="Inter" font-size="48" text-anchor="middle" fill="#000000" class="title"><tspan dy="62.400000000000006" x="200">D/C</tspan></text><circle r="14.399999999999999" cx="176" cy="98.60000991821289" fill="none" stroke-width="2" stroke="#000000" class="open-string open-string-2"></circle><line x1="65.6" y1="84.20000991821288" x2="94.39999999999999" y2="113.00000991821288" stroke-width="2" stroke="#000000"></line><line x1="65.6" y1="113.00000991821288" x2="94.39999999999999" y2="84.20000991821288" stroke-width="2" stroke="#000000"></line><line x1="79" y1="127.60000991821289" x2="321" y2="127.60000991821289" stroke-width="10" stroke="#000000"></line><line x1="80" y1="204.6000099182129" x2="320" y2="204.6000099182129" stroke-width="2" stroke="#000000"></line><line x1="80" y1="276.6000099182129" x2="320" y2="276.6000099182129" stroke-width="2" stroke="#000000"></line><line x1="80" y1="348.6000099182129" x2="320" y2="348.6000099182129" stroke-width="2" stroke="#000000"></line><line x1="80" y1="420.6000099182129" x2="320" y2="420.6000099182129" stroke-width="2" stroke="#000000"></line><line x1="80" y1="492.6000099182129" x2="320" y2="492.6000099182129" stroke-width="2" stroke="#000000"></line><line x1="80" y1="132.6000099182129" x2="80" y2="493.6000099182129" stroke-width="2" stroke="#000000"></line><line x1="128" y1="132.6000099182129" x2="128" y2="493.6000099182129" stroke-width="2" stroke="#000000"></line><line x1="176" y1="132.6000099182129" x2="176" y2="493.6000099182129" stroke-width="2" stroke="#000000"></line><line x1="224" y1="132.6000099182129" x2="224" y2="493.6000099182129" stroke-width="2" stroke="#000000"></line><line x1="272" y1="132.6000099182129" x2="272" y2="493.6000099182129" stroke-width="2" stroke="#000000"></line><line x1="320" y1="132.6000099182129" x2="320" y2="493.6000099182129" stroke-width="2" stroke="#000000"></line><circle r="15.600000000000001" cx="320" cy="240.6000099182129" fill="#000000" stroke-width="0" stroke="#000000" class="finger finger-string-5 finger-fret-1 finger-string-5-fret-1 finger-circle"></circle><circle r="15.600000000000001" cx="272" cy="312.6000099182129" fill="#000000" stroke-width="0" stroke="#000000" class="finger finger-string-4 finger-fret-2 finger-string-4-fret-2 finger-circle"></circle><circle r="15.600000000000001" cx="224" cy="240.6000099182129" fill="#000000" stroke-width="0" stroke="#000000" class="finger finger-string-3 finger-fret-1 finger-string-3-fret-1 finger-circle"></circle><circle r="15.600000000000001" cx="128" cy="312.6000099182129" fill="#000000" stroke-width="0" stroke="#000000" class="finger finger-string-1 finger-fret-2 finger-string-1-fret-2 finger-circle"></circle><text x="80" y="507.00000991821287" font-family="Inter" font-size="28" text-anchor="middle" dominant-baseline="central" fill="#000000" class="tuning tuning-0">E</text><text x="128" y="507.00000991821287" font-family="Inter" font-size="28" text-anchor="middle" dominant-baseline="central" fill="#000000" class="tuning tuning-1">A</text><text x="176" y="507.00000991821287" font-family="Inter" font-size="28" text-anchor="middle" dominant-baseline="central" fill="#000000" class="tuning tuning-2">D</text><text x="224" y="507.00000991821287" font-family="Inter" font-size="28" text-anchor="middle" dominant-baseline="central" fill="#000000" class="tuning tuning-3">G</text><text x="272" y="507.00000991821287" font-family="Inter" font-size="28" text-anchor="middle" dominant-baseline="central" fill="#000000" class="tuning tuning-4">B</text><text x="320" y="507.00000991821287" font-family="Inter" font-size="28" text-anchor="middle" dominant-baseline="central" fill="#000000" class="tuning tuning-5">E</text><circle r="0" cx="0" cy="0" fill="none" stroke-width="0" stroke="transparent" class="top-left"></circle><circle r="0" cx="400" cy="0" fill="none" stroke-width="0" stroke="transparent" class="top-right"></circle></svg>`;

const Library: React.FC<LibraryProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const logout = async () => {
    await delAuthKeys();
    dispatch(resetAuthentication());
    navigation.replace("Auth", { screen: "Onboarding" });
  };
  return (
    <Container noPadding={true}>
      <Header title="library" />
      <Pressable onPress={async () => await logout()}>
        <Title>Log Out</Title>
      </Pressable>
      <SvgXml xml={xmltest} width="100%" height="100%" />
    </Container>
  );
};

export default Library;
