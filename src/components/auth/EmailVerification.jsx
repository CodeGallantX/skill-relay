import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const RESEND_OTP_TIMER_SECONDS = 3 * 60; // 3 minutes

const EmailVerification = () => {
  const { user, verifyEmail, resendOtp, loading, error } = useAuth();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);

  useEffect(() => {
    if (!user || !user.email) {
      // If no user or email, redirect to signup or home
      navigate('/signup');
      return;
    }

    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0 && !canResend) {
      setCanResend(true);
    }

    return () => clearInterval(interval);
  }, [timer, canResend, user, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!user || !user.email) {
      toast.error("User email not found. Please sign up again.");
      return;
    }
    try {
      await verifyEmail({ email: user.email, otp });
      toast.success("Email verified successfully!");
      navigate('/onboarding'); // Redirect to onboarding after successful verification
    } catch (err) {
      // Error handled by AuthContext's onError
    }
  };

  const handleResendOtp = async () => {
    if (!user || !user.email) {
      toast.error("User email not found. Please sign up again.");
      return;
    }
    try {
      setCanResend(false);
      setTimer(RESEND_OTP_TIMER_SECONDS);
      await resendOtp({ email: user.email });
      toast.success("New OTP sent to your email.");
    } catch (err) {
      // Error handled by AuthContext's onError
      setCanResend(true); // Allow resend if request fails
      setTimer(0); // Reset timer if request fails
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="auth-form-container">
      <Card className="auth-form">
        <CardHeader>
          <CardTitle>Verify Your Email</CardTitle>
          <p className="text-muted-foreground text-sm">A 6-digit OTP has been sent to {user?.email || 'your email'}.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <Label htmlFor="otp">OTP</Label>
              <Input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Verifying...' : 'Verify Email'}
            </Button>
          </form>
          <Button
            variant="link"
            onClick={handleResendOtp}
            disabled={!canResend || loading}
            className="w-full mt-2"
          >
            {canResend ? 'Resend OTP' : `Resend in ${formatTime(timer)}`}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerification;
