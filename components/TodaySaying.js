import React, { useState, useCallback } from "react";
import styled from "styled-components/native";
import { Text, View } from "react-native";

const TodaySayingContainer = styled.View`
    flex-direction: column;
    margin: 16px;
    width: 280px;
    height: 230px;
    background-color: #E6F7F3;
    border-radius: 20px;
`;

const TodaySaying = ({ sayingDetail }) => {
  const [textHeight, setTextHeight] = useState(0);

  // Text 컴포넌트의 높이를 측정하는 함수
  const onTextLayout = useCallback((event) => {
    const { height } = event.nativeEvent.layout;
    setTextHeight(height);
  }, []);

  const isSingleLine = textHeight < 30;

  return (
    <View>
      <TodaySayingContainer>
        <View style={{ padding: 25 }}>
          <Text style={{
            fontFamily: "SpoqaHanSansNeo-Medium",
            fontSize: 15,
            color: "#7ADBC4",
            letterSpacing: -1,
            alignSelf: "flex-start",
          }}>오늘의 명언</Text>
          <View style={{display: "flex", height: 130, padding: 5, justifyContent: "center"}}>
            <Text
              style={{
                fontFamily: "GowunDodum-Regular",
                fontSize: 18,
                color: "#585A64",
                textAlign: isSingleLine ? "center" : "justify",
                letterSpacing: -1.5,
              }}
              onLayout={onTextLayout}
            >
              {sayingDetail}
            </Text>
          </View>
        </View>
      </TodaySayingContainer>
    </View>
  );
}

export default TodaySaying;
