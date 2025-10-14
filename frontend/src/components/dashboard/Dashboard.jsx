import { useEffect, useState } from 'react';
import NewPet from '../Pet/newPet/NewPet';
import Pets from '../Pet/Pets/Pets';
import PetDetails from '../Pet/petDetails/PetDetails';
import { Row, Button, Col } from 'react-bootstrap';
import { Routes, Route } from 'react-router';
import { useNavigate, useParams } from 'react-router';
import { getAvailablePets } from '../../services/petServices';

const EditPet = ({ petList, onPetUpdated }) => {
  const { id } = useParams();

  const petToEdit = petList.find((p) => String(p.id) === id);

  if (!petToEdit) {
    return <div>Mascota no encontrada</div>;
  }

  return <NewPet petToEdit={petToEdit} onPetAdded={onPetUpdated} />;
};

const Dashboard = () => {
  const [petList, setPetList] = useState([]);
  const navigate = useNavigate();

  const fetchPets = async () => {
    try {
      const data = await getAvailablePets();
      setPetList([...data]);
    } catch (error) {
      console.error('Error fetching pets:', error);
    }
  };
  useEffect(() => {
    fetchPets();
  }, []);

  const handleNavigateToAddPet = () => {
    navigate('/pets/add-pet');
  };

  return (
    <div>
      <Row className="align-items-center w-100 my-3">
        <Col xs={8} className="d-flex justify-content-center">
          <h2 className="m-0">Listado de Mascotas</h2>
        </Col>
        <Col xs={4} className="d-flex justify-content-end">
          <Button
            className="me-3"
            variant="dark"
            onClick={handleNavigateToAddPet}
          >
            Agregar Mascota
          </Button>
        </Col>
      </Row>

      <Routes>
        <Route
          index
          element={<Pets petList={petList} onPetDeleted={fetchPets} />}
        />
        <Route path=":id" element={<PetDetails petList={petList} />} />
        <Route path="add-pet" element={<NewPet onPetAdded={fetchPets} />} />
        <Route
          path="edit/:id"
          element={<EditPet petList={petList} onPetUpdated={fetchPets} />}
        />
      </Routes>
    </div>
  );
};

export default Dashboard;
