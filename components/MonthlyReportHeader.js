import React from "react";
import styled from "styled-components/native";

const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
`;

const HeaderText = styled.Text`
    color: #3F3F3F;
    font-family: 'SpoqaHanSansNeo-Medium';
    letter-spacing: -0.3px;
    font-size: 20px;
`;

const MonthlyReportHeader = () => {
  return (<HeaderContainer>
    <HeaderText>월간 리포트</HeaderText>
  </HeaderContainer>);
};

export default MonthlyReportHeader;
