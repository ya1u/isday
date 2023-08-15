import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

interface EmailModalProps {
  show: boolean;
  onClose: () => void;
  onSend: (content: string) => void;
}

const EmailModal: React.FC<EmailModalProps> = ({ show, onClose, onSend }) => {
  const [emailContent, setEmailContent] = useState("");

  const handleSendClick = () => {
    if (emailContent.trim() !== "") {
      onSend(emailContent);
      onClose();
    }
  };

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
              onChange={(e) => setEmailContent(e.target.value)}
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
