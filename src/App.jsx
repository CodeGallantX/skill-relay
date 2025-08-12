import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import { Toaster } from 'sonner';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
            </Routes>
          </Router>
          <Toaster position="top-right" />
        </AppProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;