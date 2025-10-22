const API_URL = 'http://localhost:3000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token
    ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    : { 'Content-Type': 'application/json' };
};

export const getAllPets = async () => {
  const res = await fetch(`${API_URL}/pets`, {
    headers: getAuthHeaders(),
  });
  return res.json();
};

export const getAvailablePets = async () => {
  const res = await fetch(`${API_URL}/pets/available`, {
    headers: getAuthHeaders(),
  });
  return res.json();
};

export const getPetById = async (id) => {
  const res = await fetch(`${API_URL}/pet/${id}`, {
    headers: getAuthHeaders(),
  });
  return res.json();
};

export const createPet = async (petData) => {
  const res = await fetch(`${API_URL}/pet`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(petData),
  });
  return res.json();
};

export const updatePet = async (id, petData) => {
  const res = await fetch(`${API_URL}/pet/update/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(petData),
  });
  return res.json();
};

export const deletePet = async (id) => {
  const res = await fetch(`${API_URL}/pet/delete/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
  });
  return res.text();
};

export const deletePetDef = async (id) => {
  const res = await fetch(`${API_URL}/pet/deleteDef/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return res.text();
};

export const getInAdoptionPets = async () => {
  const res = await fetch(`${API_URL}/pets/in-adoption`);
  return res.json();
};
