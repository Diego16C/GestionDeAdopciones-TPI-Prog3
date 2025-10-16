const API_URL = 'http://localhost:3000';

export const getAllShelters = async () => {
  const res = await fetch(`${API_URL}/shelters`);
  return res.json();
};

export const createShelter = async (shelterData) => {
  const res = await fetch(`${API_URL}/shelters`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(shelterData),
  });
  if (!res.ok) throw new Error('Error creating shelter');
  return res.json();
};

export const updateShelter = async (id, shelterData) => {
  const res = await fetch(`${API_URL}/shelters/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(shelterData),
  });
  if (!res.ok) throw new Error('Error updating shelter');
  return res.json();
};

export const deleteShelter = async (id) => {
  const res = await fetch(`${API_URL}/shelters/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Error deleting shelter');
  return res.json();
};
