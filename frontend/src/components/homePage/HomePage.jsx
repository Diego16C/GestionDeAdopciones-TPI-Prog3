import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 text-center">
      <h1>Bienvenido a Gestión de Adopciones 🐾</h1>
      <p>Elegí cómo querés ingresar:</p>

      <div className="d-flex gap-3 mt-3">
        <Button variant="primary" onClick={() => navigate('/cliente')}>
          Soy Adoptante
        </Button>
        <Button variant="success" onClick={() => navigate('/trabajador')}>
          Soy Trabajador
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
