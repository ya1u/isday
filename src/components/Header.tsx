import React, { useEffect, useReducer, useState } from "react";
import { Nav, Navbar, Button, Dropdown, DropdownButton } from "react-bootstrap";
import { FormattedMessage, IntlProvider } from "react-intl";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";

import styles from "../styles/Header.module.css";
import languageSVG from "../images/language_icon.svg";
import smallSupportSVG from "../images/support_small_icon.svg";
import supportSVG from "../images/support_icon.svg";
import hamburgurSVG from "../images/hamburger_icon.svg";

import messages from "../locales/messages";
import EmailModal from "../components/emailModal/EmailModal";

// 상태와 액션 타입 정의
const initialState = {
  isWideScreen: window.innerWidth >= 599,
  showMenuDropdown: false,
  showLangDropdown: false,
};

const actionTypes = {
  SET_WIDESCREEN: "SET_WIDESCREEN",
  SET_MENU_DROPDOWN: "SET_MENU_DROPDOWN",
  SET_LANG_DROPDOWN: "SET_LANG_DROPDOWN",
};

// 리듀서 함수
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const reducer = (state: any, action: { type: any; payload: any }) => {
  switch (action.type) {
    case actionTypes.SET_WIDESCREEN:
      return { ...state, isWideScreen: action.payload };
    case actionTypes.SET_MENU_DROPDOWN:
      return { ...state, showMenuDropdown: action.payload };
    case actionTypes.SET_LANG_DROPDOWN:
      return { ...state, showLangDropdown: action.payload };
    default:
      return state;
  }
};

const Header = ({
  selectedLang,
  onLanguageChange,
}: {
  selectedLang: string;
  onLanguageChange: (lang: string) => void;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
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

  useEffect(() => {
    const handleResize = () => {
      dispatch({
        type: actionTypes.SET_WIDESCREEN,
        payload: window.innerWidth >= 600,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseEnter = (mode: string) => {
    if (mode === "menu") {
      dispatch({ type: actionTypes.SET_MENU_DROPDOWN, payload: true });
    } else if (mode === "lang") {
      dispatch({ type: actionTypes.SET_LANG_DROPDOWN, payload: true });
    }
  };

  const handleMouseLeave = (mode: string) => {
    if (mode === "menu") {
      dispatch({ type: actionTypes.SET_MENU_DROPDOWN, payload: false });
    } else if (mode === "lang") {
      dispatch({ type: actionTypes.SET_LANG_DROPDOWN, payload: false });
    }
  };

  const handleLanguageButtonClick = (lang: string) => {
    onLanguageChange(lang);
  };

  return (
    <IntlProvider locale={selectedLang} messages={messages[selectedLang]}>
      <Navbar className={styles.Navbar} variant="dark">
        <div className={styles.Container}>
          <DropdownButton
            className={styles.DropdownButton}
            id="dropdown-basic-button"
            align={{ lg: "end" }}
            variant="light"
            title={<img src={hamburgurSVG} alt="Hamburgur Icon" />}
            show={state.showMenuDropdown}
            onMouseEnter={() => handleMouseEnter("menu")}
            onMouseLeave={() => handleMouseLeave("menu")}
          >
            <Dropdown.Item as={Link} to="/calc">
              <FormattedMessage id="header.calculator" />
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/compound-interest-calc/">
              <FormattedMessage id="header.compoundCalculator" />
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/onlinetimer">
              <FormattedMessage id="header.onlinetimer" />
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleEmailModalShow}>
              <FormattedMessage id="header.inquiry" />
              <img src={smallSupportSVG} alt="Question Icon" />
            </Dropdown.Item>
          </DropdownButton>
          <Navbar.Brand className={styles.NavBrand} as={Link} to="/">
            <img className={styles.logo} src={process.env.PUBLIC_URL + '/favicon.ico'} width={44} alt="" />
            <FormattedMessage id="header.title" />
          </Navbar.Brand>
          {state.isWideScreen && (
            <Nav className={styles.Nav}>
              <Nav.Link className={styles.NavLink} as={Link} to="/calc">
                <FormattedMessage id="header.calculator" />
              </Nav.Link>
              <Nav.Link
                className={styles.NavLink}
                as={Link}
                to="/compound-interest-calc"
              >
                <FormattedMessage id="header.compoundCalculator" />
              </Nav.Link>
              <Nav.Link className={styles.NavLink} as={Link} to="/onlinetimer">
                <FormattedMessage id="header.onlinetimer" />
              </Nav.Link>
            </Nav>
          )}
          <Nav>
            <Button
              className={styles.InquireBtn}
              onClick={handleEmailModalShow}
            >
              <img
                src={supportSVG}
                alt="Support Icon"
                style={{ marginRight: 7 }}
              />
              <FormattedMessage id="header.inquiry" />
            </Button>
            <DropdownButton
              id="dropdown-basic-button"
              align={{ lg: "start" }}
              variant="light"
              title={<img src={languageSVG} alt="Language Icon" />}
              show={state.showLangDropdown}
              onMouseEnter={() => handleMouseEnter("lang")}
              onMouseLeave={() => handleMouseLeave("lang")}
            >
              <Dropdown.Item onClick={() => handleLanguageButtonClick("ko")}>
                한국어
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleLanguageButtonClick("en")}>
                English
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handleLanguageButtonClick("ja")}>
                日本語
              </Dropdown.Item>
            </DropdownButton>
          </Nav>
        </div>
      </Navbar>
      <EmailModal
        show={showEmailModal}
        onClose={handleEmailModalClose}
        onSend={sendEmail}
        selectedLang={selectedLang}
      />
    </IntlProvider>
  );
};

export default Header;
