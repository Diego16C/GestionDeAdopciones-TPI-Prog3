import { useAuth } from './useAuth';

export const useFetchAuth = () => {
  const { token } = useAuth();

  const fetchAuth = async (url, options = {}) => {
    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    };

    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(url, { ...options, headers });
    if (!res.ok) {
      const message = await res.text();
      throw new Error(message || 'Error en la solicitud');
    }
    return res.json();
  };

  return { fetchAuth };
};
