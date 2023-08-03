import React from "react";
import styled from "styled-components";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

const StyledContainer = styled.div`
  /* width: 680px; */
  border: 1px solid transparent;
  border-radius: 25px; /* 둥근 모서리 추가 */
  box-shadow: 5px 10px 100px 50px rgba(0, 0, 0, 0.1); /* 그림자 효과 추가 */
  margin: 0;
  padding: 0;
`;

const StyledCard = styled(Card)`
  /* width: 510px; */
  border: none;
  border-radius: 25px;
  margin: 0;
  .card-header:first-child {
    border-radius: 25px 25px 0 0;
  }
`;

const CardHeader = styled(Card.Header)`
  font-family: "Jalnan", "MaplestoryBold";
  height: 70px;
  line-height: 53px;
  background-color: darkcyan;
  color: white;
  font-weight: bold;
  font-size: 22px;
  text-align: left; /* 왼쪽 정렬 추가 */
  padding-left: 50px;
`;

const StyledListGroup = styled(ListGroup)`
font-family: "Jalnan", "MaplestoryBold";
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

const Content = () => {
  return (
    <StyledContainer>
      <StyledCard>
        <CardHeader>계산기</CardHeader>
        <StyledListGroup variant="flush">
          <ListGroup.Item as={Link} to="/calc">
            - 일반 계산기
          </ListGroup.Item>
          <ListGroup.Item as={Link} to="/compound-interest-calc">
            - 복리 계산기
          </ListGroup.Item>
        </StyledListGroup>
        <CardHeader>타이머</CardHeader>
        <StyledListGroup variant="flush">
          <ListGroup.Item as={Link} to="/pomodoro">
            - 뽀모도로 타이머
          </ListGroup.Item>
        </StyledListGroup>
      </StyledCard>
    </StyledContainer>
  );
};

export default Content;
