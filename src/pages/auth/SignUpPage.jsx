import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import SignUpForm from '@/components/auth/SignUpForm';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(''); // Keep userEmail to pass to verification page

  const handleSignUpSuccess = (email) => {
    setUserEmail(email);
    navigate('/email-verification', { state: { email: email } });
  };

  return (
    <AuthLayout>
      <title>Sign Up - Skill Relay</title>
      <meta name="description" content="Join thousands of learners and creators on SkillRelay." />
      <SignUpForm onSuccess={handleSignUpSuccess} />
    </AuthLayout>
  );
};

export default SignUpPage;