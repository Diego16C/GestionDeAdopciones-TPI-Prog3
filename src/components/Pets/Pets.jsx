import React, { useState } from 'react'
import "./pets.css"; // si querés darle estilos separados

const Pets = ({ pets }) => {
  return (
    <div className="pets-grid">
      {pets && pets.length > 0 ? (
        pets.map((pet) => (
          <div key={pet.id} className="pet-card">
            <h3>{pet.name}</h3>
            <p><strong>Especie:</strong> {pet.species}</p>
            <p><strong>Raza:</strong> {pet.breed}</p>
            <p><strong>Edad:</strong> {pet.age} años</p>
            <p className={pet.available ? "disponible" : "adoptado"}>
              {pet.available ? "Disponible" : "Adoptado"}
            </p>
          </div>
        ))
      ) : (
        <p>No hay mascotas cargadas</p>
      )}
    </div>
  );
};

export default Pets;