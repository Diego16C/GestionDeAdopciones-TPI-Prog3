import { useEffect, useState } from 'react';
import { Row, Col, Card, Button, Form, Spinner } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NewShelters from '../newShelters/NewShelters';
import { getAllShelters, deleteShelter } from '../../../services/shelterServices';

const SheltersPage = () => {
    const [shelters, setShelters] = useState([]);
    const [search, setSearch] = useState('');
    const [showShelterForm, setShowShelterForm] = useState(false);
    const [shelterToEdit, setShelterToEdit] = useState(null);
    const [loading, setLoading] = useState(true);

    // Traer refugios
    const fetchShelters = async () => {
        try {
        const data = await getAllShelters();
        setShelters(data);
        setLoading(false);
        } catch (error) {
        console.error('Error fetching shelters:', error);
        setLoading(false);
        }
    };

    useEffect(() => {
        fetchShelters();
    }, []);

    const handleShelterAddedOrUpdated = (shelter) => {
        const index = shelters.findIndex((s) => s.id === shelter.id);
        if (index >= 0) {
        const updated = [...shelters];
        updated[index] = shelter;
        setShelters(updated);
        toast.info('Refugio actualizado correctamente ✅', { autoClose: 2000 });
        } else {
        setShelters([...shelters, shelter]);
        toast.success('Refugio agregado correctamente ✅', { autoClose: 2000 });
        }
        setShowShelterForm(false);
        setShelterToEdit(null);
    };

    const handleEditShelter = (shelter) => {
        setShelterToEdit(shelter);
        setShowShelterForm(true);
    };

    const handleDeleteShelter = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar este refugio?')) return;
        try {
        await deleteShelter(id);
        setShelters(shelters.filter((s) => s.id !== id));
        toast.success('Refugio eliminado correctamente 🗑️', { autoClose: 2000 });
        } catch (error) {
        console.error(error);
        toast.error('Error eliminando refugio ❌', { autoClose: 2000 });
        }
    };

    const filteredShelters = shelters.filter((s) =>
        s?.name?.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <Spinner animation="border" className="d-block mx-auto my-5" />;

    return (
        <div>
        <ToastContainer />

        <Row className="my-4 align-items-center">
            <Col xs={6}><h2>Refugios</h2></Col>
            <Col xs={6} className="d-flex justify-content-end">
            <Button
                variant="secondary"
                onClick={() => {
                setShowShelterForm(!showShelterForm);
                setShelterToEdit(null);
                }}
            >
                {showShelterForm ? 'Cerrar Formulario' : 'Agregar Refugio'}
            </Button>
            </Col>
        </Row>

        {showShelterForm && (
            <NewShelters
            shelterToEdit={shelterToEdit}
            onShelterAdded={handleShelterAddedOrUpdated}
            onCancel={() => {
                setShowShelterForm(false);
                setShelterToEdit(null);
            }}
            />
        )}

        <Row className="mb-3">
            <Col xs={12}>
            <Form.Control
                type="text"
                placeholder="Buscar refugio por nombre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            </Col>
        </Row>

        <Row xs={1} md={2} lg={3} className="g-3">
            {filteredShelters.map((s) => (
            <Col key={s.id}>
                <Card bg="light" className="h-100">
                <Card.Body>
                    <Card.Title>{s.name}</Card.Title>
                    <Card.Text>
                    <strong>Dirección:</strong> {s.address} <br />
                    <strong>Email:</strong> {s.email || 'No informado'} <br />
                    <strong>Capacidad máxima:</strong> {s.maxCapacity} <br />
                    <strong>Disponible:</strong> {s.available ? 'Sí' : 'No'}
                    </Card.Text>
                    <Button
                    size="sm"
                    variant="outline-primary"
                    className="me-2"
                    onClick={() => handleEditShelter(s)}
                    >
                    Editar
                    </Button>
                    <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => handleDeleteShelter(s.id)}
                    >
                    Eliminar
                    </Button>
                </Card.Body>
                </Card>
            </Col>
            ))}
        </Row>
        </div>
    );
};

export default SheltersPage;
