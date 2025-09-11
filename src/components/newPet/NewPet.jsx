import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";

const NewPet = ({ onPetAdded }) => {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [available, setAvailable] = useState(true);

  // Handlers de cambios
  const handleNameChange = (event) => setName(event.target.value);
  const handleSpeciesChange = (event) => setSpecies(event.target.value);
  const handleBreedChange = (event) => setBreed(event.target.value);
  const handleAgeChange = (event) => setAge(event.target.value);
  const handleImageUrlChange = (event) => setImageUrl(event.target.value);
  const handleAvailabilityChange = (event) => setAvailable(event.target.checked);

  // Submit
  const handleAddPet = (event) => {
    event.preventDefault();

    const petData = {
      id: Date.now(), // genera un ID único
      name,
      species,
      breed,
      age: parseInt(age, 10),
      imageUrl,
      available,
    };

    onPetAdded(petData);

    // limpiar inputs
    setName("");
    setSpecies("");
    setBreed("");
    setAge("");
    setImageUrl("");
    setAvailable(true);
  };

  return (
    <Card className="m-4 d-flex justify-content-center flex-wrap" bg="success">
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
          </Row>

          <Row>
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
            <Col md={3} className="d-flex flex-column justify-content-end align-items-end">
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
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default NewPet;