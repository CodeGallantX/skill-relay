import React, { createContext, useContext, useState, useEffect } from 'react';
import { signIn as apiSignIn, signUp as apiSignUp } from '../lib/authApi';
import { toast } from 'sonner';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for a stored session (e.g., from localStorage)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (credentials) => {
    try {
      const response = await apiSignIn(credentials);
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      toast.success(response.message || 'Signed in successfully!');
      return response.user;
    } catch (error) {
      toast.error(error.message || 'Sign in failed.');
      throw error;
    }
  };

  const signUp = async (userData) => {
    try {
      const response = await apiSignUp(userData);
      setUser(response.user);
      localStorage.setItem('user', JSON.stringify(response.user));
      toast.success(response.message || 'Signed up successfully!');
      return response.user;
    } catch (error) {
      toast.error(error.message || 'Sign up failed.');
      throw error;
    }
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.info('Signed out.');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading authentication...</div>; // Or a proper loading spinner
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
