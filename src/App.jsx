import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useOnboarding } from './context/OnboardingContext';

// Pages
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import EmailVerificationPage from './pages/auth/EmailVerificationPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'; // New Import
import ResetPasswordPage from './pages/auth/ResetPasswordPage';   // New Import
import OnboardingPage from './pages/OnboardingPage';

// Dashboard Pages
import DashboardLayout from './components/layout/DashboardLayout';
import HomePage from './pages/dashboard/HomePage';
import ExplorePage from './pages/dashboard/ExplorePage';
import TrendingPage from './pages/dashboard/TrendingPage';
import FollowingPage from './pages/dashboard/FollowingPage';
import LibraryPage from './pages/dashboard/LibraryPage';
import LikedPage from './pages/dashboard/LikedPage';
import WatchLaterPage from './pages/dashboard/WatchLaterPage';
import FavoritesPage from './pages/dashboard/FavoritesPage';
import SettingsPage from './pages/dashboard/SettingsPage';
import CategoryPage from './pages/CategoryPage';
import HelpPage from './pages/HelpPage';
import MyLessonsPage from './pages/MyLessonsPage';

// Components
import ErrorBoundary from './components/common/ErrorBoundary';
import { Toaster } from 'sonner';
import { LoadingSpinner } from './components/common/LoadingSpinner';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const { completed } = useOnboarding();
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  
  // Only redirect to onboarding if user is new and hasn't completed onboarding
  if (user && !user.hasCompletedOnboarding && !completed) {
    return <Navigate to="/onboarding" replace />;
  }
  
  return children;
};

function App() {
  const { isAuthenticated, user } = useAuth();
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
          <Route path="/email-verification" element={<EmailVerificationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} /> {/* New Route */}
          <Route path="/reset-password" element={<ResetPasswordPage />} />   {/* New Route */}

          {/* Onboarding Route */}
          <Route 
            path="/onboarding" 
            element={
              isAuthenticated ? (
                (completed || (user && user.hasCompletedOnboarding)) ? <Navigate to="/dashboard" replace /> : <OnboardingPage />
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
            <Route path="following" element={<FollowingPage />} />
            <Route path="library" element={<LibraryPage />} />
            <Route path="my-lessons" element={<MyLessonsPage />} />
            <Route path="liked" element={<LikedPage />} />
            <Route path="watch-later" element={<WatchLaterPage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="category/:categoryName" element={<CategoryPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="help" element={<HelpPage />} />
          </Route>
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </ErrorBoundary>
  );
}

export default App;
