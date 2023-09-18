import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <HelmetProvider>
  <div>
    {/* <Head> */}
      {/* <title>페이지 제목</title> */}
      {/* <meta name="description" content="페이지 설명" /> */}
      {/* 다른 메타 데이터 설정 */}
    {/* </Head> */}
    <App />
  </div>
  </HelmetProvider>
);

reportWebVitals();
