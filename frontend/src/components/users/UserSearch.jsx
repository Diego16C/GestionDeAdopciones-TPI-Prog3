import React from 'react';
import { Form } from 'react-bootstrap';

const UserSearch = ({ search, onSearch }) => {
  const handleUserSearch = (event) => {
    onSearch(event.target.value);
  };

  return (
    <div>
      <Form.Group className="mb-3">
        <Form.Label>Buscar usuario</Form.Label>
        <Form.Control
          type="text"
          placeholder="Buscar por nombre, apellido o email"
          onChange={handleUserSearch}
          value={search}
        />
      </Form.Group>
    </div>
  );
};

export default UserSearch;