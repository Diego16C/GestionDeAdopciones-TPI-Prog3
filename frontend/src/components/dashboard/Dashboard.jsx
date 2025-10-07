import { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Routes, Route, useNavigate, useParams } from "react-router";
import NewPet from "../Pet/newPet/NewPet";
import NewShelter from "../newShelter/NewShelter";
import Pets from "../Pet/Pets/Pets";
import PetDetails from "../Pet/petDetails/PetDetails";
import { getAvailablePets } from "../../services/petServices";

const EditPet = ({ petList, onPetUpdated }) => {
  const { id } = useParams();
  const petToEdit = petList.find((p) => String(p.id) === id);

  if (!petToEdit) return <div>Mascota no encontrada</div>;

  return <NewPet petToEdit={petToEdit} onPetAdded={onPetUpdated} />;
};

const Dashboard = () => {
  const [petList, setPetList] = useState([]);
  const [showPetForm, setShowPetForm] = useState(false);
  const [showShelterForm, setShowShelterForm] = useState(false);
  const navigate = useNavigate();

  const fetchPets = async () => {
    try {
      const data = await getAvailablePets();
      setPetList([...data]);
    } catch (error) {
      console.error("Error fetching pets:", error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const togglePetForm = () => {
    setShowPetForm(!showPetForm);
    if (showShelterForm) setShowShelterForm(false);
  };

  const toggleShelterForm = () => {
    setShowShelterForm(!showShelterForm);
    if (showPetForm) setShowPetForm(false);
  };

  return (
    <div className="dashboard-container">
      {/* Botones para mostrar formularios */}
      <Row className="w-100 my-3 align-items-center">
        <Col>
          <Button variant="dark" className="me-2" onClick={togglePetForm}>
            {showPetForm ? "Cerrar Formulario Mascota" : "Agregar Mascota"}
          </Button>
          <Button variant="success" onClick={toggleShelterForm}>
            {showShelterForm ? "Cerrar Formulario Refugio" : "Agregar Refugio"}
          </Button>
        </Col>
      </Row>

      {/* Formularios */}
      {showPetForm && <NewPet onPetAdded={fetchPets} />}
      {showShelterForm && <NewShelter onShelterAdded={() => setShowShelterForm(false)} />}

      <h2 className="mt-4 mb-3">Listado de Mascotas</h2>

      {/* Rutas anidadas */}
      <Routes>
        <Route
          index
          element={<Pets petList={petList} onPetDeleted={fetchPets} />}
        />
        <Route path=":id" element={<PetDetails petList={petList} />} />
        <Route path="edit/:id" element={<EditPet petList={petList} onPetUpdated={fetchPets} />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
