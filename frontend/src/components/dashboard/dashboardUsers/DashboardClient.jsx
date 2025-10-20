// src/components/dashboard/DashboardTrabajador.jsx
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const DashboardClient = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center vh-100 text-center">
      <h2 style={{ marginTop: '20px' }}>Bienvenido!</h2>
      <div className="d-flex flex-column align-items-center gap-2 mt-2">
        <Button variant="success" onClick={() => navigate('/adopt')}>
          Adoptar una Mascota
        </Button>
        <Button variant="success" onClick={() => navigate('/my-adoptions')}>
          Ver mis Adopciones
        </Button>
      </div>
    </div>
  );
};

export default DashboardClient;
