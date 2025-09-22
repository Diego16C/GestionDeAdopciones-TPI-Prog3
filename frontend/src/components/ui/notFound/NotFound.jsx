import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router'; // <-- corregido

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackLogin = () => {
    navigate('/pets');
  };

  return (
    <div>
      <h3>Ups! Página no encontradaaaaaa!!!!</h3>
      <Button onClick={handleBackLogin}>Volver al Inicio</Button>
      <div>
        <img
          src="https://i.pinimg.com/originals/b8/a1/1d/b8a11dffb22f55874cc0f3dc0e747bd8.gif"
          alt=""
        />
      </div>
    </div>
  );
};

export default NotFound;
