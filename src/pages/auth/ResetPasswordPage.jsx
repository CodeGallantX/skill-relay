import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  password_confirmation: z.string(),
}).refine((data) => data.password === data.password_confirmation, {
  message: "Passwords don't match",
  path: ["password_confirmation"],
});

const ResetPasswordPage = () => {
  const { resetPassword, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const emailFromQuery = queryParams.get('email');

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: emailFromQuery || '',
      password: '',
      password_confirmation: '',
    },
  });

  // Prefill email if present in query params
  useEffect(() => {
    if (emailFromQuery) {
      form.setValue('email', emailFromQuery);
    }
  }, [emailFromQuery, form]);

  const handleSubmit = async (data) => {
    if (!token) {
      toast.error('Password reset token is missing.');
      return;
    }
    try {
      const result = await resetPassword({ ...data, token });
      if (result.success) {
        navigate('/signin', { replace: true });
      }
    } catch (error) {
      // Error handled by AuthContext and toast
    }
  };

  return (
    <AuthLayout>
      <title>Reset Password - Skill Relay</title>
      <meta name="description" content="Reset your SkillRelay account password." />
      <Card className="shadow-2xl border-0 animate-scale-in">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-600 to-yellow-500 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">SR</span>
          </div>
          <CardTitle className="text-3xl font-bold gradient-text">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password below.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@example.com"
                  className="pl-10 h-12 text-base"
                  {...form.register('email')}
                  disabled={!!emailFromQuery} // Disable if email is from query param
                />
              </div>
              {form.formState.errors.email && (
                <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter new password"
                  className="pl-10 pr-10 h-12 text-base"
                  {...form.register('password')}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {form.formState.errors.password && (
                <p className="text-sm text-destructive">{form.formState.errors.password.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password_confirmation">Confirm New Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password_confirmation"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm new password"
                  className="pl-10 pr-10 h-12 text-base"
                  {...form.register('password_confirmation')}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {form.formState.errors.password_confirmation && (
                <p className="text-sm text-destructive">{form.formState.errors.password_confirmation.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full h-12 text-base shadow-glow" disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Reset Password'
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            <Link to="/signin" className="text-primary hover:underline font-medium">
              Back to Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default ResetPasswordPage;
