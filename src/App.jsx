import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import OnboardingPage from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ExplorePage } from './pages/ExplorePage';
import { TrendingPage } from './pages/TrendingPage';
import FollowingPage from './pages/FollowingPage';
import LibraryPage from './pages/LibraryPage';
import MyLessonsPage from './pages/MyLessonsPage';
import LikedPage from './pages/LikedPage';
import WatchLaterPage from './pages/WatchLaterPage';
import FavoritesPage from './pages/FavoritesPage';
import CategoryPage from './pages/CategoryPage';
import SettingsPage from './pages/SettingsPage';
import HelpPage from './pages/HelpPage';
import ErrorBoundary from './components/common/ErrorBoundary';
import { Toaster } from 'sonner';
import RequireAuth from './components/auth/RequireAuth';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import AuthCallbackPage from './pages/auth/AuthCallbackPage';
import ProfilePage from './pages/ProfilePage';
import EmailVerification from './components/auth/EmailVerification';

function App() {
  return (
    <ErrorBoundary>
      <title>Skill Relay - The best platform to learn new skills</title>
      <meta name="description" content="Skill Relay is a platform where you can learn new skills from the best creators. We have a wide range of courses and tutorials to help you learn everything you need to know." />
      <link rel="canonical" href="https://skill-relay.com/" />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />
          <Route path="/verify-email" element={<EmailVerification />} />

          {/* Protected Routes */}
          <Route element={<RequireAuth />}>
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/explore" element={<ExplorePage />} />
            <Route path="/dashboard/trending" element={<TrendingPage />} />
            <Route path="/dashboard/following" element={<FollowingPage />} />
            <Route path="/dashboard/library" element={<LibraryPage />} />
            <Route path="/dashboard/my-lessons" element={<MyLessonsPage />} />
            <Route path="/dashboard/liked" element={<LikedPage />} />
            <Route path="/dashboard/watch-later" element={<WatchLaterPage />} />
            <Route path="/dashboard/favorites" element={<FavoritesPage />} />
            <Route path="/dashboard/category/:categoryName" element={<CategoryPage />} />
            <Route path="/dashboard/settings" element={<SettingsPage />} />
            <Route path="/dashboard/help" element={<HelpPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </ErrorBoundary>
  );
}

export default App;
