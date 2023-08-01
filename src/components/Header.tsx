import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import languageSVG from "../images/language_icon.svg";
import questionSVG from "../images/question_icon.svg";
import smallQuestionSVG from "../images/question_small_icon.svg";
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
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledContainer = styled(Container)`
  margin-left: 20%;
  margin-right: 20%;
  @media (max-width: 599px) {
    justify-content: space-around;
    text-align: center;
    margin: 0 auto;
  }
`;

const StyledMobileDropdownButton = styled(DropdownButton)`
  @media (min-width: 600px) {
    display: none;
  }
`;

const StyledNavBrand = styled(Navbar.Brand)`
  font-family: "Jalnan", "MaplestoryBold";
  font-size: 32px;
  @media (max-width: 599px) {
    font-size: 34px;
    margin: 0 auto;
  }
`;

const StyledNavLink = styled(Nav.Link)`
  font-family: "Jalnan", "MaplestoryBold";
  font-size: 18px;
  white-space: nowrap;
  @media (max-width: 638px) {
    font-size: 16px;
  }
  @media (max-width: 599px) {
    display: none;
    margin: 0 auto;
  }
`;

const StyledInquireBtn = styled(Button)`
  font-family: "MaplestoryBold", "Jalnan";
  font-size: 15px;
  width: 122px;
  @media (max-width: 599px) {
    display: none;
  }
`;

const Header = () => {
  const [isWideScreen, setIsWideScreen] = useState(window.innerWidth >= 599);

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
      {/* @font-face 스타일 컴포넌트를 네비게이션 바 컴포넌트 밖에서 선언합니다. */}
      <FontFaceStyle />

      {/* 스타일이 적용된 StyledNavbar를 사용합니다. */}
      <StyledNavbar variant="dark">
        <StyledContainer className="justify-content-center">
          <StyledMobileDropdownButton
            id="dropdown-basic-button"
            align={{ lg: "end" }}
            variant="light"
            title={<img src={hamburgurSVG} alt="Hamburgur Icon" />}
          >
            <Dropdown.Item href="/ko/">계산기</Dropdown.Item>
            <Dropdown.Item href="/en/">복리 계산기</Dropdown.Item>
            <Dropdown.Item href="/ja/">공학용 계산기</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="/ja/">
              문의하기
              <img src={smallQuestionSVG} alt="Question Icon" />
            </Dropdown.Item>
          </StyledMobileDropdownButton>
          <StyledNavBrand href="#home">isDay</StyledNavBrand>
          {isWideScreen && (
            <Nav className="me-auto">
              <StyledNavLink href="#home">계산기</StyledNavLink>
              <StyledNavLink href="#features">복리 계산기</StyledNavLink>
              <StyledNavLink href="#pricing">공학용 계산기</StyledNavLink>
            </Nav>
          )}
          <Nav className="">
            <StyledInquireBtn className="btn btn-light me-3 nav-desktop">
              <img src={questionSVG} alt="Question Icon" />
              문의하기
            </StyledInquireBtn>
            <DropdownButton
              id="dropdown-basic-button"
              align={{ lg: "start" }}
              variant="light"
              title={<img src={languageSVG} alt="Language Icon" />}
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