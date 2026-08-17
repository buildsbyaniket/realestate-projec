// src/utils/urlHelper.js

/**
 * Returns the full URL for a given path.
 * If the path already starts with http:// or https://, returns it unchanged.
 * Otherwise, prefixes the production backend base URL (VITE_API_URL) and ensures no double slash.
 */
export const getFullUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const base = process.env.VITE_API_URL || 'https://realestate-projec-backend.onrender.com';
  return `${base.replace(/\\+$/, '')}/${path.replace(/^\\+/, '')}`;
};

/**
 * Returns a valid image URL for a property image.
 * Uses getFullUrl for absolute URLs and falls back to a local placeholder image.
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) {
    // Return null to allow caller to use its own placeholder import
    return null;
  }
  return getFullUrl(imagePath);
};
