import { Button } from 'react-bootstrap';
import { useAuth } from '../../../hooks/useAuth';
import { useNavigate } from 'react-router';

const DashboardMain = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isWorker, isClient } = useAuth();

  const getPanelTitle = () => {
    switch (user?.role) {
      case 'admin':
        return 'Panel del Administrador';
      case 'worker':
        return 'Panel del Trabajador';
      case 'client':
        return 'Panel del Cliente';
      default:
        return 'Panel de Usuario';
    }
  };

  return (
    <div className="d-flex flex-column align-items-center vh-100 text-center">
      <h2 style={{ marginTop: '20px' }}>{getPanelTitle()}</h2>
      <span className="mb-3 fs-5 text-secondary">
        ¡Bienvenido, {user?.name} {user?.surname}!
      </span>

      <div className="d-flex flex-column align-items-center gap-3 mt-3">
        {isClient && (
          <>
            <Button variant="success" onClick={() => navigate('/adopt')}>
              Adoptar una Mascota
            </Button>
            <Button variant="success" onClick={() => navigate('/my-adoptions')}>
              Ver mis Adopciones
            </Button>
          </>
        )}

        {isWorker && (
          <>
            <Button variant="success" onClick={() => navigate('/adoptions')}>
              Gestión de Solicitudes de Adopción
            </Button>
            <Button variant="success" onClick={() => navigate('/pets')}>
              Gestión de Mascotas
            </Button>
          </>
        )}

        {isAdmin && (
          <>
            <Button variant="success" onClick={() => navigate('/shelters')}>
              Gestión de Refugios
            </Button>
            <Button variant="success" onClick={() => navigate('/users')}>
              Gestión de Usuarios
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardMain;
