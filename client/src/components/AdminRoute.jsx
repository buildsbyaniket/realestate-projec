import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * AdminRoute protects routes that require an administrator role.
 * It verifies authentication and that `user.role` equals "admin".
 * If not authorized, redirects to the main dashboard (or login).
 */
const AdminRoute = ({ children }) => {
  const { user, token } = useContext(AuthContext);

  // Not logged in – redirect to login
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin – redirect to home (or a 403 page)
  if (user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  // Authorized – render children
  return <>{children}</>;
};

export default AdminRoute;
