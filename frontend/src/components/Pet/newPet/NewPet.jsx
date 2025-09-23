import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import './newPet.css';

const NewPet = ({ onPetAdded }) => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [species, setSpecies] = useState('');
  const [age, setAge] = useState('');
  const [breed, setBreed] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [available, setAvailable] = useState(true);

  // Handlers de cambios
  const handleNameChange = (event) => setName(event.target.value);
  const handleSpeciesChange = (event) => setSpecies(event.target.value);
  const handleAgeChange = (event) => setAge(event.target.value);
  const handleBreedChange = (event) => setBreed(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);
  const handleImageUrlChange = (event) => setImageUrl(event.target.value);
  const handleAvailabilityChange = (event) =>
    setAvailable(event.target.checked);

  // Submit
  const handleAddPet = (event) => {
    event.preventDefault(); // evita que se recargue la página

    const petData = {
      name,
      species,
      age: parseInt(age, 10),
      breed,
      description,
      imageUrl,
      available,
    };

    fetch('http://localhost:3000/pet', {
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify(petData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Mascota agregada:', data);
        toast.success('Mascota agregada con éxito!');
        // limpiar inputs
        setName('');
        setSpecies('');
        setAge('');
        setBreed('');
        setDescription('');
        setImageUrl('');
        setAvailable(true);
        if (onPetAdded) onPetAdded();
      })
      .catch((error) => {
        console.error('Error agregando mascota:', error);
        toast.error('Error agregando mascota');
      });
  };

  const clickHandler = () => {
    navigate(-1);
  };

  return (
    <div>
      <h2>Agregar Mascota</h2>
      <Card
        className="m-4 d-flex justify-content-center flex-wrap"
        bg="success"
      >
        <Card.Body>
          <Form className="text-white" onSubmit={handleAddPet}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar nombre"
                    value={name}
                    onChange={handleNameChange}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="species">
                  <Form.Label>Especie</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Perro, Gato..."
                    value={species}
                    onChange={handleSpeciesChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="age">
                  <Form.Label>Edad</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Ingresar edad en años"
                    min={0}
                    value={age}
                    onChange={handleAgeChange}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="breed">
                  <Form.Label>Raza</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Labrador, Siames..."
                    value={breed}
                    onChange={handleBreedChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="justify-content-between">
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Descripcion</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar una descripción"
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </Form.Group>
            </Row>

            <Row className="justify-content-between">
              <Form.Group className="mb-3" controlId="imageUrl">
                <Form.Label>URL de imagen</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar url de imagen"
                  value={imageUrl}
                  onChange={handleImageUrlChange}
                />
              </Form.Group>
            </Row>

            <Row className="justify-content-end">
              <Col className="d-flex flex-column justify-content-end align-items-end">
                <Form.Check
                  type="switch"
                  id="available"
                  className="mb-3"
                  label="¿Disponible para adopción?"
                  checked={available}
                  onChange={handleAvailabilityChange}
                />
                <Button variant="primary" type="submit">
                  Agregar Mascota
                </Button>
                <Button variant="danger" onClick={clickHandler}>
                  Volver
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default NewPet;
