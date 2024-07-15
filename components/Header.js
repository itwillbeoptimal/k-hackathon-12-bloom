import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity, View } from "react-native";
import ShopIcon from "../assets/buttons/shop.svg";
import UserInfoIcon from "../assets/buttons/user_info.svg";

const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
`;

const HeaderText = styled.Text`
    margin-top: 15px;
    font-size: 18px;
    font-weight: bold;
`;

const HeaderIcons = styled.View`
    flex-direction: row;
`;

const IconButton = styled.TouchableOpacity`
    margin-left: 16px;
`;

const ShopButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ marginRight: 15, marginTop: 15 }}>
      <ShopIcon />
    </View>
  </TouchableOpacity>
);

const UserInfoButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ marginTop: 15 }}>
      <UserInfoIcon />
    </View>
  </TouchableOpacity>
);

const Header = () => (
  <HeaderContainer>
    <HeaderText>OO님, 안녕하세요!</HeaderText>
    <HeaderIcons>
      <ShopButton />
      <UserInfoButton />
    </HeaderIcons>
  </HeaderContainer>
);

export default Header;
