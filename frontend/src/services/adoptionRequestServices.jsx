const API_URL = 'http://localhost:3000';

export const requestAdoption = async (petId, userId) => {
  const res = await fetch(`${API_URL}/adoptions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ petId, userId }),
  });

  if (!res.ok) throw new Error('Error al solicitar adopción');
  return res.json();
};

export const getUserAdoptions = async (userId) => {
  const res = await fetch(`${API_URL}/adoptions/user/${userId}`);
  if (!res.ok) throw new Error('Error al obtener adopciones');
  return res.json();
};

export const getPendingRequests = async () => {
  const res = await fetch(`${API_URL}/adoptions/pending`);
  if (!res.ok) throw new Error('Error al obtener solicitudes pendientes');
  return res.json();
};

export const approveAdoption = async (requestId, workerId, comments = '') => {
  const res = await fetch(`${API_URL}/adoptions/${requestId}/approve`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ workerId, comments }),
  });
  if (!res.ok) throw new Error('Error al aprobar adopción');
  return res.json();
};

export const rejectAdoption = async (requestId, workerId, comments = '') => {
  const res = await fetch(`${API_URL}/adoptions/${requestId}/reject`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ workerId, comments }),
  });
  if (!res.ok) throw new Error('Error al rechazar adopción');
  return res.json();
};
