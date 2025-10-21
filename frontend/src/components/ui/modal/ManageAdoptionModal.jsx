import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';

const ManageAdoptionModal = ({
  show,
  onClose,
  onConfirm,
  type,
  requesterName,
}) => {
  const isApprove = type === 'approve';
  const [comment, setComment] = useState('');

  const handleConfirm = () => {
    onConfirm(comment);
    setComment('');
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {isApprove ? 'Aprobar Solicitud' : 'Rechazar Solicitud'}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          ¿Seguro que deseas{' '}
          <strong>{isApprove ? 'aprobar' : 'rechazar'}</strong> la solicitud de{' '}
          <strong>{requesterName}</strong>?
        </p>

        <Form.Group className="mt-3">
          <Form.Label>Comentario (opcional)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder={
              isApprove
                ? 'Ejemplo: Solicitud aprobada, puede pasar por el refugio...'
                : 'Ejemplo: Lamentablemente la solicitud no fue aprobada...'
            }
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button
          variant={isApprove ? 'success' : 'danger'}
          onClick={handleConfirm}
        >
          {isApprove ? 'Aprobar' : 'Rechazar'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ManageAdoptionModal;
