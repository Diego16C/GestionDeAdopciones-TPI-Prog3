import { useState } from 'react';
import { loginUser } from '../../services/authServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth.jsx';
import { Button } from 'react-bootstrap';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(formData);
      login(data.user, data.token);
      toast.success('Inicio de sesión exitoso 🎉');
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.message || 'Error al iniciar sesión ❌');
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Ingrese su email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Contraseña:</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Ingrese su contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <Button type="submit" variant="success" className="w-100">
            Ingresar
          </Button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-2">¿No tenés una cuenta?</p>
          <Button
            variant="outline-primary"
            className="w-100"
            onClick={() => navigate('/register')}
          >
            Registrarse
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
