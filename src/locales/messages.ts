// src/locales/messages.ts
export type Messages = {
  [key: string]: {
    [key: string]: string;
  };
};

const messages: Messages = {
  ko: {
    "header.title": "isDay",
    "header.calculator": "계산기",
    "header.compoundCalculator": "복리 계산기",
    "header.onlinetimer": "온라인 타이머",
    "header.inquiry": "문의하기",
    "content.calculator": "계산기",
    "content.calculator.general": "- 계산기",
    "content.calculator.compound": "- 복리 계산기",
    "content.calculator.compound-mobile": "- 복리 계산기",
    "content.timer": "타이머",
    "content.timer.onlinetimer": "- 온라인 타이머",
    "content.generalcalculator": "일반 계산기",
    "content.compoundCalc.title": "복리 계산기",
    "content.compoundCalc.investment": "투자원금 (₩)",
    "content.compoundCalc.period": "투자기간 (년)",
    "content.compoundCalc.rate": "연이율 (%)",
  },
  en: {
    "header.title": "isDay",
    "header.calculator": "General-Calc",
    "header.compoundCalculator": "Compound-Interest-Calc",
    "header.onlinetimer": "Online Timer",
    "header.inquiry": "Inquiry",
    "content.calculator": "Calculator",
    "content.calculator.general": "- General Calculator",
    "content.calculator.compound": "- Compound Interest Calculator",
    "content.calculator.compound-mobile": "- Compound Interest Calc",
    "content.timer": "Timer",
    "content.timer.onlinetimer": "- Online Timer",
    "content.generalcalculator": "General Calculator",
    "content.compoundCalc.title": "Compound Interest Calculator",
    "content.compoundCalc.investment": "Investment principal ($)",
    "content.compoundCalc.period": "Investment period(years)",
    "content.compoundCalc.rate": "Interest Rate (%)",
  },
  ja: {
    "header.title": "isDay",
    "header.calculator": "一般的な電卓",
    "header.compoundCalculator": "複利計算機",
    "header.onlinetimer": "オンラインタイマー",
    "header.inquiry": "問い合わせ",
    "content.calculator": "計算器",
    "content.calculator.general": "- 一般的な電卓",
    "content.calculator.compound": "- 複利計算機",
    "content.calculator.compound-mobile": "- 複利計算機",
    "content.timer": "タイマー",
    "content.timer.onlinetimer": "- オンラインタイマー",
    "content.generalcalculator": "一般計算機",
    "content.compoundCalc.title": "複利計算機",
    "content.compoundCalc.investment": "投資元金 (円)",
    "content.compoundCalc.period": "投資期間 (年)",
    "content.compoundCalc.rate": "年利率 (%)",
  },
};

export default messages;
