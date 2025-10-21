import React, { useState, useMemo } from 'react';
import PetSearch from '../Pet/petSearch/PetSearch';
import PetItem from '../Pet/petItem/PetItem';

const PetsForAdoption = ({ petList }) => {
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
          <p>No hay mascotas disponibles...</p>
        ) : filteredPets.length ? (
          filteredPets.map((pet) => <PetItem key={pet.id} {...pet} />)
        ) : (
          <p>No se encontraron mascotas</p>
        )}
      </div>
    </div>
  );
};

export default PetsForAdoption;
