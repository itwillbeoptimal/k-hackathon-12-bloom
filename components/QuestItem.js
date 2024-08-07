import React from "react";
import { TouchableOpacity, View, Text, Alert, Dimensions } from "react-native";
import styled from "styled-components/native";
import { SwipeListView } from "react-native-swipe-list-view";
import MinusIcon from "../assets/buttons/quest_minus_default.svg";
import PlusIcon from "../assets/buttons/quest_plus_default.svg";
import CancelIcon from "../assets/buttons/cancel.svg";
import CompleteIcon from "../assets/buttons/complete.svg";

const { width: screenWidth } = Dimensions.get("window");
const swipeWidth = screenWidth * 0.24;

const QuestItemContainer = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${props => props.completed ? "#F0F0F0" : "white"};
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 8px;
    opacity: ${props => props.completed ? 0.5 : 1};
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

const QuestItem = ({ id, icon, title, initialCount, hasCounter = false, onDelete, onComplete, completed }) => {
  const [count, setCount] = React.useState(initialCount);

  const handleDecrease = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);

      if (newCount === 0 && !completed) {
        Alert.alert("퀘스트 완료", "이 퀘스트를 완료하시겠습니까?", [{ text: "취소", style: "cancel" }, {
          text: "확인",
          onPress: () => onComplete(id),
        }]);
      }
    }
  };

  const handleIncrease = () => {
    if (count < initialCount) {
      setCount(count + 1);
    }
  };

  const handleComplete = () => {
    Alert.alert("퀘스트 완료", "이 퀘스트를 완료하시겠습니까?", [{ text: "취소", style: "cancel" }, {
      text: "확인",
      onPress: () => onComplete(id),
    }]);
  };

  const handleDelete = () => {
    Alert.alert("퀘스트 삭제", "이 퀘스트를 삭제하시겠습니까?", [{ text: "취소", style: "cancel" }, {
      text: "확인",
      onPress: () => onDelete(id),
    }]);
  };

  const renderItem = () => (<QuestItemContainer completed={completed}>
      <View style={{ width: 45, alignItems: "center" }}>
        <QuestIconContainer>
          {icon}
        </QuestIconContainer>
      </View>
      <QuestTitle>{title}</QuestTitle>
      {hasCounter && !completed && (<QuestCountContainer>
          <MinusButton onPress={handleDecrease} />
          <QuestCount>{count}</QuestCount>
          <PlusButton onPress={handleIncrease} />
        </QuestCountContainer>)}
    </QuestItemContainer>);

  const renderHiddenItem = () => !completed && (<View style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      borderRadius: 8,
      width: "100%",
      height: 78,
      backgroundColor: "white",
      marginBottom: 8,
    }}>
      <TouchableOpacity
        onPress={handleComplete}
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: "18%",
          height: "100%",
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
        }}
      >
        <CompleteIcon stroke={"#7ADBC4"} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleDelete}
        style={{
          alignItems: "center", justifyContent: "center", width: "6%", height: "100%",
        }}
      >
        <CancelIcon stroke={"#F99295"} />
      </TouchableOpacity>
    </View>);

  return (<SwipeListView
      data={[{ key: id }]}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={swipeWidth}
      disableLeftSwipe={completed}
      disableRightSwipe={completed}
    />);
};

export default QuestItem;
