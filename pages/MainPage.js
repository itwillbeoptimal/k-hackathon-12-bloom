import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, SafeAreaView, StatusBar, ScrollView } from "react-native";
import MainHeader from "../components/MainHeader";
import Progress from "../components/Progress";
import QuestItem from "../components/QuestItem";
import WaterIcon from "../assets/icons/quest_icons/water.svg";
import StretchIcon from "../assets/icons/quest_icons/stretch.svg";
import WalkIcon from "../assets/icons/quest_icons/walk.svg";
import PrioritizeIcon from "../assets/icons/quest_icons/prioritize.svg";
import TulipIcon from "../assets/icons/flower_icons/tulip-small.svg";

const Container = styled(View)`
    flex: 1;
    background-color: #F5F5F5;
    padding: 10px;
`;

const QuestList = styled.View`
    padding: 16px;
`;

const MenuTitle = styled.Text`
    color: #3F3F3F;
    font-family: 'SpoqaHanSansNeo-Medium';
    font-size: 16px;
    margin-bottom: 16px;
`;

const MainPage = () => {
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    const fetchQuests = async () => {
      // 여기에 백엔드 API 호출
      const dummyData = [{ id: 1, icon: <WaterIcon />, title: "물 여덟 잔 마시기", count: 8, hasCounter: true }, {
        id: 2,
        icon: <StretchIcon />,
        title: "스트레칭 세 번 하기",
        count: 3,
        hasCounter: true,
      }, { id: 3, icon: <WalkIcon />, title: "3,000 걸음 이상 걷기", count: -1, hasCounter: false }, {
        id: 4,
        icon: <PrioritizeIcon />,
        title: "할 일의 우선 순위 정하기",
        count: -1,
        hasCounter: false,
      }];
      setQuests(dummyData);
    };

    fetchQuests();
  }, []);

  return (<SafeAreaView style={{ flex: 1 }}>
      <Container>
        <StatusBar barStyle="dark-content" />
        <ScrollView>
          <MainHeader />
          <Progress todayFlowerIcon={<TulipIcon />} />
          <QuestList>
            <MenuTitle>
              데일리 퀘스트
            </MenuTitle>
            {quests.map(quest => (<QuestItem
                key={quest.id}
                icon={quest.icon}
                title={quest.title}
                initialCount={quest.count}
                hasCounter={quest.hasCounter}
              />))}
          </QuestList>
        </ScrollView>
      </Container>
    </SafeAreaView>);
};

export default MainPage;
