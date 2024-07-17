import styled from "styled-components/native";
import { SafeAreaView } from "react-native";

const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: #F5F5F5;
    padding: 10px;
`;

const TempText = styled.Text`
    color: #3F3F3F;
    font-family: 'Pretendard-SemiBold';
    font-size: 16px;
    margin-bottom: 16px;
`;

const DiaryPage = () => {
  return (<Container>
      <TempText>
        test
      </TempText>
    </Container>);
};

export default DiaryPage;
