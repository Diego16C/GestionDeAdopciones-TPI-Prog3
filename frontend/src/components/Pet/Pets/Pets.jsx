import React, { useState, useMemo, useEffect } from 'react';
import PetSearch from '../petSearch/PetSearch';
import PetItem from '../petItem/PetItem';

const Pets = ({ petList, onPetDeleted }) => {
  const [search, setSearch] = useState('');
  const [shelters, setShelters] = useState([]);
  const [selectedShelter, setSelectedShelter] = useState('');

  const handleSearch = (value) => setSearch(value);

  // 🔹 Traer refugios al montar el componente
  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const res = await fetch('http://localhost:3000/shelters');
        const data = await res.json();
        setShelters(data);
      } catch (err) {
        console.error('Error cargando refugios:', err);
      }
    };
    fetchShelters();
  }, []);

  // 🔹 Filtrado de mascotas por búsqueda y refugio
  const filteredPets = useMemo(() => {
    if (!petList?.length) return [];

    return petList.filter((pet) => {
      // Filtrar por refugio si hay uno seleccionado
      if (selectedShelter && pet.shelterId !== parseInt(selectedShelter)) {
        return false;
      }

      // Filtrar por búsqueda
      if (!search) return true;

      return [pet.name, pet.species, pet.breed].some((field) =>
        field?.toLowerCase().includes(search.toLowerCase())
      );
    });
  }, [petList, search, selectedShelter]);

  return (
    <div className="d-flex flex-column align-items-center my-5">
      <div className="w-50 mb-4">
        <PetSearch onSearch={handleSearch} search={search} />
      </div>

      {/* 🔹 Filtro por refugio */}
      <div className="mb-3">
        <label>Filtrar por refugio: </label>
        <select
          value={selectedShelter}
          onChange={(e) => setSelectedShelter(e.target.value)}
        >
          <option value="">Todos</option>
          {shelters.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="d-flex flex-wrap justify-content-center gap-3">
        {!petList?.length ? (
          <p>No hay mascotas disponibles...</p>
        ) : filteredPets.length ? (
          filteredPets.map((pet) => (
            <PetItem
              key={pet.id}
              {...pet}
              onPetDeleted={onPetDeleted}
            />
          ))
        ) : (
          <p>No se encontraron mascotas</p>
        )}
      </div>
    </div>
  );
};

export default Pets;
