import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import NewPet from '../Pet/newPet/NewPet';
import PetsForAdoption from '../adoptions/PetsForAdoption';
import PetDetails from '../Pet/petDetails/PetDetails';
import { Row, Button, Col } from 'react-bootstrap';
import { Routes, Route } from 'react-router';
import { getInAdoptionPets } from '../../services/petServices';

const DashboardAdoptionClient = () => {
  const [petList, setPetList] = useState([]);
  const navigate = useNavigate();

  const fetchPets = async () => {
    try {
      const data = await getInAdoptionPets();
      setPetList([...data]);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  return (
    <div>
      <Row className="align-items-center w-100 my-3">
        <Col xs="auto" className="d-flex justify-content-start">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Volver
          </Button>
        </Col>
        <Col className="d-flex justify-content-center">
          <h2 className="m-0">Mascotas disponibles para Adopción</h2>
        </Col>
        <Col xs="auto"></Col>
      </Row>
      <Routes>
        <Route index element={<PetsForAdoption petList={petList} />} />
        <Route
          path=":id"
          element={<PetDetails key="client" petList={petList} />}
        />
      </Routes>
    </div>
  );
};

export default DashboardAdoptionClient;
