import { useState } from "react";
import { Button, Card, Col, Form, FormGroup, Row } from "react-bootstrap";
import { useNavigate } from "react-router";

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // 👈 por defecto usuario normal
  const [errors, setErrors] = useState({ email: false, password: false });

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: false });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: false });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.length) {
      setErrors({ ...errors, email: true });
      alert("Email vacío");
      return;
    } else if (!password.length || password.length < 6) {
      setErrors({ ...errors, password: true });
      alert("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    if (storedUsers.some((user) => user.email === email)) {
    alert("Ya existe un usuario registrado con ese email");
    return;
    }

    // Armamos el objeto usuario
    const newUser = { email, password, role };
    storedUsers.push(newUser);

    alert(`Usuario registrado: ${email} con rol ${role}`);
    setEmail("");
    setPassword("");
    setRole("user");

    // lo podemos redirigir al login
    navigate("/login");
  };

  return (
    <Card className="mt-5 mx-3 p-3 px-5 shadow">
      <Card.Body>
        <Row className="mb-2">
          <h5>Registro de Usuario</h5>
        </Row>
        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-4">
            <Form.Control
              type="email"
              placeholder="Ingresar email"
              onChange={handleEmailChange}
              value={email}
              className={errors.email && "border border-danger"}
            />
          </FormGroup>
          <FormGroup className="mb-4">
            <Form.Control
              type="password"
              placeholder="Ingresar contraseña"
              onChange={handlePasswordChange}
              value={password}
              className={errors.password && "border border-danger"}
            />
          </FormGroup>
          <FormGroup className="mb-4">
            <Form.Label>Rol de usuario</Form.Label>
            <Form.Select value={role} onChange={handleRoleChange}>
              <option value="superadmin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="user">Usuario normal</option>
            </Form.Select>
          </FormGroup>
          <Row>
            <Col />
            <Col md={6} className="d-flex justify-content-end">
              <Button variant="success" type="submit">
                Registrarse
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Register;