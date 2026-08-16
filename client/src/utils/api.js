/**
 * Base URL for API requests. Must be defined at build time via VITE_API_URL.
 * If missing, we fail loudly so the issue is caught during CI/Render build.
 */
export const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  // Throw during module evaluation – the build will abort, making the problem obvious.
  throw new Error(
    '[api.js] VITE_API_URL is not defined. Ensure it is set in `.env.production` and in the Render build environment.'
  );
}

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
