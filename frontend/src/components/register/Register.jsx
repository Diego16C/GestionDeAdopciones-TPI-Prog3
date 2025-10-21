import { useState } from 'react';
import { registerUser } from '../../services/authServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      toast.success('Usuario registrado correctamente 🎉');
      navigate('/login');
    } catch {
      toast.error('Error al registrarse ❌');
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div
        className="card shadow p-4"
        style={{ maxWidth: '400px', width: '100%' }}
      >
        <h2 className="text-center mb-4">Crear una cuenta</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Nombre:</label>
            <input
              name="name"
              className="form-control"
              placeholder="Ingrese su nombre"
              onChange={handleChange}
              value={formData.name}
              required
            />
          </div>

          <div className="mb-3">
            <label>Apellido:</label>
            <input
              name="surname"
              className="form-control"
              placeholder="Ingrese su apellido"
              onChange={handleChange}
              value={formData.surname}
              required
            />
          </div>

          <div className="mb-3">
            <label>Email:</label>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="Ingrese su email"
              onChange={handleChange}
              value={formData.email}
              required
            />
          </div>

          <div className="mb-3">
            <label>Contraseña:</label>
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Cree una contraseña"
              onChange={handleChange}
              value={formData.password}
              required
            />
          </div>

          <Button variant="success" type="submit" className="w-100">
            Registrarse
          </Button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-2">¿Ya tenés una cuenta?</p>
          <Button
            variant="outline-primary"
            className="w-100"
            onClick={() => navigate('/login')}
          >
            Iniciar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Register;
