import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const { fetchMe, user, initializing } = useAuth();

  useEffect(() => {
    const handleAuthCallback = async () => {
      if (!initializing && !user) {
        try {
          await fetchMe();
          navigate('/dashboard');
        } catch (error) {
          console.error('Error fetching user after OAuth callback:', error);
          navigate('/signin');
        }
      } else if (user) {
        navigate('/dashboard');
      }
    };

    handleAuthCallback();
  }, [fetchMe, navigate, user, initializing]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-lg">Authenticating...</p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;