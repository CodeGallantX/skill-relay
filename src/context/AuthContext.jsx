import { createContext, useContext, useState, useEffect } from 'react';
import { api, authApi } from '@/lib/api';
import { toast } from 'sonner';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch current user on app mount
  const { data: fetchedUser, isLoading: isFetchingUser } = useQuery({
    queryKey: ['me'],
    queryFn: async () => {
      try {
        const response = await api.get('/auth/user');
        return response.data.user;
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setUser(null);
          return null;
        }
        throw err;
      }
    },
    onSuccess: (data) => {
      setUser(data);
      setInitializing(false);
    },
    onError: (err) => {
      setError(err);
      setInitializing(false);
    },
    retry: false,
  });

  useEffect(() => {
    if (!isFetchingUser && fetchedUser !== undefined) {
      setUser(fetchedUser);
    }
  }, [isFetchingUser, fetchedUser]);

  const registerMutation = useMutation({
    mutationFn: async (payload) => {
      const response = await api.post('/auth/register', payload);
      return response.data;
    },
    onSuccess: async (data) => {
      toast.success(data.message || 'Registration successful!');
      // Optionally auto-login after registration if backend supports it
      // For now, we'll just refetch user to see if they are logged in
      await queryClient.invalidateQueries({ queryKey: ['me'] });
      await queryClient.refetchQueries({ queryKey: ['me'] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Registration failed.');
      setError(err);
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (payload) => {
      const response = await api.post('/auth/login', payload);
      return response.data;
    },
    onSuccess: async (data) => {
      toast.success(data.message || 'Login successful!');
      await queryClient.invalidateQueries({ queryKey: ['me'] });
      await queryClient.refetchQueries({ queryKey: ['me'] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Login failed.');
      setError(err);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout');
    },
    onSuccess: async (data) => {
      toast.success(data?.message || 'Logged out successfully!');
      setUser(null);
      await queryClient.invalidateQueries({ queryKey: ['me'] });
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Logout failed.');
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

  const startGoogleOAuth = () => {
    window.location.href = authApi.socialAuthRedirect('google');
  };

  const authContextValue = {
    user,
    isAuthenticated: !!user,
    initializing,
    loading: registerMutation.isPending || loginMutation.isPending || logoutMutation.isPending || requestPasswordResetMutation.isPending || resetPasswordMutation.isPending,
    error,
    register: registerMutation.mutateAsync,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    requestPasswordReset: requestPasswordResetMutation.mutateAsync,
    resetPassword: resetPasswordMutation.mutateAsync,
    fetchMe: async () => {
      await queryClient.invalidateQueries({ queryKey: ['me'] });
      return queryClient.refetchQueries({ queryKey: ['me'] });
    },
    startGoogleOAuth,
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