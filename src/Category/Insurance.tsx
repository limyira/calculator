import { getValue } from "@testing-library/user-event/dist/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import styled from "styled-components";

const CatBox = styled.div`
  display: flex;
  width: 20%;
  background-color: rgb(233, 236, 239);
  color: black;
  border-radius: 25px;
  padding: 3px 16px;
  align-items: center;
  justify-content: start;
  margin: 0 auto;
  @media screen and (max-width: 480px) {
    font-size: 0.6rem;
    padding: 3px;
  }
`;
const CatTwo = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  margin-left: 20px;
`;
const CatInput = styled.input`
  margin-right: 10px;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 90px;
  text-align: end;
  padding: 3px 16px;
`;
const Form = styled.form`
  width: 100%;
  padding: 10px;
`;
const BigBox = styled(motion.div)`
  display: flex;
  -moz-box-pack: justify;
  justify-content: space-between;
  background-color: rgb(255, 255, 255);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);

  width: 65%;
  margin: 40px auto;
  @media screen and (max-width: 480px) {
    width: 100%;
    padding: 10px;
  }
`;
const Cat = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;
const CatSelect = styled.select`
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 90px;
  margin-right: 20px;
  margin-left: 20px;
  font-size: 13px;
  text-align: center;
  width: 60%;
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
const H1 = styled.h1`
  margin: 10px auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-size: 25px;
`;
const CategoryBox = styled.div`
  display: flex;
  width: 100%;
  padding: 15px 20px;
  flex-direction: column;
  margin: 0 auto;
`;
const Section = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  row-gap: 20px;
  text-align: center;
  @media screen and (max-width: 480px) {
    font-size: 0.6rem;
  }
`;
const SectionBox = styled.div`
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  border-radius: 20px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface IState {
  first: number;
  second: number;
  third: number;
  fourth: {
    one: number;
    two: number;
    three: number;
    four: number;
  };
  fifth: number;
}
interface IForm {
  pay: number;
  value: number;
}

