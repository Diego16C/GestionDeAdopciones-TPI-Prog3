const API_URL = 'http://localhost:3000';

export const requestAdoption = async (petId, clientId) => {
  const res = await fetch(`${API_URL}/adoptions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ petId, clientId }),
  });
  return res.json();
};
export const getAdoptionRequests = async () => {
  const res = await fetch(`${API_URL}/adoptions`);
  return res.json();
};

export const approveAdoption = async (requestId) => {
  const res = await fetch(`${API_URL}/adoptions/${requestId}/approve`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ workerId: 1, comments: 'Approved by worker' }),
  });
  return res.json();
};

export const rejectAdoption = async (requestId) => {
  const res = await fetch(`${API_URL}/adoptions/${requestId}/reject`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ workerId: 1, comments: 'Rejected by worker' }),
  });
  return res.json();
};

export const getAllUserAdoptionRequests = async (clientId) => {
  const res = await fetch(`${API_URL}/adoptions?clientId=${clientId}`);
  return res.json();
};
