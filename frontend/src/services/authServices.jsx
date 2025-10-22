const API_URL = 'http://localhost:3000';

export const registerUser = async (userData) => {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });

  const data = await res.json();

  if (!res.ok) {
    const message =
      data.errors?.join(' | ') ||
      data.message ||
      'Error desconocido al registrarse';
    throw new Error(message);
  }

  return data;
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || 'Error al iniciar sesión');

  return data;
};
