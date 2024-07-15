import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { CircularProgress } from "react-native-circular-progress";
import Sprout2Vector from "../assets/vectors/sprout2.svg";

const CurrentFlowerContainer = styled.View`
    width: 160px;
    height: 160px;
    padding: 15px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 10px;
`

const ProgressContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 16px;
`;

const ProgressBar = styled.View`
    width: 80%;
    height: 10px;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
`;

const ProgressFill = styled.View`
    width: ${props => props.fill}%;
    height: 100%;
    background-color: ${props => props.tintColor};
    border-radius: 5px;
`;

const ProgressText = styled.Text`
    text-align: center;
    font-size: 12px;
`;

const Progress = () => (
  <ProgressContainer>
    <CurrentFlowerContainer>
      <View style={{marginBottom: 30}}>
        <Sprout2Vector />
      </View>
      <ProgressBar>
        <ProgressFill fill={25} tintColor="#4a90e2" />
      </ProgressBar>
    </CurrentFlowerContainer>
    <CircularProgress
      size={150}
      width={10}
      fill={20}
      tintColor="#4a90e2"
      backgroundColor="#e0e0e0"
      rotation={0}
      lineCap="round"

    >
      {() => (
        <>
          <ProgressText>
            데일리 퀘스트{"\n"}완료 보상
          </ProgressText>
          <ProgressText style={{ marginTop: 5, fontWeight: "bold", fontSize: 20 }}>
            1/5
          </ProgressText>
        </>
      )}
    </CircularProgress>
  </ProgressContainer>
);

export default Progress;
