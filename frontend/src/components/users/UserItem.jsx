import { Card, Button, Badge } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import DeleteModalUser from '../ui/modal/DeleteModalUser.jsx';
import { deleteUser } from '../../services/userServices.jsx';
import { toast } from 'react-toastify';

const roleColors = {
  admin: 'dark',
  worker: 'primary',
  client: 'secondary',
};

const UserItem = ({
  id,
  name,
  surname,
  email,
  role,
  registeredAt,
  onUserDeleted,
}) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleViewMore = () => {
    navigate(`/users/${id}`);
  };

  const handleConfirmDelete = async () => {
    setShowModal(false);
    try {
      await deleteUser(id);
      toast.success('Usuario eliminado con éxito!', { autoClose: 3000 });
      if (onUserDeleted) onUserDeleted(id);
    } catch (err) {
      toast.error('Error al eliminar el usuario');
      console.error(err);
    }
  };

  return (
    <>
      <Card style={{ width: '15rem' }} className="mx-3 mb-3 shadow-sm">
        <Card.Body>
          <div className="mb-2">
            <Badge bg={roleColors[role] || 'info'}>{role.toUpperCase()}</Badge>
          </div>
          <Card.Title>
            {name} {surname}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{email}</Card.Subtitle>
          <Card.Text>
            <strong>Registrado:</strong>{' '}
            {new Date(registeredAt).toLocaleDateString()}
          </Card.Text>

          <div className="d-flex flex-column align-items-center gap-2 mt-2">
            <Button variant="primary" onClick={handleViewMore}>
              Ver Más
            </Button>

            <Button variant="danger" onClick={() => setShowModal(true)}>
              Eliminar Usuario
            </Button>
          </div>
        </Card.Body>
      </Card>

      <DeleteModalUser
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default UserItem;
