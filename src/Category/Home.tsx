import Nav from "../components/Header";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import Hour from "./Hour";
import WorkTax from "./WorkTax";

const Wrapper = styled.div`
  height: 100vh;
  max-width: 1400px;
  padding: 0px 140px;
  margin: 0px auto;
`;
const GridBox = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 200px 10px;
  height: auto;
`;
const Box = styled.div`
  height: auto;
  max-width: 960px;
  margin: auto;
`;
const Item = styled.div`
  width: 180px;
  height: 80px;
  background-color: white;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  :active {
    color: blue;
  }
`;

const Home = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Box>
        <GridBox>
          <Link to="/hour">
            <Item>시급계산기</Item>
          </Link>
          <Link to="/workTax">
            <Item>근로소득세</Item>
          </Link>
          <Link to="/4tax">
            <Item>4대보험</Item>
          </Link>
        </GridBox>
      </Box>
    </Wrapper>
  );
};

export default Home;
