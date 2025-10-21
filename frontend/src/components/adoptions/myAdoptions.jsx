import { useEffect, useState } from 'react';
import { Card, Badge, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import { getUserAdoptions } from '../../services/adoptionRequestServices';

const statusColors = {
  pending: 'primary',
  approved: 'success',
  rejected: 'danger',
};

const MyAdoptions = () => {
  const { user } = useAuth();
  const [adoptions, setAdoptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyAdoptions = async () => {
      try {
        if (user?.id) {
          const data = await getUserAdoptions(user.id);
          setAdoptions(data);
        }
      } catch (error) {
        console.error('Error fetching my adoptions:', error);
        toast.error('Error al obtener tus solicitudes de adopción');
      }
    };

    fetchMyAdoptions();
  }, [user]);

  const handleBack = () => navigate('/dashboard');

  if (!adoptions.length)
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <h3>No realizaste ninguna solicitud de adopción aún 🐾</h3>
        <Button
          variant="success"
          onClick={() => navigate('/adopt')}
          className="mt-3"
        >
          Adoptar una Mascota
        </Button>
      </div>
    );

  return (
    <div className="container my-5">
      <Row className="align-items-center mb-4">
        <Col>
          <h2 className="text-center">Mis Solicitudes de Adopción</h2>
        </Col>
        <Col xs="auto">
          <Button variant="secondary" onClick={handleBack}>
            Volver
          </Button>
        </Col>
      </Row>

      <div className="d-flex flex-column align-items-center gap-4">
        {adoptions.map((req) => {
          const pet = req.Pet || {};
          const shelter = pet.Shelter || {};
          const worker = req.worker || {};

          return (
            <Card
              key={req.id}
              style={{ width: '45rem' }}
              className="d-flex flex-row shadow-sm"
            >
              <Card.Img
                style={{
                  width: '20rem',
                  height: 'auto',
                  objectFit: 'cover',
                }}
                variant="top"
                src={
                  pet.imageUrl ||
                  'https://cdn-icons-png.flaticon.com/512/616/616408.png'
                }
                alt={pet.name}
              />

              <Card.Body>
                <Card.Title>{pet.name || 'Mascota desconocida'}</Card.Title>

                <div className="mb-2">
                  <Badge bg={statusColors[req.status] || 'secondary'}>
                    {req.status === 'pending'
                      ? 'Pendiente'
                      : req.status === 'approved'
                      ? 'Aprobada'
                      : 'Rechazada'}
                  </Badge>
                </div>

                <Card.Text>
                  <strong>Especie:</strong> {pet.species || 'Sin especificar'}{' '}
                  <br />
                  <strong>Raza:</strong> {pet.breed || 'Sin especificar'} <br />
                  <strong>Edad:</strong> {pet.age ? `${pet.age} años` : 'N/D'}{' '}
                  <br />
                  <strong>Refugio:</strong> {shelter.name || 'Sin refugio'}{' '}
                  <br />
                  <strong>Fecha de solicitud:</strong>{' '}
                  {new Date(req.requestDate).toLocaleDateString()} <br />
                  <strong>Estado actual:</strong>{' '}
                  {req.status === 'pending'
                    ? 'En revisión'
                    : req.status === 'approved'
                    ? 'Aprobada'
                    : 'Rechazada'}{' '}
                  <br />
                  {worker.name && (
                    <>
                      <strong>Procesado por:</strong> {worker.name}{' '}
                      {worker.surname || ''} ({worker.email})
                      <br />
                    </>
                  )}
                  {req.comments && (
                    <>
                      <strong>Comentarios del refugio:</strong> {req.comments}
                    </>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MyAdoptions;
