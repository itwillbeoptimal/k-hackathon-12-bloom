import React, { useState } from "react";
import styled from "styled-components/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import BackIcon from '../assets/buttons/back.svg'
import ForwardIcon from '../assets/buttons/forward.svg'

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDay());
  });

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
        const isToday = dayNumber === today.getDate() &&
          currentDate.getMonth() === today.getMonth() &&
          currentDate.getFullYear() === today.getFullYear();

        days.push(
          <DayContainer key={i} isToday={isToday}>
            <DayText isToday={isToday}>{dayNumber}</DayText>
            <Icon name={iconName} size={20} color="#000" />
          </DayContainer>,
        );
      } else {
        days.push(<EmptyDayContainer key={i} />);
      }
    }
    return days;
  };

  const getIconForDay = (day) => {
    const icons = {
      1: "flower", 2: "tree", 3: "leaf", // ..
    };
    return icons[day] || "circle-small";
  };

  return (
    <Shadow
      startColor="rgba(0, 0, 0, 0.03)"
      finalColor="rgba(0, 0, 0, 0.01)"
      offset={[4, 4]}
      distance={12}
      containerViewStyle={{ borderRadius: 12 }}
    >
      <Container>
        <Header>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <MonthText>{`${currentDate.getMonth() + 1}월`}</MonthText>
            <YearText>{`${currentDate.getFullYear()}`}</YearText>
          </View>
          <View style={{display: 'flex', flexDirection: 'row'}}>
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
          {weekDays.map(day => (
            <WeekDayText key={day}>{day}</WeekDayText>
          ))}
        </WeekDaysContainer>
        <CalendarGrid>
          {renderDays()}
        </CalendarGrid>
      </Container>
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
    color: #3F3F3F;
    font-family: 'SpoqaHanSansNeo-Medium';
    font-size: 28px;
    color: #333;
    margin-right: 10px;
`;

const YearText = styled.Text`
    color: #3F3F3F;
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
    padding: 5px 0 5px 0;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.isToday ? "#e6f3ff" : "transparent"};
`;

const DayText = styled.Text`
    color: #3F3F3F;
    font-family: ${props => props.isToday ? 'SpoqaHanSansNeo-Medium' : 'SpoqaHanSansNeo-Light'};
    font-size: 16px;
    margin-bottom: 5px;
    color: ${props => props.isToday ? "#0066cc" : "#000"};
`;

const EmptyDayContainer = styled(DayContainer)`
`;

export default Calendar;
