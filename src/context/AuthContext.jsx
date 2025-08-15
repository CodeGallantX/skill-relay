import { createContext, useContext, useState } from 'react';
import { toast } from 'sonner';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const register = async (userData) => {
    setLoading(true);
    try {
      // Mock registration - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Registration successful! Please verify your email.');
      return { success: true, email: userData.email };
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (credentials) => {
    setLoading(true);
    try {
      // Mock login - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: credentials.email,
        avatar: 'https://i.pravatar.cc/150?img=1'
      };
      setUser(mockUser);
      setIsAuthenticated(true);
      toast.success('Login successful!');
      return mockUser;
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser(null);
      setIsAuthenticated(false);
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error('Logout failed.');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (email, otp) => {
    setLoading(true);
    try {
      // Mock OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (otp === '123456') {
        toast.success('Email verified successfully!');
        return { success: true };
      } else {
        throw new Error('Invalid OTP');
      }
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async (email) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success('New OTP sent to your email.');
    } catch (error) {
      toast.error('Failed to send OTP.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const authContextValue = {
    user,
    isAuthenticated,
    loading,
    register,
    login,
    logout,
    verifyOTP,
    resendOTP
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