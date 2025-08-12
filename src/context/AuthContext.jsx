import React, { createContext, useState, useEffect } from 'react';
import { authApi } from '../lib/api';
import { toast } from 'sonner';
import { socketManager } from '../lib/socket';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await authApi.login(credentials);
      if (response.success) {
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        toast.success(response.message);
        return response.user;
      }
    } catch (error) {
      toast.error(error.message || 'Login failed');
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const response = await authApi.register(userData);
      if (response.success) {
        setUser(response.user);
        setToken(response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        toast.success(response.message);
        return response.user;
      }
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      socketManager.disconnect();
      toast.info('Logged out successfully');
    }
  };

  const resetPassword = async (email) => {
    try {
      const response = await authApi.resetPassword(email);
      toast.success(response.message);
      return response;
    } catch (error) {
      toast.error(error.message || 'Password reset failed');
      throw error;
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      const response = await authApi.verifyOTP(email, otp);
      if (response.success) {
        setToken(response.token);
        localStorage.setItem('token', response.token);
        toast.success(response.message);
        return response;
      }
    } catch (error) {
      toast.error(error.message || 'OTP verification failed');
      throw error;
    }
  };

  const updateUser = (userData) => {
    setUser(null);
    setUser(prev => ({ ...prev, ...userData }));
    localStorage.setItem('user', JSON.stringify({ ...user, ...userData }));
  };

  const value = {
    user,
    token,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
    resetPassword,
    verifyOTP,
    updateUser,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

