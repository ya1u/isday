import React, { useState, useCallback } from "react";
import styles from "../../styles/CompoundCalc.module.css"
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

// 돈 형식에 콤마 추가 함수
const numberWithCommas = (number: string) => {
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const CompoundCalculator = () => {
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
    <div>
      <Helmet>
        <title>복리 계산기</title>
        <meta name="url" content="https://isday.net/compound-interest-calc/" />
        <meta name="description" content="복리계산기는 사용자가 복리 원리를 이해하고 계산할 수 있도록 도와줍니다. 이 페이지를 통해 사용자는 특정 초기 투자 금액과 연이율을 입력하여, 향후 일정 기간 동안 얼마나 자금이 증가하는지를 예측할 수 있습니다."/>
        <meta property="og:title" content="복리 계산기 - isDay.net"/>
        <meta property="og:description" content="복리계산기는 사용자가 복리 원리를 이해하고 계산할 수 있도록 도와줍니다. 이 페이지를 통해 사용자는 특정 초기 투자 금액과 연이율을 입력하여, 향후 일정 기간 동안 얼마나 자금이 증가하는지를 예측할 수 있습니다."/>
      </Helmet>
      <div className={styles.Container}>
        <div className={styles.CalculatorContainer}>
          <div className={styles.CalculatorScreen}>
            <div className={styles.Title}>복리 계산기</div>
            <label className={styles.InputLabel}>투자원금 (₩) :</label>
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
              placeholder="원금을 입력하세요"/>

            <label className={styles.InputLabel}>투자기간 (년) :</label>
            <input
              className={styles.Input}
              type="text"
              value={calculatorState.period > 0 ? calculatorState.period : ""}
              onChange={handlePeriodChange}
              onKeyPress={handleKeyPress}
              placeholder="기간을 입력하세요"/>

            <label className={styles.InputLabel}>연이율 (%) :</label>
            <input
              className={styles.Input}
              type="number"
              value={
                calculatorState.interestRate > 0
                  ? calculatorState.interestRate
                  : ""
              }
              onChange={handleInterestRateChange}
              placeholder="연이율을 입력하세요"/>

            <button className={styles.CalculateButton} onClick={handleCalculateClick}>계산하기</button>
          </div>
        </div>

        {calculatorState.result !== null && (
          <div className={styles.ResultDisplay}>
            <p className={styles.BoldText}>
              {"수익 금액 : "}
              {numberWithCommas((calculatorState.result - calculatorState.principal).toFixed(0))}
              {" ₩"}
            </p>
            <p className={styles.BoldGreenText}>
              {"최종 금액 : "}
              {numberWithCommas(calculatorState.result.toFixed(0))}
              {" ₩"}
            </p>
            {calculatorState.investmentData && (
              <table className={styles.Table}>
                <thead>
                  <tr>
                    <th className={styles.Th}>#</th>
                    <th className={styles.Th}>수익</th>
                    <th className={styles.Th}>총 금액</th>
                    <th className={styles.Th}>수익률</th>
                  </tr>
                </thead>
                <tbody>
                  {calculatorState.investmentData.map((data) => (
                    <tr key={data.year}>
                      <th className={styles.Th}>{data.year}</th>
                      <td className={styles.Td}>
                        {numberWithCommas(data.income.toFixed(0))}{" ₩"}</td>
                      <td className={styles.Td}>
                        {numberWithCommas(data.amount.toFixed(0))}{" ₩"}</td>
                      <td className={styles.Td}>{data.interestRate.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CompoundCalculator;
