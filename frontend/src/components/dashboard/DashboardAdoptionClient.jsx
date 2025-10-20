import { useEffect, useState } from 'react';
import NewPet from '../Pet/newPet/NewPet';
import PetsForAdoption from '../adoptions/PetsForAdoption';
import PetDetails from '../Pet/petDetails/PetDetails';
import { Row, Button, Col } from 'react-bootstrap';
import { Routes, Route } from 'react-router';
import { getInAdoptionPets } from '../../services/petServices';

const DashboardAdoptionClient = () => {
  const [petList, setPetList] = useState([]);

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
        <Col
          xs={8}
          className="d-flex justify-content-center align-items-center"
        >
          <div
            style={{ width: '100%', paddingLeft: '550px', fontSize: '40px' }}
          >
            <h2 className="text-center m-0" style={{ textAlign: 'center' }}>
              Mascotas disponibles para Adopción
            </h2>
          </div>
        </Col>
      </Row>

      <Routes>
        <Route index element={<PetsForAdoption petList={petList} />} />
        <Route
          path=":id"
          element={
            <PetDetails key="client" petList={petList} isWorkerView={false} />
          }
        />
      </Routes>
    </div>
  );
};

export default DashboardAdoptionClient;
