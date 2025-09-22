import React from 'react';
import { Form } from 'react-bootstrap';

const PetSearch = ({ search, onSearch }) => {
  const handlePetSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Buscador de mascotas</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ingresa nombre, especie o raza"
          onChange={handlePetSearch}
          value={search}
        />
      </Form.Group>
    </div>
  );
};

export default PetSearch;
