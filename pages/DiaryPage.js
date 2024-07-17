import styled from "styled-components/native";
import { useState } from "react";
import { View, SafeAreaView } from "react-native";
import DiaryHeader from "../components/DiaryHeader";
import TodayQuestion from "../components/TodayQuestion";

const Container = styled(View)`
    flex: 1;
    background-color: #F5F5F5;
    padding: 10px;
`;

const DiaryPage = () => {
  const formatDate = (date) => {
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dayOfWeek = daysOfWeek[date.getDay()];

    return `${year}. ${month}. ${day}. (${dayOfWeek})`;
  };

  const [currentDate, setCurrentDate] = useState(formatDate(new Date()));

  return (<SafeAreaView style={{flex: 1}}>
      <Container>
        <DiaryHeader date={currentDate}/>
        <TodayQuestion questionDetail={"최근에 몰두하고 있는 일이나,\n몰두해서 했던 일이 있나요?"}/>
      </Container>
    </SafeAreaView>
  );
};

export default DiaryPage;
