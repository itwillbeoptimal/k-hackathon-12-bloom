import styled from "styled-components/native";
import { SafeAreaView, View } from "react-native";
import Calendar from "../components/MonthlyReport";

const Container = styled(View)`
    background-color: #F5F5F5;
    padding: 26px;
`;

const MonthlyReportPage = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Container>
        <Calendar>
        </Calendar>
      </Container>
    </SafeAreaView>);
};

export default MonthlyReportPage;
