import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, SafeAreaView, ScrollView, StatusBar, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import DiaryHeader from "../components/DiaryHeader";
import TodayQuestion from "../components/TodayQuestion";
import TodaySaying from "../components/TodaySaying";
import DoneListItem from "../components/DoneListItem";
import DoneTaskModal from "../modals/DoneTaskModal";

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
  "2024-07-29": "최근에 몰두하고 있는 일이나, 몰두해서 했던 일이 있나요?",
  "2024-07-30": "일주일 내 가장 기뻤던 순간은 무엇인가요?",
};

const dummySayings = {
  "2024-07-29": "실패가 나태함에 대한 유일한 징벌은 아니다. 다른 이들의 성공도 있지 않은가.",
  "2024-07-30": "지식이 없는 성실은 허약하고 쓸모 없다. 성실이 없는 지식은 위험하고 두려운 것이다.",
}

const dummyTasks = {
  "2024-07-29": [
    { id: 1, icon: "💊", title: "일어나서 공복에 유산균 챙겨 먹기" },
    { id: 2, icon: "🍳", title: "귀찮음을 이겨내고 밥 지어서 먹기" },
    { id: 3, icon: "🧑🏻‍💻", title: "데이터베이스 과제 제출하기" },
    { id: 4, icon: "🌆", title: "산책하면서 노을 사진 찍기" }
  ],
  "2024-07-30": [
    { id: 5, icon: "📚", title: "새로운 책 읽기 시작하기" },
    { id: 6, icon: "🏃‍♂️", title: "조깅 5km 달리기" }
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

  const getLocalDateString = (date) => {
    let offset = date.getTimezoneOffset() * 60000;
    let dateOffset = new Date(date.getTime() - offset);
    return dateOffset.toISOString().split("T")[0];
  };

  const [currentDate, setCurrentDate] = useState(new Date());
  const [doneTasks, setDoneTasks] = useState([]);
  const [todayQuestion, setTodayQuestion] = useState("");
  const [todaySaying, setTodaySaying] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const localStorageKey = `tasks_${getLocalDateString(currentDate)}`;

  const fetchTasks = async (date) => {
    const localDate = getLocalDateString(date);

    try {
      const response = await axios.get(`/api/tasks/${localDate}`);
      setDoneTasks(response.data.tasks);
    } catch (error) {
      console.error("Failed to fetch tasks from server:", error);
      const localTasks = await AsyncStorage.getItem(`tasks_${localDate}`);
      if (localTasks) {
        setDoneTasks(JSON.parse(localTasks));
      } else {
        console.log("Using dummy data for tasks");
        setDoneTasks(dummyTasks[localDate] || []);
      }
    }
  };

  const fetchQuestion = async (date) => {
    const localDate = getLocalDateString(date);

    try {
      const response = await axios.get(`/api/questions/${localDate}`);
      setTodayQuestion(response.data.question);
    } catch (error) {
      console.error("Failed to fetch question from server:", error);
      console.log("Using dummy data for question");
      setTodayQuestion(dummyQuestions[localDate] || "오늘의 질문이 없습니다.");
    }
  };

  const fetchSaying = async (date) => {
    const localDate = getLocalDateString(date);

    try {
      const response = await axios.get(`/api/saying/${localDate}`);
      setTodayQuestion(response.data.saying);
    } catch (error) {
      console.error("Failed to fetch saying from server:", error);
      console.log("Using dummy data for saying");
      setTodaySaying(dummySayings[localDate] || "오늘의 명언이 없습니다.");
    }
  };

  const handleAddTask = async () => {
    const newTask = {
      id: doneTasks.length + 1,
      icon: "📝",
      title: "새로운 작업",
    };

    const updatedTasks = [...doneTasks, newTask];
    setDoneTasks(updatedTasks);

    try {
      await AsyncStorage.setItem(localStorageKey, JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Failed to save new task:", error);
    }
  };

  const handleTaskPress = (task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const handleSaveTask = async (updatedTask) => {
    const updatedTasks = doneTasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setDoneTasks(updatedTasks);

    try {
      await AsyncStorage.setItem(localStorageKey, JSON.stringify(updatedTasks));
      // 서버 통신 코드 (추후 구현)
      // await axios.put(`/api/tasks/${updatedTask.id}`, updatedTask);
    } catch (error) {
      console.error('Failed to save updated task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    const updatedTasks = doneTasks.filter(task => task.id !== taskId);
    setDoneTasks(updatedTasks);

    try {
      await AsyncStorage.setItem(localStorageKey, JSON.stringify(updatedTasks));
      // 서버 통신 코드 (추후 구현)
      // await axios.delete(`/api/tasks/${taskId}`);
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const initializeDummyData = async () => {
    for (const [date, tasks] of Object.entries(dummyTasks)) {
      const key = `tasks_${date}`;
      try {
        await AsyncStorage.setItem(key, JSON.stringify(tasks));
      } catch (error) {
        console.error(`Failed to initialize dummy data for ${date}:`, error);
      }
    }
    console.log("Dummy data initialized.");
  };

  useEffect(() => {
    fetchTasks(currentDate);
    fetchQuestion(currentDate);
    fetchSaying(currentDate)
  }, [currentDate]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <StatusBar barStyle="dark-content" />
        <DiaryHeader date={formatDate(currentDate)} setDate={setCurrentDate} />
        <ScrollView>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TodayQuestion questionDetail={todayQuestion} />
            <TodaySaying sayingDetail={todaySaying}/>
          </ScrollView>
          <DoneList>
            <MenuTitle>던 리스트</MenuTitle>
            {doneTasks.map(task => (
              <DoneListItem
                key={task.id}
                icon={task.icon}
                title={task.title}
                onPress={() => handleTaskPress(task)}
              />
            ))}
            <AddTaskButton onPress={handleAddTask}>
              <AddTaskIcon>➕</AddTaskIcon>
              <AddTaskTitle>오늘 한 일 추가</AddTaskTitle>
            </AddTaskButton>
            <Button title="Set Dummy Icons Data" onPress={initializeDummyData} />
          </DoneList>
        </ScrollView>
        <DoneTaskModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          task={selectedTask}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
          date={formatDate(currentDate)}
        />
      </Container>
    </SafeAreaView>
  );
};

export default DiaryPage;
