import React, { useState } from "react";
import styled from "styled-components";

interface CalculatorState {
  principal: number;
  interestRate: number;
  period: number;
  result: number | null;
}

const CompoundCalculator: React.FC = () => {
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({
    principal: 0,
    interestRate: 0,
    period: 0,
    result: null,
  });

  const handlePrincipalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const principal = parseFloat(e.target.value.replace(/[^0-9]/g, "")); // 숫자 이외의 문자 제거
    setCalculatorState((prevState) => ({ ...prevState, principal }));
  };

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const interestRate = parseFloat(e.target.value);
    setCalculatorState((prevState) => ({ ...prevState, interestRate }));
  };

  const handlePeriodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const period = parseFloat(e.target.value.replace(/[^0-9]/g, "")); // 숫자 이외의 문자 제거
    setCalculatorState((prevState) => ({ ...prevState, period }));
  };

  const calculateCompoundInterest = () => {
    const { principal, interestRate, period } = calculatorState;
    const r = interestRate / 100;
    const compoundInterest = principal * Math.pow(1 + r, period);
    setCalculatorState((prevState) => ({
      ...prevState,
      result: compoundInterest,
    }));
  };

  const handleCalculateClick = () => {
    if (
      calculatorState.principal <= 0 ||
      calculatorState.interestRate <= 0 ||
      calculatorState.period <= 0
    ) {
      alert("입력값을 확인해주세요.");
      return;
    }
    calculateCompoundInterest();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // 입력된 값이 숫자가 아닌 경우 이벤트 막기
    const key = e.key;
    if (isNaN(Number(key))) {
      e.preventDefault();
    }
  };

  return (
    <StyledContainer>
      <CalculatorContainer>
        <CalculatorScreen>
          <StyledTitle>복리 계산기</StyledTitle>
          <InputLabel>투자원금 입력</InputLabel>
          <Input
            type="text"
            value={
              calculatorState.principal > 0
                ? calculatorState.principal.toLocaleString()
                : ""
            } // 화폐 형식으로 변환
            onChange={handlePrincipalChange}
            onKeyPress={handleKeyPress}
            placeholder="원금을 입력하세요"
          />

          <InputLabel>연이율 입력 (%)</InputLabel>
          <Input
            type="number"
            value={calculatorState.interestRate}
            onChange={handleInterestRateChange}
            placeholder="연이율을 입력하세요"
          />

          <InputLabel>투자기간 입력 (년)</InputLabel>
          <Input
            type="text"
            value={calculatorState.period > 0 ? calculatorState.period : ""}
            onChange={handlePeriodChange}
            onKeyPress={handleKeyPress}
            placeholder="기간을 입력하세요"
          />

          {calculatorState.result !== null && (
            <ResultDisplay>
              복리 계산 결과:{" "}
              {numberWithCommas(calculatorState.result.toFixed(2))} 원
            </ResultDisplay>
          )}

          <CalculateButton onClick={handleCalculateClick}>
            계산하기
          </CalculateButton>
        </CalculatorScreen>
      </CalculatorContainer>
    </StyledContainer>
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

const StyledTitle = styled.div`
  font-family: "Jalnan", "MaplestoryBold";
  font-size: 28px;
  margin: 40px auto;
`;

const CalculatorContainer = styled.div`
  justify-content: center;
  align-items: center;
  margin: 40px auto;
  width: 350px;
  /* height: 100vh; */
`;

const CalculatorScreen = styled.div`
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const InputLabel = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  text-align: left; /* 숫자가 왼쪽 정렬되도록 설정 */
`;

const ResultDisplay = styled.p`
  font-size: 18px;
  margin-top: 20px;
  span {
    margin-left: 5px;
  }
`;

const CalculateButton = styled.button`
  background-color: darkcyan;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

export default CompoundCalculator;
