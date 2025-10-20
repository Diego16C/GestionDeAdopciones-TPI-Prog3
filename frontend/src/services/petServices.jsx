const API_URL = 'http://localhost:3000';

export const getAllPets = async () => {
  const res = await fetch(`${API_URL}/pets`);
  return res.json();
};

export const getAvailablePets = async () => {
  const res = await fetch(`${API_URL}/pets/available`);
  return res.json();
};

export const getPetById = async (id) => {
  const res = await fetch(`${API_URL}/pet/${id}`);
  return res.json();
};

export const createPet = async (petData) => {
  const res = await fetch(`${API_URL}/pet`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(petData),
  });
  return res.json();
};

export const updatePet = async (id, petData) => {
  const res = await fetch(`${API_URL}/pet/update/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(petData),
  });
  return res.json();
};

export const deletePet = async (id) => {
  const res = await fetch(`${API_URL}/pet/delete/${id}`, {
    method: 'PUT',
  });
  return res.text();
};

export const deletePetDef = async (id) => {
  const res = await fetch(`${API_URL}/pet/deleteDef/${id}`, {
    method: 'DELETE',
  });
  return res.text();
};

export const getInAdoptionPets = async () => {
  const res = await fetch(`${API_URL}/pets/in-adoption`);
  return res.json();
};
