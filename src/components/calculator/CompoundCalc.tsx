import React, { useState, useCallback } from "react";
import styled, { css } from "styled-components";
import { FormattedMessage, IntlProvider } from "react-intl";
import messages from "../../locales/messages";

interface InvestmentData {
  year: number;
  amount: number;
  income: number;
  interestRate: number;
}

interface CalculatorState {
  principal: number;
  interestRate: number;
  period: number;
  result: number | null;
  investmentData: InvestmentData[];
}

const CompoundCalculator = ({ selectedLang }: { selectedLang: string }) => {
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({
    principal: 0,
    interestRate: 0,
    period: 0,
    result: null,
    investmentData: [],
  });

  const handlePrincipalChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const principal = parseFloat(e.target.value.replace(/[^0-9]/g, ""));
    setCalculatorState((prevState) => ({ ...prevState, principal }));
  }, []);

  const handleInterestRateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const interestRate = parseFloat(e.target.value);
    setCalculatorState((prevState) => ({ ...prevState, interestRate }));
  }, []);

  const handlePeriodChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const period = parseFloat(e.target.value.replace(/[^0-9]/g, ""));
    setCalculatorState((prevState) => ({ ...prevState, period }));
  }, []);

  const calculateCompoundInterest = useCallback(() => {
    const { principal, interestRate, period } = calculatorState;
    const r = interestRate / 100;
    const investmentData: InvestmentData[] = [];

    let totalAmount = principal;
    for (let i = 1; i <= period; i++) {
      totalAmount *= 1 + r;
      const income = totalAmount - principal;
      const interestRate = (income / principal) * 100;
      investmentData.push({
        year: i,
        amount: totalAmount,
        income,
        interestRate,
      });
    }

    setCalculatorState((prevState) => ({
      ...prevState,
      result: totalAmount,
      investmentData,
    }));
  }, [calculatorState]);

  const handleCalculateClick = useCallback(() => {
    if (
      calculatorState.principal <= 0 ||
      calculatorState.interestRate <= 0 ||
      calculatorState.period <= 0
    ) {
      alert("입력값을 확인해주세요.");
      return;
    }
    calculateCompoundInterest();
  }, [calculatorState, calculateCompoundInterest]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;
    if (isNaN(Number(key))) {
      e.preventDefault();
    }
  }, []);

  return (
    <IntlProvider locale={selectedLang} messages={messages[selectedLang]}>
      <StyledContainer>
        <CalculatorContainer>
          <CalculatorScreen>
            <StyledTitle selectedLang={selectedLang}>
              <FormattedMessage id="content.compoundCalc.title" />
            </StyledTitle>
            <InputLabel>
              <FormattedMessage id="content.compoundCalc.investment" /> :
            </InputLabel>
            <Input
              type="text"
              value={
                calculatorState.principal > 0
                  ? calculatorState.principal.toLocaleString()
                  : ""
              }
              onChange={handlePrincipalChange}
              onKeyPress={handleKeyPress}
              placeholder={
                selectedLang === "ko"
                  ? "원금을 입력하세요"
                  : selectedLang === "en"
                  ? "Enter principal amount"
                  : "元金を入力してください"
              }
            />

            <InputLabel>
              <FormattedMessage id="content.compoundCalc.period" /> :
            </InputLabel>
            <Input
              type="text"
              value={calculatorState.period > 0 ? calculatorState.period : ""}
              onChange={handlePeriodChange}
              onKeyPress={handleKeyPress}
              placeholder={
                selectedLang === "ko"
                  ? "기간을 입력하세요"
                  : selectedLang === "en"
                  ? "Enter period"
                  : "期間を入力してください"
              }
            />

            <InputLabel>
              <FormattedMessage id="content.compoundCalc.rate" /> :
            </InputLabel>
            <Input
              type="number"
              value={
                calculatorState.interestRate > 0
                  ? calculatorState.interestRate
                  : ""
              }
              onChange={handleInterestRateChange}
              placeholder={
                selectedLang === "ko"
                  ? "연이율을 입력하세요"
                  : selectedLang === "en"
                  ? "Enter annual interest rate"
                  : "年利を入力してください"
              }
            />

            <CalculateButton onClick={handleCalculateClick}>
              {selectedLang === "ko"
                ? "계산하기"
                : selectedLang === "en"
                ? "Calculate"
                : "計算する"}
            </CalculateButton>
          </CalculatorScreen>
        </CalculatorContainer>

        {calculatorState.result !== null && (
          <ResultDisplay selectedLang={selectedLang}>
            <p>
              {selectedLang === "ko"
                ? "수익 금액"
                : selectedLang === "en"
                ? "Income"
                : "収益"}{" "}
              :{" "}
              {numberWithCommas(
                (calculatorState.result - calculatorState.principal).toFixed(0)
              )}{" "}
              {selectedLang === "ko" ? "₩" : selectedLang === "en" ? "$" : "円"}
            </p>
            <BoldGreenText selectedLang={selectedLang}>
              {selectedLang === "ko"
                ? "최종 금액"
                : selectedLang === "en"
                ? "Final Amount"
                : "最終金額"}{" "}
              : {numberWithCommas(calculatorState.result.toFixed(0))}{" "}
              {selectedLang === "ko" ? "₩" : selectedLang === "en" ? "$" : "円"}
            </BoldGreenText>
            {calculatorState.investmentData && (
              <Table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>
                      {selectedLang === "ko"
                        ? "수익"
                        : selectedLang === "en"
                        ? "Income"
                        : "収益"}
                    </th>
                    <th>
                      {selectedLang === "ko"
                        ? "총 금액"
                        : selectedLang === "en"
                        ? "Total Amount"
                        : "合計金額"}
                    </th>
                    <th>
                      {selectedLang === "ko"
                        ? "수익률"
                        : selectedLang === "en"
                        ? "Interest Rate"
                        : "収益率"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {calculatorState.investmentData.map((data) => (
                    <tr key={data.year}>
                      <th>{data.year}</th>
                      <td>
                        {numberWithCommas(data.income.toFixed(0))}{" "}
                        {selectedLang === "ko"
                          ? "₩"
                          : selectedLang === "en"
                          ? "$"
                          : "円"}
                      </td>
                      <td>
                        {numberWithCommas(data.amount.toFixed(0))}{" "}
                        {selectedLang === "ko"
                          ? "₩"
                          : selectedLang === "en"
                          ? "$"
                          : "円"}
                      </td>
                      <td>{data.interestRate.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </ResultDisplay>
        )}
      </StyledContainer>
    </IntlProvider>
  );
};

// 돈 형식에 콤마 추가 함수
const numberWithCommas = (number: string) => {
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const StyledContainer = styled.div`
  background-color: #f7f7f7;
  border: 1px solid transparent;
  border-radius: 25px; /* 둥근 모서리 추가 */
  box-shadow: 5px 10px 100px 50px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
  margin: 0;
  padding: 0;
`;

interface StyledTitleProps {
  selectedLang: string;
}

const StyledTitle = styled.div<StyledTitleProps>`
  font-size: 28px;
  margin: 20px auto;
  ${(props) =>
    props.selectedLang === "ko" &&
    css`
      font-family: "Jalnan", "MaplestoryBold";
    `}

  ${(props) =>
    props.selectedLang === "en" &&
    css`
      font-family: "Jalnan", "MaplestoryBold";
    `}

  ${(props) =>
    props.selectedLang === "ja" &&
    css`
      font-weight: 900;
    `}
`;

const CalculatorContainer = styled.div`
  justify-content: center;
  align-items: center;
  margin: 40px auto;
  width: 350px;
  /* height: 100vh; */
`;

const CalculatorScreen = styled.div`
  background-color: #f7f7f7;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputLabel = styled.label`
  width: 90%;
  font-size: 18px;
  font-weight: bold;
  margin-top: 15px;
  text-align: left;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  text-align: left; /* 숫자가 왼쪽 정렬되도록 설정 */
  &:focus {
    outline: none;
    border: 2px solid darkcyan;
  }
`;

const ResultDisplay = styled.p<StyledTitleProps>`
  display: flex;
  flex-direction: column;
  border-top: 1px solid grey;
  font-size: 18px;
  margin: 30px 30px;
  padding-top: 30px;
  p {
    ${(props) =>
    props.selectedLang === "ko" &&
    css`
      font-family: "Jalnan", "MaplestoryBold";
    `}

  ${(props) =>
    props.selectedLang === "en" &&
    css`
      font-family: "Jalnan", "MaplestoryBold";
    `}

  ${(props) =>
    props.selectedLang === "ja" &&
    css`
      font-weight: 900;
    `}
  }
`;

const Table = styled.table`
  border-top: 1px solid grey;
  margin-top: 30px;
  th,
  td {
    padding: 3px;
    font-size: 14px;
    border: 1px solid #ccc;
  }
  th {
    font-weight: bold;
    text-align: center;
  }
  td {
    text-align: right;
  }
`;

const CalculateButton = styled.button`
  background-color: darkcyan;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 30px;
  font-size: 16px;
  margin-top: 30px;
  cursor: pointer;
`;

const BoldGreenText = styled.span<StyledTitleProps>`
  font-weight: bold;
  color: green;
  ${(props) =>
    props.selectedLang === "ko" &&
    css`
      font-family: "Jalnan", "MaplestoryBold";
    `}

  ${(props) =>
    props.selectedLang === "en" &&
    css`
      font-family: "Jalnan", "MaplestoryBold";
    `}

  ${(props) =>
    props.selectedLang === "ja" &&
    css`
      font-weight: 900;
    `}
`;

export default CompoundCalculator;
