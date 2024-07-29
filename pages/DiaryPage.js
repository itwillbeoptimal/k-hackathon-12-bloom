import styled from "styled-components/native";
import { useState } from "react";
import { Text, View, SafeAreaView } from "react-native";
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

const DiaryPage = () => {
  const formatDate = (date) => {
    const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dayOfWeek = daysOfWeek[date.getDay()];

    return `${year}. ${month}. ${day}. (${dayOfWeek})`;
  };

  const [currentDate, setCurrentDate] = useState(formatDate(new Date()));

  return (<SafeAreaView style={{ flex: 1 }}>
      <Container>
        <DiaryHeader date={currentDate} />
        <TodayQuestion questionDetail={"최근에 몰두하고 있는 일이나,\n몰두해서 했던 일이 있나요?"} />
        <DoneList>
          <MenuTitle>던 리스트</MenuTitle>
          <DoneListItem icon="💊" title="일어나서 공복에 유산균 챙겨 먹기"></DoneListItem>
          <DoneListItem icon="🍳" title="귀찮음을 이겨내고 밥 지어서 먹기"></DoneListItem>
          <DoneListItem icon="🧑🏻‍💻" title="데이터베이스 과제 제출하기"></DoneListItem>
          <DoneListItem icon="🌆" title="산책하면서 노을 사진 찍기"></DoneListItem>
          <AddTaskButton>
            <AddTaskIcon>➕</AddTaskIcon>
            <AddTaskTitle>오늘 한 일 추가</AddTaskTitle>
          </AddTaskButton>
        </DoneList>
      </Container>
    </SafeAreaView>
  );
};

export default DiaryPage;
