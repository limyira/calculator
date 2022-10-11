import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import ExceltoJson from "../utility";
import { motion, AnimatePresence } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const MoneyBox = styled.div`
  display: flex;
  -moz-box-pack: justify;
  background-color: rgb(255, 255, 255);
  padding: 20px 40px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  width: 70%;
  margin: auto;
  margin-top: 60px;
  flex-direction: column;
  @media screen and (max-width: 480px) {
    width: 100%;
    font-size: 0.8rem;
  }
`;
const Notice = styled.div`
  margin-bottom: 10px;
  margin-top: 5px;
`;
const NotiIcon = styled.div`
  display: flex;
  margin: 0 auto;
  font-size: 25px;
  margin-bottom: 10px;
  font-weight: 400;
  background-color: rgb(233, 215, 22);
  border-radius: 10px;
  padding: 2px 15px;
`;
const CalculateBox = styled.div`
  display: flex;
  -moz-box-pack: justify;
  justify-content: space-between;
  background-color: rgb(255, 255, 255);
  padding: 40px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);

  width: 70%;
  margin: 40px auto;
  @media screen and (max-width: 480px) {
    width: 100%;
    font-size: 0.8rem;
  }
`;
const Form = styled.form`
  width: 100%;
  padding: 10px;
`;
const CatInput = styled.input`
  margin-right: 10px;
  width: 180px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 90px;
  text-align: end;
  padding: 3px 16px;
  font-size: 15px;
`;

const Hr = styled.hr`
  margin-top: 40px;
`;
const Box = styled.div`
  display: flex;
  margin: 10px auto;
  align-items: center;
  margin-left: 230px;

  margin-right: 150px;
  span {
    display: block;
    margin-right: 90px;
  }
`;
const Btn = styled.button`
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  border: none;
  border-radius: 45px;
  margin-right: 10px;
  font-size: 18px;
  padding: 10px;
  width: 140px;
  margin-top: 10px;
  cursor: pointer;
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CatSelect = styled.select`
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 90px;
  margin-right: 20px;
  margin-left: 20px;
  width: 60px;
  font-size: 13px;
  text-align: center;
`;
const CatBox = styled.div`
  display: flex;
  margin: 10px auto;
  align-items: center;
  span {
    @media screen and (max-width: 480px) {
      font-size: 0.7rem;
    }
  }
`;
const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 140%;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 1;
  z-index: 3;
`;
const BigCard = styled(motion.div)`
  position: absolute;
  width: 50vw;
  height: 80vh;
  left: 0;
  right: 0;
  top: 80px;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  z-index: 4;
  padding: 20px;
  @media screen and (max-width: 480px) {
    width: 100%;
    font-size: 0.6rem;
  }
`;
const CalculateContainer = styled.div`
  display: flex;
`;
const PercentCard = styled.div`
  display: flex;
  margin: 20px auto;
`;
const TaxBox = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
`;
const Section = styled.div``;
const Quote = styled.div`
  display: flex;
  margin: 10px auto;
`;
const Category = styled.div`
  width: 50%;
  height: 25px;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  :first-child {
    background-color: rgba(139, 139, 144, 0.6);
    color: white;
  }
  :last-child {
  }
`;
const TipBox = styled.div`
  display: flex;
  margin: 10px auto;
  color: red;
  margin-top: -10px;
  font-size: 12px;
`;
const tipvaiatns = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};
const Tip = styled(motion.div)`
  display: flex;
  position: absolute;
  background-color: rgb(139, 139, 144, 0.9);
  color: black;
  width: 40vw;
  height: 24px;
  cursor: pointer;
  border-radius: 20px;
  padding: 15px 15px;
  justify-content: start;
  align-items: center;
  margin-top: inherit;
  margin-bottom: 40px;
