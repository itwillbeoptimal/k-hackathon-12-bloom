import React, { useState, useCallback } from "react";
import styled from "styled-components/native";
import { Text, TouchableOpacity, View } from "react-native";
import WriteIcon from "../assets/buttons/write.svg";

const TodayQuestionContainer = styled.View`
    flex-direction: column;
    margin: 16px;
    width: 280px;
    height: 230px;
    background-color: #E0EFFF;
    border-radius: 20px;
`;

const WriteButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ marginRight: 8, alignSelf: "flex-end" }}>
      <WriteIcon />
    </View>
  </TouchableOpacity>
);

const TodayQuestion = ({ questionDetail }) => {
  const [textHeight, setTextHeight] = useState(0);

  // Text 컴포넌트의 높이를 측정하는 함수
  const onTextLayout = useCallback((event) => {
    const { height } = event.nativeEvent.layout;
    setTextHeight(height);
  }, []);

  const isSingleLine = textHeight < 30;

  return (
    <View>
      <TodayQuestionContainer>
        <View style={{ padding: 25 }}>
          <Text style={{
            fontFamily: "SpoqaHanSansNeo-Medium",
            fontSize: 15,
            color: "#5494DA",
            letterSpacing: -1,
            alignSelf: "flex-start",
          }}>오늘의 질문</Text>
          <View style={{display: "flex", height: 130, padding: 5, justifyContent: "center"}}>
            <Text
              style={{
                fontFamily: "GowunDodum-Regular",
                fontSize: 18,
                color: "#585A64",
                textAlign: isSingleLine ? "center" : "justify", // 조건에 따라 정렬 변경
                letterSpacing: -1.5,
              }}
              onLayout={onTextLayout}
            >
              {questionDetail}
            </Text>
          </View>
          <WriteButton />
        </View>
      </TodayQuestionContainer>
    </View>
  );
}

export default TodayQuestion;
