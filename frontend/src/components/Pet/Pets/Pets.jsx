import React, { useState } from 'react';
import PetSearch from '../petSearch/PetSearch';
import PetItem from '../petItem/PetItem';

const Pets = ({ petList }) => {
  const [search, setSearch] = useState('');

  const handleSearch = (value) => {
    setSearch(value);
  };

  const filteredPets = petList.filter((pet) => {
    if (!search) return true;
    return (
      pet.name.toLowerCase().includes(search.toLowerCase()) ||
      pet.species.toLowerCase().includes(search.toLowerCase()) ||
      pet.breed.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="d-flex justify-content-center flex-wrap my-5">
      <div className="container w-50 d-flex justify-content-center flex-wrap">
        <PetSearch onSearch={handleSearch} search={search} />
      </div>

      <div className="container d-flex justify-content-center flex-wrap">
        {filteredPets.length ? (
          filteredPets.map((pet) => (
            <PetItem
              key={pet.id}
              id={pet.id}
              name={pet.name}
              species={pet.species}
              age={pet.age}
              breed={pet.breed}
              description={pet.description}
              imageUrl={pet.imageUrl}
              available={pet.available}
              state={pet.state}
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
