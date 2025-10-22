import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router';

const UserDetails = ({ userList }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = userList.find((u) => String(u.id) === id);

  if (!user) return <div>Usuario no encontrado</div>;

  const handleEdit = () => {
    navigate(`/users/edit/${id}`);
  };

  return (
    <Card className="m-5 p-4 shadow">
      <Card.Body>
        <Card.Title>
          {user.name} {user.surname}
        </Card.Title>
        <Card.Subtitle className="mb-3 text-muted">{user.email}</Card.Subtitle>
        <Card.Text>
          <strong>Rol:</strong> {user.role}
          <br />
          <strong>Registrado:</strong>{' '}
          {new Date(user.registeredAt).toLocaleString()}
        </Card.Text>

        <div className="d-flex gap-3 mt-3">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Volver
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Editar Usuario
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default UserDetails;
