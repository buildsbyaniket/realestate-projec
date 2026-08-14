import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  // Persist token and user to localStorage
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [token, user]);

  const login = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      // Ensure response is JSON before parsing
      const contentType = res.headers.get('content-type') || '';
      let data;
      if (contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const text = await res.text();
        throw new Error(text || 'Login failed with non-JSON response');
      }
      if (res.ok) {
        setToken(data.token);
        setUser(data.user);
        navigate(data.redirectUrl || '/dashboard');
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate('/login');
  };

  const register = async (name, email, password) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        // automatically log in after registration
        await login(email, password);
      } else {
        throw new Error(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Register error:', err);
      throw err;
    }
  };

  // Update profile function – sends updated fields to backend and syncs AuthContext
  const updateProfile = async (profileData) => {
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
        // also persist updated user to localStorage (useEffect will handle)
        return data.user;
      } else {
        throw new Error(data.message || 'Profile update failed');
      }
    } catch (err) {
      console.error('Update profile error:', err);
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, register, updateProfile, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};
