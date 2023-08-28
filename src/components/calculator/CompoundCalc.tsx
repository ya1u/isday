import React, { useState, useCallback } from "react";
import styles from "../../styles/CompoundCalc.module.css"
import styled from "styled-components";
import { FormattedMessage, IntlProvider } from "react-intl";
import messages from "../../locales/messages";
import { getLanguageStyle } from "../../App";
import { Helmet } from "react-helmet-async";

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

interface StyledTitleProps {
  selectedLang: string;
}

const StyledTitle = styled.div<StyledTitleProps>`
  ${props => getLanguageStyle(props.selectedLang)}
`;

const ResultDisplay = styled.p<StyledTitleProps>`
  p {
     ${props => getLanguageStyle(props.selectedLang)} 
  }
`;

// 돈 형식에 콤마 추가 함수
const numberWithCommas = (number: string) => {
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

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
      <Helmet>
        <title>
          {selectedLang == "ko"
            ? "isDay - 복리 계산기"
            : selectedLang == "ja"
            ? "isDay - 複利計算機"
            : "isDay - Compound Interest Calculator"}
        </title>
        <meta
          name="description"
          content={
            selectedLang == "ko"
              ? "복리계산기는 사용자가 복리 원리를 이해하고 계산할 수 있도록 도와줍니다. 이 페이지를 통해 사용자는 특정 초기 투자 금액과 연이율을 입력하여, 향후 일정 기간 동안 얼마나 자금이 증가하는지를 예측할 수 있습니다."
              : selectedLang == "ja"
              ? "複利計算機は、ユーザーが複利原理を理解し、計算するのに役立ちます。 このページでは、特定の初期投資金額と年率を入力して、次の期間にどれだけ資金が増加するかを予測することができます。"
              : "The compound interest calculator helps users understand and calculate the compound interest principle. This page allows users to enter a specific initial investment amount and annual rate to predict how much funds will increase over the next period."
          }
        />
      </Helmet>
      <div className={styles.Container}>
        <div className={styles.CalculatorContainer}>
          <div className={styles.CalculatorScreen}>
            <StyledTitle className={styles.Title} selectedLang={selectedLang}>
              <FormattedMessage id="content.compoundCalc.title" />
            </StyledTitle>
            <label className={styles.InputLabel}>
              <FormattedMessage id="content.compoundCalc.investment" /> :
            </label>
            <input
              className={styles.Input}
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

            <label className={styles.InputLabel}>
              <FormattedMessage id="content.compoundCalc.period" /> :
            </label>
            <input
              className={styles.Input}
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

            <label className={styles.InputLabel}>
              <FormattedMessage id="content.compoundCalc.rate" /> :
            </label>
            <input
              className={styles.Input}
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

            <button className={styles.CalculateButton} onClick={handleCalculateClick}>
              {selectedLang === "ko"
                ? "계산하기"
                : selectedLang === "en"
                ? "Calculate"
                : "計算する"}
            </button>
          </div>
        </div>

        {calculatorState.result !== null && (
          <ResultDisplay className={styles.ResultDisplay} selectedLang={selectedLang}>
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
            <p className={styles.BoldGreenText}>
              {selectedLang === "ko"
                ? "최종 금액"
                : selectedLang === "en"
                ? "Final Amount"
                : "最終金額"}{" "}
              : {numberWithCommas(calculatorState.result.toFixed(0))}{" "}
              {selectedLang === "ko" ? "₩" : selectedLang === "en" ? "$" : "円"}
            </p>
            {calculatorState.investmentData && (
              <table className={styles.Table}>
                <thead>
                  <tr>
                    <th className={styles.Th}>#</th>
                    <th className={styles.Th}>
                      {selectedLang === "ko"
                        ? "수익"
                        : selectedLang === "en"
                        ? "Income"
                        : "収益"}
                    </th>
                    <th className={styles.Th}>
                      {selectedLang === "ko"
                        ? "총 금액"
                        : selectedLang === "en"
                        ? "Total Amount"
                        : "合計金額"}
                    </th>
                    <th className={styles.Th}>
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
                      <th className={styles.Th}>{data.year}</th>
                      <td className={styles.Td}>
                        {numberWithCommas(data.income.toFixed(0))}{" "}
                        {selectedLang === "ko"
                          ? "₩"
                          : selectedLang === "en"
                          ? "$"
                          : "円"}
                      </td>
                      <td className={styles.Td}>
                        {numberWithCommas(data.amount.toFixed(0))}{" "}
                        {selectedLang === "ko"
                          ? "₩"
                          : selectedLang === "en"
                          ? "$"
                          : "円"}
                      </td>
                      <td className={styles.Td}>{data.interestRate.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </ResultDisplay>
        )}
      </div>
    </IntlProvider>
  );
};

export default CompoundCalculator;
