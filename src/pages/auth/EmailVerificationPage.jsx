import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { MailCheck, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const EmailVerificationPage = () => {
  const { resendEmailVerification, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      // If email is not passed via state, redirect to signup or a generic error page
      navigate('/signup', { replace: true });
      toast.error('Email not found. Please sign up again.');
    }
  }, [location.state, navigate]);

  const handleResendEmail = async () => {
    if (!email) {
      toast.error('No email address to resend to.');
      return;
    }
    try {
      await resendEmailVerification(email);
    } catch (error) {
      // Error handled by AuthContext and toast
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <MailCheck className="mx-auto h-12 w-12 text-primary" />
          <CardTitle className="text-2xl font-bold mt-4">Check Your Email</CardTitle>
          <CardDescription>
            A confirmation email has been sent to <span className="font-semibold text-primary">{email}</span>.
            Please check your inbox and spam folder to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleResendEmail}
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Resend Email'
            )}
          </Button>
          <Button
            variant="link"
            className="w-full"
            onClick={() => navigate('/signin')}
          >
            Back to Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerificationPage;
