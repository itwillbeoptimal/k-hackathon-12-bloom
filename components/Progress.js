import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { CircularProgress } from "react-native-circular-progress";
import LinearGradient from "react-native-linear-gradient";
import Sprout2Vector from "../assets/vectors/sprout2.svg";

const CurrentFlowerContainer = styled.View`
    width: 165px;
    height: 165px;
    padding: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 10px;
`

const CurrentFlowerHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 75%;
    height: 15px;
    margin-bottom: 15px;
`

const ProgressContainer = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 16px;
`;

const ProgressBar = styled.View`
    width: 75%;
    height: 7px;
    background-color: #e0e0e0;
    border-radius: 5px;
    overflow: hidden;
`;

const ProgressFill = styled(LinearGradient).attrs(props => ({
  colors: props.colors || ['#00C0FF', '#5558FF'], // 기본 그라데이션 색상
  start: { x: 0.3, y: 0 },
  end: { x: 1, y: 0 },
}))`
    width: ${props => props.fill}%;
    height: 100%;
    border-radius: 5px;
`;

const ProgressText = styled.Text`
    font-family: 'Pretendard-SemiBold';
    text-align: center;
    font-size: 12px;
`;

const Progress = ({ todayFlowerIcon }) => (
  <ProgressContainer>
    <CurrentFlowerContainer>
      <CurrentFlowerHeader>
        <View style={{flex: 1, alignItems: "flex-start"}}>
          {todayFlowerIcon}
        </View>
        {/*<View style={{flex: 1, alignItems: "flex-end"}}>*/}
        {/*  {todayFlowerIcon}*/}
        {/*</View>*/}
      </CurrentFlowerHeader>
      <View style={{marginBottom: 20}}>
        <Sprout2Vector width={65} />
      </View>
      <ProgressBar>
        <ProgressFill fill={75} />
      </ProgressBar>
    </CurrentFlowerContainer>
    <CircularProgress
      size={150}
      width={10}
      fill={20}
      tintColor="#3354F4"
      backgroundColor="#e0e0e0"
      rotation={0}

    >
      {() => (
        <>
          <ProgressText>
            데일리 퀘스트{"\n"}완료 보상
          </ProgressText>
          <ProgressText style={{ marginTop: 5, fontWeight: "bold", fontSize: 24 }}>
            1/5
          </ProgressText>
        </>
      )}
    </CircularProgress>
  </ProgressContainer>
);

export default Progress;
