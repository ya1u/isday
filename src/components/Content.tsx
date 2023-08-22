import React from "react";
import styles from "../styles/Content.module.css";
import styled from "styled-components";
import { getLanguageStyle } from '../App';
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { FormattedMessage, IntlProvider } from "react-intl";
import { useMediaQuery } from 'react-responsive';
import messages from "../locales/messages";

const CardHeader = styled(Card.Header)`
  ${props => getLanguageStyle(props.selectedLang)}
`;

const Content = ({ selectedLang }: { selectedLang: string }) => {
  const isMobile = useMediaQuery({ maxWidth: 423 });
  return (
    <IntlProvider locale={selectedLang} messages={messages[selectedLang]}>
      <div className={styles.Container}>
        <Card className={styles.Card}>
          <CardHeader className={styles.CardHeader} selectedLang={selectedLang}>
            <FormattedMessage id="content.calculator" />
          </CardHeader>
          <ListGroup className={styles.ListGroup} variant="flush">
            <ListGroup.Item className={styles.ListGroupItem} as={Link} to="/calc">
              <FormattedMessage id="content.calculator.general" />
            </ListGroup.Item>
            <ListGroup.Item className={styles.ListGroupItem} as={Link} to="/compound-interest-calc">
              <FormattedMessage id={isMobile ? "content.calculator.compound-mobile" : "content.calculator.compound"} />
            </ListGroup.Item>
          </ListGroup>
          <CardHeader className={styles.CardHeader} selectedLang={selectedLang}>
            <FormattedMessage id="content.timer" />
          </CardHeader>
          <ListGroup className={styles.ListGroup} variant="flush">
            <ListGroup.Item className={styles.ListGroupItem} as={Link} to="/onlinetimer">
              <FormattedMessage id="content.timer.onlinetimer" />
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </div>
    </IntlProvider>
  );
};

export default Content;
