import { useState, useMemo } from 'react';
import ShelterItem from '../shelters/ShelterItem';
import ShelterSearch from '../shelters/ShelterSearch';

const Shelters = ({ shelters, onShelterDeleted }) => {
  const [search, setSearch] = useState('');

  const handleSearch = (value) => setSearch(value);

  const filteredShelters = useMemo(() => {
    if (!shelters?.length) return [];

    const availableShelters = shelters.filter((shelter) => shelter.available);

    return availableShelters.filter((shelter) =>
      shelter.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [shelters, search]);

  return (
    <div className="d-flex flex-column align-items-center my-5">
      <div className="w-50 mb-4">
        <ShelterSearch onSearch={handleSearch} search={search} />
      </div>

      <div className="d-flex flex-wrap justify-content-center gap-3">
        {!shelters?.length ? (
          <p>No hay refugios disponibles...</p>
        ) : filteredShelters.length ? (
          filteredShelters.map((shelter) => (
            <ShelterItem
              key={shelter.id}
              {...shelter}
              onShelterDeleted={onShelterDeleted}
            />
          ))
        ) : (
          <p>No se encontraron refugios</p>
        )}
      </div>
    </div>
  );
};

export default Shelters;
