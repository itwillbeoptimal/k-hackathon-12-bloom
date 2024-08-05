import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { Shadow } from "react-native-shadow-2";
import styled from "styled-components/native";
import axios from "axios";

const ChartContainer = styled.View`
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    margin-top: 20px;
`;

const Title = styled.Text`
    color: #2E2A2A;
    font-family: 'SpoqaHanSansNeo-Medium';
    font-size: 18px;
    letter-spacing: -1px;
    margin-bottom: 3px;
`;

const SubTitle = styled.Text`
    color: #77838F;
    font-family: 'SpoqaHanSansNeo-Regular';
    font-size: 14px;
    letter-spacing: -1px;
    margin-bottom: 15px;
`;

const BarChartContainer = styled.View`
    flex-direction: row;
    align-items: flex-end;
`;

const BarContainer = styled.View`
    flex: 1;
    align-items: center;
`;

const Bar = styled.View`
    width: 30px;
    border-radius: 5px 5px 0 0;
    background-color: ${props => props.isHighest ? "#4A90E2" : "#E0E0E0"};
`;

const BarLabel = styled.Text`
    color: #3F3F3F;
    font-family: 'SpoqaHanSansNeo-Regular';
    font-size: 12px;
    margin-top: 5px;
`;

const ValueLabel = styled.Text`
    font-family: 'SpoqaHanSansNeo-Regular';
    font-size: 12px;
    margin-bottom: 5px;
`;

const getLastSixMonths = () => {
  const months = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
  const currentDate = new Date();
  const lastMonth = (currentDate.getMonth() - 1 + 12) % 12;
  const lastSixMonths = [];

  for (let i = 5; i >= 0; i--) {
    const monthIndex = (lastMonth - i + 12) % 12;
    lastSixMonths.push(months[monthIndex]);
  }

  return lastSixMonths;
};

const dummyData = {
  "2월": 9,
  "3월": 14,
  "4월": 11,
  "5월": 8,
  "6월": 13,
  "7월": 17,
};

const MonthlyChart = () => {
  const [monthlyData, setMonthlyData] = useState({});
  const months = getLastSixMonths();

  useEffect(() => {
    fetchMonthlyData();
  }, []);

  const fetchMonthlyData = async () => {
    try {
      const response = await axios.get("/api/monthly-data");
      setMonthlyData(response.data);
    } catch (error) {
      console.error("Failed to fetch monthly data from server:", error);
      console.log("Using dummy data for monthly chart");
      setMonthlyData(dummyData);
    }
  };

  const maxValue = Math.max(...months.map(month => monthlyData[month] || 0));
  const safeMaxValue = maxValue || 1;

  const calculateAverage = () => {
    const values = months.map(month => monthlyData[month] || 0);
    const total = values.reduce((sum, value) => sum + value, 0);
    return values.length > 0 ? Math.round(total / values.length) : 0;
  };

  const averageValue = calculateAverage();

  return (
    <Shadow
      style={{width: "100%"}}
      startColor="rgba(0, 0, 0, 0.02)"
      finalColor="rgba(0, 0, 0, 0.01)"
      offset={[4, 4]}
      distance={8}
      containerViewStyle={{ borderRadius: 12 }}
    >
    <ChartContainer>
      <Title>지난달 평소보다 많은 꽃을 피웠어요!</Title>
      <View style={{borderBottomWidth: 1, borderColor: "#EDEDED", marginBottom: 25}}>
        <SubTitle>한 달에 평균 {averageValue}개의 꽃을 피웠어요.</SubTitle>
      </View>
      <BarChartContainer>
        {months.map(month => {
          const value = monthlyData[month] || 0;
          const barHeight = (value / safeMaxValue) * 120;
          const isHighest = value === maxValue;

          return (
            <BarContainer key={month}>
              <ValueLabel>{value}</ValueLabel>
              <Bar style={{ height: barHeight }} isHighest={isHighest} />
              <BarLabel>{month}</BarLabel>
            </BarContainer>
          );
        })}
      </BarChartContainer>
    </ChartContainer>
    </Shadow>
  );
};

export default MonthlyChart;
