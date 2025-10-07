import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { createPet, updatePet } from '../../../services/petServices';
import './newPet.css';

const speciesOptions = {
  Dog: 'dog',
  Cat: 'cat',
  Bird: 'bird',
  Fish: 'fish',
  Hamster: 'hamster',
  Rabbit: 'rabbit',
  Tortoise: 'tortoise',
  Rodent: 'rodent',
  Reptile: 'reptile',
  Horse: 'horse',
  Other: 'other',
};

const sexOptions = {
  Male: 'macho',
  Female: 'hembra',
};

const stateOptions = ['Adoptado', 'En adopcion', 'Pendiente', 'En Pausa'];

const NewPet = ({ onPetAdded, petToEdit }) => {
  const navigate = useNavigate();
  const isEdit = Boolean(petToEdit);

  // Estados iniciales
  const [name, setName] = useState(petToEdit?.name || '');
  const [species, setSpecies] = useState(petToEdit?.species || '');
  const [age, setAge] = useState(petToEdit?.age || '');
  const [breed, setBreed] = useState(petToEdit?.breed || '');
  const [sex, setSex] = useState(petToEdit?.sex || '');
  const [description, setDescription] = useState(petToEdit?.description || '');
  const [imageUrl, setImageUrl] = useState(petToEdit?.imageUrl || '');
  const [available, setAvailable] = useState(petToEdit?.available ?? true);
  const [state, setState] = useState(petToEdit?.state || 'En adopcion');

  // 🔹 Nuevos estados para refugios
  const [shelters, setShelters] = useState([]);
  const [shelterId, setShelterId] = useState(petToEdit?.shelterId || '');

  // 🔹 Cargar refugios al montar el componente
  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const res = await fetch('http://localhost:3000/shelters');
        const data = await res.json();
        setShelters(data);
      } catch (err) {
        console.error('Error cargando refugios:', err);
      }
    };
    fetchShelters();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const petData = {
      name,
      species,
      age: age ? parseInt(age) : null,
      breed,
      sex,
      description,
      imageUrl,
      available,
      shelterId, // 👈 agregamos el refugio seleccionado
      ...(isEdit && { state }),
    };

    try {
      if (isEdit) {
        await updatePet(petToEdit.id, petData);
        toast.info('Mascota actualizada con éxito!');
      } else {
        await createPet(petData);
        toast.success('Mascota agregada con éxito!');
        // Limpiar formulario
        setName('');
        setSpecies('');
        setAge('');
        setSex('');
        setBreed('');
        setDescription('');
        setImageUrl('');
        setAvailable(true);
        setShelterId('');
      }

      if (onPetAdded) onPetAdded();

      // Esperar un poco para que se vea el toast antes de navegar
      setTimeout(() => {
        navigate('/pets');
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error(isEdit ? 'Error actualizando mascota' : 'Error agregando mascota');
    }
  };

  const clickHandler = () => {
    navigate('/pets');
  };

  return (
    <div>
      <h2>{isEdit ? 'Editar Mascota' : 'Agregar Mascota'}</h2>
      <Card className="m-4 d-flex justify-content-center flex-wrap" bg="success">
        <Card.Body>
          <Form className="text-white" onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresar nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="species">
                  <Form.Label>Especie</Form.Label>
                  <Form.Select
                    value={species}
                    onChange={(e) => setSpecies(e.target.value)}
                    required
                  >
                    <option value="">Seleccionar especie</option>
                    {Object.entries(speciesOptions).map(([label, value]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </Form.Select>
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
                    onChange={(e) => setAge(e.target.value)}
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
                    onChange={(e) => setBreed(e.target.value)}
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="mb-3" controlId="sex">
                  <Form.Label>Sexo</Form.Label>
                  <Form.Select value={sex} onChange={(e) => setSex(e.target.value)}>
                    <option value="">Seleccionar sexo</option>
                    {Object.entries(sexOptions).map(([label, value]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* 🔹 Select de refugios */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="shelterId">
                  <Form.Label>Refugio</Form.Label>
                  <Form.Select
                    value={shelterId}
                    onChange={(e) => setShelterId(e.target.value)}
                    required
                  >
                    <option value="">Seleccionar refugio</option>
                    {shelters.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="justify-content-between">
              <Form.Group className="mb-3" controlId="description">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresar una descripción"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </Form.Group>
            </Row>

            {isEdit && (
              <Row className="justify-content-end">
                <Col className="d-flex flex-column justify-content-center">
                  <Form.Label>Estado de adopción:</Form.Label>
                  {stateOptions.map((option) => (
                    <Form.Check
                      type="radio"
                      id={`state-${option}`}
                      key={option}
                      name="state"
                      label={option}
                      value={option}
                      checked={state === option}
                      onChange={(e) => setState(e.target.value)}
                      className="mb-2"
                    />
                  ))}
                </Col>
              </Row>
            )}

            <Row className="justify-content-end mt-2">
              <Col className="d-flex flex-column justify-content-center align-items-center">
                <Button variant="primary" type="submit" className="mb-2">
                  {isEdit ? 'Guardar Cambios' : 'Agregar Mascota'}
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
