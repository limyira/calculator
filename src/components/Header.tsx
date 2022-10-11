import styled from "styled-components";
import { useMatch, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Header = styled.header`
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  padding: 0.74rem 1rem;
  background-color: rgba(49, 49, 49, 0.6);
  display: block;
  width: 100vw;
`;

const HeaderBox = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  margin: 15px 0px;
  height: fit-content;
  align-items: center;
`;

const HomeIcon = styled.div`
  margin-right: 1rem;
  font-size: 2.3rem;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  color: white;
`;

const CategoryNav = styled.div`
  display: flex;
  flex-basis: auto;
  justify-content: flex-end;
  flex-grow: 1;
  align-items: center;
  margin-right: 30px;
  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  margin-top: 0;
  width: 280px;
`;

const Li = styled.li`
  margin-top: 15px;
  box-sizing: border-box;
  list-style: none;
  color: white;
`;
const NavDiv = styled.div`
  display: flex;
  position: relative;

  flex-direction: column;
  align-items: center;
  height: 50px;
`;

const Circle = styled(motion.div)`
  background-color: skyblue;
  width: 8px;
  height: 6px;
  border-radius: 5px;
  position: absolute;
  bottom: 0;
`;

const Nav = () => {
  const navigate = useNavigate();
  const hourMatch = useMatch("/hour/*");
  const workMatch = useMatch("/workTax/*");
  const taxMatch = useMatch("/insurance/*");
  const goHome = () => {
    navigate("/");
  };
  return (
    <Header>
      <HeaderBox>
        <HomeIcon onClick={goHome}>Simple Calculator</HomeIcon>
        <CategoryNav>
          <Ul>
            <NavDiv>
              <Li>
                <Link to="/hour">시급계산기</Link>
              </Li>
              {hourMatch && <Circle layoutId="circle" />}
            </NavDiv>
            <NavDiv>
              <Li>
                <Link to="/workTax">근로소득세</Link>
              </Li>
              {workMatch && <Circle layoutId="circle" />}
            </NavDiv>
            <NavDiv>
              <Li>
                <Link to="/insurance">4대보험</Link>
              </Li>
              {taxMatch && <Circle layoutId="circle" />}
            </NavDiv>
          </Ul>
        </CategoryNav>
      </HeaderBox>
    </Header>
  );
};

export default Nav;
