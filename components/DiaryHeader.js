import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity, View } from "react-native";
import CalendarIcon from "../assets/buttons/calendar.svg";

const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
`;

const HeaderText = styled.Text`
    color: #3F3F3F;
    font-family: 'Pretendard-SemiBold';
    font-size: 18px;
`;

const HeaderIcons = styled.View`
    flex-direction: row;
`;

const CalendarButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ marginRight: 15 }}>
      <CalendarIcon />
    </View>
  </TouchableOpacity>
);

const DiaryHeader = ({ date }) => (
  <HeaderContainer>
    <HeaderText>{date}</HeaderText>
    <HeaderIcons>
      <CalendarButton />
    </HeaderIcons>
  </HeaderContainer>
);

export default DiaryHeader;
