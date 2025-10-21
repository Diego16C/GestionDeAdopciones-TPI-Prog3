import { useEffect, useState } from 'react';
import { Card, Badge, Button, Row, Col, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useAuth } from '../../hooks/useAuth';
import {
  getPendingRequests,
  approveAdoption,
  rejectAdoption,
} from '../../services/adoptionRequestServices';
import ManageAdoptionModal from '../ui/modal/ManageAdoptionModal';

const statusColors = {
  pending: 'primary',
  approved: 'success',
  rejected: 'danger',
};

const DashboardAdoptionManagement = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [modalType, setModalType] = useState(null);

  const fetchPending = async () => {
    try {
      const data = await getPendingRequests();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching pending adoptions:', error);
      toast.error('Error al cargar las solicitudes pendientes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="success" />
        <h5 className="ms-3">Cargando solicitudes...</h5>
      </div>
    );

  if (!requests.length)
    return (
      <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <h3>No hay solicitudes de adopción pendientes 🐾</h3>
      </div>
    );

  return (
    <div className="container my-5">
      <Row className="align-items-center mb-4">
        <Col>
          <h2 className="text-center">Gestión de Solicitudes de Adopción</h2>
        </Col>
      </Row>

      <div className="d-flex flex-column align-items-center gap-4">
        {requests.map((req) => (
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
              src={req.Pet?.imageUrl}
              alt={req.Pet?.name}
            />

            <Card.Body>
              <Card.Title>{req.Pet?.name || 'Mascota desconocida'}</Card.Title>

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
                <strong>Solicitante:</strong> {req.User?.name || 'Desconocido'}{' '}
                <br />
                <strong>Email:</strong> {req.User?.email} <br />
                <strong>Fecha de solicitud:</strong>{' '}
                {new Date(req.requestDate).toLocaleDateString()} <br />
                <strong>Refugio:</strong>{' '}
                {req.Pet?.Shelter?.name || 'Sin refugio'}
              </Card.Text>

              <div className="d-flex justify-content-center gap-3 mt-3">
                <Button
                  variant="success"
                  onClick={() => {
                    setSelectedRequest(req);
                    setModalType('approve');
                    setShowModal(true);
                  }}
                >
                  Aprobar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    setSelectedRequest(req);
                    setModalType('reject');
                    setShowModal(true);
                  }}
                >
                  Rechazar
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
      <ManageAdoptionModal
        show={showModal}
        onClose={() => setShowModal(false)}
        type={modalType}
        requesterName={selectedRequest?.User?.name || 'usuario desconocido'}
        onConfirm={async (comment) => {
          if (!selectedRequest) return;

          try {
            if (modalType === 'approve') {
              await approveAdoption(selectedRequest.id, user.id, comment);
              toast.success('Solicitud aprobada correctamente 🎉');
            } else {
              await rejectAdoption(selectedRequest.id, user.id, comment);
              toast.info('Solicitud rechazada ❌');
            }

            setRequests((prev) =>
              prev.filter((r) => r.id !== selectedRequest.id)
            );
          } catch (error) {
            console.error(error);
            toast.error('Error al procesar la solicitud');
          } finally {
            setShowModal(false);
            setSelectedRequest(null);
            setModalType(null);
          }
        }}
      />
    </div>
  );
};

export default DashboardAdoptionManagement;