`;
interface IForm {
  defaultValues: {
    pay: number;
    family: number;
    child: number;
  };
}
interface IIncome {
  [index: number]: number;
}
const WorkTax = () => {
  const familyCount = Array.from({ length: 11 }, (v, i) => i + 1);
  const childCount = Array.from({ length: 11 }, (v, i) => i);
  const navigate = useNavigate();
  const [incomeTax, setIncomeTax] = useState<IIncome>({});
  const file = ExceltoJson().Tax;

  const { register, watch, handleSubmit, setValue, getValues, reset } =
    useForm<IForm>();
  const payback = !Number(watch("defaultValues.pay"))
    ? 0
    : Number(watch("defaultValues.pay"));
  const familyCheck = Number(watch("defaultValues.family"));
  const childCheck = Number(watch("defaultValues.child"));
  const getPay = getValues("defaultValues.pay");
  const Index = familyCheck + childCheck;
  const Match = useMatch(
    `/workTax/${incomeTax[Index as keyof typeof incomeTax]}`
  );
  const tax = incomeTax[Index as keyof typeof incomeTax];
  const eight = tax * 0.8;
  const twelve = tax * 1.2;

  const formSubmit = async () => {
    const getPay = getValues("defaultValues.pay");
    const monthPay = Math.round(payback / 1000);
    const hundred = file.find((i) => monthPay >= i.pay && monthPay < i.below);
    if (hundred) {
      setIncomeTax(hundred);
      navigate(`/workTax/${hundred[Index as keyof typeof hundred]}`);
    }
  };
  const overlayClick = () => {
    navigate(-1);
  };
  const resetCalculator = () => {
    reset({ defaultValues: { pay: 0, family: 1, child: 0 } });
    // setValue("defaultValues", { pay: 0, family: 1, child: 0 });
  };

  return (
    <>
      <MoneyBox>
        <NotiIcon>Notice</NotiIcon>
        <Notice>
          <span>1. 2021년 2월 개정된 근로소득 간이세액표입니다.</span>
        </Notice>
        <Notice>
          <span>
            2. 시행일(2021.2.17)이후 지급분부터 적용하여 원천징수하시기
            바랍니다.
          </span>
        </Notice>
        <Notice>
          <span>
            3. 소득세 과세표준 10억원 초과 구간 신설, 최고세율 상향(42% &rarr;
            45%) 및 자녀세액공제 기준 조정 (20세 이하 자녀 수 &rarr; 7세 이상
            20세 이하 자녀 수)에 따라 근로소득 간이세액표 개정
          </span>
        </Notice>
      </MoneyBox>
      <CalculateBox>
        <Form onSubmit={handleSubmit(formSubmit)}>
          <TipBox>
            Tip: 비과세월급을 입력해주세요.
            <Tip variants={tipvaiatns} whileHover="animate" initial="initial">
              {" "}
              <span>
                예시{")"} 비과세금액: 세전기준 330만원이라면 비과세 식대 10,
                차량유지비 20등은 제외
              </span>
            </Tip>
          </TipBox>
          월급여액:{" "}
          <CatInput {...register("defaultValues.pay")} value={payback} />원
          <Box>
            <span>
              {!payback
                ? null
                : `${Math.round(payback / 10000).toLocaleString()} 만원`}
            </span>
          </Box>
          <Hr />
          <CatBox>
            <span>전체 공제대상 가족 수(본인포함):</span>
            <CatSelect {...register("defaultValues.family")}>
              {familyCount.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </CatSelect>
          </CatBox>
          <CatBox>
            <span>전체 공제대상 가족 중 7세 이상 20세 이하 자녀 수 :</span>
            <CatSelect {...register("defaultValues.child")}>
              {childCount.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </CatSelect>
          </CatBox>
          <BtnBox>
            <Btn onClick={resetCalculator}>다시하기</Btn>
            <Btn>계산하기</Btn>
          </BtnBox>
        </Form>
      </CalculateBox>

      <MoneyBox style={{ marginTop: "18px" }}>
        <Notice>
          <span>1. 월급여액은 비과세 소득을 제외한 금액입니다.</span>
        </Notice>
        <Notice>
          <span>
            2. “전체 공제대상 가족 수”는 기본공제대상자(본인 포함)에 해당하는
            부양가족의 수를 기재합니다.
          </span>
        </Notice>
        <Notice>
          <span>
            3. “전체 공제대상 가족 중 7세 이상 20세 이하 자녀 수”는
            기본공제대상자에 해당하는 7세 이상 20세 이하의 자녀수를 선택합니다.
            따라서 7세 이상 20세 이하의 자녀이더라도 연간 소득금액이 100만원을
            초과하는 경우에는 “7세 이상 20세 이하의 자녀수”에서 제외합니다.
          </span>
        </Notice>
      </MoneyBox>
      <AnimatePresence>
        {Match && (
          <>
            <Overlay
              onClick={overlayClick}
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <BigCard style={{ backgroundColor: "white" }}>
                <div
                  style={{
                    fontSize: "22px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "12px auto",
                    fontWeight: "800",
                    marginTop: "6px",
                    marginBottom: "30px",
                  }}
                >
                  근로소득세카드
                </div>
                <div>
                  <span style={{ color: "red" }}>
                    ▶ 2022년 근로소득 간이세액표상의 세액으로서 실제 징수세금과
                    차이가 있을 수 있습니다.
                  </span>
                </div>
                <Section>
                  <PercentCard>
                    <span>▶ 80% 선택</span>
                  </PercentCard>
                  <Quote>
                    <TaxBox>
                      <Category>소득세</Category>
                      <Category>
                        {(Math.round(eight / 10) * 10).toLocaleString()} 원
                      </Category>
                    </TaxBox>
                    <TaxBox>
                      <Category>지방소득세</Category>
                      <Category>
                        {(Math.round((eight * 0.1) / 10) * 10).toLocaleString()}{" "}
                        원
                      </Category>
                    </TaxBox>
                  </Quote>
                  <TaxBox>
                    <Category
                      style={{
                        color: "white",
                        backgroundColor: "rgba(0,0,0,0.8)",
                      }}
                    >
                      납부세액의 합계액
                    </Category>
                    <Category>
                      {(
                        Math.round((eight + eight * 0.1) / 10) * 10
                      ).toLocaleString()}{" "}
                      원
                    </Category>
                  </TaxBox>
                </Section>

                <Section>
                  <PercentCard>
                    <span>▶ 100% 선택</span>
                  </PercentCard>
                  <Quote>
                    <TaxBox>
                      <Category>소득세</Category>
                      <Category>
                        {(Math.round(tax / 10) * 10).toLocaleString()} 원
                      </Category>
                    </TaxBox>
                    <TaxBox>
                      <Category>지방소득세</Category>
                      <Category>
                        {(Math.round((tax * 0.1) / 10) * 10).toLocaleString()}{" "}
                        원
                      </Category>
                    </TaxBox>
                  </Quote>
                  <TaxBox>
                    <Category
                      style={{
                        color: "white",
                        backgroundColor: "rgba(0,0,0,0.8)",
                      }}
                    >
                      납부세액의 합계액
                    </Category>
                    <Category>
                      {(
                        Math.round((tax + tax * 0.1) / 10) * 10
                      ).toLocaleString()}{" "}
                      원
                    </Category>
                  </TaxBox>
                </Section>

                <Section>
                  <PercentCard>
                    <span>▶ 120% 선택</span>
                  </PercentCard>
                  <Quote>
                    <TaxBox>
                      <Category>소득세</Category>
                      <Category>
                        {(Math.round(twelve / 10) * 10).toLocaleString()} 원
                      </Category>
                    </TaxBox>
                    <TaxBox>
                      <Category>지방소득세</Category>
                      <Category>
                        {(
                          Math.round((twelve * 0.1) / 10) * 10
                        ).toLocaleString()}{" "}
                        원
                      </Category>
                    </TaxBox>
                  </Quote>
                  <TaxBox>
                    <Category
                      style={{
                        color: "white",
                        backgroundColor: "rgba(0,0,0,0.8)",
                      }}
                    >
                      납부세액의 합계액
                    </Category>
                    <Category>
                      {(
                        Math.round((twelve + twelve * 0.1) / 10) * 10
                      ).toLocaleString()}{" "}
                      원
                    </Category>
                  </TaxBox>
                </Section>
                <hr style={{ margin: "20px auto" }} />
                <PercentCard>
                  ▷ 월급에 대한 세금은 사용자(원천징수의무자)가 월급을 줄 때
                  징수하여 세무서에 납부하고, 다음연도 2월분 월급을 지급할 때
                  1년간의 정확한 세금을 정산(연말정산)합니다.
                </PercentCard>
                <PercentCard>
                  ▷ 월급 이외에 다른 소득이 없으면 연말정산으로 납세의무가
                  종결되고, 다른 소득이 있으면 타 소득과 합산하여 다음연도 5월에
                  종합소득세를 확정신고 하여야 합니다.
                </PercentCard>
                <PercentCard>
                  ▷ 근로자는 원천징수세액을 근로소득간이세액표에 따른 세액의
                  80%, 100%, 120% 중에서 선택할 수 있으며(원천징수의무자에게
                  '소득세 원천징수세액 조정신청서'를 제출하여야 함),
                  원천징수방식을 변경한 이후에는 재변경전까지 계속 적용하여야
                  합니다.(단, 변경한 과세기간에는 재변경 불가)
                </PercentCard>
                <PercentCard>
                  ▷ 근로소득 간이세액표에 따른 세액보다 적게 원천징수ㆍ납부하는
                  경우 과소납부한 세액에 대하여 원천징수납부불성실가산세가
                  부과되므로 유의하시기 바랍니다.
                </PercentCard>
              </BigCard>
            </Overlay>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default WorkTax;

// 비과세금액
// 세전기준 330만원이라면
// 비과세 식대 10, 차량유지비 20등은 제외
