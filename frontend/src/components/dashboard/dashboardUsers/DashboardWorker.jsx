import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const DashboardTrabajador = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center vh-100 text-center">
      <h2 style={{ marginTop: '20px' }}>Panel del Trabajador</h2>
      <p>Desde aquí podés administrar las mascotas del refugio.</p>
      <div className="d-flex flex-column align-items-center gap-2 mt-2">
        <Button variant="success" onClick={() => navigate('/adoptions')}>
          Gestión de Solicitudes de Adopcion
        </Button>
        <Button variant="success" onClick={() => navigate('/pets')}>
          Gestión de Mascotas
        </Button>
        <Button variant="success" onClick={() => navigate('/shelters')}>
          Gestión de Refugios
        </Button>
      </div>
    </div>
  );
};

export default DashboardTrabajador;
