import { useEffect, useState } from 'react';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { useNavigate, Routes, Route, useParams } from 'react-router';
import Pets from '../Pet/Pets/Pets';
import NewPet from '../Pet/newPet/NewPet';
import PetDetails from '../Pet/petDetails/PetDetails';
import { getAvailablePets } from '../../services/petServices';

const EditPet = ({ petList, onPetUpdated }) => {
  const { id } = useParams();
  if (!petList || petList.length === 0) return <Spinner animation="border" className="d-block mx-auto my-5" />;

  const petToEdit = petList.find((p) => String(p.id) === id);
  if (!petToEdit) return <div>Mascota no encontrada</div>;

  return <NewPet petToEdit={petToEdit} onPetAdded={onPetUpdated} />;
};

const DashboardABMpets = () => {
  const [petList, setPetList] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPets = async () => {
    try {
      const data = await getAvailablePets();
      setPetList(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pets:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleNavigateToAddPet = () => {
    navigate('add-pet'); 
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto my-5" />;

  return (
    <div>
      <Row className="align-items-center w-100 my-3">
        <Col xs={1} className="d-flex justify-content-start">
          <Button variant="secondary" onClick={() => navigate('/worker')}>
            Volver
          </Button>
        </Col>
        <Col xs={10} className="d-flex justify-content-center align-items-center">
          <h2 className="text-center m-0">Gestión de Mascotas</h2>
        </Col>
        <Col xs={1} className="d-flex justify-content-end">
          <Button variant="dark" onClick={handleNavigateToAddPet}>
            Agregar Mascota
          </Button>
        </Col>
      </Row>

      <h2 className="mt-4 mb-3">Listado de Mascotas</h2>

      <Routes>
        <Route index element={<Pets petList={petList} onPetDeleted={fetchPets} />} />
        <Route path=":id" element={<PetDetails key="worker" petList={petList} isWorkerView={true} />} />
        <Route path="add-pet" element={<NewPet onPetAdded={fetchPets} />} />
        <Route path="edit/:id" element={<EditPet petList={petList} onPetUpdated={fetchPets} />} />
      </Routes>
    </div>
  );
};

export default DashboardABMpets;
