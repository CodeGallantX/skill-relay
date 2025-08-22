import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const EmailVerificationConfirmationPage = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const message = searchParams.get('message');

  const getStatusContent = () => {
    switch (status) {
      case 'already_verified':
        return {
          title: 'Email Already Verified',
          description: message || 'Your email address has already been verified. You can proceed to sign in.',
          color: 'text-blue-600',
        };
      case 'verified':
        return {
          title: 'Email Verified Successfully',
          description: message || 'Thank you for verifying your email address. You can now sign in to your account.',
          color: 'text-green-600',
        };
      case 'error':
        return {
          title: 'Verification Error',
          description: message || 'There was an error verifying your email. Please try again or contact support.',
          color: 'text-red-600',
        };
      default:
        return {
          title: 'Verification Status Unknown',
          description: message || 'The verification status is unknown. Please contact support if you continue to have issues.',
          color: 'text-gray-600',
        };
    }
  };

  const { title, description, color } = getStatusContent();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md mx-4">
        <CardHeader>
          <CardTitle className={`text-2xl font-bold text-center ${color}`}>{title}</CardTitle>
          <CardDescription className="text-center pt-2">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <Button asChild className="w-full">
            <Link to="/auth/signin">Go to Sign In</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerificationConfirmationPage;
