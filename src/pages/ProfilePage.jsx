import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

const ProfilePage = () => {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <p>No user data available. Please sign in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <title>Profile - Skill Relay</title>
      <meta name="description" content="View and manage your Skill Relay profile." />
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">User Profile</CardTitle>
          <CardDescription>
            Details of your authenticated account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold">Name:</h3>
            <p>{user.name}</p>
          </div>
          <div>
            <h3 className="font-semibold">Email:</h3>
            <p>{user.email}</p>
          </div>
          {/* Display other user properties as needed */}
          <Button onClick={logout} className="w-full" disabled={loading}>
            {loading ? <LoadingSpinner size="sm" /> : 'Log Out'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;