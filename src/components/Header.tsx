import React, { useEffect, useReducer, useState } from "react";
import { Nav, Navbar, Button, Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import emailjs from "emailjs-com";

import styles from "../styles/Header.module.css";
import smallSupportSVG from "../images/support_small_icon.svg";
import supportSVG from "../images/support_icon.svg";
import hamburgurSVG from "../images/hamburger_icon.svg";

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

const Header = () => {
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

  const handleMouseClick = (mode: string) => {
    if (mode === "menu") {
      dispatch({ type: actionTypes.SET_MENU_DROPDOWN, payload: !state.showMenuDropdown });
    } else if (mode === "lang") {
      dispatch({ type: actionTypes.SET_LANG_DROPDOWN, payload: !state.showLangDropdown });
    }
  };

  const handleCloseDropdowns = () => {
    dispatch({ type: actionTypes.SET_MENU_DROPDOWN, payload: false });
    dispatch({ type: actionTypes.SET_LANG_DROPDOWN, payload: false });
  };

  const handleMenuItemClick = () => {
    handleCloseDropdowns();
  };

  return (
    <div>
      <Navbar className={styles.Navbar} variant="dark">
        <div className={styles.Container}>
          <DropdownButton
            className={styles.DropdownButton}
            id="dropdown-basic-button"
            align={{ lg: "end" }}
            variant="light"
            title={<img src={hamburgurSVG} alt="Hamburgur Icon" />}
            show={state.showMenuDropdown}
            onClick={() => handleMouseClick("menu")}
            onMouseEnter={() => handleMouseEnter("menu")}
            onMouseLeave={handleCloseDropdowns}
          >
            <Dropdown.Item as={Link} to="/general-calc/" onClick={handleMenuItemClick}>
              일반 계산기
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/compound-interest-calc/" onClick={handleMenuItemClick}>
              복리 계산기
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/onlinetimer/" onClick={handleMenuItemClick}>
              온라인 타이머
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => {
              handleEmailModalShow()
              handleMenuItemClick()}}>
              문의하기
              <img src={smallSupportSVG} alt="Question Icon" />
            </Dropdown.Item>
          </DropdownButton>
          <Navbar.Brand className={styles.NavBrand} as={Link} to="/">
            <img className={styles.logo} src={process.env.PUBLIC_URL + '/favicon.ico'} width={44} alt="" />
            isDay
          </Navbar.Brand>
          {state.isWideScreen && (
            <Nav className={styles.Nav}>
              <Nav.Link className={styles.NavLink} as={Link} to="/general-calc/">
                일반 계산기
              </Nav.Link>
              <Nav.Link
                className={styles.NavLink}
                as={Link}
                to="/compound-interest-calc/"
              >
                복리 계산기
              </Nav.Link>
              <Nav.Link className={styles.NavLink} as={Link} to="/onlinetimer/">
                온라인 타이머
              </Nav.Link>
            </Nav>
          )}
          <Nav>
            <Button
              className={styles.InquireBtn}
              onClick={() => {
                handleEmailModalShow()
                handleMenuItemClick()}}>
              <img
                src={supportSVG}
                alt="Support Icon"
                className={styles.InquireBtnImg}
              />
              <span className={styles.InquireBtnText}>문의하기</span>
            </Button>
            {/* <DropdownButton
              id="dropdown-basic-button"
              align={{ lg: "start" }}
              variant="light"
              title={<img src={languageSVG} alt="Language Icon" />}
              show={state.showLangDropdown}
              onClick={() => handleMouseClick("lang")}
              onMouseEnter={() => handleMouseEnter("lang")}
              onMouseLeave={handleCloseDropdowns}
            >
              <Dropdown.Item onClick={() => {
                handleLanguageButtonClick("ko") 
                handleMenuItemClick()}}>
                한국어
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {
                handleLanguageButtonClick("en") 
                handleMenuItemClick()}}>
                English
              </Dropdown.Item>
              <Dropdown.Item onClick={() => {
                handleLanguageButtonClick("ja") 
                handleMenuItemClick()}}>
                日本語
              </Dropdown.Item>
            </DropdownButton> */}
          </Nav>
        </div>
      </Navbar>
      <EmailModal
        show={showEmailModal}
        onClose={handleEmailModalClose}
        onSend={sendEmail}
      />
    </div>
  );
};

export default Header;
