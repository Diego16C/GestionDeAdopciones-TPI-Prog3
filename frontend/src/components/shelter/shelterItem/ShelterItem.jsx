import React from 'react';
import { Card, Button, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { deleteShelter } from '../../../services/shelterServices';
import { toast } from 'react-toastify';

const ShelterItem = ({ id, name, address, email, maxCapacity, available, onShelterDeleted }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`edit/${id}`);
    };

    const handleDelete = async () => {
        if (!window.confirm('¿Estás seguro de eliminar este refugio?')) return;
        try {
        await deleteShelter(id);
        toast.success('Refugio eliminado correctamente 🗑️', { autoClose: 2000 });
        onShelterDeleted(); // Actualiza la lista en el padre
        } catch (error) {
        console.error(error);
        toast.error('Error eliminando refugio ❌', { autoClose: 2000 });
        }
    };

    return (
        <Col>
        <Card bg="light" className="h-100">
            <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
                <strong>Dirección:</strong> {address} <br />
                <strong>Email:</strong> {email || 'No informado'} <br />
                <strong>Capacidad máxima:</strong> {maxCapacity} <br />
                <strong>Disponible:</strong> {available ? 'Sí' : 'No'}
            </Card.Text>
            <Button size="sm" variant="outline-primary" className="me-2" onClick={handleEdit}>
                Editar
            </Button>
            <Button size="sm" variant="outline-danger" onClick={handleDelete}>
                Eliminar
            </Button>
            </Card.Body>
        </Card>
        </Col>
    );
};

export default ShelterItem;
