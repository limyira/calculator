import Nav from "../components/Header";
import styled from "styled-components";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { useMatch } from "react-router-dom";
import { motion } from "framer-motion";
const Wrapper = styled.div`
  height: 100vh;
  max-width: 1400px;
  padding: 0px 140px;
  margin: 0px auto;
`;
const GridBox = styled.div`
  display: flex;
  justify-content: space-between;

  margin: 40px 10px;
  height: auto;
`;
const Box = styled.div`
  max-width: 960px;
  margin: auto;
`;
const Item = styled(motion.div)`
  width: 180px;
  height: 80px;
  background-color: white;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const BoxVar = {
  initial: {
    y: 0,
    backgroundColor: "rgba(255,255,255,1)",
  },
  animate: {
    y: -10,
    backgroundColor: "rgba(154, 175, 194, 0.8)",
  },
  exit: {
    y: 0,
    backgroundColor: "rgba(255,255,255,1)",
  },
};

const Home = () => {
  const hourMatch = useMatch(`/hour`);
  const workMatch = useMatch(`/workTax`);
  const insuranceMatch = useMatch(`/insurance`);

  return (
    <Wrapper>
      <Box>
        <GridBox>
          <Link to="/hour">
            {hourMatch ? (
              <Item
                variants={BoxVar}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {" "}
                시급계산기
              </Item>
            ) : (
              <Item>시급계산기</Item>
            )}
          </Link>
          <Link to="/workTax">
            {workMatch ? (
              <Item
                variants={BoxVar}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                근로소득세
              </Item>
            ) : (
              <Item>근로소득세</Item>
            )}
          </Link>
          <Link to="/insurance">
            {insuranceMatch ? (
              <Item
                variants={BoxVar}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                4대보험
              </Item>
            ) : (
              <Item>4대보험</Item>
            )}
          </Link>
        </GridBox>
      </Box>
      <Outlet />
    </Wrapper>
  );
};

export default Home;
