import { useParams, useNavigate } from 'react-router';
import { Badge, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const stateColors = {
  Adoptado: 'secondary',
  'En adopcion': 'success',
  Pendiente: 'primary',
  'En Pausa': 'warning',
};

const PetDetails = ({ petList }) => {
  const { id } = useParams();
  const navigate = useNavigate();

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
    shelterId,
  } = pet;

  const clickHandler = () => {
    navigate(-1);
  };

  return (
    <div className="d-flex justify-content-center my-5">
      <Card style={{ width: '22rem' }}>
        <Card.Img variant="top" src={imageUrl} alt={name} />
        <Card.Body>
          <Card.Title>{name} </Card.Title>
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
            <strong>En Refugio:</strong> {shelterId}
          </Card.Text>
          <Button className="me-2" onClick={clickHandler}>
            Volver
          </Button>
          <Button
            variant="primary"
            onClick={() => navigate(`/pets/edit/${id}`)}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
export default PetDetails;
