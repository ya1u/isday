import React from "react";
import "./App.css";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calculator from "./components/calculator/Calculator";
import PomodoroTimer from "./components/timer/PomodoroTimer";
import styled from "styled-components";
import CompoundCalc from "./components/calculator/CompoundCalc";

const StyledContainer = styled.div`
  margin: 50px 0 50px 0;
  display: flex;
  justify-content: center;
`;

const MainContainer = styled.div`
  width: 1000px;
  /* margin: 0 20% 0 20%; */
  /* padding: 0 8px 0 8px; */
  display: flex;
`;

const ContentContainer = styled.div`
  margin-right: 10px;
  flex: 1;
  @media (max-width: 991px) {
    margin: 0 40px;
  }
`;

const Advertisement = styled.div`
  width: 300px;
  border: 1px solid black;
  @media (max-width: 991px) {
    display: none;
  }
`;

const FirstAD = styled.div`
  width: 300px;
  height: 300px;
  border: 1px solid black;
`;

const SecondAD = styled.div`
  width: 300px;
  height: 600px;
  border: 1px solid black;
`;

function App() {
  const [selectedLang, setSelectedLang] = React.useState(
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
        <StyledContainer>
          <MainContainer>
            <ContentContainer>
              <Routes>
                <Route path="/" element={<Content selectedLang={selectedLang} />} />
                <Route path="/calc" element={<Calculator selectedLang={selectedLang} />} />
                <Route path="/compound-interest-calc" element={<CompoundCalc selectedLang={selectedLang} />} />
                <Route path="/pomodoro" element={<PomodoroTimer selectedLang={selectedLang} />} />
              </Routes>
            </ContentContainer>
            <Advertisement>
              <FirstAD>광고1을 넣어주세요</FirstAD>
              <SecondAD>광고2를 넣어주세요</SecondAD>
            </Advertisement>
          </MainContainer>
        </StyledContainer>
        <Footer selectedLang={selectedLang} />
      </BrowserRouter>
    </div>
  );
}

export default App;