const BigBoxVar = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    y: -20,
    transition: {
      duration: "0.6",
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: "0.6",
    },
  },
};
const Insurance = () => {
  const {
    handleSubmit,
    register,
    watch,
    getValues,
    reset,
    formState: { errors },
  } = useForm<IForm>();
  const [national, setNational] = useState(0);
  const [healthInsurance, setHealthInsurance] = useState(0);
  const [longTerm, setLongTerm] = useState(0);
  const [employment, setEmployment] = useState(0);
  const [industrial, setIndustrial] = useState(0);
  const [employee, setEmployee] = useState(0);
  const [hidden, setHidden] = useState(true);
  const [monthPay, setMonthPay] = useState(0);
  const tax: IState = {
    first: 0.09,
    second: 0.0699,
    third: 0.0084663,
    fourth: {
      one: 0.0115,
      two: 0.0135,
      three: 0.0155,
      four: 0.0175,
    },
    fifth: 0.00163,
  };
  const resetValue = () => {
    setNational(0);
    setHealthInsurance(0);
    setLongTerm(0);
    setEmployment(0);
    setIndustrial(0);
    setEmployee(0);
    setHidden(true);
    reset({ pay: 0, value: 1 });
  };

  const FormSubmit = () => {
    const checkValue = Number(getValues("value"));
    const pay: number = getValues("pay");

    if (pay >= 1000000) {
      setNational(pay * tax.first);
      setHealthInsurance(pay * tax.second);
      setLongTerm(pay * tax.third);
      setIndustrial(pay * tax.fifth);
      setEmployee(pay * tax.first * 0.1);
      setMonthPay(pay);
      setHidden(false);
      if (checkValue) {
        switch (checkValue) {
          case 1: {
            setEmployment(pay * tax.fourth.one);
            break;
          }
          case 2: {
            setEmployment(pay * tax.fourth.two);
            break;
          }
          case 3: {
            setEmployment(pay * tax.fourth.three);
            break;
          }
          case 4: {
            setEmployment(pay * tax.fourth.four);
            break;
          }
        }
      }
    }
  };

  return (
    <>
      <BigBox style={{ flexDirection: "column" }}>
        <H1>4대보험 계산기</H1>
        <Form onSubmit={handleSubmit(FormSubmit)}>
          <motion.div
            style={{
              display: "flex",
              justifyContent: "end",
              marginBottom: "10px",
            }}
          >
            <span>{errors.pay?.message}</span>
          </motion.div>
          <Cat>
            <CatBox>
              <span>월 급여</span>
            </CatBox>

            <CatTwo>
              <CatInput
                {...register("pay", {
                  required: "금액이 너무적습니다.",
                  minLength: {
                    value: 6,
                    message: "100,000원 이상의 금액을 입력해주세요.",
                  },
                })}
                placeholder="please input pay"
              />
              <span>원</span>
            </CatTwo>
          </Cat>

          <Cat style={{ alignItems: "center", marginTop: "15px" }}>
            <CatBox>
              <span>근로자수</span>
            </CatBox>
            <CatTwo
              style={{
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <CatSelect {...register("value")} value={getValues("value")}>
                <option value={1} key={"first"}>
                  150인 미만
                </option>
                <option value={2} key={"second"}>
                  150인 이상
                </option>
                <option value={3} key={"third"}>
                  150인 이상 1,000인 미만
                </option>
                <option value={4} key={"fourth"}>
                  1000인 이상, 국가 지방단체
                </option>
              </CatSelect>
              <span>원</span>
            </CatTwo>
          </Cat>
          <hr style={{ margin: "20px auto" }} />
          <BtnBox>
            <Btn onClick={resetValue}>다시하기</Btn>
            <Btn>계산하기</Btn>
          </BtnBox>
        </Form>
      </BigBox>
      <AnimatePresence>
        {hidden === false && monthPay >= 100000 ? (
          <BigBox
            custom={hidden}
            variants={BigBoxVar}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{ alignItems: "center" }}
          >
            <CategoryBox>
              <Section>
                <SectionBox
                  style={{
                    backgroundColor: "rgb(248,249,250)",
                  }}
                >
                  <span>구분</span>
                </SectionBox>
                <SectionBox style={{ backgroundColor: "rgb(229, 246, 254)" }}>
                  <span>근로자 부담금</span>
                </SectionBox>
                <SectionBox style={{ backgroundColor: "rgb(254,236,234)" }}>
                  <span>사업주 부담금</span>
                </SectionBox>
                <SectionBox style={{ backgroundColor: "rgb(209, 231, 221)" }}>
                  <span>보험료 총액</span>
                </SectionBox>
                <SectionBox>국민연금</SectionBox>
                <SectionBox>{(national / 2).toLocaleString()}원</SectionBox>
                <SectionBox>{(national / 2).toLocaleString()}원</SectionBox>
                <SectionBox>{national.toLocaleString()}원</SectionBox>
                <SectionBox>건강보험</SectionBox>
                <SectionBox>
                  {(healthInsurance / 2).toLocaleString()}원
                </SectionBox>
                <SectionBox>
                  {(healthInsurance / 2).toLocaleString()}원
                </SectionBox>
                <SectionBox>{healthInsurance.toLocaleString()}원</SectionBox>
                <SectionBox>장기요양</SectionBox>
                <SectionBox>
                  {(Math.round(longTerm / 2 / 10) * 10).toLocaleString()}원
                </SectionBox>
                <SectionBox>
                  {(Math.round(longTerm / 2 / 10) * 10).toLocaleString()}원
                </SectionBox>
                <SectionBox>
                  {(Math.round(longTerm / 10) * 10).toLocaleString()}원
                </SectionBox>
                <SectionBox>고용보험</SectionBox>
                <SectionBox>{employee.toLocaleString()}원</SectionBox>
                <SectionBox>{employment.toLocaleString()}원</SectionBox>
                <SectionBox>
                  {(employee + employment).toLocaleString()}원
                </SectionBox>
                <SectionBox>산재보험</SectionBox>
                <SectionBox>0원</SectionBox>
                <SectionBox>{industrial.toLocaleString()}원</SectionBox>
                <SectionBox>{industrial.toLocaleString()}원</SectionBox>
                <SectionBox style={{ backgroundColor: "rgb(233, 236, 239)" }}>
                  합계
                </SectionBox>
                <SectionBox style={{ backgroundColor: "rgb(233, 236, 239)" }}>
                  {(
                    Math.round(
                      (national / 2 +
                        healthInsurance / 2 +
                        longTerm / 2 +
                        employee) /
                        10
                    ) * 10
                  ).toLocaleString()}
                  원
                </SectionBox>
                <SectionBox style={{ backgroundColor: "rgb(233, 236, 239)" }}>
                  {(
                    Math.round(
                      (national / 2 +
                        healthInsurance / 2 +
                        longTerm / 2 +
                        industrial +
                        employment) /
                        10
                    ) * 10
                  ).toLocaleString()}
                  원
                </SectionBox>
                <SectionBox style={{ backgroundColor: "rgb(233, 236, 239)" }}>
                  {(
                    Math.round(
                      (national +
                        healthInsurance +
                        longTerm +
                        industrial +
                        employment +
                        employee) /
                        10
                    ) * 10
                  ).toLocaleString()}
                  원
                </SectionBox>
              </Section>
            </CategoryBox>
          </BigBox>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default Insurance;
