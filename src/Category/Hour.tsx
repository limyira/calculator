import { env } from "process";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const MoneyBox = styled.div`
  display: flex;
  -moz-box-pack: justify;
  background-color: rgb(255, 255, 255);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  width: 100%;
  align-items: center;
  justify-content: center;
  margin: auto;
  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
    line-height: 20px;
  }
`;

const CaculateContainer = styled.div`
  display: flex;
  height: 480px;
  width: 100%;
  margin: auto;
  margin-top: 45px;
  @media screen and (max-width: 480px) {
    font-size: 0.8rem;
    line-height: 20px;
    flex-direction: column;
    padding: 0;
    margin-left: 0px;
  }
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

  width: 49%;
  margin-right: 10px;
  margin-left: 10px;
  flex-direction: column;
  @media screen and (max-width: 480px) {
    width: 100%;
    margin-left: 0px;
  }
`;
const TotalBox = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
`;
const BigBox = styled.div`
  display: flex;
  -moz-box-pack: justify;
  justify-content: space-between;
  background-color: rgb(255, 255, 255);
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);

  width: 49%;
  margin-right: 10px;
  margin-left: 10px;
  @media screen and (max-width: 480px) {
    width: 100%;
    margin: 10px 0px;
    padding: 20px 20px;
  }
`;

const Form = styled.form`
  width: 100%;
  padding: 10px;
  @media screen and (max-width: 480px) {
    width: 100%;
    padding: 0;
    margin: 0;
  }
`;
const CatBox = styled.div`
  display: flex;
  margin-bottom: 30px;
  margin-right: 10px;
  margin-top: 10px;
  justify-content: space-between;
  width: 100%;
  align-items: center;
`;

const CatTwo = styled.div`
  width: 60%;
  display: flex;
  align-items: center;
  justify-content: end;
`;

const CatInput = styled.input`
  margin-right: 10px;
  width: 180px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 90px;
  text-align: end;
  padding: 3px 16px;
`;
const CatThree = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: end;
  margin: 0;
  span {
    display: block;
    width: fit-content;
    word-break: keep-all;
  }
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

const CatCheckbox = styled.input`
  margin-right: 10px;
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
  margin: 0 auto;
