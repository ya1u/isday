import React, { useState, useCallback } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import styles from "../../styles/EmailModal.module.css"

interface EmailModalProps {
  show: boolean;
  onClose: () => void;
  onSend: (content: string) => void;
}

const EmailModal: React.FC<EmailModalProps> = ({
  show,
  onClose,
  onSend,
}) => {
  const [emailContent, setEmailContent] = useState("");

  const handleCloseClick = () => {
    setEmailContent("");
    onClose();
  };

  const handleSendClick = useCallback(() => {
    if (emailContent.trim() !== "") {
      onSend(emailContent);
      handleCloseClick();
    }
  }, [emailContent, onSend, onClose]);

  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setEmailContent(e.target.value);
    },
    []
  );

  return (
    <Modal className={styles.Modal} show={show} onHide={onClose}>
      <Modal.Header className={styles.ModalHeader}>
        <Modal.Title className={styles.ModalTitle}>문의하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="emailContent">
            <Form.Control
              as="textarea"
              placeholder={"문의하실 내용을 입력해주세요. \n회신이 필요하면 이메일 주소를 남겨주세요."}
              rows={10}
              value={emailContent}
              onChange={handleContentChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer className={styles.ModalFooter}>
        <Button className={styles.StyledGreyButton} onClick={handleCloseClick}>닫기</Button>
        <Button className={styles.StyledCyanButton} onClick={handleSendClick}>보내기</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmailModal;
