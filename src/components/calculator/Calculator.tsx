import React, { useState, useCallback } from "react";
import styles from "../../styles/Calculator.module.css";
import styled from "styled-components";
import * as math from "mathjs";
import { FormattedMessage, IntlProvider } from "react-intl";
import messages from "../../locales/messages";
import { getLanguageStyle } from "../../App";
import { Helmet } from 'react-helmet';

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
          {selectedLang == "ko"
            ? "isDay - 일반 계산기"
            : selectedLang == "ja"
            ? "isDay - 一般的な電卓"
            : "isDay - General Calculator"}
        </title>
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