`;

interface IForm {
  defaultValues: {
    quote: number;
    checkbox: [];
    plusquotes: number;
  };
}

const Hour = () => {
  const hTime = Array.from({ length: 24 }, (v, i) => i);
  const plusTime = Array.from({ length: 24 }, (v, i) => i);
  const Day = Array.from({ length: 32 }, (v, i) => i);
  const [timemoney, settimemoney] = useState(0);
  const [finalPay, setFinalPay] = useState(0);
  const [dayHour, setDayHour] = useState(0);
  const [dayMin, setDayMin] = useState(0);
  const [week, setWeek] = useState(0);
  const [juhyou, setjuhyou] = useState(0);
  const [plusWork, setPlusWork] = useState(0);
  const [plusMinWork, setPlusMinWork] = useState(0);
  const [expectPay, setExpectPay] = useState(0);
  const [checkOk, setcheckOk] = useState({
    ok: false,
    nook: false,
  });
  const [tax, setTax] = useState(0);
  const [taxOk, setTaxOk] = useState({
    no: false,
    high: false,
    low: false,
  });
  const [intern, setIntern] = useState({
    yes: false,
    no: false,
  });
  const [weekMonth, setWeekMonth] = useState({
    week: false,
    month: false,
  });
  const [interPay, setInterPay] = useState(0);
  const defaultWork = weekMonth.week
    ? (dayHour + dayMin) * week * 4.36
    : (dayHour + dayMin) * week;
  const juhyouTime = defaultWork / dayHour;
  const totalWorkTime = defaultWork + juhyouTime;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IForm>();
  const onCalculate = ({ defaultValues: { quote } }: IForm) => {
    const monthPay = quote * defaultWork;
    if (weekMonth.week) {
      if (!plusWork && !plusMinWork) {
        setExpectPay(monthPay);
        setFinalPay(monthPay);
      }
      setExpectPay(monthPay + quote * 1.5 * (plusWork + plusMinWork));
      setFinalPay(monthPay + quote * 1.5 * (plusWork + plusMinWork));
      settimemoney(quote);
      if (defaultWork >= 15 && checkOk.ok === true) {
        setjuhyou((defaultWork / dayHour) * quote);
      }
      if (taxOk.low) {
        setTax(
          (monthPay +
            juhyouTime * quote -
            (monthPay + juhyouTime * quote) * 0.1) *
            0.033
        );
      }
      if (taxOk.high) {
        setTax(monthPay * 0.0932);
      }
      if (intern.yes) {
        setInterPay((monthPay + juhyouTime * quote) * 0.1);
      }
    }
    if (weekMonth.month) {
      if (!plusWork && !plusMinWork) {
        setExpectPay(monthPay);
        setFinalPay(monthPay);
      }
      setExpectPay(monthPay + quote * 1.5 * (plusWork + plusMinWork));
      setFinalPay(monthPay + quote * 1.5 * (plusWork + plusMinWork));
      settimemoney(quote);
      if (week >= 11 && checkOk.ok === true) {
        setjuhyou((defaultWork / dayHour) * quote);
      }
      if (taxOk.low) {
        setTax((monthPay + juhyou - (monthPay + juhyou) * 0.1) * 0.033);
      }
      if (taxOk.high) {
        setTax((monthPay + juhyou) * 0.0932);
      }
      if (intern.yes) {
        setInterPay((monthPay + juhyou) * 0.1);
      }
    }
  };
  const selectHour = (event: React.MouseEvent<HTMLSelectElement>) => {
    setDayHour(+event.currentTarget.value);
  };
  const selectMin = (event: React.MouseEvent<HTMLSelectElement>) => {
    setDayMin(+event.currentTarget.value);
  };
  const selectWeek = (event: React.MouseEvent<HTMLSelectElement>) => {
    setWeek(+event.currentTarget.value);
  };

  const PlusSelect = (event: React.MouseEvent<HTMLSelectElement>) => {
    setPlusWork(+event.currentTarget.value);
  };
  const PluseMinSelect = (event: React.MouseEvent<HTMLSelectElement>) => {
    setPlusMinWork(+event.currentTarget.value);
  };
  const juCheck = (e: { target: HTMLInputElement }) => {
    const { id, checked } = e.target;
    if (id === "agree") {
      setcheckOk((prev) => ({
        ...prev,
        ok: true,
        nook: false,
      }));
    }
    if (id === "notagree") {
      setcheckOk((prev) => ({
        ...prev,
        ok: false,
        nook: true,
      }));
    }
  };
  const taxCheck = (event: { target: HTMLInputElement }) => {
    const { id } = event.target;
    if (id === "no") {
      setTaxOk((prev) => ({
        ...prev,
        no: true,
        high: false,
        low: false,
      }));
    }
    if (id === "high") {
      setTaxOk((prev) => ({
        ...prev,
        no: false,
        high: true,
        low: false,
      }));
    }
    if (id === "low") {
      setTaxOk((prev) => ({
        ...prev,
        no: false,
        high: false,
        low: true,
      }));
    }
  };

  const internCheck = (event: { target: HTMLInputElement }) => {
    const { id } = event.target;
    if (id === "yes") {
      setIntern((prev) => ({
        ...prev,
        yes: true,
        no: false,
      }));
    }
    if (id === "no") {
      setIntern((prev) => ({
        ...prev,
        yes: false,
        no: true,
      }));
    }
  };
  const weekOrMonth = (event: { target: HTMLInputElement }) => {
    const { id } = event.target;
    if (id === "week") {
      setWeekMonth((prev) => ({
        ...prev,
        week: true,
        month: false,
      }));
    }
    if (id === "month") {
      setWeekMonth((prev) => ({
        ...prev,
        week: false,
        month: true,
      }));
    }
  };
  const retry = () => {
    settimemoney(0);
    setFinalPay(0);
    setDayHour(0);
    setDayMin(0);
    setWeek(0);
    setjuhyou(0);
    setPlusWork(0);
    setPlusMinWork(0);
    setExpectPay(0);
    setTax(0);
    setTaxOk({ high: false, low: false, no: false });
    setcheckOk({ ok: false, nook: false });
    setIntern({ yes: false, no: false });
    setWeekMonth({ week: false, month: false });
    setInterPay(0);
  };
  return (
    <>
      <MoneyBox>
        2023년 최저시급은 전년대비 5.0% 인상된 9,620원으로 결정되었습니다.
      </MoneyBox>
      <CaculateContainer>
        <BigBox>
          <Form onSubmit={handleSubmit(onCalculate)}>
            <CatBox>
              <div>
                <span>시급 &rarr; 월급</span>
              </div>
              <CatTwo>
                <CatInput
                  {...register("defaultValues.quote", {
                    required: "error_message",
                    minLength: {
                      value: 4,
                      message: "금액이 너무적습니다.",
                    },
                    maxLength: {
                      value: 8,
                      message: "최대금액을 8자리로 설정해주세요.",
                    },
                  })}
                  placeholder="금액을 입력해주세요"
                ></CatInput>
                <span>원</span>
              </CatTwo>
            </CatBox>
            <CatBox>
              <div>
                <span>일근무시간</span>
              </div>
              <CatThree>
                <CatSelect value={dayHour} onInput={selectHour}>
                  <option value={0}>시간</option>
                  {hTime.map((i) => (
                    <option value={i} key={i}>
                      {i}
                    </option>
                  ))}
                </CatSelect>
                <span>시간</span>
                <CatSelect value={dayMin} onInput={selectMin}>
                  <option value={0}>분</option>
                  <option value={0}>0</option>
                  <option value={0.5}>30</option>
                </CatSelect>
                <span>분</span>
              </CatThree>
            </CatBox>
            <CatBox>
              <div>
                <span>근무일수</span>
              </div>
              <CatThree>
                <div style={{ display: "flex" }}>
                  <div>
                    <label style={{ display: "flex", flexDirection: "row" }}>
                      <CatCheckbox
                        checked={weekMonth.week}
                        type="checkbox"
                        id="week"
                        onChange={weekOrMonth}
                      />
                      <span>주</span>
                    </label>
                  </div>
                  <div>
                    <label style={{ display: "flex", flexDirection: "row" }}>
                      <CatCheckbox
                        checked={weekMonth.month}
                        type="checkbox"
                        id="month"
                        onChange={weekOrMonth}
                      />
                      <span>월</span>
                    </label>
                  </div>
                </div>
                <CatSelect value={week} onInput={selectWeek}>
                  {weekMonth.week ? (
                    <>
                      <option value={0}>선택</option>
                      <option value={0}>0</option>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>{" "}
                    </>
                  ) : (
                    <>
                      {Day.map((i) => (
                        <option value={i} key={i}>
                          {i}
                        </option>
                      ))}
                    </>
                  )}
                </CatSelect>
                <span>일</span>
              </CatThree>
            </CatBox>
            <CatBox>
              <div>
                <span>월연장근무</span>
              </div>
              <CatThree>
                <CatSelect value={plusWork} onInput={PlusSelect}>
                  <option value={0}>시간</option>
                  {plusTime.map((i) => (
                    <option value={i} key={i}>
                      {i}
                    </option>
                  ))}
                </CatSelect>
                <span>시간</span>
                <CatSelect value={plusMinWork} onInput={PluseMinSelect}>
                  <option value={0}>분</option>
                  <option value={0}>00</option>
                  <option value={0.5}>30</option>
                </CatSelect>
                <span>분</span>
              </CatThree>
            </CatBox>
            <CatBox>
              <div>
                <span>주휴수당</span>
              </div>
              <CatThree>
                <label>
                  <CatCheckbox
                    checked={checkOk.ok}
                    id="agree"
                    type="checkbox"
                    onChange={juCheck}
                  />
                  포함
                </label>
                <label>
                  <CatCheckbox
                    checked={checkOk.nook}
                    id="notagree"
                    type="checkbox"
                    onChange={juCheck}
                  />
                  제외
                </label>
              </CatThree>
            </CatBox>
            <CatBox>
              <div>
                <span>세금</span>
              </div>
              <CatThree>
                <label>
                  <CatCheckbox
                    checked={taxOk.no}
                    type="checkbox"
                    id="no"
                    onChange={taxCheck}
                  />
                  없음
                </label>
                <label>
                  <CatCheckbox
                    checked={taxOk.high}
                    type="checkbox"
                    id="high"
                    onChange={taxCheck}
                  />
                  9.32%
                </label>
                <label>
                  <CatCheckbox
                    checked={taxOk.low}
                    type="checkbox"
                    id="low"
                    onChange={taxCheck}
                  />
                  3.3%
                </label>
              </CatThree>
            </CatBox>
            <CatBox>
              <div>
                <span>수습 여부</span>
              </div>
              <CatThree>
                <label>
                  <CatCheckbox
                    checked={intern.yes}
                    type="checkbox"
                    onChange={internCheck}
                    id="yes"
                  />
                  포함
                </label>
                <label>
                  <CatCheckbox
                    checked={intern.no}
                    type="checkbox"
                    onChange={internCheck}
                    id="no"
                  />
                  제외
                </label>
              </CatThree>
            </CatBox>
            <BtnBox>
              <Btn onClick={retry}>다시하기</Btn>
              <Btn>계산하기</Btn>
            </BtnBox>
          </Form>
        </BigBox>

        <CalculateBox>
          <TotalBox>
            <span>구분</span>
            <span>시간/금액</span>
          </TotalBox>
          <TotalBox>
            <span>총 근무시간</span>
            <span>
              {Math.ceil(totalWorkTime)
                ? Math.ceil(totalWorkTime + (plusWork + plusMinWork))
                : 0}
              시간
            </span>
          </TotalBox>
          <TotalBox>
            <span>기본 근무시간</span>
            <span>{Math.floor(defaultWork)}시간</span>
          </TotalBox>
          {checkOk.ok === true ? (
            <TotalBox>
              <span>주휴시간</span>
              <span>{Math.floor(juhyouTime)}시간</span>
            </TotalBox>
          ) : null}

          {checkOk.ok === true ? (
            <TotalBox>
              <span>연장 시간</span>
              <span>
                {plusMinWork ? `${plusWork} 시간 30분 ` : `${plusWork} 시간`}
              </span>
            </TotalBox>
          ) : null}

          {plusWork | plusMinWork ? (
            <TotalBox>
              <span style={{ color: "green" }}>연장 수당</span>
              <span style={{ color: "green" }}>
                {Math.floor(
                  timemoney * 1.5 * (plusWork + plusMinWork)
                ).toLocaleString()}
                원
              </span>
            </TotalBox>
          ) : null}
          {checkOk.ok === true ? (
            <TotalBox>
              <span style={{ color: "green" }}>주휴수당</span>
              <span style={{ color: "green" }}>
                {(Math.floor(juhyou / 1000) * 1000).toLocaleString()}원
              </span>
            </TotalBox>
          ) : null}
          <TotalBox>
            <span>기본 월급</span>
            <span>
              {(
                Math.floor(
                  Number(
                    expectPay - timemoney * 1.5 * (plusWork + plusMinWork)
                  ) / 1000
                ) * 1000
              ).toLocaleString()}
              원
            </span>
          </TotalBox>
          <TotalBox>
            <span>예상월급</span>
            <span>
              {(
                Math.floor((expectPay + juhyou) / 1000) * 1000
              ).toLocaleString()}
              원
            </span>
          </TotalBox>
          {taxOk.high || taxOk.low === true ? (
            <TotalBox>
              <span style={{ color: "red" }}>세금</span>
              <span style={{ color: "red" }}>
                -{Math.floor((tax / 1000) * 1000).toLocaleString()}원
              </span>
            </TotalBox>
          ) : null}
          {intern.yes === true ? (
            <TotalBox>
              <span style={{ color: "red" }}>수습</span>
              <span style={{ color: "red" }}>
                -{(Math.floor(interPay / 1000) * 1000).toLocaleString()}원
              </span>
            </TotalBox>
          ) : null}
          <TotalBox>
            <span>최종예상월급</span>
            <span>
              {(
                Math.floor((finalPay + juhyou - tax - interPay) / 1000) * 1000
              ).toLocaleString()}
              원
            </span>
          </TotalBox>
        </CalculateBox>
      </CaculateContainer>
    </>
  );
};

export default Hour;
