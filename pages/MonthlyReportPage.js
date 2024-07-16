import styled from "styled-components/native";
import { SafeAreaView } from "react-native";
import Calendar from "../components/MonthlyReport";

const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: #F5F5F5;
    padding: 26px;
`;

const MonthlyReportPage = () => {
  return (<Container>
    <Calendar>
    </Calendar>
  </Container>);
};

export default MonthlyReportPage;
