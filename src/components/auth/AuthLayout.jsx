import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AuthLayout = ({ children, showBackButton = true, backTo = "/" }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {showBackButton && (
          <div className="mb-6">
            <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
              <Link to={backTo}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Link>
            </Button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;