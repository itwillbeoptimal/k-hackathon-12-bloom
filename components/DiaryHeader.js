import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity, View } from "react-native";
import CalendarIcon from "../assets/buttons/calendar.svg";
import DateTimePicker from '@react-native-community/datetimepicker';

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

const HeaderIcons = styled.View`
    flex-direction: row;
`;

const CalendarButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ marginRight: 0 }}>
      <CalendarIcon />
    </View>
  </TouchableOpacity>
);

const DiaryHeader = ({ date, setDate }) => {
  const [showPicker, setShowPicker] = React.useState(false);

  const currentDate = new Date();

  const onChange = (event, selectedDate) => {
    const date = selectedDate || currentDate;
    setShowPicker(false);

    if (date > currentDate) {
      alert('미래 날짜는 선택할 수 없습니다.');
    } else {
      setDate(date);
    }
  };

  return (
    <HeaderContainer>
      <HeaderText>{date}</HeaderText>
      <HeaderIcons>
        <CalendarButton onPress={() => setShowPicker(true)} />
        {showPicker && (
          <DateTimePicker
            value={currentDate}
            mode="date"
            display="default"
            onChange={onChange}
            maximumDate={currentDate}
          />
        )}
      </HeaderIcons>
    </HeaderContainer>
  );
};

export default DiaryHeader;
