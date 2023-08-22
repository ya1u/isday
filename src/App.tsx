import React, { useState } from "react";
import "./App.css";
import styled, { css } from 'styled-components';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import Calculator from "./components/calculator/Calculator";
import CompoundCalc from "./components/calculator/CompoundCalc";
import OnlineTimer from "./components/timer/OnlineTimer";

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
  const [selectedLang, setSelectedLang] = useState(
    localStorage.getItem("lang") || navigator.language.split("-")[0]
  );

  const handleLanguageChange = (lang: string) => {
    setSelectedLang(lang);
    localStorage.setItem("lang", lang);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <Header
          selectedLang={selectedLang}
          onLanguageChange={handleLanguageChange}
        />
        <div className="Container">
          <div className="Wrapper">
            <div className="ContentArea">
              <Routes>
                <Route path="/" element={<Content selectedLang={selectedLang} />} />
                <Route path="/calc" element={<Calculator selectedLang={selectedLang} />} />
                <Route path="/compound-interest-calc" element={<CompoundCalc selectedLang={selectedLang} />} />
                <Route path="/onlinetimer" element={<OnlineTimer selectedLang={selectedLang} />} />
              </Routes>
            </div>
            {/* <div className="Advertisement">
              <div className="FirstAD">광고1을 넣어주세요</div>
              <div className="SecondAD">광고2를 넣어주세요</div>
            </div> */}
          </div>
        </div>
        <Footer selectedLang={selectedLang} />
      </BrowserRouter>
      <FontFaceStyle />
    </div>
  );
}

export default App;
export { getLanguageStyle };
