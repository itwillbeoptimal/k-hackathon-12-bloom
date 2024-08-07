import React, { useState, useEffect } from "react";
import { Alert, View } from "react-native";
import styled from "styled-components/native";
import { CircularProgress } from "react-native-circular-progress";
import LinearGradient from "react-native-linear-gradient";
import iconMap from "../assets/icons/iconMap";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CurrentFlowerContainer = styled.View`
    width: 48%;
    aspect-ratio: 1/1;
    padding: 10px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-radius: 10px;
`;

const CurrentFlowerHeader = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 75%;
    height: 15px;
    margin-bottom: 15px;
`;

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
  colors: props.colors || ["#00C0FF", "#5558FF"],
  start: { x: 0.3, y: 0 }, end: { x: 1, y: 0 },
}))`
    width: ${props => props.fill}%;
    height: 100%;
    border-radius: 5px;
`;

const ProgressText = styled.Text`
    color: #3F3F3F;
    font-family: 'SpoqaHanSansNeo-Regular';
    text-align: center;
    font-size: 12px;
`;

const WaterButton = styled.TouchableOpacity`
    background-color: #007BFF;
    padding: 10px;
    border-radius: 5px;
    align-items: center;
    margin-top: 20px;
    opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

const ButtonText = styled.Text`
    color: white;
    font-size: 16px;
`;

const Progress = ({ todayFlowerTitle, dailyQuestProgress }) => {
  const [level, setLevel] = useState(0);
  const [currentIcon, setCurrentIcon] = useState(iconMap.seed);
  const [experience, setExperience] = useState(0);
  const [lastWatered, setLastWatered] = useState(null);

  const levelThresholds = [0, 2, 5, 9];

  const flowerPreviewIcons = {
    tulip: iconMap.tulip_p,
    sunflower: iconMap.sunflower_p,
  };

  const flowerIcons = {
    tulip: iconMap.tulip,
    sunflower: iconMap.sunflower,
  };

  const levelIcons = [
    iconMap.seed,
    iconMap.sprout1,
    iconMap.sprout2,
    flowerIcons[todayFlowerTitle] || iconMap.seed
  ];

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedExperience = await AsyncStorage.getItem('@experience');
        const storedLastWatered = await AsyncStorage.getItem('@lastWatered');

        if (storedExperience !== null) {
          setExperience(parseInt(storedExperience, 10) || 0);
        }
        if (storedLastWatered !== null) {
          setLastWatered(parseInt(storedLastWatered, 10) || null);
        }

        const now = new Date().getTime();
        if (storedLastWatered) {
          const lastWateredDate = new Date(parseInt(storedLastWatered, 10));
          if (now - lastWateredDate.getTime() >= 86400000) {
            setExperience(0);
            await AsyncStorage.setItem('@experience', '0');
          }
        }
      } catch (e) {
        console.error(e);
      }
    };

    loadStoredData();
  }, []);

  useEffect(() => {
    let newLevel = levelThresholds.findIndex(threshold => experience < threshold) - 1;
    if (newLevel < 0) newLevel = levelThresholds.length - 1;
    setLevel(newLevel);
    setCurrentIcon(levelIcons[newLevel]);

    AsyncStorage.setItem('@experience', experience.toString());
  }, [experience]);

  const clampedExperience = Math.max(experience, 0);
  const experienceNeeded = levelThresholds[level + 1] || Infinity;
  const experienceFill = level === levelThresholds.length - 1
    ? 100
    : ((clampedExperience - levelThresholds[level]) / (experienceNeeded - levelThresholds[level])) * 100;

  const handleWaterButtonClick = async () => {
    const now = new Date().getTime();
    if (lastWatered === null || (now - lastWatered) >= 3600000) {
      setExperience(prevExperience => {
        const newExperience = Math.max(prevExperience + 1, 0);
        return newExperience < (levelThresholds[level + 2] || Infinity) ? newExperience : prevExperience;
      });
      setLastWatered(now);
      await AsyncStorage.setItem('@lastWatered', now.toString());
    } else {
      Alert.alert("물주기 알림", "물주기는 한 시간에 한 번만 가능합니다.");
    }
  };

  return (
    <>
      <ProgressContainer style={{ justifyContent: "space-between" }}>
        <CurrentFlowerContainer>
          <CurrentFlowerHeader>
            <View style={{ flex: 1, alignItems: "flex-start" }}>
              {flowerPreviewIcons[todayFlowerTitle]}
            </View>
          </CurrentFlowerHeader>
          <View style={{ marginBottom: 20, height: 60, justifyContent: "center" }}>
            {currentIcon}
          </View>
          <ProgressBar>
            <ProgressFill fill={experienceFill} />
          </ProgressBar>
        </CurrentFlowerContainer>
        <CircularProgress
          size={150}
          width={10}
          fill={dailyQuestProgress}
          tintColor="#3354F4"
          backgroundColor="#e0e0e0"
          rotation={0}
        >
          {() => (
            <>
              <ProgressText style={{ color: "#3F3F3F" }}>
                데일리 퀘스트{"\n"}완료 보상
              </ProgressText>
              <ProgressText
                style={{ marginTop: 4, fontFamily: "SpoqaHanSansNeo-Medium", fontSize: 24, color: "#3F3F3F" }}>
                {dailyQuestProgress}/100
              </ProgressText>
            </>
          )}
        </CircularProgress>
      </ProgressContainer>
      <View style={{
        paddingLeft: 20,
        paddingRight: 20,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}>
        <WaterButton onPress={handleWaterButtonClick}
                     disabled={lastWatered && (new Date().getTime() - lastWatered) < 3600000}>
          <ButtonText>물주기</ButtonText>
        </WaterButton>
        <WaterButton onPress={() => setExperience(prevExperience => Math.max(prevExperience + 1, 0))}>
          <ButtonText>경험치 +1</ButtonText>
        </WaterButton>
        <WaterButton onPress={() => setExperience(prevExperience => Math.max(prevExperience - 1, 0))}>
          <ButtonText>경험치 -1</ButtonText>
        </WaterButton>
      </View>
    </>
  );
};

export default Progress;
