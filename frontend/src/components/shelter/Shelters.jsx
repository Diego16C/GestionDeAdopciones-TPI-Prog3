// src/components/shelter/Shelters.jsx
import { useState, useEffect } from "react";
import NewShelter from "../newShelter/NewShelter";
import { getShelters } from "../../services/shelterServices";
import { Card, Row, Col } from "react-bootstrap";
import "./shelters.css";

const Shelters = () => {
    const [shelters, setShelters] = useState([]);

    const fetchShelters = async () => {
        const data = await getShelters();
        setShelters(data);
    };

    useEffect(() => {
        fetchShelters();
    }, []);

    return (
        <div className="shelters-container">
        <h1 className="mb-4">Refugios</h1>

        {/* Formulario para crear refugio */}
        <NewShelter onShelterAdded={fetchShelters} />

        {/* Lista de refugios */}
        <Row className="mt-4">
            {shelters.length === 0 ? (
            <p>No hay refugios creados aún.</p>
            ) : (
            shelters.map((shelter) => (
                <Col key={shelter.id} md={4} className="mb-3">
                <Card className="shelter-card p-3">
                    <h5>{shelter.name}</h5>
                    <p>Dirección: {shelter.address}</p>
                    {shelter.email && <p>Email: {shelter.email}</p>}
                    <p>Capacidad máxima: {shelter.maxCapacity}</p>
                    <p>Disponible: {shelter.available ? "Sí" : "No"}</p>
                </Card>
                </Col>
            ))
            )}
        </Row>
        </div>
    );
};

export default Shelters;
