import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components/native";
import { View, SafeAreaView, StatusBar, ScrollView, TouchableOpacity, Text, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MainHeader from "../components/MainHeader";
import Progress from "../components/Progress";
import QuestItem from "../components/QuestItem";
import QuestSelectionModal from "../modals/QuestSelectionModal";
import iconMap from "../assets/icons/iconMap";

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

const ResetButton = styled(TouchableOpacity)`
    background-color: #FF5722;
    padding: 10px;
    border-radius: 5px;
    align-items: center;
    margin: 10px;
`;

const ResetButtonText = styled(Text)`
    color: white;
    font-size: 16px;
`;

const MainPage = () => {
  const [quests, setQuests] = useState([]);
  const [todayFlowerTitle, setTodayFlowerTitle] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const progressRef = useRef(null);

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedQuests = await AsyncStorage.getItem("@quests");
        if (storedQuests !== null) {
          const parsedQuests = JSON.parse(storedQuests);
          setQuests(parsedQuests.map(q => ({ ...q, icon: iconMap[q.iconType] })));
        }
        const storedFlower = await AsyncStorage.getItem("@flower");
        if (storedFlower !== null) {
          const flower = JSON.parse(storedFlower);
          setTodayFlowerTitle(flower.iconType);
        }
      } catch (e) {
        console.error(e);
      }
    };

    loadStoredData();
  }, []);

  const handleModalConfirm = (selectedQuests, selectedFlower) => {
    const questsToSave = selectedQuests.map(quest => ({
      id: quest.id, iconType: quest.iconType, title: quest.title, count: quest.count, hasCounter: quest.hasCounter,
    }));
    setQuests(questsToSave);
    setTodayFlowerTitle(selectedFlower.iconType);
    saveQuests(questsToSave);
    saveFlower(selectedFlower);
    setModalVisible(false);
  };

  const saveQuests = async (quests) => {
    try {
      const jsonValue = JSON.stringify(quests);
      await AsyncStorage.setItem("@quests", jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  const saveFlower = async (flower) => {
    try {
      const jsonValue = JSON.stringify(flower);
      await AsyncStorage.setItem("@flower", jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  const handleComplete = async (id) => {
    const updatedQuests = quests.map(quest => quest.id === id ? { ...quest, completed: true } : quest);
    setQuests(updatedQuests);
    await saveQuests(updatedQuests);

    if (progressRef.current) {
      progressRef.current.increaseExperience();
    }
  };

  const handleDelete = async (id) => {
    if (quests.length <= 3) {
      Alert.alert("퀘스트 삭제", "퀘스트를 3개 이상 유지해야 합니다.", [{ text: "확인", style: "cancel" }]);
      return;
    }

    Alert.alert("퀘스트 삭제", "이 퀘스트를 삭제하시겠습니까?", [{ text: "취소", style: "cancel" }, {
      text: "확인", onPress: async () => {
        const updatedQuests = quests.filter(quest => quest.id !== id);
        setQuests(updatedQuests);
        await saveQuests(updatedQuests);
      },
    }]);
  };

  const resetCompletionStatus = async () => {
    const updatedQuests = quests.map(quest => ({ ...quest, completed: false }));
    setQuests(updatedQuests);
    await saveQuests(updatedQuests);
  };

  const completedCount = quests.filter(quest => quest.completed).length;
  const totalCount = quests.length;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <StatusBar barStyle="dark-content" />
        <ScrollView>
          <MainHeader />
          <Progress
            ref={progressRef}
            todayFlowerTitle={todayFlowerTitle}
            totalCount={totalCount}
            completedCount={completedCount}
          />
          <QuestList>
            <MenuTitle>
              데일리 퀘스트
            </MenuTitle>
            {quests.map(quest => (
              <QuestItem
                key={quest.id}
                id={quest.id}
                icon={iconMap[quest.iconType]}
                title={quest.title}
                initialCount={quest.count}
                hasCounter={quest.hasCounter}
                onDelete={handleDelete}
                onComplete={handleComplete}
                completed={quest.completed}
              />
            ))}
          </QuestList>
          {/*<SelectButton onPress={() => setModalVisible(true)}>*/}
          {/*  <ButtonText>퀘스트 및 꽃 설정</ButtonText>*/}
          {/*</SelectButton>*/}
          {/*<ResetButton onPress={resetCompletionStatus}>*/}
          {/*  <ResetButtonText>퀘스트 완료 상태 초기화</ResetButtonText>*/}
          {/*</ResetButton>*/}
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
