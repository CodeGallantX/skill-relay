import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { Mail, Lock, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { FormField } from './forms/FormField';

const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const SignUpForm = ({ onSuccess }) => {
  const { register, loading } = useAuth();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const handleSubmit = async (data) => {
    const result = await register({ ...data, role: 'learner' });
    if (result.success) {
      onSuccess?.(data.email);
    }
  };

  return (
    <Card className="shadow-2xl border-0 animate-scale-in">
      <CardHeader className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-300 flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-2xl">SR</span>
        </div>
        <CardTitle className="text-3xl font-bold gradient-text">Create Account</CardTitle>
        <CardDescription>
          Join thousands of learners and creators on SkillRelay
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            id="name"
            label="Full Name"
            type="text"
            placeholder="Your full name"
            register={form.register('name')}
            error={form.formState.errors.name}
            icon={User}
          />
          <FormField
            id="email"
            label="Email"
            type="email"
            placeholder="your@example.com"
            register={form.register('email')}
            error={form.formState.errors.email}
            icon={Mail}
          />
          <FormField
            id="password"
            label="Password"
            type="password"
            placeholder="Create a password"
            register={form.register('password')}
            error={form.formState.errors.password}
            icon={Lock}
          />
          <FormField
            id="confirmPassword"
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            register={form.register('confirmPassword')}
            error={form.formState.errors.confirmPassword}
            icon={Lock}
          />
          <Button type="submit" className="w-full h-12 text-base shadow-glow" disabled={loading}>
            {loading ? <LoadingSpinner size="sm" /> : 'Create Account'}
          </Button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link to="/signin" className="text-primary hover:underline font-medium">
            Sign In
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
