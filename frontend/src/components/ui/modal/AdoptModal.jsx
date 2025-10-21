import { Modal, Button } from 'react-bootstrap';

const AdoptModal = ({ show, onClose, onConfirm, petName }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Adopción</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        ¿Deseas solicitar la adopción de <strong>{petName}</strong>?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="success" onClick={onConfirm}>
          Confirmar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AdoptModal;
