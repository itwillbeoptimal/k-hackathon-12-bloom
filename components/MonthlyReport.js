import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, Button } from "react-native";
import { Shadow } from "react-native-shadow-2";
import BackIcon from "../assets/buttons/back.svg";
import ForwardIcon from "../assets/buttons/forward.svg";
import SeedIcon from "../assets/icons/flower_icons/seed.svg";
import Sprout1Icon from "../assets/icons/flower_icons/sprout1.svg";
import Sprout2Icon from "../assets/icons/flower_icons/sprout2.svg";
import TulipIcon from "../assets/icons/flower_icons/tulip.svg";
import SunFlowerIcon from "../assets/icons/flower_icons/sunflower.svg";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  });

  const [iconsData, setIconsData] = useState({});

  useEffect(() => {
    fetchIconsData();
  }, []);

  const fetchIconsData = async () => {
    try {
      const response = await axios.get("/api/icons");
      const data = response.data;
      await AsyncStorage.setItem('icons_data', JSON.stringify(data));
      setIconsData(data);
    } catch (error) {
      console.error("Failed to fetch icons from server:", error);
      const localIcons = await AsyncStorage.getItem('icons_data');
      if (localIcons) {
        setIconsData(JSON.parse(localIcons));
      } else {
        console.log("Using dummy data for icons");
        setIconsData(dummyIconsData);
      }
    }
  };

  const setDummyIconsData = async () => {
    console.log("Setting dummy icons data");
    await AsyncStorage.setItem('icons_data', JSON.stringify(dummyIconsData));
    const localIcons = await AsyncStorage.getItem('icons_data');
    console.log("Local Icons Data:", localIcons);
    if (localIcons) {
      setIconsData(JSON.parse(localIcons));
    }
  };

  const getIconComponent = (iconName) => {
    switch (iconName) {
      case "seed": return SeedIcon;
      case "sprout1": return Sprout1Icon;
      case "sprout2": return Sprout2Icon;
      case "tulip": return TulipIcon;
      case "sunflower": return SunFlowerIcon;
      default: return () => <View />;
    }
  };

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  const weekDays = ["일", "월", "화", "수", "목", "금", "토"];
  const today = new Date();

  const renderDays = () => {
    const days = [];
    const totalDays = daysInMonth + firstDayOfMonth;
    const rows = Math.ceil(totalDays / 7);

    for (let i = 0; i < rows * 7; i++) {
      const dayNumber = i - firstDayOfMonth + 1;
      const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;

      if (isCurrentMonth) {
        const iconName = getIconForDay(dayNumber);
        const IconComponent = getIconComponent(iconName);
        const isToday = dayNumber === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear();

        days.push(
          <DayContainer key={i} isToday={isToday}>
            <DayText isToday={isToday}>{dayNumber}</DayText>
            <View style={{height: 25, justifyContent: "center"}}>
              {IconComponent && <IconComponent />}
            </View>
          </DayContainer>
        );
      } else {
        days.push(<EmptyDayContainer key={i} />);
      }
    }
    return days;
  };

  const getIconForDay = (day) => {
    const monthYearKey = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
    const icons = iconsData[monthYearKey] || {};
    return icons[day] || null;
  };

  return (
    <Shadow
      startColor="rgba(0, 0, 0, 0.02)"
      finalColor="rgba(0, 0, 0, 0.01)"
      offset={[4, 4]}
      distance={8}
      containerViewStyle={{ borderRadius: 12 }}
    >
      <Container>
        <Header>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <MonthText>{`${currentDate.getMonth() + 1}월`}</MonthText>
            <YearText>{`${currentDate.getFullYear()}`}</YearText>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <ArrowButton
              onPress={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))}>
              <BackIcon />
            </ArrowButton>
            <ArrowButton
              onPress={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))}>
              <ForwardIcon />
            </ArrowButton>
          </View>
        </Header>
        <WeekDaysContainer>
          {weekDays.map(day => (<WeekDayText key={day}>{day}</WeekDayText>))}
        </WeekDaysContainer>
        <CalendarGrid>
          {renderDays()}
        </CalendarGrid>
      </Container>
      <View style={{marginTop: 20}}>
        <Button title="Set Dummy Data" onPress={setDummyIconsData} />
      </View>
    </Shadow>
  );
};

const Container = styled.View`
    padding: 30px;
    background-color: white;
    border-radius: 12px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Header = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 10px;
`;

const ArrowButton = styled.TouchableOpacity`
    padding: 10px;
`;

const MonthText = styled.Text`
    color: #2E2A2A;
    font-family: 'SpoqaHanSansNeo-Medium';
    font-size: 28px;
    margin-right: 10px;
`;

const YearText = styled.Text`
    color: #2E2A2A;
    font-family: 'SpoqaHanSansNeo-Light';
    font-size: 28px;
`;

const WeekDaysContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    margin-bottom: 10px;
`;

const WeekDayText = styled.Text`
    color: #3F3F3F;
    font-family: 'SpoqaHanSansNeo-Regular';
    width: 14.28%;
    text-align: center;
`;

const CalendarGrid = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`;

const DayContainer = styled.View`
    width: 14.28%;
    padding: 5px 0;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.isToday ? "#e6f3ff" : "transparent"};
`;

const DayText = styled.Text`
    color: #3F3F3F;
    font-family: ${props => props.isToday ? "SpoqaHanSansNeo-Medium" : "SpoqaHanSansNeo-Light"};
    font-size: 14px;
    margin-bottom: 5px;
    color: ${props => props.isToday ? "#0066cc" : "#000"};
`;

const EmptyDayContainer = styled(DayContainer)`
`;

const dummyIconsData = {
  "2024-07": {
    27: "seed",
    28: "sprout1",
    29: "sprout2",
    30: "tulip",
    31: "sunflower",
  },
  "2024-08": {
    1: "sunflower",
    2: "tulip",
    3: "sprout1",
    4: "sprout2",
    5: "seed",
  },
};

export default Calendar;
