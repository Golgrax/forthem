import React, { createContext, useContext, useState, useEffect } from 'react';
import { createMockUser } from '../services/mockData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto-login with demo user on mount if no user exists
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('user');
        // Auto-login with demo student
        const demoUser = createMockUser('demo', 'student');
        setUser(demoUser);
        localStorage.setItem('user', JSON.stringify(demoUser));
      }
    } else {
      // Auto-login with demo student
      const demoUser = createMockUser('demo', 'student');
      setUser(demoUser);
      localStorage.setItem('user', JSON.stringify(demoUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Auto-login with demo student after logout
    const demoUser = createMockUser('demo', 'student');
    setUser(demoUser);
    localStorage.setItem('user', JSON.stringify(demoUser));
  };

  const hasRole = (requiredRole) => {
    if (!user) return false;
    return user.role === requiredRole;
  };

  const hasAnyRole = (roles) => {
    if (!user) return false;
    return roles.includes(user.role);
  };

  const value = {
    user,
    login,
    logout,
    hasRole,
    hasAnyRole,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

