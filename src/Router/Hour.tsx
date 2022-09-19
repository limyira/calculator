import { env } from "process";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
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

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    margin-right: 5px;
    font-size: 18px;
    padding: 10px;
  }
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
  const juhyouCalculate = (dayHour + dayMin) * week;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IForm>();
  const onCalculate = ({ defaultValues: { quote } }: IForm) => {
    const monthPay = quote * (dayHour + dayMin) * week;
    if (weekMonth.week) {
      if (!plusWork && !plusMinWork) {
        setExpectPay(monthPay * 4.36);
        setFinalPay(monthPay * 4.36);
      }
      setExpectPay(monthPay * 4.36 + quote * 1.5 * (plusWork + plusMinWork));
      setFinalPay(monthPay * 4.36 + quote * 1.5 * (plusWork + plusMinWork));
      settimemoney(quote);
      if (juhyouCalculate >= 15 && checkOk.ok === true) {
        setjuhyou((juhyouCalculate / dayHour) * quote);
      }
      if (taxOk.low) {
        setTax(monthPay * 4.36 * 0.033);
      }
      if (taxOk.high) {
        setTax(monthPay * 4.36 * 0.0932);
      }
      if (intern.yes) {
        setInterPay((expectPay + juhyou) * 0.1);
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
      if (juhyouCalculate >= 15 && checkOk.ok === true) {
        setjuhyou((juhyouCalculate / dayHour) * quote);
      }
      if (taxOk.low) {
        setTax(monthPay * 0.033);
      }
      if (taxOk.high) {
        setTax(monthPay * 0.0932);
      }
      if (intern.yes) {
        setInterPay((expectPay + juhyou) * 0.1);
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
  return (
    <>
      <MoneyBox>
        2023년 최저시급은 전년대비 5.0% 인상된 9,620원으로 결정되었습니다.
      </MoneyBox>
      <CaculateContainer>
        <FormBox>
          <form onSubmit={handleSubmit(onCalculate)}>
            <CatBox>
              <div>
                <select>
                  <option>시급</option>
                </select>
              </div>
              <div>
                <input
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
                ></input>
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
                <select value={dayHour} onInput={selectHour}>
                  <option value={0}>시간</option>
                  {hTime.map((i) => (
                    <option value={i} key={i}>
                      {i}
                    </option>
                  ))}
                </select>
                <span>시간</span>
              </div>
              <div>
                <select value={dayMin} onInput={selectMin}>
                  <option value={0}>분</option>
                  <option value={0}>0</option>
                  <option value={0.5}>30</option>
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
                  <input
                    checked={weekMonth.week}
                    type="checkbox"
                    id="week"
                    onChange={weekOrMonth}
                  />
                  주
                </label>
                <label>
                  <input
                    checked={weekMonth.month}
                    type="checkbox"
                    id="month"
                    onChange={weekOrMonth}
                  />
                  월
                </label>
              </div>
              <div>
                <select value={week} onInput={selectWeek}>
                  {weekMonth.week ? (
                    <>
                      {" "}
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
                      {" "}
                      {Day.map((i) => (
                        <option value={i} key={i}>
                          {i}
                        </option>
                      ))}
                    </>
                  )}
                </select>
                <span>일</span>
              </div>
            </CatBox>
            <CatBox>
              <div>
                <span>월연장근무</span>
              </div>
              <div>
                <select onInput={PlusSelect}>
                  <option value={0}>시간</option>
                  {plusTime.map((i) => (
                    <option value={i} key={i}>
                      {i}
                    </option>
                  ))}
                </select>
                <span>시간</span>
              </div>
              <div>
                <select onInput={PluseMinSelect}>
                  <option value={0}>00</option>
                  <option value={0.5}>30</option>
                </select>
                <span>분</span>
              </div>
            </CatBox>
            <CatBox>
              <div>
                <span>주휴수당</span>
              </div>
              <div>
                <label>
                  <input
                    checked={checkOk.ok}
                    id="agree"
                    type="checkbox"
                    onChange={juCheck}
                  />
                  포함
                </label>
                <label>
                  <input
                    checked={checkOk.nook}
                    id="notagree"
                    type="checkbox"
                    onChange={juCheck}
                  />
                  제외
                </label>
              </div>
            </CatBox>
            <CatBox>
              <div>
                <span>세금</span>
              </div>
              <div>
                <label>
                  <input
                    checked={taxOk.no}
                    type="checkbox"
                    id="no"
                    onChange={taxCheck}
                  />
                  없음
                </label>
                <label>
                  <input
                    checked={taxOk.high}
                    type="checkbox"
                    id="high"
                    onChange={taxCheck}
                  />
                  9.32%
                </label>
                <label>
                  <input
                    checked={taxOk.low}
                    type="checkbox"
                    id="low"
                    onChange={taxCheck}
                  />
                  3.3%
                </label>
              </div>
            </CatBox>
            <CatBox>
              <div>
                <span>수습 여부</span>
              </div>
              <div>
                <label>
                  <input
                    checked={intern.yes}
                    type="checkbox"
                    onChange={internCheck}
                    id="yes"
                  />
                  포함
                </label>
                <label>
                  <input
                    checked={intern.no}
                    type="checkbox"
                    onChange={internCheck}
                    id="no"
                  />
                  제외
                </label>
              </div>
            </CatBox>
            <BtnBox>
              <button>다시하기</button>
              <button>계산하기</button>
            </BtnBox>
          </form>
          <span>{errors.defaultValues?.quote?.message}</span>
        </FormBox>

        <CalculateBox>
          <TotalBox>
            <span>구분</span>
            <span>시간/금액</span>
          </TotalBox>

          {plusWork | plusMinWork ? (
            <TotalBox>
              <span>추가근무</span>
              <span>
                {Math.ceil(
                  timemoney * 1.5 * (plusWork + plusMinWork)
                ).toLocaleString()}
                원
              </span>
            </TotalBox>
          ) : null}
          {checkOk.ok === true ? (
            <TotalBox>
              <span>주휴수당</span>
              <span>{juhyou.toLocaleString()}원</span>
            </TotalBox>
          ) : null}
          <TotalBox>
            <span>기본 월급</span>
            <span> {(Math.ceil(expectPay / 10) * 10).toLocaleString()}원</span>
          </TotalBox>
          <TotalBox>
            <span>예상월급</span>
            <span>
              {(Math.ceil((expectPay + juhyou) / 10) * 10).toLocaleString()}원
            </span>
          </TotalBox>
          {taxOk.high || taxOk.low === true ? (
            <TotalBox>
              <span>세금</span>
              <span>{Math.ceil((tax / 10) * 10).toLocaleString()}원</span>
            </TotalBox>
          ) : null}
          {intern.yes === true ? (
            <TotalBox>
              <span>수습</span>
              <span>{interPay}원</span>
            </TotalBox>
          ) : null}
          <TotalBox>
            <span>최종예상월급</span>
            <span>
              {(
                Math.ceil((finalPay + juhyou - tax - interPay) / 10) * 10
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
