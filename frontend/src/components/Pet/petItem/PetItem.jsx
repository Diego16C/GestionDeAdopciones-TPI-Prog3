import { Badge, Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import MyModal from '../../ui/modal/MyModal';

const PetItem = ({
  id,
  name,
  species,
  age,
  breed,
  imageUrl,
  available,
  onPetDeleted,
}) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/pets/${id}`);
  };

  const handleConfirmDelete = async () => {
    setShowModal(false);
    try {
      const response = await fetch(
        `http://localhost:3000/pet/deleteDef/${id}`,
        {
          method: 'DELETE',
        }
      );
      if (response.ok) {
        if (onPetDeleted) onPetDeleted(id);
      } else {
        alert('Error al eliminar la mascota');
      }
    } catch {
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <>
      <Card style={{ width: '22rem' }} className="mx-3">
        <Card.Img
          height={400}
          variant="top"
          src={imageUrl !== '' ? imageUrl : 'https://bit.ly/47NylZk'}
        />
        <Card.Body>
          <div className="mb-2">
            {available ? (
              <Badge bg="success">Disponible</Badge>
            ) : (
              <Badge bg="secondary">Adoptado</Badge>
            )}
          </div>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{species}</Card.Subtitle>
          <Card.Text>
            <strong>Raza:</strong> {breed}
          </Card.Text>
          <Card.Text>
            <strong>Edad:</strong> {age} {age === 1 ? 'año' : 'años'}
          </Card.Text>
          <Button onClick={clickHandler}>Seleccionar mascota</Button>
          <Button
            style={{ marginLeft: '10px' }}
            variant="danger"
            onClick={() => setShowModal(true)}
          >
            Eliminar mascota
          </Button>
        </Card.Body>
      </Card>
      <MyModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
};

export default PetItem;
