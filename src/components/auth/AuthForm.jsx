import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { authApi } from '@/lib/api';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const otpSchema = z.object({
  email: z.string().email('Invalid email address'),
  otp: z.string().length(6, 'OTP must be 6 digits'),
});

export const AuthForm = ({ onSuccess }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpEmail, setOtpEmail] = useState('');
  
  const { login, register, verifyOTP } = useAuth();

  const loginForm = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'test@skillrelay.com',
      password: 'password123'
    }
  });

  const registerForm = useForm({
    resolver: zodResolver(registerSchema),
  });

  const otpForm = useForm({
    resolver: zodResolver(otpSchema),
  });

  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      await login(data);
      // Redirect to dashboard after successful login
      window.location.href = '/dashboard';
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data) => {
    setIsLoading(true);
    try {
      await register(data);
      onSuccess?.();
    } catch (error) {
      console.error('Register error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOTP = async (data) => {
    setIsLoading(true);
    try {
      // Mock OTP sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      setOtpEmail(data.email);
      setOtpSent(true);
      toast.success('OTP sent to your email');
    } catch (error) {
      toast.error('Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (data) => {
    setIsLoading(true);
    try {
      await verifyOTP(data.email, data.otp);
      onSuccess?.();
    } catch (error) {
      console.error('OTP verification error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = (provider) => {
    window.location.href = authApi.socialAuthRedirect(provider);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to SkillRelay</CardTitle>
          <CardDescription>
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
              <TabsTrigger value="otp">OTP</TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="space-y-4">
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      {...loginForm.register('email')}
                    />
                  </div>
                  {loginForm.formState.errors.email && (
                    <p className="text-sm text-destructive">
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="pl-10 pr-10"
                      {...loginForm.register('password')}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="text-sm text-destructive">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <LoadingSpinner size="sm" /> : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            {/* Register Tab */}
            <TabsContent value="register" className="space-y-4">
              <form onSubmit={registerForm.handleSubmit(handleRegister)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Enter your full name"
                      className="pl-10"
                      {...registerForm.register('name')}
                    />
                  </div>
                  {registerForm.formState.errors.name && (
                    <p className="text-sm text-destructive">
                      {registerForm.formState.errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      {...registerForm.register('email')}
                    />
                  </div>
                  {registerForm.formState.errors.email && (
                    <p className="text-sm text-destructive">
                      {registerForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a password"
                      className="pl-10 pr-10"
                      {...registerForm.register('password')}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {registerForm.formState.errors.password && (
                    <p className="text-sm text-destructive">
                      {registerForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-confirm-password">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="register-confirm-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      className="pl-10 pr-10"
                      {...registerForm.register('confirmPassword')}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {registerForm.formState.errors.confirmPassword && (
                    <p className="text-sm text-destructive">
                      {registerForm.formState.errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <LoadingSpinner size="sm" /> : 'Create Account'}
                </Button>
              </form>
            </TabsContent>

            {/* OTP Tab */}
            <TabsContent value="otp" className="space-y-4">
              {!otpSent ? (
                <form onSubmit={otpForm.handleSubmit(handleSendOTP)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="otp-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="otp-email"
                        type="email"
                        placeholder="Enter your email"
                        className="pl-10"
                        {...otpForm.register('email')}
                      />
                    </div>
                    {otpForm.formState.errors.email && (
                      <p className="text-sm text-destructive">
                        {otpForm.formState.errors.email.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <LoadingSpinner size="sm" /> : 'Send OTP'}
                  </Button>
                </form>
              ) : (
                <form onSubmit={otpForm.handleSubmit(handleVerifyOTP)} className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      We've sent a 6-digit code to {otpEmail}
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
                      {...otpForm.register('otp')}
                    />
                    {otpForm.formState.errors.otp && (
                      <p className="text-sm text-destructive">
                        {otpForm.formState.errors.otp.message}
                      </p>
                    )}
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <LoadingSpinner size="sm" /> : 'Verify OTP'}
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
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <Separator className="my-4" />
            <div className="text-center text-sm text-muted-foreground mb-4">
              Or continue with
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                onClick={() => handleSocialAuth('google')}
                disabled={isLoading}
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleSocialAuth('facebook')}
                disabled={isLoading}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleSocialAuth('linkedin')}
                disabled={isLoading}
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};