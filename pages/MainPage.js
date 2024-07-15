import React from "react";
import styled from "styled-components/native";
import { SafeAreaView, StatusBar, ScrollView } from "react-native";
import Header from "../components/Header";
import Progress from "../components/Progress";
import QuestItem from "../components/QuestItem";
import WaterIcon from "../assets/icons/quest_icons/water.svg";
import StretchIcon from "../assets/icons/quest_icons/stretch.svg";
import WalkIcon from "../assets/icons/quest_icons/walk.svg";
import TulipIcon from "../assets/icons/flower_icons/tulip.svg";

const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: #F5F5F5;
`;

const QuestList = styled.View`
    padding: 16px;
`;

const QuestListTitle = styled.Text`
    font-family: 'Pretendard-SemiBold';
    font-size: 16px;
    margin-bottom: 16px;
`;

const MainPage = () => {
  return (<Container>
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <Header />
        <Progress todayFlowerIcon={<TulipIcon />} />
        <QuestList>
          <QuestListTitle>
            데일리 퀘스트
          </QuestListTitle>
          <QuestItem icon={<WaterIcon />} title="물 여덟 잔 마시기" count={6} hasCounter={true} />
          <QuestItem icon={<StretchIcon />} title="스트레칭 세 번 하기" count={3} hasCounter={true} />
          <QuestItem icon={<WalkIcon />} title="3,000 걸음 이상 걷기" count={0} />
        </QuestList>
      </ScrollView>
    </Container>);
};

export default MainPage;
