import React, { useState } from "react";
import styles from "../styles/Footer.module.css";
import { Link } from "react-router-dom";
import smallQuestionSVG from "../images/question_small_icon.svg";
import smallSupportSVG from "../images/support_small_icon.svg";
import EmailModal from "../components/emailModal/EmailModal";
import emailjs from "emailjs-com";

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
        "wO4xP8bobDp6c9CK1"
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
    <footer className={styles.Container}>
      <div className={styles.InquiryBtn} onClick={handleEmailModalShow}>
        <img src={smallSupportSVG} alt="Question Icon" />
        {selectedLang === "ko"
          ? "문의하기"
          : selectedLang === "en"
          ? "Inquiry"
          : "問い合わせ"}
      </div>
      <Link className={styles.EmailLink} to="/">
        <img src={smallQuestionSVG} alt="Question Icon" />
        feedback@isday.net
      </Link>
      <p style={{ margin: 0 }}>© 2023 isDay.net</p>
      <EmailModal
        show={showEmailModal}
        onClose={handleEmailModalClose}
        onSend={sendEmail}
        selectedLang={selectedLang}
      />
    </footer>
  );
};

export default Footer;
