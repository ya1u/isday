import React, { useEffect, useReducer, useState } from "react";
import styled, { css } from "styled-components";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import languageSVG from "../images/language_icon.svg";
import smallSupportSVG from "../images/support_small_icon.svg";
import supportSVG from "../images/support_icon.svg";
import hamburgurSVG from "../images/hamburger_icon.svg";
import { FormattedMessage, IntlProvider } from "react-intl";
import messages from "../locales/messages";
import EmailModal from "../components/emailModal/EmailModal";
import emailjs from "emailjs-com";
import { Link } from "react-router-dom";

// @font-face를 선언합니다.
const FontFaceStyle = styled.div`
  @font-face {
    font-family: "Jalnan";
    src: url("../fonts/Jalnan.woff") format("woff"); /* ttf -> truetype로 수정 */
  }
  @font-face {
    font-family: "MaplestoryBold";
    src: url("../fonts/MaplestoryBold.ttf") format("truetype"); /* ttf -> truetype로 수정 */
  }
  @font-face {
    font-family: "DSEG7Classic-BoldItalic";
    src: url("../fonts/DSEG7Classic-BoldItalic.woff") format("woff"); /* ttf -> truetype로 수정 */
  }
`;

const StyledNavbar = styled(Navbar)`
  background-color: darkcyan;
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledContainer = styled(Container)`
  width: 1000px;
  @media (max-width: 629px) {
    justify-content: space-around;
    text-align: center;
    margin: 0 auto;
  }
`;

const StyledMobileDropdownButton = styled(DropdownButton)`
  @media (min-width: 631px) {
    display: none;
  }
`;

const StyledNavBrand = styled(Navbar.Brand)`
  font-family: "Jalnan", "MaplestoryBold";
  font-size: 32px;
  text-decoration: none;
  color: #fff;
  margin-right: 16px;
  @media (max-width: 630px) {
    font-size: 34px;
    margin: 0 auto;
  }
`;

const StyleNav = styled(Nav)`
  @media (min-width: 631px) {
    flex: 1;
  }
`;

const StyledNavLink = styled(Nav.Link)`
  font-size: 18px;
  text-decoration: none;
  color: #fff;
  white-space: nowrap;
  padding: 8px;
  @media (max-width: 660px) {
    font-size: 16px;
  }
  @media (max-width: 630px) {
    display: none;
    margin: 0 auto;
  }

  ${(props) =>
    props.selectedLang === "ko" &&
    css`
      font-family: "Jalnan", "MaplestoryBold";
    `}

  ${(props) =>
    props.selectedLang === "en" &&
    css`
      font-family: "Jalnan", "MaplestoryBold";
      font-size: 16px;
    `}

  ${(props) =>
    props.selectedLang === "ja" &&
    css`
      font-weight: 900;
    `}
`;

const StyledInquireBtn = styled(Button)`
  font-size: 14px;
  width: 122px;
  @media (max-width: 630px) {
    display: none;
  }

  ${(props) =>
    props.selectedLang === "ko" &&
    css`
      font-family: "Jalnan", "MaplestoryBold";
    `}

  ${(props) =>
    props.selectedLang === "en" &&
    css`
      font-family: "Jalnan", "MaplestoryBold";
    `}

  ${(props) =>
    props.selectedLang === "ja" &&
    css`
      font-weight: 900;
    `}
`;

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
      <FontFaceStyle />
      <StyledNavbar variant="dark">
        <StyledContainer className="justify-content-center">
          <StyledMobileDropdownButton
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
            <Dropdown.Item as={Link} to="/pomodoro">
              <FormattedMessage id="header.pomodoroTimer" />
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleEmailModalShow}>
              <FormattedMessage id="header.inquiry" />
              <img src={smallSupportSVG} alt="Question Icon" />
            </Dropdown.Item>
          </StyledMobileDropdownButton>
          <StyledNavBrand as={Link} to="/">
            <FormattedMessage id="header.title" />
          </StyledNavBrand>
          {state.isWideScreen && (
            <StyleNav>
              <StyledNavLink selectedLang={selectedLang} as={Link} to="/calc">
                <FormattedMessage id="header.calculator" />
              </StyledNavLink>
              <StyledNavLink
                as={Link}
                selectedLang={selectedLang}
                to="/compound-interest-calc"
              >
                <FormattedMessage id="header.compoundCalculator" />
              </StyledNavLink>
              <StyledNavLink
                as={Link}
                selectedLang={selectedLang}
                to="/pomodoro"
              >
                <FormattedMessage id="header.pomodoroTimer" />
              </StyledNavLink>
            </StyleNav>
          )}
          <Nav className="">
            <StyledInquireBtn
              selectedLang={selectedLang}
              className="btn btn-light me-2 nav-desktop"
              onClick={handleEmailModalShow}
            >
              <img
                src={supportSVG}
                alt="Support Icon"
                style={{ marginRight: 7 }}
              />
              <FormattedMessage id="header.inquiry" />
            </StyledInquireBtn>
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
        </StyledContainer>
      </StyledNavbar>
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
