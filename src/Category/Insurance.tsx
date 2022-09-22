import styled from "styled-components";

const MoneyBox = styled.div`
  display: flex;
  -moz-box-pack: justify;
  background-color: rgb(255, 255, 255);
  padding: 20px 40px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  width: 60%;
  margin: auto;
  margin-top: 60px;
  flex-direction: column;
  height: 40vh;
`;
const CatBox = styled.div`
  display: flex;
  margin-right: 10px;
  justify-content: space-between;
  width: 100%;
`;
const CatTwo = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: end;
`;
const CatInput = styled.input`
  margin-right: 10px;
  width: 450px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 90px;
  text-align: end;
  padding: 3px 16px;
`;
const Form = styled.form`
  width: 100%;
  padding: 10px;
  display: flex;
`;
const Insurance = () => {
  return (
    <>
      <MoneyBox>
        <Form>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <CatBox>
              <span>월 급여:</span>
            </CatBox>
            <CatTwo>
              <CatInput placeholder="please input pay" />
              <span>원</span>
            </CatTwo>
          </div>
        </Form>
      </MoneyBox>
    </>
  );
};

export default Insurance;
