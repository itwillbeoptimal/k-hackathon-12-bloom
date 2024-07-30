import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import MinusIcon from "../assets/buttons/quest_minus_default.svg";
import PlusIcon from "../assets/buttons/quest_plus_default.svg";

const QuestItemContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    background-color: white;
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 8px;
`;

const QuestIconContainer = styled.View`
    margin-right: 16px;
`;

const QuestTitle = styled.Text`
    color: #3F3F3F;
    font-family: 'SpoqaHanSansNeo-Regular';
    letter-spacing: -0.3px;
    flex: 1;
`;

const QuestCountContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

const QuestCount = styled.Text`
    color: #3F3F3F;
    font-family: 'SpoqaHanSansNeo-Regular';
    margin-horizontal: 8px;
`;

const MinusButton = ({ onPress }) => (<TouchableOpacity onPress={onPress}>
    <View>
      <MinusIcon />
    </View>
  </TouchableOpacity>);

const PlusButton = ({ onPress }) => (<TouchableOpacity onPress={onPress}>
    <View>
      <PlusIcon />
    </View>
  </TouchableOpacity>);

const QuestItem = ({ icon, title, initialCount, hasCounter = false }) => {
  const [count, setCount] = useState(initialCount);

  const handleDecrease = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleIncrease = () => {
    if (count < initialCount) {
      setCount(count + 1);
    }
  };

  return (<QuestItemContainer>
      <View style={{ width: 45, alignItems: "center" }}>
        <QuestIconContainer>
          {icon}
        </QuestIconContainer>
      </View>
      <QuestTitle>{title}</QuestTitle>
      {hasCounter && (<QuestCountContainer>
          <MinusButton onPress={handleDecrease} />
          <QuestCount>{count}</QuestCount>
          <PlusButton onPress={handleIncrease} />
        </QuestCountContainer>)}
    </QuestItemContainer>);
};

export default QuestItem;
