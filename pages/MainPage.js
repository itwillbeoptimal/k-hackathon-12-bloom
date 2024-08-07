import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { View, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import MainHeader from "../components/MainHeader";
import Progress from "../components/Progress";
import QuestItem from "../components/QuestItem";
import QuestSelectionModal from "../modals/QuestSelectionModal";
import iconMap from "../assets/icons/iconMap"; // 새로운 파일의 경로를 적어주세요

const Container = styled(View)`
    flex: 1;
    background-color: #F5F5F5;
    padding: 10px;
`;

const QuestList = styled(View)`
    padding: 16px;
`;

const MenuTitle = styled(Text)`
    color: #3F3F3F;
    font-family: 'SpoqaHanSansNeo-Medium';
    font-size: 16px;
    margin-bottom: 16px;
`;

const SelectButton = styled(TouchableOpacity)`
    background-color: #007BFF;
    padding: 10px;
    border-radius: 5px;
    align-items: center;
    margin: 10px;
`;

const ButtonText = styled(Text)`
    color: white;
    font-size: 16px;
`;

const MainPage = () => {
  const [quests, setQuests] = useState([]);
  const [todayFlowerIcon, setTodayFlowerIcon] = useState(<></>);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedQuests = await AsyncStorage.getItem('@quests');
        if (storedQuests !== null) {
          const parsedQuests = JSON.parse(storedQuests);
          setQuests(parsedQuests.map(q => ({ ...q, icon: iconMap[q.iconType] })));
        }
        const storedFlower = await AsyncStorage.getItem('@flower');
        if (storedFlower !== null) {
          const flower = JSON.parse(storedFlower);
          setTodayFlowerIcon(iconMap[flower.iconType]);
        }
      } catch (e) {
        console.error(e);
      }
    };

    loadStoredData();
  }, []);

  const handleModalConfirm = (selectedQuests, selectedFlower) => {
    const questsToSave = selectedQuests.map(quest => ({
      id: quest.id,
      iconType: quest.iconType,
      title: quest.title,
      count: quest.count,
      hasCounter: quest.hasCounter
    }));
    setQuests(questsToSave);
    setTodayFlowerIcon(selectedFlower.icon);
    saveQuests(questsToSave);
    saveFlower(selectedFlower);
    setModalVisible(false);
  };

  const saveQuests = async (quests) => {
    try {
      const jsonValue = JSON.stringify(quests);
      await AsyncStorage.setItem('@quests', jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  const saveFlower = async (flower) => {
    try {
      const jsonValue = JSON.stringify(flower);
      await AsyncStorage.setItem('@flower', jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <StatusBar barStyle="dark-content" />
        <ScrollView>
          <MainHeader />
          <Progress todayFlowerIcon={todayFlowerIcon} />
          <QuestList>
            <MenuTitle>
              데일리 퀘스트
            </MenuTitle>
            {quests.map(quest => (
              <QuestItem
                key={quest.id}
                icon={iconMap[quest.iconType]}
                title={quest.title}
                initialCount={quest.count}
                hasCounter={quest.hasCounter}
              />
            ))}
          </QuestList>
          <SelectButton onPress={() => setModalVisible(true)}>
            <ButtonText>퀘스트 및 꽃 설정</ButtonText>
          </SelectButton>
        </ScrollView>
        <QuestSelectionModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={handleModalConfirm}
        />
      </Container>
    </SafeAreaView>
  );
};

export default MainPage;
