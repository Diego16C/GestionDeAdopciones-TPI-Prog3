import React from 'react';
import { Form } from 'react-bootstrap';

const ShelterSearch = ({ search, onSearch }) => {
    return (
        <Form>
        <Form.Group controlId="shelterSearch">
            <Form.Control
            type="text"
            placeholder="Buscar refugio por nombre, ciudad o dirección..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            />
        </Form.Group>
        </Form>
    );
};

export default ShelterSearch;
