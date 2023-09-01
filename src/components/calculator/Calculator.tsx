import React, { useState, useCallback } from "react";
import styles from "../../styles/Calculator.module.css";
import styled from "styled-components";
import * as math from "mathjs";
import { FormattedMessage, IntlProvider } from "react-intl";
import messages from "../../locales/messages";
import { getLanguageStyle } from "../../App";
import { Helmet } from 'react-helmet-async';

interface StyledTitleProps {
  selectedLang: string;
}

const StyledTitle = styled.div<StyledTitleProps>`
  ${props => getLanguageStyle(props.selectedLang)}
`;

const Calculator = ({ selectedLang }: { selectedLang: string }) => {
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = useCallback((value: string) => {
    setInputValue((prevValue) => prevValue + value);
  }, []);

  const calculateWithParentheses = useCallback((expression: string): string => {
    try {
      const sanitizedInput = expression.replace(/√/g, "");
      return math.evaluate(sanitizedInput).toString();
    } catch (error) {
      return "Error";
    }
  }, []);

  const calculateResult = useCallback(() => {
    if (!inputValue) {
      setResult("");
      return;
    }

    const expression = inputValue.replace(/(\d+\.?\d*)/g, (match: string) => {
      return match.endsWith("%")
        ? (parseFloat(match.slice(0, -1)) / 100).toString()
        : match;
    });

    const result = calculateWithParentheses(expression);
    setResult(result);
  }, [inputValue, calculateWithParentheses]);

  const handlePercentage = useCallback(() => {
    try {
      const sanitizedInput = inputValue.replace(/√/g, "");
      const res = math.evaluate(sanitizedInput) / 100;
      setResult(res.toString());
    } catch (error) {
      setResult("Error");
    }
  }, [inputValue]);

  const handleClear = useCallback(() => {
    setInputValue("");
    setResult("");
  }, []);

  return (
    <IntlProvider locale={selectedLang} messages={messages[selectedLang]}>
      <Helmet>
        <title>
          {selectedLang == "en"
            ? "General Calculator"
            : selectedLang == "ja"
            ? "一般的な電卓"
            : "일반 계산기"}
        </title>
        <meta name="url" content="https://isdat.net/general-calc/" />
        <meta name="description" content={
            selectedLang == "en"
              ? "General calculator help users perform simple mathematical calculations. Use this page to allow users to enter numbers and operators to perform operations such as adding, subtracting, multiplying, and dividing."
              : selectedLang == "ja"
              ? "一般計算機は、ユーザーが簡単な数学的計算を実行するのに役立ちます。 このページを使用して、ユーザが数字を入力し、演算子が加算、減算、乗算、除算などの操作を実行できるようにします。"
              : "일반 계산기는 사용자가 간단한 수학적 계산을 수행하는 데 도움을 줍니다. 이 페이지를 사용하여 사용자는 숫자와 연산자를 입력하여 더하기, 빼기, 곱하기, 나누기 등의 연산을 수행할 수 있습니다."
          }/>
        <meta property="og:title" content={
            selectedLang == "en"
              ? "General Calculator - isDay.net"
              : selectedLang == "ja"
              ? "一般的な電卓 - isDay.net"
              : "일반 계산기 - isDay.net"
          }/>
        <meta property="og:description" content={
            selectedLang == "en"
              ? "General calculator help users perform simple mathematical calculations. Use this page to allow users to enter numbers and operators to perform operations such as adding, subtracting, multiplying, and dividing."
              : selectedLang == "ja"
              ? "一般計算機は、ユーザーが簡単な数学的計算を実行するのに役立ちます。 このページを使用して、ユーザが数字を入力し、演算子が加算、減算、乗算、除算などの操作を実行できるようにします。"
              : "일반 계산기는 사용자가 간단한 수학적 계산을 수행하는 데 도움을 줍니다. 이 페이지를 사용하여 사용자는 숫자와 연산자를 입력하여 더하기, 빼기, 곱하기, 나누기 등의 연산을 수행할 수 있습니다."
          }/>
      </Helmet>
      <div className={styles.Container}>
        <StyledTitle className={styles.Title} selectedLang={selectedLang}>
          <FormattedMessage id="content.generalcalculator" />
        </StyledTitle>
        <div className={styles.CalculatorContainer}>
          <div className={styles.CalculatorScreen}>
            <p className={styles.ResultDisplay}>{result}</p>
            <input className={styles.Input} type="text" value={inputValue} onChange={handleInputChange} />
          </div>
          <div className={styles.ButtonGrid}>
            <button className={styles.GreyBtn} onClick={() => handleButtonClick("(")}>(</button>
            <button className={styles.GreyBtn} onClick={() => handleButtonClick(")")}>)</button>
            <button className={styles.GreyBtn} onClick={handlePercentage}>%</button>
            <button className={styles.ResultBtn} onClick={() => handleButtonClick("/")}>&#247;</button>
            <button className={styles.Btn} onClick={() => handleButtonClick("7")}>7</button>
            <button className={styles.Btn} onClick={() => handleButtonClick("8")}>8</button>
            <button className={styles.Btn} onClick={() => handleButtonClick("9")}>9</button>
            <button className={styles.ResultBtn} onClick={() => handleButtonClick("*")}>&times;</button>
            <button className={styles.Btn} onClick={() => handleButtonClick("4")}>4</button>
            <button className={styles.Btn} onClick={() => handleButtonClick("5")}>5</button>
            <button className={styles.Btn} onClick={() => handleButtonClick("6")}>6</button>
            <button className={styles.ResultBtn} onClick={() => handleButtonClick("-")}>-</button>
            <button className={styles.Btn} onClick={() => handleButtonClick("1")}>1</button>
            <button className={styles.Btn} onClick={() => handleButtonClick("2")}>2</button>
            <button className={styles.Btn} onClick={() => handleButtonClick("3")}>3</button>
            <button className={styles.ResultBtn} onClick={() => handleButtonClick("+")}>+</button>
            <button className={styles.Btn} onClick={() => handleButtonClick(".")}>.</button>
            <button className={styles.Btn} onClick={() => handleButtonClick("0")}>0</button>
            <button className={styles.Btn} onClick={handleClear}>C</button>
            <button className={styles.ResultBtn} onClick={calculateResult}>=</button>
          </div>
        </div>
      </div>
    </IntlProvider>
  );
};

export default Calculator;
