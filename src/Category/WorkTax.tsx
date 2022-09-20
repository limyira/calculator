import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
  margin-top: 80px;
  flex-direction: column;
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

  width: 60%;
  margin: 40px auto;
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
  justify-content: center;
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
`;

interface IForm {
  defaultValues: {
    pay: number;
    family: number;
    child: number;
  };
}

const WorkTax = () => {
  const familyCount = Array.from({ length: 11 }, (v, i) => i + 1);
  const childCount = Array.from({ length: 11 }, (v, i) => i);

  const { register, watch, handleSubmit, setValue, getValues } =
    useForm<IForm>();
  const formSubmit = () => {};
  const payback = !Number(watch("defaultValues.pay"))
    ? 0
    : Number(watch("defaultValues.pay"));
  const familyCheck = watch("defaultValues.family");
  const childCheck = watch("defaultValues.child");
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
          월급여액:
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
            <Btn
              onClick={() =>
                setValue("defaultValues", { pay: 0, family: 1, child: 0 })
              }
            >
              다시하기
            </Btn>
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
    </>
  );
};

export default WorkTax;
