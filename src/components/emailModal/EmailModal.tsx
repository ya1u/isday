import React, { useState, useCallback } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import styled from "styled-components";

interface EmailModalProps {
  show: boolean;
  selectedLang: string;
  onClose: () => void;
  onSend: (content: string) => void;
}

const EmailModal: React.FC<EmailModalProps> = ({
  show,
  onClose,
  onSend,
  selectedLang,
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
    <Modal show={show} onHide={onClose} style={{ marginTop: 200 }}>
      <Modal.Header
        style={{
          backgroundColor: "darkcyan",
          borderBottom: "none",
          padding: "15px 20px",
        }}
      >
        <Modal.Title style={{ color: "#FFF", fontSize: 24 }}>
          {selectedLang === "ko"
            ? "문의하기"
            : selectedLang === "en"
            ? "Inquiry"
            : "問い合わせ"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="emailContent">
            <Form.Control
              as="textarea"
              placeholder={
                selectedLang === "ko"
                  ? "문의하실 내용을 입력해주세요. \n회신이 필요하면 이메일 주소를 남겨주세요."
                  : selectedLang === "en"
                  ? "Please enter your inquiry. \nIf you need a reply, please leave your email address."
                  : "お問い合わせ内容を入力してください。 \n返信が必要な場合は、メールアドレスを残してください。"
              }
              rows={10}
              value={emailContent}
              onChange={handleContentChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer
        style={{
          padding: "10px 20px",
        }}
      >
        <StyledGreyButton onClick={handleCloseClick}>
          {selectedLang === "ko"
            ? "닫기"
            : selectedLang === "en"
            ? "Close"
            : "閉じる"}
        </StyledGreyButton>
        <StyledCyanButton onClick={handleSendClick}>
          {selectedLang === "ko"
            ? "보내기"
            : selectedLang === "en"
            ? "Send"
            : "送信する"}
        </StyledCyanButton>
      </Modal.Footer>
    </Modal>
  );
};

const StyledGreyButton = styled(Button)`
  background-color: grey;
  border: none;
  color: white;
  padding: 10px 30px;
  &:hover {
    background-color: grey;
    opacity: 0.8;
  }
  &:active {
    background-color: grey;
    opacity: 0.5;
  }
`;

const StyledCyanButton = styled(Button)`
  background-color: darkcyan;
  border: none;
  color: white;
  padding: 10px 30px;
  &:hover {
    background-color: darkcyan;
    opacity: 0.8;
  }
  &:active {
    background-color: darkcyan;
    opacity: 0.5;
  }
`;

export default EmailModal;
