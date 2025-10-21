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

    return (
        <NewShelter
            shelterToEdit={shelterToEdit}
            onShelterAdded={onShelterUpdated}
        />
    );
};

const DashboardABMshelters = () => {
    const [shelterList, setShelterList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
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
                {/* Columna izquierda: botón Volver */}
                <Col xs={4} className="d-flex justify-content-start">
                    <Button variant="secondary" onClick={() => navigate('/worker')}>
                        Volver
                    </Button>
                </Col>

                {/* Columna central: título */}
                <Col xs={4} className="d-flex justify-content-center">
                    <h2 className="m-0">Gestión de Refugios</h2>
                </Col>

                {/* Columna derecha: botón Agregar */}
                <Col xs={4} className="d-flex justify-content-end">
                    <Button className="me-3" variant="dark" onClick={handleNavigateToAddShelter}>
                        Agregar Refugio
                    </Button>
                </Col>
            </Row>

            {/* Mensaje de feedback */}
            {message && (
                <div className="alert alert-info text-center mt-3">{message}</div>
            )}

            <h2 className="mt-4 mb-3">Listado de Refugios</h2>

            {/* Rutas anidadas */}
            <Routes>
                <Route
                    index
                    element={<Shelters shelters={shelterList} onShelterDeleted={fetchShelters} />}
                />
                <Route
                    path="add-shelter"
                    element={
                        <NewShelter
                            onShelterAdded={(s, msg) => {
                                fetchShelters();
                                setMessage(msg);
                            }}
                        />
                    }
                />
                <Route
                    path="edit/:id"
                    element={
                        <EditShelter
                            shelterList={shelterList}
                            onShelterUpdated={(s, msg) => {
                                fetchShelters();
                                setMessage(msg);
                            }}
                        />
                    }
                />
            </Routes>
        </div>
    );
};

export default DashboardABMshelters;
