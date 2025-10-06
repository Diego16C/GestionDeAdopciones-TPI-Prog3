import { Badge, Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import MyModal from '../../ui/modal/MyModal';
import { deletePet } from '../../../services/petServices';
import { toast } from 'react-toastify';

const stateColors = {
  Adoptado: 'secondary',
  'En adopcion': 'success',
  Pendiente: 'primary',
  'En Pausa': 'warning',
};

const PetItem = ({
  id,
  name,
  species,
  breed,
  age,
  sex,
  imageUrl,
  state,
  onPetDeleted,
}) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const clickHandler = () => navigate(`/pets/${id}`);

  const handleConfirmDelete = async () => {
    setShowModal(false);
    try {
      await deletePet(id);
      toast.success('Mascota eliminada con éxito!', { autoClose: 3000 });
      if (onPetDeleted) onPetDeleted(id);
    } catch (err) {
      alert(err.message || 'Error al eliminar la mascota');
    }
  };

  return (
    <>
      <Card style={{ width: '15rem' }} className="mx-3 mb-3">
        <Card.Img
          height={300}
          variant="top"
          src={imageUrl || 'https://bit.ly/47NylZk'}
        />
        <Card.Body>
          <div className="mb-2">
            <Badge bg={stateColors[state] || 'primary'}>
              {state || 'Desconocido'}
            </Badge>
          </div>
          <Card.Title>{name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{species}</Card.Subtitle>
          <Card.Text>
            <strong>Raza:</strong> {breed || 'Desconocida'} <br />
            <strong> Sexo: </strong> {sex || 'Desconocida'}
            <br />
            <strong>Edad:</strong> {age ?? 'Desconocida'}{' '}
            {age === 1 ? 'año' : 'años'}
            <br />
          </Card.Text>
          <div className="d-flex gap-2 flex-wrap">
            <Button variant="primary" onClick={clickHandler}>
              Ver Más
            </Button>
            <Button variant="danger" onClick={() => setShowModal(true)}>
              Eliminar Mascota
            </Button>
          </div>
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
