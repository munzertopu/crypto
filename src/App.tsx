import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import OTPPage from "./pages/OTPPage";
import NewPasswordPage from "./pages/NewPasswordPage";
import WelcomePage from "./pages/WelcomePage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import CryptoDetailsPage from "./pages/cryptoDetails/CryptoDetailsPage";
import WalletPage from "./pages/wallet/WalletPage";
import WalletDetailsPage from "./pages/wallet/components/WalletDetailsPage";
import TransactionPage from "./pages/transactions/TransactionPage";
import TaxOptimizationPage from "./pages/taxOptimization/TaxOptimizationPage";
import TaxReportsPage from "./pages/taxReports/TaxReportsPage";
import ClientsPage from "./pages/clients/ClientsPage";
import SettingsPage from "./pages/settings/SettingsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Application from "./Application";
import "./App.css";

interface AppProps {
  app: Application;
}

const App: React.FC<AppProps> = ({ app }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // Use local state synced with app.IsLoggedIn to ensure React re-renders
  const [isAuthenticated, setIsAuthenticated] = useState(() => app.IsLoggedIn);
  const [, forceUpdate] = useState({});
  const [otpEmail, setOtpEmail] = useState("");

  // Set up navigation handler
  useEffect(() => {
    app.NavigateTo = (url: string) => {
      navigate(url);
    };
  }, [navigate, app]);

  // Set up auth state change handler and sync with app state
  useEffect(() => {
    // Initial sync
    setIsAuthenticated(app.IsLoggedIn);

    app.onAuthStateChange = (isLoggedIn: boolean) => {
      setIsAuthenticated(isLoggedIn);
      forceUpdate({}); // Force re-render
    };
    return () => {
      app.onAuthStateChange = null;
    };
  }, [app]);

  // Also listen to custom events for auth changes
  useEffect(() => {
    const handleAuthChange = () => {
      setIsAuthenticated(app.IsLoggedIn);
    };
    window.addEventListener('authStateChange', handleAuthChange);
    return () => window.removeEventListener('authStateChange', handleAuthChange);
  }, [app]);

  // Handle browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      // React Router will handle this automatically
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleGetCodeClick = (email: string) => {
    setOtpEmail(email);
    navigate("/otp");
  };

  const handleVerifyCodeClick = (email: string) => {
    setOtpEmail(email);
    navigate("/new-password");
  };

  const handleLogout = () => {
    app.CommandService.Logout();
  };

  // Get redirect URL from query params
  const searchParams = new URLSearchParams(location.search);
  const redirectUrl = searchParams.get("redirectUrl");

  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to={redirectUrl || "/dashboard"} replace />
            ) : (
              <LoginPage
                authenticationService={app.AuthenticationService}
                commandService={app.CommandService}
                redirectUrl={redirectUrl}
                accessIds={JSON.parse(localStorage.getItem("AccessIds") ?? "[]")}
                token={null}
                onSignUpClick={() => navigate("/register")}
                onForgotPasswordClick={() => navigate("/reset-password")}
              />
            )
          }
        />
        <Route
          path="/register"
          element={
            <RegisterPage
              onLoginClick={() => navigate("/login")}
              onRegistrationComplete={() => navigate("/welcome")}
            />
          }
        />
        <Route
          path="/reset-password"
          element={
            <ResetPasswordPage
              onBackToLogin={() => navigate("/login")}
              onGetCodeClick={handleGetCodeClick}
            />
          }
        />
        <Route
          path="/otp"
          element={
            <OTPPage
              onBackToLogin={() => navigate("/login")}
              onVerifyCodeClick={handleVerifyCodeClick}
              email={otpEmail}
            />
          }
        />
        <Route
          path="/new-password"
          element={
            <NewPasswordPage
              onBackToLogin={() => navigate("/login")}
              email={otpEmail}
            />
          }
        />
        <Route
          path="/welcome"
          element={<WelcomePage onGetStarted={() => navigate("/login")} />}
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <DashboardPage onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wallets"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <WalletPage onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <TransactionPage onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tax-optimization"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <TaxOptimizationPage onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tax-reports"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <TaxReportsPage onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clients"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ClientsPage onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <SettingsPage
                onLogout={handleLogout}
                authenticationService={app.AuthenticationService}
                commandService={app.CommandService}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crypto/:symbol"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CryptoDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wallet/:platform"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <WalletDetailsPage />
            </ProtectedRoute>
          }
        />

        {/* Default redirect */}
        <Route
          path="/"
          element={
            <Navigate
              to={isAuthenticated ? "/dashboard" : "/login"}
              replace
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
