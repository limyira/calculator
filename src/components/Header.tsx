import styled from "styled-components";

const Header = styled.header`
  margin-bottom: 0;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.05),
    inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  padding: 0.74rem 1rem;
  background-color: rgba(49, 49, 49, 0.92);
  border-bottom: 1px solid #2979e5;
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
  height: auto;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: 1rem;
  font-size: 1.25rem;
  text-decoration: none;
  white-space: nowrap;
`;

const CategoryNav = styled.div`
  display: flex !important;
  flex-basis: auto;
  justify-content: flex-end !important;
  flex-grow: 1;
  align-items: center;
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

const Nav = () => {
  return (
    <Header>
      <HeaderBox>
        <HomeIcon>Home</HomeIcon>
        <CategoryNav>
          <Ul>
            <Li>1</Li>
            <Li>2</Li>
            <Li>3</Li>
            <Li>4</Li>
            <Li>5</Li>
          </Ul>
        </CategoryNav>
      </HeaderBox>
    </Header>
  );
};

export default Nav;
