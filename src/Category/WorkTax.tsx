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
          <span>1. 2021??? 2??? ????????? ???????????? ????????????????????????.</span>
        </Notice>
        <Notice>
          <span>
            2. ?????????(2021.2.17)?????? ??????????????? ???????????? ?????????????????????
            ????????????.
          </span>
        </Notice>
        <Notice>
          <span>
            3. ????????? ???????????? 10?????? ?????? ?????? ??????, ???????????? ??????(42% &rarr;
            45%) ??? ?????????????????? ?????? ?????? (20??? ?????? ?????? ??? &rarr; 7??? ??????
            20??? ?????? ?????? ???)??? ?????? ???????????? ??????????????? ??????
          </span>
        </Notice>
      </MoneyBox>
      <CalculateBox>
        <Form onSubmit={handleSubmit(formSubmit)}>
          <TipBox>
            Tip: ?????????????????? ??????????????????.
            <Tip variants={tipvaiatns} whileHover="animate" initial="initial">
              {" "}
              <span>
                ??????{")"} ???????????????: ???????????? 330??????????????? ????????? ?????? 10,
                ??????????????? 20?????? ??????
              </span>
            </Tip>
          </TipBox>
          ????????????:{" "}
          <CatInput {...register("defaultValues.pay")} value={payback} />???
          <Box>
            <span>
              {!payback
                ? null
                : `${Math.round(payback / 10000).toLocaleString()} ??????`}
            </span>
          </Box>
          <Hr />
          <CatBox>
            <span>?????? ???????????? ?????? ???(????????????):</span>
            <CatSelect {...register("defaultValues.family")}>
              {familyCount.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </CatSelect>
          </CatBox>
          <CatBox>
            <span>?????? ???????????? ?????? ??? 7??? ?????? 20??? ?????? ?????? ??? :</span>
            <CatSelect {...register("defaultValues.child")}>
              {childCount.map((i) => (
                <option key={i}>{i}</option>
              ))}
            </CatSelect>
          </CatBox>
          <BtnBox>
            <Btn onClick={resetCalculator}>????????????</Btn>
            <Btn>????????????</Btn>
          </BtnBox>
        </Form>
      </CalculateBox>

      <MoneyBox style={{ marginTop: "18px" }}>
        <Notice>
          <span>1. ??????????????? ????????? ????????? ????????? ???????????????.</span>
        </Notice>
        <Notice>
          <span>
            2. ????????? ???????????? ?????? ????????? ?????????????????????(?????? ??????)??? ????????????
            ??????????????? ?????? ???????????????.
          </span>
        </Notice>
        <Notice>
          <span>
            3. ????????? ???????????? ?????? ??? 7??? ?????? 20??? ?????? ?????? ?????????
            ???????????????????????? ???????????? 7??? ?????? 20??? ????????? ???????????? ???????????????.
            ????????? 7??? ?????? 20??? ????????? ?????????????????? ?????? ??????????????? 100?????????
            ???????????? ???????????? ???7??? ?????? 20??? ????????? ?????????????????? ???????????????.
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
                  ?????????????????????
                </div>
                <div>
                  <span style={{ color: "red" }}>
                    ??? 2022??? ???????????? ????????????????????? ??????????????? ?????? ???????????????
                    ????????? ?????? ??? ????????????.
                  </span>
                </div>
                <Section>
                  <PercentCard>
                    <span>??? 80% ??????</span>
                  </PercentCard>
                  <Quote>
                    <TaxBox>
                      <Category>?????????</Category>
                      <Category>
                        {(Math.round(eight / 10) * 10).toLocaleString()} ???
                      </Category>
                    </TaxBox>
                    <TaxBox>
                      <Category>???????????????</Category>
                      <Category>
                        {(Math.round((eight * 0.1) / 10) * 10).toLocaleString()}{" "}
                        ???
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
                      ??????????????? ?????????
                    </Category>
                    <Category>
                      {(
                        Math.round((eight + eight * 0.1) / 10) * 10
                      ).toLocaleString()}{" "}
                      ???
                    </Category>
                  </TaxBox>
                </Section>

                <Section>
                  <PercentCard>
                    <span>??? 100% ??????</span>
                  </PercentCard>
                  <Quote>
                    <TaxBox>
                      <Category>?????????</Category>
                      <Category>
                        {(Math.round(tax / 10) * 10).toLocaleString()} ???
                      </Category>
                    </TaxBox>
                    <TaxBox>
                      <Category>???????????????</Category>
                      <Category>
                        {(Math.round((tax * 0.1) / 10) * 10).toLocaleString()}{" "}
                        ???
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
                      ??????????????? ?????????
                    </Category>
                    <Category>
                      {(
                        Math.round((tax + tax * 0.1) / 10) * 10
                      ).toLocaleString()}{" "}
                      ???
                    </Category>
                  </TaxBox>
                </Section>

                <Section>
                  <PercentCard>
                    <span>??? 120% ??????</span>
                  </PercentCard>
                  <Quote>
                    <TaxBox>
                      <Category>?????????</Category>
                      <Category>
                        {(Math.round(twelve / 10) * 10).toLocaleString()} ???
                      </Category>
                    </TaxBox>
                    <TaxBox>
                      <Category>???????????????</Category>
                      <Category>
                        {(
                          Math.round((twelve * 0.1) / 10) * 10
                        ).toLocaleString()}{" "}
                        ???
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
                      ??????????????? ?????????
                    </Category>
                    <Category>
                      {(
                        Math.round((twelve + twelve * 0.1) / 10) * 10
                      ).toLocaleString()}{" "}
                      ???
                    </Category>
                  </TaxBox>
                </Section>
                <hr style={{ margin: "20px auto" }} />
                <PercentCard>
                  ??? ????????? ?????? ????????? ?????????(?????????????????????)??? ????????? ??? ???
                  ???????????? ???????????? ????????????, ???????????? 2?????? ????????? ????????? ???
                  1????????? ????????? ????????? ??????(????????????)?????????.
                </PercentCard>
                <PercentCard>
                  ??? ?????? ????????? ?????? ????????? ????????? ?????????????????? ???????????????
                  ????????????, ?????? ????????? ????????? ??? ????????? ???????????? ???????????? 5??????
                  ?????????????????? ???????????? ????????? ?????????.
                </PercentCard>
                <PercentCard>
                  ??? ???????????? ????????????????????? ?????????????????????????????? ?????? ?????????
                  80%, 100%, 120% ????????? ????????? ??? ?????????(???????????????????????????
                  '????????? ?????????????????? ???????????????'??? ??????????????? ???),
                  ????????????????????? ????????? ???????????? ?????????????????? ?????? ???????????????
                  ?????????.(???, ????????? ?????????????????? ????????? ??????)
                </PercentCard>
                <PercentCard>
                  ??? ???????????? ?????????????????? ?????? ???????????? ?????? ???????????????????????????
                  ?????? ??????????????? ????????? ????????? ???????????????????????????????????????
                  ??????????????? ??????????????? ????????????.
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

// ???????????????
// ???????????? 330???????????????
// ????????? ?????? 10, ??????????????? 20?????? ??????
