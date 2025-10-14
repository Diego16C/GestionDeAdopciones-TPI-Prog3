const API_URL = 'http://localhost:3000';

export const getAllShelters = async () => {
  const res = await fetch(`${API_URL}/shelters`);
  return res.json();
};

export const getAvailableShelters = async () => {
  const res = await fetch(`${API_URL}/shelters/available`);
  return res.json();
};
