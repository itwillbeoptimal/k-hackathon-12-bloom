import React from "react";
import styled from "styled-components/native";
import { Text, TouchableOpacity, View, ScrollView } from "react-native";
import WriteIcon from "../assets/buttons/write.svg";

const TodayQuestionContainer = styled.View`
    flex-direction: column;
    margin: 16px;
    width: 280px;
    height: 200px;
    background-color: #E0EFFF;
    border-radius: 20px;
`;

const WriteButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ marginRight: 8, marginTop: 25, alignSelf: "flex-end" }}>
      <WriteIcon />
    </View>
  </TouchableOpacity>
);

const TodayQuestion = ({ questionDetail }) => (
  <View>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <TodayQuestionContainer>
        <View style={{ padding: 25 }}>
          <Text style={{ fontFamily: "SpoqaHanSansNeo-Medium", fontSize: 15, color: "#5494DA", letterSpacing: -0.3, alignSelf: "flex-start" }}>오늘의
            질문</Text>
          <Text style={{
            fontFamily: "GowunDodum-Regular", fontSize: 18, color: "#585A64", textAlign: "center", lineHeight: 25,
            letterSpacing: -1, marginTop: 25, alignSelf: "center",
          }}>{questionDetail}</Text>
          <WriteButton />
        </View>
      </TodayQuestionContainer>
      <TodayQuestionContainer />
    </ScrollView>
  </View>
);

export default TodayQuestion;
