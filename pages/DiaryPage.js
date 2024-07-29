import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, SafeAreaView, ScrollView, StatusBar } from "react-native";
import axios from 'axios';
import DiaryHeader from "../components/DiaryHeader";
import TodayQuestion from "../components/TodayQuestion";
import DoneListItem from "../components/DoneListItem";

const Container = styled(View)`
    flex: 1;
    background-color: #F5F5F5;
    padding: 10px;
`;

const MenuTitle = styled.Text`
    color: #3F3F3F;
    font-family: 'SpoqaHanSansNeo-Medium';
    font-size: 16px;
    margin-bottom: 16px;
`;

const DoneList = styled.View`
    padding: 16px;
`;

const AddTaskButton = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    background-color: transparent;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 8px;
    border: 1px dashed #BBB;
`;

const AddTaskIcon = styled.Text`
    color: #3F3F3F;
    font-family: 'SpoqaHanSansNeo-Regular';
    flex: 1;
    text-align: center;
`;

const AddTaskTitle = styled.Text`
    color: #3F3F3F;
    font-family: 'SpoqaHanSansNeo-Regular';
    letter-spacing: -0.3px;
    flex: 10;
`;

const dummyQuestions = {
  '2024-07-29': "최근에 몰두하고 있는 일이나,\n몰두해서 했던 일이 있나요?",
  '2024-07-30': "일주일 내 가장 기뻤던\n 순간은 무엇인가요?",
};

const dummyTasks = {
  '2024-07-29': [
    { id: 1, icon: "💊", title: "일어나서 공복에 유산균 챙겨 먹기" },
    { id: 2, icon: "🍳", title: "귀찮음을 이겨내고 밥 지어서 먹기" },
    { id: 3, icon: "🧑🏻‍💻", title: "데이터베이스 과제 제출하기" },
    { id: 4, icon: "🌆", title: "산책하면서 노을 사진 찍기" },
  ],
  '2024-07-30': [
    { id: 5, icon: "📚", title: "새로운 책 읽기 시작하기" },
    { id: 6, icon: "🏃‍♂️", title: "조깅 5km 달리기" },
  ],
};

const DiaryPage = () => {
  const formatDate = (date) => {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dayOfWeek = daysOfWeek[date.getDay()];

    return `${year}. ${month}. ${day}. (${dayOfWeek})`;
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const [doneTasks, setDoneTasks] = useState([]);
  const [todayQuestion, setTodayQuestion] = useState('');

  const fetchTasks = async (date) => {
    const localDate = date.toLocaleDateString('en-CA');
    if (process.env.NODE_ENV === 'development') {
      setDoneTasks(dummyTasks[localDate] || []);
    } else {
      try {
        const response = await axios.get(``);
        setDoneTasks(response.data.tasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        setDoneTasks([]);
      }
    }
  };

  const fetchQuestion = async (date) => {
    const localDate = date.toLocaleDateString('en-CA');
    if (process.env.NODE_ENV === 'development') {
      setTodayQuestion(dummyQuestions[localDate] || "오늘의 질문이 없습니다.");
    } else {
      try {
        const response = await axios.get(``);
        setTodayQuestion(response.data.question);
      } catch (error) {
        console.error("Failed to fetch question:", error);
        setTodayQuestion("오늘의 질문이 없습니다.");
      }
    }
  };

  useEffect(() => {
    fetchTasks(currentDate);
    fetchQuestion(currentDate);
  }, [currentDate]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <StatusBar barStyle="dark-content" />
        <DiaryHeader date={formatDate(currentDate)} setDate={setCurrentDate} />
        <ScrollView>
          <TodayQuestion questionDetail={todayQuestion} />
          <DoneList>
            <MenuTitle>던 리스트</MenuTitle>
            {doneTasks.map(task => (
              <DoneListItem key={task.id} icon={task.icon} title={task.title} />
            ))}
            <AddTaskButton>
              <AddTaskIcon>➕</AddTaskIcon>
              <AddTaskTitle>오늘 한 일 추가</AddTaskTitle>
            </AddTaskButton>
          </DoneList>
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default DiaryPage;
