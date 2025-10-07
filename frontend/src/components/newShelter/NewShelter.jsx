// src/components/shelter/NewShelter.jsx
import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createShelter } from "../../services/shelterServices";
import "./newShelter.css";

const NewShelter = ({ onShelterAdded }) => {
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [maxCapacity, setMaxCapacity] = useState("");
    const [available, setAvailable] = useState(true);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const shelterData = { name, address, email, maxCapacity: Number(maxCapacity), available };
        await createShelter(shelterData);
        toast.success("Refugio creado con éxito!");

        // limpiar form
        setName("");
        setAddress("");
        setEmail("");
        setMaxCapacity("");
        setAvailable(true);

        if (onShelterAdded) onShelterAdded();
        } catch (error) {
        console.error(error);
        toast.error("Error creando refugio");
        }
    };

    return (
        <Card className="m-4 p-4 shelter-card">
        <h2>Agregar Refugio</h2>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre del refugio"
                required
            />
            </Form.Group>

            <Form.Group className="mb-3" controlId="address">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Dirección"
                required
            />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            </Form.Group>

            <Form.Group className="mb-3" controlId="maxCapacity">
            <Form.Label>Capacidad máxima</Form.Label>
            <Form.Control
                type="number"
                value={maxCapacity}
                onChange={(e) => setMaxCapacity(e.target.value)}
                placeholder="Número máximo de mascotas"
                required
            />
            </Form.Group>

            <Form.Group className="mb-3" controlId="available">
            <Form.Check
                type="checkbox"
                label="Disponible"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
            />
            </Form.Group>

            <Button variant="success" type="submit">
            Crear Refugio
            </Button>
        </Form>
        <ToastContainer position="top-right" autoClose={2000} />
        </Card>
    );
};

export default NewShelter;
