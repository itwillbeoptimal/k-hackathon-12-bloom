import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";

import MainPage from "../pages/MainPage";  // MainPage 경로 수정

const Tab = createBottomTabNavigator();

const TabBar = styled.View`
    flex-direction: row;
    background-color: #f5f5f5;
    height: 90px;
`;

const TabItem = styled.TouchableOpacity`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const TabLabel = styled.Text`
    font-size: 10px;
    margin-top: 4px;
`;

const PlaceholderScreen = () => null;  // 임시 빈 화면

const BottomNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={props => (
          <TabBar>
            <TabItem onPress={() => props.navigation.navigate("Home")}>
              <Icon name="home-outline" size={24} color="#4A90E2" />
              <TabLabel>홈</TabLabel>
            </TabItem>
            <TabItem onPress={() => props.navigation.navigate("List")}>
              <Icon name="list-outline" size={24} color="#4A90E2" />
              <TabLabel>목록</TabLabel>
            </TabItem>
            <TabItem onPress={() => props.navigation.navigate("Favorites")}>
              <Icon name="heart-outline" size={24} color="#4A90E2" />
              <TabLabel>즐겨찾기</TabLabel>
            </TabItem>
            <TabItem onPress={() => props.navigation.navigate("Settings")}>
              <Icon name="settings-outline" size={24} color="#4A90E2" />
              <TabLabel>설정</TabLabel>
            </TabItem>
          </TabBar>
        )}
      >
        <Tab.Screen name="Home" component={MainPage} options={{ headerShown: false }} />
        <Tab.Screen name="List" component={PlaceholderScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Favorites" component={PlaceholderScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Settings" component={PlaceholderScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomNavigation;
