import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import styled from "styled-components/native";
import MainPage from "../pages/MainPage";
import DiaryPage from "../pages/DiaryPage";
import MonthlyReportPage from "../pages/MonthlyReportPage"
import DiaryDefault from "../assets/buttons/diary_default.svg";
import DiaryActive from "../assets/buttons/diary_active.svg";
import HomeDefault from "../assets/buttons/home_default.svg";
import HomeActive from "../assets/buttons/home_active.svg";
import MessageDefault from "../assets/buttons/messgae_default.svg";
import MessageActive from "../assets/buttons/message_active.svg";
import MonthlyDefault from "../assets/buttons/monthly_default.svg";
import MonthlyActive from "../assets/buttons/monthly_active.svg";

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
  const [activeTab, setActiveTab] = useState("Home");

  const handlePress = (navigate, screen) => {
    setActiveTab(screen);
    navigate(screen);
    console.log(screen);
  };

  return (<NavigationContainer>
      <Tab.Navigator
        tabBar={props => (<TabBar>
            <TabItem onPress={() => handlePress(props.navigation.navigate, "Home")}>
              {activeTab === "Home" ? <HomeActive /> : <HomeDefault />}
            </TabItem>
            <TabItem onPress={() => handlePress(props.navigation.navigate, "Diary")}>
              {activeTab === "Diary" ? <DiaryActive /> : <DiaryDefault />}
            </TabItem>
            <TabItem onPress={() => handlePress(props.navigation.navigate, "Monthly")}>
              {activeTab === "Monthly" ? <MonthlyActive /> : <MonthlyDefault />}
            </TabItem>
            <TabItem onPress={() => handlePress(props.navigation.navigate, "Message")}>
              {activeTab === "Message" ? <MessageActive /> : <MessageDefault />}
            </TabItem>
          </TabBar>)}
      >
        <Tab.Screen name="Home" component={MainPage} options={{ headerShown: false }} />
        <Tab.Screen name="Diary" component={DiaryPage} options={{ headerShown: false }} />
        <Tab.Screen name="Monthly" component={MonthlyReportPage} options={{ headerShown: false }} />
        <Tab.Screen name="Message" component={PlaceholderScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
    </NavigationContainer>);
};

export default BottomNavigation;
