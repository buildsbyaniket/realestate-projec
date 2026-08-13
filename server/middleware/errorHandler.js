/**
 * Centralized error handling middleware.
 * Returns errors as consistent JSON responses.
 */
export default (err, req, res, next) => {
  console.error('Server error:', err);
  const status = err.statusCode || err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ success: false, message });
};
