import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Mail, Loader2 } from 'lucide-react';
import AuthLayout from '../../components/auth/AuthLayout';
import { useAuth } from '../../context/AuthContext';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const ForgotPasswordPage = () => {
  const { forgotPassword, loading } = useAuth();

  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = async (data) => {
    try {
      await forgotPassword(data.email);
    } catch (error) {
      // Error handled by AuthContext and toast
    }
  };

  return (
    <AuthLayout>
      <title>Forgot Password - Skill Relay</title>
      <meta name="description" content="Recover your SkillRelay account password." />
      <Card className="shadow-2xl border-0 animate-scale-in">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-600 to-yellow-500 flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">SR</span>
          </div>
          <CardTitle className="text-3xl font-bold gradient-text">Forgot Password?</CardTitle>
          <CardDescription>
            Enter your email address below and we'll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@example.com"
                  className="pl-10 h-12 text-base"
                  {...form.register('email')}
                />
              </div>
              {form.formState.errors.email && (
                <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full h-12 text-base shadow-glow" disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            Remember your password?{' '}
            <Link to="/signin" className="text-primary hover:underline font-medium">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
