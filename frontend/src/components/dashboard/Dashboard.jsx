import { useEffect, useState } from 'react';
import NewPet from '../Pet/newPet/NewPet';
import Pets from '../Pet/Pets/Pets';
import PetDetails from '../Pet/petDetails/PetDetails';
import { Row, Button, Col } from 'react-bootstrap';
import { Routes, Route } from 'react-router';
import { useNavigate } from 'react-router';

const Dashboard = () => {
  const [petList, setPetList] = useState([]);
  const navigate = useNavigate();

  // Función para GET de mascotas
  const fetchPets = () => {
    fetch('http://localhost:3000/pets')
      .then((response) => response.json())
      .then((data) => setPetList([...data]))
      .catch((error) => console.error('Error fetching pets:', error));
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleNavigateToAddPet = () => {
    navigate('/pets/add-pet');
  };

  return (
    <div>
      <Row className="w-100 my-3">
        <Col />
        <Col>
          <Button
            className="me-3"
            variant="dark"
            onClick={handleNavigateToAddPet}
          >
            Agregar Mascota
          </Button>
        </Col>
      </Row>
      <h1>Adopcion de animales</h1>
      <Routes>
        <Route index element={<Pets petList={petList} />} />
        <Route path=":id" element={<PetDetails petList={petList} />} />
        <Route path="add-pet" element={<NewPet onPetAdded={fetchPets} />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
