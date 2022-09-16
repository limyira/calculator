import Nav from "../components/Header";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Hour from "./Hour";

const Wrapper = styled.div`
  height: 100vh;
  max-width: 1140px;
  padding: 0px 140px;
`;
const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  margin-top: 40px;
  height: auto;
`;
const Box = styled.div`
  height: auto;
  max-width: 960px;
  margin: auto;
`;
const Item = styled.div`
  width: 80px;
  height: 80px;
`;

const Home = () => {
  const navigate = useNavigate();
  const HourCalculate = () => {
    navigate("/hour");
  };

  return (
    <Wrapper>
      <Box>
        <GridBox>
          <Link to="/hour">
            <Item>시급계산기</Item>
          </Link>
          <Item>근로소득세</Item>
          <Item>4대보험</Item>
          <Item>bkbk</Item>
          <Item>bkbk</Item>
          <Item>bkbk</Item>
          <Item>bkbk</Item>
        </GridBox>
      </Box>
      <Hour />
    </Wrapper>
  );
};

export default Home;
