import React, { useState } from "react";
import styled from "styled-components";
import * as math from "mathjs";

const Calculator: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = (value: string) => {
    setInputValue((prevValue) => prevValue + value);
  };

  const calculateWithParentheses = (expression: string): string => {
    try {
      const sanitizedInput = expression.replace(/√/g, "");
      return math.evaluate(sanitizedInput).toString();
    } catch (error) {
      return "Error";
    }
  };

  const calculateResult = () => {
    if (!inputValue) {
      setResult("");
      return;
    }

    const expression = inputValue.replace(/(\d+\.?\d*)/g, (match: string) => {
      return match.endsWith("%")
        ? (parseFloat(match.slice(0, -1)) / 100).toString()
        : match;
    });

    let result = calculateWithParentheses(expression);
    setResult(result);
  };

  const handlePercentage = () => {
    try {
      const sanitizedInput = inputValue.replace(/√/g, "");
      const res = math.evaluate(sanitizedInput) / 100;
      setResult(res.toString());
    } catch (error) {
      setResult("Error");
    }
  };

  const handleClear = () => {
    setInputValue("");
    setResult("");
  };

  return (
    <StyledContainer>
      <StyledTitle>일반 계산기</StyledTitle>
      <CalculatorContainer>
        <CalculatorScreen>
          <ResultDisplay>{result}</ResultDisplay>
          <Input type="text" value={inputValue} onChange={handleInputChange} />
        </CalculatorScreen>
        <ButtonGrid>
          <GreyBtn onClick={() => handleButtonClick("(")}>(</GreyBtn>
          <GreyBtn onClick={() => handleButtonClick(")")}>)</GreyBtn>
          <GreyBtn onClick={handlePercentage}>%</GreyBtn>
          <ResultBtn onClick={() => handleButtonClick("/")}>&#247;</ResultBtn>
          <Button onClick={() => handleButtonClick("7")}>7</Button>
          <Button onClick={() => handleButtonClick("8")}>8</Button>
          <Button onClick={() => handleButtonClick("9")}>9</Button>
          <ResultBtn onClick={() => handleButtonClick("*")}>&times;</ResultBtn>
          <Button onClick={() => handleButtonClick("4")}>4</Button>
          <Button onClick={() => handleButtonClick("5")}>5</Button>
          <Button onClick={() => handleButtonClick("6")}>6</Button>
          <ResultBtn onClick={() => handleButtonClick("-")}>-</ResultBtn>
          <Button onClick={() => handleButtonClick("1")}>1</Button>
          <Button onClick={() => handleButtonClick("2")}>2</Button>
          <Button onClick={() => handleButtonClick("3")}>3</Button>
          <ResultBtn onClick={() => handleButtonClick("+")}>+</ResultBtn>
          <Button onClick={() => handleButtonClick(".")}>.</Button>
          <Button onClick={() => handleButtonClick("0")}>0</Button>
          <Button onClick={handleClear}>C</Button>
          <ResultBtn onClick={calculateResult}>=</ResultBtn>
        </ButtonGrid>
      </CalculatorContainer>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  /* width: 680px; */
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
  margin: 80px 0 auto;
`;

const CalculatorContainer = styled.div`
  background-color: #333;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  width: 350px;
  margin: 40px auto;
  text-align: center;
`;

const CalculatorScreen = styled.div`
  background-color: #555;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const ResultDisplay = styled.p`
  color: #fff;
  font-size: 30px;
  height: 45px;
`;

const Input = styled.input`
  background-color: #777;
  color: #fff;
  padding: 5px 10px;
  margin-top: 5px;
  border: none;
  border-radius: 10px;
  width: 100%;
  font-size: 22px;
  transition: box-shadow 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 128, 128, 0.7);
  }
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
`;

const Button = styled.button`
  background-color: darkcyan;
  color: #fff;
  border: none;
  border-radius: 30px;
  padding: 8px 8px;
  cursor: pointer;
  font-size: 30px;
  &:hover {
    background-color: #20b2aa;
    /* 다른 스타일을 추가하고 싶다면 여기에 작성하면 돼 */
  }
`;

const GreyBtn = styled.button`
  background-color: #777;
  color: #fff;
  border: none;
  border-radius: 30px;
  padding: 8px 8px;
  cursor: pointer;
  font-size: 30px;
  &:hover {
    background-color: #888;
    /* 다른 스타일을 추가하고 싶다면 여기에 작성하면 돼 */
  }
`;

const ResultBtn = styled.button`
  background-color: darkorange;
  color: #fff;
  border: none;
  border-radius: 30px;
  padding: 8px 8px;
  cursor: pointer;
  font-size: 30px;
  &:hover {
    background-color: #ffa500;
    /* 다른 스타일을 추가하고 싶다면 여기에 작성하면 돼 */
  }
`;

export default Calculator;
