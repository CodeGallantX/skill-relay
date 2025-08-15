import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import SignInForm from '@/components/auth/SignInForm';

const SignInPage = () => {
  const navigate = useNavigate();

  const handleSignInSuccess = () => {
    navigate('/dashboard');
  };

  return (
    <AuthLayout>
      <title>Sign In - Skill Relay</title>
      <meta name="description" content="Sign in to your Skill Relay account to continue your learning journey." />
      <SignInForm onSuccess={handleSignInSuccess} />
    </AuthLayout>
  );
};

export default SignInPage;