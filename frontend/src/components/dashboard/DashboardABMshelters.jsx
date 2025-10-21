import { useEffect, useState } from 'react';
import { Row, Col, Button, Spinner } from 'react-bootstrap';
import { useNavigate, Routes, Route, useParams } from 'react-router';
import Shelters from '../shelter/Shelters/Shelters';
import NewShelter from '../shelter/newShelters/NewShelters';
import { getAllShelters } from '../../services/shelterServices';

const EditShelter = ({ shelterList, onShelterUpdated }) => {
    const { id } = useParams();

    if (!shelterList || shelterList.length === 0)
        return <Spinner animation="border" className="d-block mx-auto my-5" />;

    const shelterToEdit = shelterList.find((s) => String(s.id) === id);
    if (!shelterToEdit) return <div>Refugio no encontrado</div>;

    return <NewShelter shelterToEdit={shelterToEdit} onShelterAdded={onShelterUpdated} />;
};

const DashboardABMshelters = () => {
    const [shelterList, setShelterList] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchShelters = async () => {
        try {
            const data = await getAllShelters();
            setShelterList(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching shelters:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (shelterList.length === 0) {
            fetchShelters();
        } else {
            setLoading(false);
        }
    }, [shelterList]);

    const handleNavigateToAddShelter = () => {
        navigate('add-shelter');
    };

    if (loading) return <Spinner animation="border" className="d-block mx-auto my-5" />;

    return (
        <div>
            {/* Título y botones */}
            <Row className="align-items-center w-100 my-3">
                <Col xs={8} className="d-flex justify-content-center align-items-center">
                    <div style={{ width: '100%', paddingLeft: '550px', fontSize: '40px' }}>
                        <h2 className="text-center m-0">Gestión de Refugios</h2>
                    </div>
                </Col>
                <Col xs={4} className="d-flex justify-content-end align-items-center">
                    <Button className="me-3" variant="dark" onClick={handleNavigateToAddShelter}>
                        Agregar Refugio
                    </Button>
                    <Button variant="secondary" onClick={() => navigate('/pets')}>
                        Mascotas
                    </Button>
                </Col>
            </Row>

            <h2 className="mt-4 mb-3">Listado de Refugios</h2>

            {/* Rutas anidadas */}
            <Routes>
                <Route
                    index
                    element={<Shelters shelters={shelterList} onShelterDeleted={fetchShelters} />}
                />
                <Route
                    path=":id"
                    element={<ShelterDetails key="shelter" shelterList={shelterList} />}
                />
                <Route
                    path="add-shelter"
                    element={<NewShelter onShelterAdded={fetchShelters} />}
                />
                <Route
                    path="edit/:id"
                    element={<EditShelter shelterList={shelterList} onShelterUpdated={fetchShelters} />}
                />
            </Routes>
        </div>
    );
};

export default DashboardABMshelters;
