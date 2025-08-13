import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { useQueryClient, useMutation } from '@tanstack/react-query';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to save auth data to localStorage
  const saveAuthData = (token, userData) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('authUser', JSON.stringify(userData));
    setAuthToken(token);
    setUser(userData);
  };

  // Function to clear auth data from localStorage
  const clearAuthData = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    setAuthToken(null);
    setUser(null);
  };

  // For testing purposes only: set mock auth data
  const setMockAuthData = (mockUser, mockToken) => {
    saveAuthData(mockToken, mockUser);
    setInitializing(false);
  };

  // Effect to initialize auth state from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('authUser');

    if (storedToken && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setAuthToken(storedToken);
      } catch (e) {
        console.error("Failed to parse stored user data:", e);
        clearAuthData(); // Clear corrupted data
      }
    }
    setInitializing(false);
  }, []);

  const registerMutation = useMutation({
    mutationFn: async (payload) => {
      const response = await api.post('/auth/register', payload);
      return response.data;
    },
    onSuccess: async (data) => {
      toast.success(data.message || 'Registration successful!');
      saveAuthData(data.token, data.user); // Store token and user
      await queryClient.invalidateQueries({ queryKey: ['me'] });
      // No automatic redirect here, let the component handle it
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Registration failed.');
      setError(err);
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (payload) => {
      // For testing purposes: check for mock credentials
      if (payload.email === 'user@sr.com' && payload.password === 'Password123') {
        const mockUser = {
          id: 1,
          name: "John Doe",
          email: "user@sr.com",
        };
        const mockToken = "Bearer mock-token-123";
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ status: 'success', user: mockUser, token: mockToken });
          }, 500); // Simulate network delay
        });
      } else {
        const response = await api.post('/auth/login', payload);
        return response.data;
      }
    },
    onSuccess: async (data) => {
      toast.success(data.message || 'Login successful!');
      saveAuthData(data.token, data.user); // Store token and user
      await queryClient.invalidateQueries({ queryKey: ['me'] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Login failed.');
      setError(err);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      // Assuming backend has a logout endpoint that invalidates the token
      // If not, simply clear client-side data
      try {
        await api.post('/auth/logout'); // Example logout endpoint
      } catch (err) {
        console.warn("Logout API call failed, but clearing client-side data:", err);
      }
    },
    onSuccess: () => {
      toast.success('Logged out successfully!');
      clearAuthData();
      queryClient.clear(); // Clear all query cache on logout
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Logout failed.');
      setError(err);
    },
  });

  const verifyEmailMutation = useMutation({
    mutationFn: async (payload) => {
      const response = await api.post('/auth/verify-email', payload);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Email verified successfully!');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Email verification failed.');
      setError(err);
    },
  });

  const resendOtpMutation = useMutation({
    mutationFn: async (payload) => {
      const response = await api.post('/auth/resend-otp', payload);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'OTP sent to your email.');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to send OTP.');
      setError(err);
    },
  });

  const requestPasswordResetMutation = useMutation({
    mutationFn: async (email) => {
      const response = await api.post('/auth/password/email', { email });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Password reset link sent!');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to send password reset link.');
      setError(err);
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (payload) => {
      const response = await api.post('/auth/password/reset', payload);
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message || 'Password has been reset!');
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Failed to reset password.');
      setError(err);
    },
  });

  const authContextValue = {
    user,
    authToken,
    isAuthenticated: !!user && !!authToken,
    initializing,
    loading: registerMutation.isPending || loginMutation.isPending || logoutMutation.isPending || verifyEmailMutation.isPending || resendOtpMutation.isPending || requestPasswordResetMutation.isPending || resetPasswordMutation.isPending,
    error,
    register: registerMutation.mutateAsync,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    verifyEmail: verifyEmailMutation.mutateAsync,
    resendOtp: resendOtpMutation.mutateAsync,
    requestPasswordReset: requestPasswordResetMutation.mutateAsync,
    resetPassword: resetPasswordMutation.mutateAsync,
    setMockAuthData, // Expose for testing
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