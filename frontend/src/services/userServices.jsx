const API_URL = 'http://localhost:3000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token
    ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    : { 'Content-Type': 'application/json' };
};

export const fetchUsers = async () => {
  const res = await fetch(`${API_URL}/users`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al obtener usuarios');
  return res.json();
};

export const createUser = async (userData) => {
  const res = await fetch(`${API_URL}/user`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error('Error al crear usuario');
  return res.json();
};

export const updateUser = async (id, userData) => {
  const res = await fetch(`${API_URL}/user/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error('Error al actualizar usuario');
  return res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${API_URL}/user/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error('Error al eliminar usuario');
  return res.json();
};
