import React, { useState, useCallback } from "react";
import { Modal, Form, Button } from "react-bootstrap";

interface EmailModalProps {
  show: boolean;
  onClose: () => void;
  onSend: (content: string) => void;
}

const EmailModal: React.FC<EmailModalProps> = ({ show, onClose, onSend }) => {
  const [emailContent, setEmailContent] = useState("");

  const handleSendClick = useCallback(() => {
    if (emailContent.trim() !== "") {
      onSend(emailContent);
      onClose();
    }
  }, [emailContent, onSend, onClose]);

  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEmailContent(e.target.value);
  }, []);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Compose Email</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="emailContent">
            <Form.Label>Email Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={emailContent}
              onChange={handleContentChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSendClick}>
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmailModal;
