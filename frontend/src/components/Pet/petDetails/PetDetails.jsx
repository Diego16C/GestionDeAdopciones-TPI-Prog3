import { useParams, useNavigate } from 'react-router';
import { Badge, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const PetDetails = ({ petList }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const pet = petList.find((p) => String(p.id) === id);

  if (!pet) return <div>Mascota no encontrada</div>;

  const { name, species, age, breed, description, imageUrl, available } = pet;

  const clickHandler = () => {
    navigate(-1);
  };

  return (
    <div className="d-flex justify-content-center my-5">
      <Card style={{ width: '22rem' }}>
        <Card.Img variant="top" src={imageUrl} alt={name} />
        <Card.Body>
          <Card.Title>{name} </Card.Title>
          {available ? (
            <Badge bg="success">Disponible</Badge>
          ) : (
            <Badge bg="secondary">No Disponible</Badge>
          )}
          <Card.Text>
            <strong>Especie:</strong> {species} <br />
            <strong>Edad:</strong> {age} <br />
            <strong>Raza:</strong> {breed} <br />
            <strong>Descripción:</strong> {description}
          </Card.Text>
          <Button className="me-2" onClick={clickHandler}>
            Volver
          </Button>
          <Button variant="primary">
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
export default PetDetails;
