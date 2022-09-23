import styled from "styled-components";
import { useMatch, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const Header = styled.header`
  margin-bottom: 0;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  padding: 0.74rem 1rem;
  background-color: rgba(49, 49, 49, 0.6);
  display: block;
  box-sizing: border-box;
`;

const HeaderBox = styled.div`
  width: 100%;
  padding-right: var(--bs-gutter-x, 0.75rem);
  padding-left: var(--bs-gutter-x, 0.75rem);
  margin-right: auto;
  margin-left: auto;
  box-sizing: border-box;
  display: flex;
`;

const HomeIcon = styled.div`
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: 1rem;
  font-size: 3rem;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  color: white;
`;

const CategoryNav = styled.div`
  display: flex !important;
  flex-basis: auto;
  justify-content: flex-end !important;
  flex-grow: 1;
  align-items: center;
  margin-right: 20px;
`;

const Ul = styled.ul`
  display: flex;
  justify-content: space-between;
  margin-top: 0;
  width: 280px;
`;

const Li = styled.li`
  margin-top: 0.5rem;
  box-sizing: border-box;
  list-style: none;
  color: white;
`;
const NavDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Circle = styled(motion.div)`
  background-color: skyblue;
  margin-top: 8px;
  width: 8px;
  height: 8px;
  border-radius: 5px;
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
