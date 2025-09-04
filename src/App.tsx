import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
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
import TransactionPage from "./pages/transactions/TransactionPage";
import TaxOptimizationPage from "./pages/taxOptimization/TaxOptimizationPage";
import SettingsPage from "./pages/settings/SettingsPage";
import "./App.css";

// Wrapper component to handle navigation
const AppContent: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [otpEmail, setOtpEmail] = React.useState("");

  const handleLogin = () => {
    setIsAuthenticated(true);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleGetCodeClick = (email: string) => {
    setOtpEmail(email);
    navigate("/otp");
  };

  const handleVerifyCodeClick = (email: string) => {
    setOtpEmail(email);
    navigate("/new-password");
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <LoginPage
            onSignUpClick={() => {
              navigate("/register");
            }}
            onForgotPasswordClick={() => navigate("/reset-password")}
            onLoginSuccess={handleLogin}
          />
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
        element={<DashboardPage onLogout={handleLogout} />}
      />
      <Route path="/wallets" element={<WalletPage onLogout={handleLogout} />} />
      <Route
        path="/transactions"
        element={<TransactionPage onLogout={handleLogout} />}
      />
      <Route
        path="/tax-optimization"
        element={<TaxOptimizationPage onLogout={handleLogout} />}
      />
      <Route
        path="/settings"
        element={<SettingsPage onLogout={handleLogout} />}
      />
      <Route path="/crypto/:symbol" element={<CryptoDetailsPage />} />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <AppContent />
      </div>
    </Router>
  );
}

export default App;
