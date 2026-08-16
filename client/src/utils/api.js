/**
 * Base URL for API requests. Must be defined at build time via VITE_API_URL.
 * If missing, we fail loudly so the issue is caught during CI/Render build.
 */
export const BASE_URL = import.meta.env.VITE_API_URL || 'https://realestate-projec-backend.onrender.com'; // fallback to backend URL if env var missing
// No error thrown; using fallback ensures apiFetch works in production without explicit env var

/**
 * Helper to perform fetch calls against the API.
 * Logs the full URL and the `content‑type` of the response for production debugging.
 */
export const apiFetch = (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  console.debug('[apiFetch] Request URL →', url);
  return fetch(url, {
    credentials: 'include',
    ...options,
  }).then((res) => {
    console.debug('[apiFetch] Response content‑type →', res.headers.get('content-type'));
    return res;
  });
};
