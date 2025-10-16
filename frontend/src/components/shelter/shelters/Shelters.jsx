import { Card, Button, Col, Row } from "react-bootstrap";

const Shelters = ({ shelters, onEdit, onDelete }) => {
    return (
        <Row xs={1} md={2} lg={3} className="g-3">
        {shelters.map((s) => (
            <Col key={s.id}>
            <Card bg="light" className="h-100">
                <Card.Body>
                <Card.Title>{s.name}</Card.Title>
                <Card.Text>
                    <strong>Dirección:</strong> {s.address} <br />
                    <strong>Email:</strong> {s.email || "No informado"} <br />
                    <strong>Capacidad:</strong> {s.maxCapacity} <br />
                    <strong>Disponible:</strong> {s.available ? "Sí" : "No"}
                </Card.Text>
                <Button size="sm" variant="outline-primary" onClick={() => onEdit(s)}>
                    Editar
                </Button>{" "}
                <Button size="sm" variant="outline-danger" onClick={() => onDelete(s.id)}>
                    Eliminar
                </Button>
                </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>
    );
};

export default Shelters;
