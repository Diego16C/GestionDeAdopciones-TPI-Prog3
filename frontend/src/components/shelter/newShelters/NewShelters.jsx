import { useState, useEffect } from 'react';
import { Card, Form, Row, Col, Button } from 'react-bootstrap';
import { createShelter, updateShelter } from '../../../services/shelterServices';
import { toast } from 'react-toastify';  // <-- importamos toast
import { useNavigate } from 'react-router';

const NewShelters = ({ onShelterAdded, shelterToEdit, onCancel }) => {
    const isEdit = Boolean(shelterToEdit);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [maxCapacity, setMaxCapacity] = useState('');
    const [available, setAvailable] = useState(true);

    useEffect(() => {
        if (shelterToEdit) {
            setName(shelterToEdit.name || '');
            setAddress(shelterToEdit.address || '');
            setEmail(shelterToEdit.email || '');
            setMaxCapacity(shelterToEdit.maxCapacity || '');
            setAvailable(shelterToEdit.available ?? true);
        } else {
            setName('');
            setAddress('');
            setEmail('');
            setMaxCapacity('');
            setAvailable(true);
        }
    }, [shelterToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const shelterData = {
                name,
                address,
                email,
                maxCapacity: Number(maxCapacity),
                available,
            };
            let savedShelter;

            if (isEdit) {
                savedShelter = await updateShelter(shelterToEdit.id, shelterData);
                toast.success('Refugio actualizado correctamente ✅', { autoClose: 3000 });
            } else {
                savedShelter = await createShelter(shelterData);
                toast.success('Refugio agregado correctamente ✅', { autoClose: 3000 });
            }

            onShelterAdded(savedShelter);
            navigate('..'); // vuelve al listado de refugios

            // Limpiar campos solo si es agregar
            if (!isEdit) {
                setName('');
                setAddress('');
                setEmail('');
                setMaxCapacity('');
                setAvailable(true);
            }

        } catch (error) {
            console.error(error);
            toast.error('Error guardando refugio ❌', { autoClose: 3000 });
        }
    };

    return (
        <Card className="mb-4">
            <Card.Body style={{ backgroundColor: '#4f8850ff', color: 'white' }}>
                <h3>{isEdit ? 'Editar Refugio' : 'Agregar Refugio'}</h3>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Dirección</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3}>
                            <Form.Group className="mb-3">
                                <Form.Label>Capacidad máxima</Form.Label>
                                <Form.Control
                                    type="number"
                                    min={1}
                                    value={maxCapacity}
                                    onChange={(e) => setMaxCapacity(e.target.value)}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col md={3} className="d-flex align-items-center">
                            <Form.Check
                                type="checkbox"
                                label="Disponible"
                                checked={available}
                                onChange={(e) => setAvailable(e.target.checked)}
                            />
                        </Col>
                    </Row>

                    <Row className="justify-content-end">
                        <Col className="d-flex gap-2 justify-content-end">
                            <Button variant="primary" type="submit">
                                {isEdit ? 'Guardar Cambios' : 'Agregar Refugio'}
                            </Button>
                            {onCancel && (
                                <Button variant="danger" type="button" onClick={onCancel}>
                                    Cancelar
                                </Button>
                            )}
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default NewShelters;
