import React, { useState } from "react";
import styled from "styled-components";

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

const CompoundCalculator: React.FC = () => {
  const [calculatorState, setCalculatorState] = useState<CalculatorState>({
    principal: 0,
    interestRate: 0,
    period: 0,
    result: null,
    investmentData: [],
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
    const investmentData: {
      year: number;
      amount: number;
      income: number;
      interestRate: number;
    }[] = [];

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
          <InputLabel>투자원금 (원) :</InputLabel>
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

          <InputLabel>투자기간 (년) :</InputLabel>
          <Input
            type="text"
            value={calculatorState.period > 0 ? calculatorState.period : ""}
            onChange={handlePeriodChange}
            onKeyPress={handleKeyPress}
            placeholder="기간을 입력하세요"
          />

          <InputLabel>연이율 (%) :</InputLabel>
          <Input
            type="number"
            value={
              calculatorState.interestRate > 0
                ? calculatorState.interestRate
                : ""
            }
            onChange={handleInterestRateChange}
            placeholder="연이율을 입력하세요"
          />

          <CalculateButton onClick={handleCalculateClick}>
            계산하기
          </CalculateButton>
        </CalculatorScreen>
      </CalculatorContainer>

      {calculatorState.result !== null && (
        <ResultDisplay>
          <p>
            수익 금액 :{" "}
            {numberWithCommas(
              (calculatorState.result - calculatorState.principal).toFixed(0)
            )}{" "}
            원
          </p>
          <BoldGreenText>
            최종 금액 : {numberWithCommas(calculatorState.result.toFixed(0))} 원
          </BoldGreenText>
          {calculatorState.investmentData && (
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>수익</th>
                  <th>총 금액</th>
                  <th>수익률</th>
                </tr>
              </thead>
              <tbody>
                {calculatorState.investmentData.map((data) => (
                  <tr key={data.year}>
                    <th>{data.year}</th>
                    <td>{numberWithCommas(data.income.toFixed(0))} 원</td>
                    <td>{numberWithCommas(data.amount.toFixed(0))} 원</td>
                    <td>{data.interestRate.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </ResultDisplay>
      )}
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
  margin: 20px auto;
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
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  text-align: left; /* 숫자가 왼쪽 정렬되도록 설정 */
`;

const ResultDisplay = styled.p`
  display: flex;
  flex-direction: column;
  border-top: 1px solid grey;
  font-size: 18px;
  margin: 30px 30px;
  padding-top: 30px;
  p {
    font-family: "Jalnan", "MaplestoryBold";
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

const BoldGreenText = styled.span`
  font-family: "Jalnan", "MaplestoryBold";
  font-weight: bold;
  color: green;
`;

export default CompoundCalculator;
