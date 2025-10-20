import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Badge, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import AdoptModal from '../../ui/modal/AdoptModal';
import { toast } from 'react-toastify';

const stateColors = {
  Adoptado: 'secondary',
  'En adopcion': 'success',
  Pendiente: 'primary',
  'En Pausa': 'warning',
};

const PetDetails = ({ petList, isWorkerView = true }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAdoptModal, setShowAdoptModal] = useState(false);

  const pet = petList.find((p) => String(p.id) === id);

  if (!pet) return <div>Mascota no encontrada</div>;

  const {
    name,
    species,
    breed,
    age,
    sex,
    description,
    imageUrl,
    state,
    Shelter,
  } = pet;

  const clickHandler = () => {
    navigate(-1);
  };

  const handleConfirmAdopt = async () => {
    setShowAdoptModal(false);

    try {
      // Simulá una acción por ahora, después la conectás al backend
      toast.success(
        `Has solicitado adoptar a ${name}! Redirigiendo a tus adopciones`,
        { autoClose: 3000 }
      );
      // Aquí podrías llamar a un servicio, ej:
      // await requestAdoption(id);
    } catch (err) {
      console.error(err);
      toast.error('Error al solicitar adopción');
    }
  };

  return (
    <div className="d-flex justify-content-center my-5">
      <Card style={{ width: '45rem' }} className="d-flex flex-row">
        <Card.Img
          style={{ width: '20rem', height: 'auto', objectFit: 'cover' }}
          variant="top"
          src={imageUrl}
          alt={name}
        />
        <Card.Body>
          <Card.Title>{name}</Card.Title>

          <div className="mb-2">
            <Badge bg={stateColors[state] || 'primary'}>
              {state || 'Desconocido'}
            </Badge>
          </div>

          <Card.Text>
            <strong>Especie:</strong> {species} <br />
            <strong>Edad:</strong> {age} <br />
            <strong>Raza:</strong> {breed} <br />
            <strong>Sexo:</strong> {sex} <br />
            <strong>Descripción:</strong> {description} <br />
            <strong>En Refugio:</strong>{' '}
            {Shelter ? Shelter.name : 'Sin refugio'}
          </Card.Text>

          <div className="mt-3">
            {' '}
            <Button className="me-2" onClick={clickHandler} variant="danger">
              Volver
            </Button>
            {isWorkerView ? (
              <Button
                variant="primary"
                onClick={() => navigate(`/pets/edit/${id}`)}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </Button>
            ) : (
              <Button variant="success" onClick={() => setShowAdoptModal(true)}>
                Adoptar Mascota
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>

      <AdoptModal
        show={showAdoptModal}
        onClose={() => setShowAdoptModal(false)}
        onConfirm={handleConfirmAdopt}
        petName={name}
      />
    </div>
  );
};

export default PetDetails;
