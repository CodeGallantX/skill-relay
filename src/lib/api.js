import axios from 'axios';
import { toast } from 'sonner';

const API_BASE_URL = 'https://skillrelay.joevichartech.com/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Response interceptor to surface API errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { message, errors } = error.response.data;
      if (errors) {
        // Handle validation errors (e.g., display inline)
        // For now, we'll just show the first error in a toast
        const firstErrorKey = Object.keys(errors)[0];
        if (firstErrorKey) {
          toast.error(errors[firstErrorKey][0]);
        }
      } else if (message) {
        toast.error(message);
      } else {
        toast.error('An unexpected error occurred.');
      }
    } else if (error.request) {
      toast.error('No response received from server. Please check your internet connection.');
    } else {
      toast.error('Error setting up request.');
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  socialAuthRedirect: (provider) => `${API_BASE_URL}/auth/${provider}/redirect`,
};