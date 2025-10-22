import { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import { createUser, updateUser } from '../../services/userServices';
import { useNavigate } from 'react-router';

const roles = ['admin', 'worker', 'client'];

const NewUser = ({ onUserAdded, userToEdit }) => {
  const isEdit = Boolean(userToEdit);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: userToEdit?.name || '',
    surname: userToEdit?.surname || '',
    email: userToEdit?.email || '',
    password: '',
    role: userToEdit?.role || 'client',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await updateUser(userToEdit.id, formData);
        toast.info('Usuario actualizado con éxito!', {
          autoClose: 2000,
          onClose: () => navigate('/users'),
        });
      } else {
        await createUser(formData);
        toast.success('Usuario creado con éxito!', {
          autoClose: 2000,
          onClose: () => navigate('/users'),
        });
      }

      if (onUserAdded) onUserAdded();
    } catch (error) {
      console.error(error);
      toast.error('Error al guardar usuario');
    }
  };

  return (
    <div>
      <h2 style={{ fontSize: '30px', color: 'grey' }}>
        {isEdit ? 'Editar Usuario' : 'Agregar Usuario'}
      </h2>

      <Card className="m-4 p-4">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ingresar nombre"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              name="surname"
              type="text"
              value={formData.surname}
              onChange={handleChange}
              placeholder="Ingresar apellido"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Ingresar email"
            />
          </Form.Group>

          {!isEdit && (
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Ingresar contraseña"
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Rol</Form.Label>
            <Form.Select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-center gap-3">
            <Button variant="primary" type="submit">
              {isEdit ? 'Guardar Cambios' : 'Agregar Usuario'}
            </Button>
            <Button variant="danger" onClick={() => navigate('/users')}>
              Cancelar
            </Button>
          </div>
        </Form>
      </Card>

      <ToastContainer />
    </div>
  );
};

export default NewUser;
