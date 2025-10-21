import { useState } from 'react';
import { registerUser } from '../../services/authServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

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
    <div className="container mt-5">
      <h2>Registrarse</h2>
      <form onSubmit={handleSubmit} className="w-50 mx-auto">
        <div className="mb-3">
          <label>Nombre:</label>
          <input
            name="name"
            className="form-control"
            onChange={handleChange}
            value={formData.name}
          />
        </div>

        <div className="mb-3">
          <label>Apellido:</label>
          <input
            name="surname" // ✅ corregido
            className="form-control"
            onChange={handleChange}
            value={formData.surname}
          />
        </div>

        <div className="mb-3">
          <label>Email:</label>
          <input
            name="email"
            type="email"
            className="form-control"
            onChange={handleChange}
            value={formData.email}
          />
        </div>

        <div className="mb-3">
          <label>Contraseña:</label>
          <input
            name="password"
            type="password"
            className="form-control"
            onChange={handleChange}
            value={formData.password}
          />
        </div>

        <button className="btn btn-success w-100" type="submit">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
