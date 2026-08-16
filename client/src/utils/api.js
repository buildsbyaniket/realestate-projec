export const apiFetch = (endpoint, options = {}) => {
  // Use VITE_API_URL if defined, otherwise fallback to the deployed backend URL.
  const base = import.meta.env.VITE_API_URL || 'https://realestate-projec-backend.onrender.com';
  const url = `${base}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  return fetch(url, {
    credentials: 'include',
    ...options,
  });
};
