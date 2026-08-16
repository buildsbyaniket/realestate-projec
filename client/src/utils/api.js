export const apiFetch = (endpoint, options = {}) => {
  // Use the VITE_API_URL environment variable when defined. In development you can set it to your local backend (e.g. http://localhost:5000).
  // In production the variable is injected during the Vite build, so the request will be sent to the Render backend.
  const base = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://realestate-projec-backend.onrender.com' : '');
  const url = `${base}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  return fetch(url, {
    credentials: 'include',
    ...options,
  });
};
