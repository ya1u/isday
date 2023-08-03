import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import languageSVG from "../images/language_icon.svg";
import smallSupportSVG from "../images/support_small_icon.svg";
import supportSVG from "../images/support_icon.svg";
import hamburgurSVG from "../images/hamburger_icon.svg";

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
  font-family: "Jalnan", "MaplestoryBold";
  font-size: 18px;
  white-space: nowrap;
  @media (max-width: 660px) {
    font-size: 16px;
  }
  @media (max-width: 630px) {
    display: none;
    margin: 0 auto;
  }
`;

const StyledInquireBtn = styled(Button)`
  font-family: "MaplestoryBold", "Jalnan";
  font-size: 15px;
  width: 122px;
  @media (max-width: 630px) {
    display: none;
  }
`;

const Header = () => {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 599);
  const [showMenuDropdown, setShowMenuDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);

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
            <Dropdown.Item href="/calc">계산기</Dropdown.Item>
            <Dropdown.Item href="/compound-interest-calc/">복리 계산기</Dropdown.Item>
            <Dropdown.Item href="/pomodoro">뽀모도로 타이머</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="/ja/">
              문의하기
              <img src={smallSupportSVG} alt="Question Icon" />
            </Dropdown.Item>
          </StyledMobileDropdownButton>
          <StyledNavBrand href="/">isDay</StyledNavBrand>
          {isWideScreen && (
            // <Nav className="me-auto"> 미오토 잠시지움
            <StyleNav>
              <StyledNavLink href="/calc">계산기</StyledNavLink>
              <StyledNavLink href="/compound-interest-calc">복리 계산기</StyledNavLink>
              <StyledNavLink href="/pomodoro">
                뽀모도로 타이머
              </StyledNavLink>
            </StyleNav>
          )}
          <Nav className="">
            <StyledInquireBtn className="btn btn-light me-2 nav-desktop">
              <img
                src={supportSVG}
                alt="Support Icon"
                style={{ marginRight: 7 }}
              />
              문의하기
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
              <Dropdown.Item href="/ko/">한국어</Dropdown.Item>
              <Dropdown.Item href="/en/">English</Dropdown.Item>
              <Dropdown.Item href="/ja/">日本語</Dropdown.Item>
            </DropdownButton>
          </Nav>
        </StyledContainer>
      </StyledNavbar>
    </>
  );
};

export default Header;
