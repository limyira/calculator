import styled from "styled-components";
const MoneyBox = styled.div`
  width: 100%;
  background-color: rgb(245, 245, 247);
  height: 40px;
  align-items: center;
  display: flex;
  span {
    text-align: start;
  }
`;

const CaculateContainer = styled.div`
  margin-top: 20px;
  display: flex;
  height: 480px;
`;
const CalculateBox = styled.div`
  width: 50%;
`;
const TotalBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: skyblue;
`;
const FormBox = styled.div`
  width: 50%;
  border: 1px solid;
  padding-top: 20px;
`;
const CatBox = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Hour = () => {
  return (
    <>
      <MoneyBox>
        2023년 최저시급은 전년대비 5.0% 인상된 9,620원으로 결정되었습니다.
      </MoneyBox>
      <CaculateContainer>
        <FormBox>
          <CatBox>
            <div>
              <select>
                <option>시급</option>
              </select>
            </div>
            <div>
              <input placeholder="금액을 입력해주세요"></input>
              <span>원</span>
            </div>
            <div>
              <select>
                <option>월급으로</option>
              </select>
            </div>
          </CatBox>
          <CatBox>
            <div>
              <span>일근무시간</span>
            </div>
            <div>
              <select>
                <option>시간</option>
              </select>
              <span>시간</span>
            </div>
            <div>
              <select>
                <option>분</option>
              </select>
              <span>분</span>
            </div>
          </CatBox>
          <CatBox>
            <div>
              <span>근무일수</span>
            </div>
            <div>
              <label>
                <input type="checkbox"></input>주
              </label>
              <label>
                <input type="checkbox"></input>월
              </label>
            </div>
            <div>
              <select>
                <option>선택</option>
              </select>
              <span>일</span>
            </div>
          </CatBox>
          <CatBox>
            <div>
              <span>월연장근무</span>
            </div>
            <div>
              <input />
              <span>시간</span>
            </div>
            <div>
              <select>
                <option>00</option>
              </select>
              <span>분</span>
            </div>
          </CatBox>
        </FormBox>

        <CalculateBox>
          <TotalBox>
            <span>구분</span>
            <span>시간/금액</span>
          </TotalBox>
          <TotalBox>
            <span>기본 월급</span>
            <span>0원</span>
          </TotalBox>
          <TotalBox>
            <span>최종예상월급</span>
            <span>0원</span>
          </TotalBox>
        </CalculateBox>
      </CaculateContainer>
    </>
  );
};

export default Hour;
