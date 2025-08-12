import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuth } from '@/hooks/useAuth';

const SignUpPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/onboarding');
    }
  }, [isAuthenticated, navigate]);

  const handleAuthSuccess = () => {
    navigate('/onboarding');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <AuthForm onSuccess={handleAuthSuccess} />
    </div>
  );
};

export default SignUpPage;