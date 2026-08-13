import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * ProtectedRoute wraps routes that require authentication.
 * If the user is not logged in, they are redirected to the login page.
 */
const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  // If token is missing, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise render the protected component tree
  return <>{children}</>;
};

export default ProtectedRoute;
