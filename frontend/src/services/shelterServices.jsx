const API_URL = 'http://localhost:3000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token
    ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    : { 'Content-Type': 'application/json' };
};

export const getAllShelters = async () => {
  const res = await fetch(`${API_URL}/shelters`, {
    headers: getAuthHeaders(),
  });
  return res.json();
};

export const getAvailableShelters = async () => {
  const res = await fetch(`${API_URL}/shelters/available`, {
    headers: getAuthHeaders(),
  });
  return res.json();
};

export const createShelter = async (shelterData) => {
  const res = await fetch(`${API_URL}/shelters`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(shelterData),
  });
  if (!res.ok) throw new Error('Error creating shelter');
  return res.json();
};

export const updateShelter = async (id, shelterData) => {
  const res = await fetch(`${API_URL}/shelters/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(shelterData),
  });
  if (!res.ok) throw new Error('Error updating shelter');
  return res.json();
};

export const deleteShelter = async (id) => {
  const res = await fetch(`${API_URL}/shelters/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error deleting shelter');
  return res.json();
};
