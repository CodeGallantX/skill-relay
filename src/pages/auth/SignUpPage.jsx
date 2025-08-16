import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import SignUpForm from '@/components/auth/SignUpForm';
import OTPForm from '@/components/auth/OTPForm';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [showOTP, setShowOTP] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleSignUpSuccess = (email) => {
    setUserEmail(email);
    setShowOTP(true);
  };

  const handleOTPSuccess = (result) => {
    // After OTP verification, new users go to onboarding, existing users go to dashboard
    if (result && result.isNewUser) {
      navigate('/onboarding');
    } else {
      navigate('/dashboard');
    }
  };

  const handleBackToSignUp = () => {
    setShowOTP(false);
    setUserEmail('');
  };

  return (
    <AuthLayout>
      <title>Sign Up - Skill Relay</title>
      <meta name="description" content="Join thousands of learners and creators on SkillRelay." />
      {showOTP ? (
        <OTPForm
          email={userEmail}
          onSuccess={handleOTPSuccess}
          onBack={handleBackToSignUp}
        />
      ) : (
        <SignUpForm onSuccess={handleSignUpSuccess} />
      )}
    </AuthLayout>
  );
};

export default SignUpPage;