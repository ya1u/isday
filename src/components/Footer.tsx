import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import smallQuestionSVG from "../images/question_small_icon.svg";
import smallSupportSVG from "../images/support_small_icon.svg";

const FooterWrapper = styled.footer`
  background-color: #e9e9e9;
  height: 120px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  margin-bottom: 5px;
  transition: 0.1s;

  &:hover {
    opacity: 0.4;
  }
`;

const Footer = ({ selectedLang }: { selectedLang: string }) => {
  return (
    <FooterWrapper>
      <StyledLink to="/">
        <img src={smallSupportSVG} alt="Question Icon" />
        {selectedLang === "ko"
                ? "문의하기"
                : selectedLang === "en"
                ? "Inquiry"
                : "問い合わせ"}
      </StyledLink>
      <StyledLink to="/">
        <img src={smallQuestionSVG} alt="Question Icon" />
        feedback@isday.net
      </StyledLink>
      <p style={{ margin: 0 }}>© 2023 isDay.net</p>
    </FooterWrapper>
  );
};

export default Footer;
