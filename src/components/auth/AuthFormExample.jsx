import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const AuthFormExample = () => {
  const { login, register, logout, isAuthenticated, user, loading, error, setMockAuthData } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleMockLogin = () => {
    const mockUser = {
      id: 1,
      name: "John Doe",
      email: "user@sr.com",
    };
    const mockToken = "Bearer mock-token-123";
    setMockAuthData(mockUser, mockToken);
    navigate('/verify-email');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      if (password !== passwordConfirmation) {
        toast.error("Passwords do not match.");
        return;
      }
      try {
        await register({ name, email, password, password_confirmation: passwordConfirmation });
        navigate('/verify-email'); // Redirect to email verification after successful registration
      } catch (err) {
        // Error handled by AuthContext's onError
      }
    } else {
      await login({ email, password });
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  if (isAuthenticated) {
    return (
      <div className="auth-form-container">
        <Card className="auth-form">
          <CardHeader>
            <CardTitle>Welcome, {user?.name || user?.email}!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You are logged in.</p>
            <Button onClick={handleLogout} disabled={loading} className="w-full mt-4">
              {loading ? 'Logging out...' : 'Logout'}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="auth-form-container">
      <Card className="auth-form">
        <CardHeader>
          <CardTitle>{isRegistering ? 'Register' : 'Login'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegistering && (
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {isRegistering && (
              <div>
                <Label htmlFor="passwordConfirmation">Confirm Password</Label>
                <Input
                  id="passwordConfirmation"
                  type="password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                />
              </div>
            )}
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (isRegistering ? 'Registering...' : 'Logging in...') : (isRegistering ? 'Register' : 'Login')}
            </Button>
          </form>
          <Button
            variant="link"
            onClick={() => setIsRegistering(!isRegistering)}
            className="w-full mt-2"
          >
            {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
          </Button>
          <Button
            variant="outline"
            onClick={handleMockLogin}
            className="w-full mt-4"
          >
            Mock Login (for testing)
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthFormExample;
