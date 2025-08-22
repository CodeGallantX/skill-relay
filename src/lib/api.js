import axios from 'axios';
import { toast } from 'sonner';

const API_BASE_URL = 'https://skillrelay.joevichartech.com/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add Authorization header
api.interceptors.request.use(
  (config) => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`; // Add Bearer prefix
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to surface API errors and handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { message, errors, code } = error.response.data; // Destructure code as well

      // Handle 401 Unauthorized errors
      if (error.response.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('authUser');
        // Optionally, redirect to login page or show a session expired message
        // window.location.href = '/signin'; // Example redirect
        toast.error(message || 'Session expired. Please log in again.');
      } else if (errors) {
        // Handle validation errors (e.g., display inline)
        const firstErrorKey = Object.keys(errors)[0];
        if (firstErrorKey) {
          toast.error(errors[firstErrorKey][0]);
        }
      } else if (message) {
        toast.error(message);
      } else {
        toast.error('An unexpected error occurred.');
      }
      // Return the error with its code for specific handling in components
      return Promise.reject({ ...error, code });
    } else if (error.request) {
      toast.error('No response received from server. Please check your internet connection.');
    } else {
      toast.error('Error setting up request.');
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  register: (userData) => api.post('/auth/register', userData),
  login: (credentials) => api.post('/auth/login', { ...credentials, device: 'web' }),
  resendEmailVerification: (email) => api.post('/auth/email/resend', { email }),
  forgotPassword: (email) => api.post('/auth/password/email', { email }),
  resetPassword: (data) => api.post('/auth/password/reset', data),
  logout: () => api.post('/auth/logout'),
  socialAuthRedirect: (provider) => `${API_BASE_URL}/auth/${provider}/redirect`,
};

api.getTopCreators = () => {
  return api.get('/creators/top');
};

api.getCategories = () => {
  return api.get('/categories');
};

api.submitOnboarding = (data) => {
  return api.post('/user/onboarding', data);
};