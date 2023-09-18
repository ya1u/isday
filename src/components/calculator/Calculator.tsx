import React, { useState, useCallback } from "react";
import styles from "../../styles/Calculator.module.css";
import * as math from "mathjs";
// import Head from "next/head";

const Calculator = () => {
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
    <div>
      {/* <Head>
        <title>일반 계산기</title>
        <meta name="url" content="https://isdat.net/general-calc/" />
        <meta name="description" content="일반 계산기는 사용자가 간단한 수학적 계산을 수행하는 데 도움을 줍니다. 이 페이지를 사용하여 사용자는 숫자와 연산자를 입력하여 더하기, 빼기, 곱하기, 나누기 등의 연산을 수행할 수 있습니다."/>
        <meta property="og:title" content="일반 계산기 - isDay.net"/>
        <meta property="og:description" content="일반 계산기는 사용자가 간단한 수학적 계산을 수행하는 데 도움을 줍니다. 이 페이지를 사용하여 사용자는 숫자와 연산자를 입력하여 더하기, 빼기, 곱하기, 나누기 등의 연산을 수행할 수 있습니다."/>
      </Head> */}
      <div className={styles.Container}>
        <div className={styles.Title}>일반 계산기</div>
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
    </div>
  );
};

export default Calculator;
