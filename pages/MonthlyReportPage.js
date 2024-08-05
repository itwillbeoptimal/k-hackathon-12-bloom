import styled from "styled-components/native";
import { SafeAreaView, ScrollView, View } from "react-native";
import MonthlyReportHeader from "../components/MonthlyReportHeader";
import Calendar from "../components/MonthlyReport";
import MonthlyChart from "../components/MonthlyChart";

const Container = styled(View)`
    flex: 1;
    background-color: #F5F5F5;
    padding: 10px;
`;

const MonthlyReportPage = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <MonthlyReportHeader />
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          <Calendar />
          <MonthlyChart />
        </ScrollView>
      </Container>
    </SafeAreaView>
  );
};

export default MonthlyReportPage;
