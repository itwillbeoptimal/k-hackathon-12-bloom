import React from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

const QuestItemContainer = styled.TouchableOpacity`
    flex-direction: row;
    align-items: center;
    background-color: white;
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 8px;
`;

const TaskIcon = styled.Text`
    color: #3F3F3F;
    font-family: 'SpoqaHanSansNeo-Medium';
    flex: 1;
    text-align: center;
`;

const TaskTitle = styled.Text`
    color: #3F3F3F;
    font-family: 'SpoqaHanSansNeo-Regular';
    letter-spacing: -0.3px;
    flex: 10;
`;

const DoneListItem = ({ icon, title }) => (
  <QuestItemContainer>
    <TaskIcon>{icon}</TaskIcon>
    <TaskTitle>{title}</TaskTitle>
  </QuestItemContainer>
);

export default DoneListItem;
