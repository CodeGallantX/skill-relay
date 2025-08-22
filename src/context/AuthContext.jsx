import { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { authApi } from '../lib/api'; // Import authApi

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // Set to true initially to load user from localStorage
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    const loadUserFromLocalStorage = () => {
      try {
        const storedUser = localStorage.getItem('authUser');
        const storedToken = localStorage.getItem('authToken');
        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Failed to load user from local storage:", error);
        localStorage.removeItem('authUser');
        localStorage.removeItem('authToken');
      } finally {
        setLoading(false);
      }
    };
    loadUserFromLocalStorage();
  }, []);

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await authApi.register(userData);
      if (response.data.success) {
        setIsNewUser(true);
        toast.success(response.data.message || 'Registration successful! Please verify your email.');
        return { success: true, email: userData.email };
      }
      return { success: false };
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      const response = await authApi.login(credentials);
      if (response.data.success) {
        const { token, user } = response.data;
        localStorage.setItem('authToken', token);
        localStorage.setItem('authUser', JSON.stringify(user));
        setUser(user);
        setIsAuthenticated(true);
        setIsNewUser(false);
        toast.success('Login successful!');
        return user;
      }
      return null;
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed. Please check your credentials.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authApi.logout();
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Logged out successfully!');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error(error.response?.data?.message || 'Logout failed.');
    } finally {
      setLoading(false);
    }
  };

  const resendEmailVerification = async (email) => {
    setLoading(true);
    try {
      const response = await authApi.resendEmailVerification(email);
      if (response.data.success) {
        toast.success(response.data.message || 'Verification email sent if unverified account exists.');
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error('Resend email verification error:', error);
      toast.error(error.response?.data?.message || 'Failed to send verification email.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    try {
      const response = await authApi.forgotPassword(email);
      if (response.data.success) {
        toast.success(response.data.message || 'Password reset link sent if account exists.');
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error(error.response?.data?.message || 'Failed to send password reset link.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (data) => {
    setLoading(true);
    try {
      const response = await authApi.resetPassword(data);
      if (response.data.success) {
        toast.success(response.data.message || 'Password updated. You can login.');
        return { success: true };
      }
      return { success: false };
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error(error.response?.data?.message || 'Failed to reset password.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const completeUserOnboarding = () => {
    if (user) {
      setUser({
        ...user,
        hasCompletedOnboarding: true
      });
      localStorage.setItem('authUser', JSON.stringify({ ...user, hasCompletedOnboarding: true }));
    }
  };

  const authContextValue = {
    user,
    isAuthenticated,
    loading,
    isNewUser,
    register,
    login,
    logout,
    resendEmailVerification,
    forgotPassword,
    resetPassword,
    completeUserOnboarding
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};