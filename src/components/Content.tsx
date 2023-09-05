import React from "react";
import styles from "../styles/Content.module.css";
import styled from "styled-components";
import { getLanguageStyle } from '../App';
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

const CardHeader = styled(Card.Header)`
  ${props => getLanguageStyle(props.selectedLang)}
`;

const Content = () => {
  return (
    <div>
      <div className={styles.Container}>
        <Card className={styles.Card}>
          <CardHeader className={styles.CardHeader}>계산기</CardHeader>
          <ListGroup className={styles.ListGroup} variant="flush">
            <ListGroup.Item className={styles.ListGroupItem} as={Link} to="/general-calc/">- 계산기</ListGroup.Item>
            <ListGroup.Item className={styles.ListGroupItem} as={Link} to="/compound-interest-calc/">- 복리 계산기</ListGroup.Item>
          </ListGroup>
          <CardHeader className={styles.CardHeader}>타이머</CardHeader>
          <ListGroup className={styles.ListGroup} variant="flush">
            <ListGroup.Item className={styles.ListGroupItem} as={Link} to="/onlinetimer/">- 온라인 타이머</ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    </div>
  );
};

export default Content;
