import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Mail } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { toast } from 'sonner';

const otpSchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export const OtpForm = ({ email: initialEmail, onSuccess }) => {
  const { verifyOTP, loading } = useAuth();
  const [otpSent, setOtpSent] = useState(!!initialEmail);
  const [email, setEmail] = useState(initialEmail || '');

  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      email: initialEmail || '',
      otp: '',
    },
  });

  const handleSendOTP = async (data) => {
    // In a real app, you would call an API to send the OTP
    toast.success(`OTP sent to ${data.email}`);
    setEmail(data.email);
    setOtpSent(true);
  };

  const handleSubmit = async (data) => {
    const result = await verifyOTP(email, data.otp);
    if (result.success) {
      onSuccess?.();
    }
  };

  return (
    <>
      {!otpSent ? (
        <form
          onSubmit={form.handleSubmit(handleSendOTP)}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="otp-email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="otp-email"
                type="email"
                placeholder="Enter your email"
                className="pl-10"
                {...form.register('email')}
              />
            </div>
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <LoadingSpinner size="sm" /> : 'Send OTP'}
          </Button>
        </form>
      ) : (
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-4"
        >
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              We've sent a 6-digit code to {email}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="otp-code">Verification Code</Label>
            <Input
              id="otp-code"
              type="text"
              placeholder="Enter 6-digit code"
              maxLength={6}
              className="text-center text-lg tracking-widest"
              {...form.register('otp')}
            />
            {form.formState.errors.otp && (
              <p className="text-sm text-destructive">
                {form.formState.errors.otp.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <LoadingSpinner size="sm" /> : 'Verify OTP'}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={() => setOtpSent(false)}
          >
            Back to Email
          </Button>
        </form>
      )}
    </>
  );
};
