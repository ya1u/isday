import React, { useEffect, useState } from "react";
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
  white-space: nowrap;
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
      /* 한국어 폰트 스타일을 여기에 추가 */
    `}

  ${(props) =>
    props.selectedLang === "en" &&
    css`
      font-family: "Jalnan", "MaplestoryBold";
      font-size: 16px;
      /* 영어 폰트 스타일을 여기에 추가 */
    `}

  ${(props) =>
    props.selectedLang === "ja" &&
    css`
      font-weight: 900;
      /* 일본어 폰트 스타일을 여기에 추가 */
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
      /* 한국어 폰트 스타일을 여기에 추가 */
    `}

  ${(props) =>
    props.selectedLang === "en" &&
    css`
      font-family: "Jalnan", "MaplestoryBold";
      /* 영어 폰트 스타일을 여기에 추가 */
    `}

  ${(props) =>
    props.selectedLang === "ja" &&
    css`
      font-weight: 900;
      /* 일본어 폰트 스타일을 여기에 추가 */
    `}
`;

const Header = ({ selectedLang, onLanguageChange }: { selectedLang: string, onLanguageChange: (lang: string) => void }) => {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 599);
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const handleLanguageButtonClick = (lang: string) => {
    onLanguageChange(lang);
  };

  const handleMouseEnter = (mode: String) => {
    if (mode === "menu") {
      setShowMenuDropdown(true);
    } else if (mode === "lang") {
      setShowLangDropdown(true);
    }
  };

  const handleMouseLeave = (mode: String) => {
    if (mode === "menu") {
      setShowMenuDropdown(false);
    } else if (mode === "lang") {
      setShowLangDropdown(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsWideScreen(window.innerWidth >= 600);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <IntlProvider locale={selectedLang} messages={messages[selectedLang]}>
      <>
        <FontFaceStyle />
        <StyledNavbar variant="dark">
          <StyledContainer className="justify-content-center">
            <StyledMobileDropdownButton
              id="dropdown-basic-button"
              align={{ lg: "end" }}
              variant="light"
              title={<img src={hamburgurSVG} alt="Hamburgur Icon" />}
              show={showMenuDropdown}
              onMouseEnter={() => handleMouseEnter("menu")}
              onMouseLeave={() => handleMouseLeave("menu")}
            >
              <Dropdown.Item href="/calc">
                <FormattedMessage id="header.calculator" />
              </Dropdown.Item>
              <Dropdown.Item href="/compound-interest-calc/">
                <FormattedMessage id="header.compoundCalculator" />
              </Dropdown.Item>
              <Dropdown.Item href="/pomodoro">
                <FormattedMessage id="header.pomodoroTimer" />
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="/ja/">
                <FormattedMessage id="header.inquiry" />
                <img src={smallSupportSVG} alt="Question Icon" />
              </Dropdown.Item>
            </StyledMobileDropdownButton>
            <StyledNavBrand href="/">
              <FormattedMessage id="header.title" />
            </StyledNavBrand>
            {isWideScreen && (
              <StyleNav>
                <StyledNavLink selectedLang={selectedLang} href="/calc">
                  <FormattedMessage id="header.calculator" />
                </StyledNavLink>
                <StyledNavLink
                  selectedLang={selectedLang}
                  href="/compound-interest-calc"
                >
                  <FormattedMessage id="header.compoundCalculator" />
                </StyledNavLink>
                <StyledNavLink selectedLang={selectedLang} href="/pomodoro">
                  <FormattedMessage id="header.pomodoroTimer" />
                </StyledNavLink>
              </StyleNav>
            )}
            <Nav className="">
              <StyledInquireBtn selectedLang={selectedLang} className="btn btn-light me-2 nav-desktop">
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
                show={showLangDropdown}
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
      </>
    </IntlProvider>
  );
};

export default Header;
