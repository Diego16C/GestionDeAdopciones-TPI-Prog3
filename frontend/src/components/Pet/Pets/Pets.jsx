import React, { useState, useMemo } from 'react';
import PetSearch from '../petSearch/PetSearch';
import PetItem from '../petItem/PetItem';

const Pets = ({ petList }) => {
  const [search, setSearch] = useState('');

  const handleSearch = (value) => setSearch(value);

  const filteredPets = useMemo(() => {
    if (!petList?.length) return [];
    if (!search) return petList;

    return petList.filter((pet) =>
      [pet.name, pet.species, pet.breed].some((field) =>
        field?.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [petList, search]);

  return (
    <div className="d-flex flex-column align-items-center my-5">
      <div className="w-50 mb-4">
        <PetSearch onSearch={handleSearch} search={search} />
      </div>

      <div className="d-flex flex-wrap justify-content-center gap-3">
        {!petList?.length ? (
          <p>Cargando mascotas...</p>
        ) : filteredPets.length ? (
          filteredPets.map((pet) => (
            <PetItem
              key={pet.id}
              {...pet} // pasa todas las props directamente
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
