import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import smallQuestionSVG from "../images/question_small_icon.svg";
import smallSupportSVG from "../images/support_small_icon.svg";
import EmailModal from "../components/emailModal/EmailModal";
import emailjs from "emailjs-com";

const FooterWrapper = styled.footer`
  background-color: #e9e9e9;
  height: 120px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const StyledButton = styled.div`
  border: none;
  margin-bottom: 5px;
  color: black;
  padding: 0;
  transition: 0.1s;
  @media (min-width: 991px) {
  }

  &:hover {
    opacity: 0.4;
    cursor: pointer;
  }
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
  const [showEmailModal, setShowEmailModal] = useState(false);

  const handleEmailModalShow = () => {
    setShowEmailModal(true);
  };

  const handleEmailModalClose = () => {
    setShowEmailModal(false);
  };

  const sendEmail = (content: string) => {
    emailjs
      .send(
        "service_y8z06b9",
        "template_zsto1gf",
        { message: content },
        "wO4xP8bobDp6c9CK1",
      )
      .then((response) => {
        console.log("Email sent successfully:", response);
        console.log(content);
        
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };
  return (
    <FooterWrapper>
      <StyledButton onClick={handleEmailModalShow}>
        <img src={smallSupportSVG} alt="Question Icon" />
        {selectedLang === "ko"
          ? "문의하기"
          : selectedLang === "en"
          ? "Inquiry"
          : "問い合わせ"}
      </StyledButton>
      <StyledLink to="/">
        <img src={smallQuestionSVG} alt="Question Icon" />
        feedback@isday.net
      </StyledLink>
      <p style={{ margin: 0 }}>© 2023 isDay.net</p>
      <EmailModal
        show={showEmailModal}
        onClose={handleEmailModalClose}
        onSend={sendEmail}
        selectedLang={selectedLang}
      />
    </FooterWrapper>
  );
};

export default Footer;
