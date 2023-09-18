import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styled, { css } from 'styled-components';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./styles/App.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import Calculator from "./components/calculator/Calculator";
import CompoundCalc from "./components/calculator/CompoundCalc";
import OnlineTimer from "./components/timer/OnlineTimer";
import { Helmet } from "react-helmet-async";
// import Head from "next/head";

const FontFaceStyle = styled.div`
  @font-face {
    font-family: "Jalnan";
    src: url("../fonts/Jalnan.woff") format("woff");
  }
  @font-face {
    font-family: "MaplestoryBold";
    src: url("../fonts/MaplestoryBold.ttf") format("truetype");
  }
  @font-face {
    font-family: "DSEG7Classic-BoldItalic";
    src: url("../fonts/DSEG7Classic-BoldItalic.woff") format("woff");
  }
`;

const getLanguageStyle = (selectedLang : string) => {
  if (selectedLang === 'ko' || selectedLang === 'en') {
    return css`
      font-family: "Jalnan", "MaplestoryBold";
    `;
  } else if (selectedLang === 'ja') {
    return css`
      font-weight: 900;
    `;
  } else {
    return css``;
  }
};

function App() {
  return (
    <div className={styles.App}>
      <Helmet>
        <title>isDay - 일상에 필요한 웹</title>
        <meta name="description" content="다양한 용도에 사용되는 개인 금융 계산기와 온라인 타이머를 제공하는 플랫폼"/>
        <meta property="og:url" content="https://isday.net/" />
        <meta property="og:title" content="isDay - 일상에 필요한 웹"/>
        <meta property="og:description" content="다양한 용도에 사용되는 개인 금융 계산기와 온라인 타이머를 제공하는 플랫폼"/>
      </Helmet>
      <BrowserRouter>
        <Header/>
        <div className={styles.Container}>
          <div className={styles.Wrapper}>
            <div className={styles.ContentArea}>
              <Routes>
                <Route path="/" element={<Content/>} />
                <Route path="/general-calc/" element={<Calculator />} />
                <Route path="/compound-interest-calc/" element={<CompoundCalc />} />
                <Route path="/onlinetimer/" element={<OnlineTimer />} />
              </Routes>
            </div>
            {/* <div className={styles.Advertisement}>
              <div className={styles.FirstAD}>광고1을 넣어주세요</div>
              <div className={styles.SecondAD}>광고2를 넣어주세요</div>
            </div> */}
          </div>
        </div>
        <Footer/>
      </BrowserRouter>
      <FontFaceStyle />
    </div>
  );
}

export default App;
export { getLanguageStyle };
