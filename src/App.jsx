import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useOnboarding } from './context/OnboardingContext';

// Pages
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import OnboardingPage from './pages/OnboardingPage';

// Dashboard Pages
import DashboardLayout from './components/layout/DashboardLayout';
import HomePage from './pages/dashboard/HomePage';
import ExplorePage from './pages/dashboard/ExplorePage';
import TrendingPage from './pages/dashboard/TrendingPage';
import SettingsPage from './pages/dashboard/SettingsPage';

// Components
import ErrorBoundary from './components/common/ErrorBoundary';
import { Toaster } from 'sonner';
import { LoadingSpinner } from './components/common/LoadingSpinner';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { completed } = useOnboarding();
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  
  if (!completed) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return children;
};

function App() {
  const { isAuthenticated } = useAuth();
  const { completed } = useOnboarding();

  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Auth Routes */}
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Onboarding Route */}
          <Route 
            path="/onboarding" 
            element={
              isAuthenticated ? (
                completed ? <Navigate to="/dashboard" replace /> : <OnboardingPage />
              ) : (
                <Navigate to="/signin" replace />
              )
            } 
          />
          
          {/* Dashboard Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }>
            <Route index element={<HomePage />} />
            <Route path="explore" element={<ExplorePage />} />
            <Route path="trending" element={<TrendingPage />} />
            <Route path="following" element={<div className="p-8 text-center text-muted-foreground">Following page coming soon...</div>} />
            <Route path="library" element={<div className="p-8 text-center text-muted-foreground">Library page coming soon...</div>} />
            <Route path="my-lessons" element={<div className="p-8 text-center text-muted-foreground">My Lessons page coming soon...</div>} />
            <Route path="liked" element={<div className="p-8 text-center text-muted-foreground">Liked page coming soon...</div>} />
            <Route path="watch-later" element={<div className="p-8 text-center text-muted-foreground">Watch Later page coming soon...</div>} />
            <Route path="favorites" element={<div className="p-8 text-center text-muted-foreground">Favorites page coming soon...</div>} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="help" element={<div className="p-8 text-center text-muted-foreground">Help page coming soon...</div>} />
          </Route>
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </ErrorBoundary>
  );
}

export default App;
