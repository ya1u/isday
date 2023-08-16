import React, { useState, useCallback } from "react";
import { Modal, Form, Button } from "react-bootstrap";

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
      <Modal.Header closeButton>
        <Modal.Title>
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
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseClick}>
          {selectedLang === "ko"
            ? "닫기"
            : selectedLang === "en"
            ? "Close"
            : "閉じる"}
        </Button>
        <Button variant="primary" onClick={handleSendClick}>
          {selectedLang === "ko"
            ? "보내기"
            : selectedLang === "en"
            ? "Send"
            : "送信する"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmailModal;
