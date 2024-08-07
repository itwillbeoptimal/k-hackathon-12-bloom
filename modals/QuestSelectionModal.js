import React, { useState } from "react";
import { Modal, View, TouchableOpacity, Text, ScrollView } from "react-native";
import styled from "styled-components/native";
import iconMap from "../assets/icons/iconMap";

const Container = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled(View)`
    width: 80%;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
`;

const Title = styled(Text)`
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: bold;
`;

const Item = styled(TouchableOpacity)`
    flex-direction: row;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    border-bottom-width: 1px;
    border-bottom-color: #ddd;
    background-color: ${props => (props.selected ? '#e0f7fa' : 'white')};
`;

const ItemTitle = styled(Text)`
    margin-left: 10px;
`;

const Button = styled(TouchableOpacity)`
    background-color: ${props => (props.primary ? '#007BFF' : 'transparent')};
    padding: 10px;
    border-radius: 5px;
    align-items: center;
    margin-top: 20px;
`;

const ButtonText = styled(Text)`
    color: ${props => (props.primary ? 'white' : '#007BFF')};
    font-size: 16px;
`;

const QuestSelectionModal = ({ visible, onClose, onConfirm }) => {
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [selectedQuests, setSelectedQuests] = useState([]);
  const [step, setStep] = useState(1);

  const allQuests = [
    { id: 1, iconType: "water", title: "물 여덟 잔 마시기", count: 8, hasCounter: true },
    { id: 2, iconType: "stretch", title: "스트레칭 세 번 하기", count: 3, hasCounter: true },
    { id: 3, iconType: "walk", title: "3,000 걸음 이상 걷기", count: -1, hasCounter: false },
    { id: 4, iconType: "prioritize", title: "할 일의 우선 순위 정하기", count: -1, hasCounter: false }
  ];

  const flowers = [
    { id: 1, iconType: "tulip", title: "튤립" },
    { id: 2, iconType: "sunflower", title: "해바라기" }
  ];

  const handleQuestSelect = (quest) => {
    setSelectedQuests(prev =>
      prev.some(q => q.id === quest.id)
        ? prev.filter(q => q.id !== quest.id)
        : [...prev, quest]
    );
  };

  const handleFlowerSelect = (flower) => {
    setSelectedFlower(flower);
  };

  const handleConfirm = () => {
    if (selectedQuests.length < 3 || !selectedFlower) {
      alert("최소 3개의 퀘스트와 꽃을 선택해 주세요.");
      return;
    }
    onConfirm(
      selectedQuests.map(q => ({
        id: q.id,
        iconType: q.iconType,
        title: q.title,
        count: q.count,
        hasCounter: q.hasCounter
      })),
      {
        id: selectedFlower.id,
        iconType: selectedFlower.iconType,
        title: selectedFlower.title
      }
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <Container>
        <ModalContainer>
          {step === 1 && (
            <>
              <Title>퀘스트 선택</Title>
              <ScrollView>
                {allQuests.map(quest => (
                  <Item
                    key={quest.id}
                    selected={selectedQuests.some(q => q.id === quest.id)}
                    onPress={() => handleQuestSelect(quest)}
                  >
                    <View style={{width: 35, alignItems: "center"}}>
                      {iconMap[quest.iconType]}
                    </View>
                    <ItemTitle>{quest.title}</ItemTitle>
                  </Item>
                ))}
              </ScrollView>
              <Button primary onPress={() => setStep(2)}>
                <ButtonText primary>다음</ButtonText>
              </Button>
            </>
          )}
          {step === 2 && (
            <>
              <Title>꽃 선택</Title>
              <ScrollView>
                {flowers.map(flower => (
                  <Item
                    key={flower.id}
                    selected={selectedFlower && selectedFlower.id === flower.id}
                    onPress={() => handleFlowerSelect(flower)}
                  >
                    {iconMap[(flower.iconType)+'_p']}
                    <ItemTitle>{flower.title}</ItemTitle>
                  </Item>
                ))}
              </ScrollView>
              <Button onPress={() => setStep(1)}>
                <ButtonText>이전</ButtonText>
              </Button>
              <Button primary onPress={handleConfirm}>
                <ButtonText primary>확인</ButtonText>
              </Button>
            </>
          )}
          <Button onPress={onClose}>
            <ButtonText>닫기</ButtonText>
          </Button>
        </ModalContainer>
      </Container>
    </Modal>
  );
};

export default QuestSelectionModal;
