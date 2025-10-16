import { useEffect, useState } from 'react';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { useNavigate, Routes, Route } from 'react-router';
import Pets from '../Pet/Pets/Pets';
import NewPet from '../Pet/newPet/NewPet';
import PetDetails from '../Pet/petDetails/PetDetails';
import { getAvailablePets } from '../../services/petServices';
import { useParams } from 'react-router';
import NewShelter from '../shelter/newShelters/NewShelters'; 

const EditPet = ({ petList, onPetUpdated }) => {
  const { id } = useParams();
  if (!petList || petList.length === 0) return <Spinner animation="border" className="d-block mx-auto my-5" />;

  const petToEdit = petList.find((p) => String(p.id) === id);

  if (!petToEdit) return <div>Mascota no encontrada</div>;

  return <NewPet petToEdit={petToEdit} onPetAdded={onPetUpdated} />;
};

const Dashboard = () => {
  const [petList, setPetList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPetForm, setShowPetForm] = useState(false); 
  const [showShelterForm, setShowShelterForm] = useState(false); 
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
    if (petList.length === 0) {
      fetchPets();
    } else {
      setLoading(false);
    }
  }, [petList]);

  if (loading) return <Spinner animation="border" className="d-block mx-auto my-5" />;

  return (
    <div>
      <Row className="align-items-center w-100 my-3">
        <Col xs={6}><h2>Listado de Mascotas</h2></Col>
        <Col xs={6} className="d-flex justify-content-end gap-2">
          <Button variant="dark" onClick={() => navigate('/pets/add-pet')}>
            Agregar Mascota
          </Button>
          <Button variant="secondary" onClick={() => navigate('/shelters')}>
            Refugios
          </Button>
        </Col>
      </Row>

      {/* Formularios */}
      {showPetForm && <NewPet onPetAdded={fetchPets} />}
      {showShelterForm && <NewShelter onShelterAdded={() => setShowShelterForm(false)} />}

      <h2 className="mt-4 mb-3">Listado de Mascotas</h2>

      {/* Rutas anidadas */}
      <Routes>
        <Route index element={<Pets petList={petList} onPetDeleted={fetchPets} />} />
        <Route path=":id" element={<PetDetails petList={petList} />} />
        <Route path="add-pet" element={<NewPet onPetAdded={fetchPets} />} />
        <Route path="edit/:id" element={<EditPet petList={petList} onPetUpdated={fetchPets} />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
