import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { useAuth } from '@/hooks/useAuth';

export const OnboardingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleComplete = () => {
    navigate('/dashboard');
  };

  if (!isAuthenticated) {
    return null;
  }

  return <OnboardingFlow onComplete={handleComplete} />;
};