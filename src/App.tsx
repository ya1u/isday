import React from "react";
import "./App.css";
import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Calculator from "./components/calculator/Calculator";
import PomodoroTimer from "./components/timer/PomodoroTimer";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="App-content">
          {/* Container for the side advertisements */}
          <div className="SideAdvertisements">
            {/* Side advertisement 1 */}
            <div className="Advertisement">
              {/* 여기에 첫 번째 사이드 광고 내용을 추가하세요 */}첫 번째 사이드
              광고를 여기에 넣어주세요.
            </div>

            {/* Side advertisement 2 */}
            <div className="Advertisement">
              {/* 여기에 두 번째 사이드 광고 내용을 추가하세요 */}두 번째 사이드
              광고를 여기에 넣어주세요.
            </div>
          </div>

          <Routes>
            <Route path="/" element={<Content />} />
            <Route path="/timer" element={<PomodoroTimer />} />
            <Route path="/calc" element={<Calculator />} />
          </Routes>

          {/* Bottom advertisement */}
          <div className="Advertisement" style={{ marginTop: "20px" }}>
            {/* 여기에 하단 광고 내용을 추가하세요 */}
            하단 광고를 여기에 넣어주세요.
          </div>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
