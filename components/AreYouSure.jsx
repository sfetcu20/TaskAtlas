import { Modal } from 'react-bootstrap';
import { Button } from '.';

const AreYouSure = ({ isOpen, hide, iAmSure, children, title, actionText = 'Delete' }) => {
  return (
    <Modal centered show={isOpen} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button className="button square accent" onClick={hide}>
          Go back
        </Button>
        <Button className="button full primary" onClick={iAmSure}>
          {actionText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AreYouSure;
