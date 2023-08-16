import React from "react";
import styled, { css } from "styled-components";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { FormattedMessage, IntlProvider } from "react-intl";
import messages from "../locales/messages";

const StyledContainer = styled.div`
  border: 1px solid transparent;
  border-radius: 25px; /* 둥근 모서리 추가 */
  box-shadow: 5px 10px 100px 50px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
  margin: 0;
  padding: 0;
`;

const StyledCard = styled(Card)`
  border: none;
  border-radius: 25px;
  margin: 0;
  .card-header:first-child {
    border-radius: 25px 25px 0 0;
  }
`;

const CardHeader = styled(Card.Header)`
  height: 70px;
  line-height: 53px;
  background-color: darkcyan;
  color: white;
  font-size: 20px;
  text-align: left; /* 왼쪽 정렬 추가 */
  padding-left: 50px;
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

const StyledListGroup = styled(ListGroup)`
  .list-group-item {
    /* border: none; */
    background-color: transparent;
    height: 70px;
    line-height: 53px;
    font-size: 20px;
    cursor: pointer;
    text-align: left; /* 왼쪽 정렬 추가 */
    padding-left: 50px;
    color: black;
    opacity: 0.6;
    &:hover {
      background-color: #f0f0f0;
    }
  }
`;

const Content = ({ selectedLang }: { selectedLang: string }) => {
  return (
    <IntlProvider locale={selectedLang} messages={messages[selectedLang]}>
      <StyledContainer>
        <StyledCard>
          <CardHeader selectedLang={selectedLang}>
            <FormattedMessage id="content.calculator" />
          </CardHeader>
          <StyledListGroup variant="flush">
            <ListGroup.Item as={Link} to="/calc">
              <FormattedMessage id="content.calculator.general" />
            </ListGroup.Item>
            <ListGroup.Item as={Link} to="/compound-interest-calc">
              <FormattedMessage id="content.calculator.compound" />
            </ListGroup.Item>
          </StyledListGroup>
          <CardHeader selectedLang={selectedLang}>
            <FormattedMessage id="content.timer" />
          </CardHeader>
          <StyledListGroup variant="flush">
            <ListGroup.Item as={Link} to="/pomodoro">
              <FormattedMessage id="content.timer.pomodoro" />
            </ListGroup.Item>
          </StyledListGroup>
        </StyledCard>
      </StyledContainer>
    </IntlProvider>
  );
};

export default Content;
