import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Shield, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const OTPVerification = ({ email, onVerify, onResend, loading }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    // Start resend timer
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleInputChange = (index, value) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      handleVerify(newOtp.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    const newOtp = pastedData.split('').concat(Array(6).fill('')).slice(0, 6);
    setOtp(newOtp);
    
    // Focus last filled input or first empty one
    const lastFilledIndex = newOtp.findIndex(digit => digit === '');
    const focusIndex = lastFilledIndex === -1 ? 5 : Math.max(0, lastFilledIndex - 1);
    inputRefs.current[focusIndex]?.focus();

    // Auto-submit if complete
    if (pastedData.length === 6) {
      handleVerify(pastedData);
    }
  };

  const handleVerify = async (otpCode) => {
    try {
      const result = await onVerify(otpCode);
      toast.success('Email verified successfully!');
      // Navigate based on whether user is new or existing
      if (result.isNewUser) {
        navigate('/onboarding');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleResend = async () => {
    if (!canResend) return;
    
    try {
      await onResend();
      toast.success('New OTP sent to your email');
      setCanResend(false);
      setResendTimer(60);
    } catch (error) {
      toast.error('Failed to resend OTP');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/signup')} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Sign Up
          </Button>
        </div>

        <Card className="shadow-2xl border-0 animate-scale-in">
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-600 to-yellow-500 flex items-center justify-center shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold gradient-text">Verify Your Email</CardTitle>
            <CardDescription>
              We've sent a 6-digit code to<br />
              <span className="font-semibold text-foreground">{email}</span>
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex justify-center space-x-3" onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="otp-input"
                  disabled={loading}
                />
              ))}
            </div>

            <div className="text-center space-y-4">
              <Button
                variant="ghost"
                onClick={handleResend}
                disabled={!canResend || loading}
                className="text-primary hover:text-primary/80"
              >
                {canResend ? (
                  'Resend OTP'
                ) : (
                  `Resend in ${formatTime(resendTimer)}`
                )}
              </Button>

              <p className="text-sm text-muted-foreground">
                Didn't receive the code? Check your spam folder or try resending.
              </p>
            </div>

            {loading && (
              <div className="flex justify-center">
                <LoadingSpinner />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OTPVerification;