/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useEffect } from "react";
import {
    Routes,
    Route,
    Navigate,
    useNavigate,
    useLocation,
    useParams,
} from "react-router-dom";
import Application from "./Application";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import { CommandService } from "./services/Commands";
import { AuthenticationService } from "./services/AuthenticationService";
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

const LoginWrapper: React.FC<{
    commandService: CommandService;
    authenticationService: AuthenticationService;
    accessIds: string[];
}> = ({ commandService, authenticationService, accessIds }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const redirectUrl = searchParams.get("redirectUrl");
    const { token } = useParams<{ token: string }>();
    return (
        <LoginPage
            authenticationService={authenticationService}
            commandService={commandService}
            redirectUrl={redirectUrl ?? null}
            token={token ?? null}
            accessIds={accessIds}
            onSignUpClick={() => commandService.LogIn("/register")}
            onForgotPasswordClick={() => commandService.LogIn("/reset-password")}
        />
    );
};

const RegisterWrapper: React.FC<{
    app: Application;
}> = ({ app }) => {
    return (
        <RegisterPage
            onLoginClick={() => app.CommandService.LogIn("/login")}
            onRegistrationComplete={() => app.NavigateTo("/welcome")}
        />
    );
};

const ResetPasswordWrapper: React.FC<{
    app: Application;
}> = ({ app }) => {
    return (
        <ResetPasswordPage
            onBackToLogin={() => app.CommandService.LogIn("/login")}
            onGetCodeClick={(email: string) => {
                app.NavigateTo(`/otp?email=${encodeURIComponent(email)}`);
            }}
        />
    );
};

const OTPWrapper: React.FC<{
    app: Application;
}> = ({ app }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email") || "";
    return (
        <OTPPage
            onBackToLogin={() => app.CommandService.LogIn("/login")}
            onVerifyCodeClick={(email: string) => {
                app.NavigateTo(`/new-password?email=${encodeURIComponent(email)}`);
            }}
            email={email}
        />
    );
};

const NewPasswordWrapper: React.FC<{
    app: Application;
}> = ({ app }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get("email") || "";
    return (
        <NewPasswordPage
            onBackToLogin={() => app.CommandService.LogIn("/login")}
            email={email}
        />
    );
};

const WelcomeWrapper: React.FC<{
    app: Application;
}> = ({ app }) => {
    return (
        <WelcomePage onGetStarted={() => app.CommandService.LogIn("/login")} />
    );
};

const DashboardWrapper: React.FC<{
    app: Application;
}> = ({ app }) => {
    return (
        <DashboardPage onLogout={() => app.CommandService.Logout()} />
    );
};

const WalletsWrapper: React.FC<{
    app: Application;
}> = ({ app }) => {
    return (
        <WalletPage onLogout={() => app.CommandService.Logout()} />
    );
};

const WalletDetailsWrapper: React.FC<{
    app: Application;
}> = ({ app }) => {
    return <WalletDetailsPage />;
};

const TransactionsWrapper: React.FC<{
    app: Application;
}> = ({ app }) => {
    return (
        <TransactionPage onLogout={() => app.CommandService.Logout()} />
    );
};

const TaxOptimizationWrapper: React.FC<{
    app: Application;
}> = ({ app }) => {
    return (
        <TaxOptimizationPage onLogout={() => app.CommandService.Logout()} />
    );
};

const TaxReportsWrapper: React.FC<{
    app: Application;
}> = ({ app }) => {
    return (
        <TaxReportsPage onLogout={() => app.CommandService.Logout()} />
    );
};

const ClientsWrapper: React.FC<{
    app: Application;
}> = ({ app }) => {
    return (
        <ClientsPage onLogout={() => app.CommandService.Logout()} />
    );
};

const SettingsWrapper: React.FC<{
    app: Application;
}> = ({ app }) => {
    return (
        <SettingsPage
            onLogout={() => app.CommandService.Logout()}
            authenticationService={app.AuthenticationService}
            commandService={app.CommandService}
        />
    );
};

const CryptoDetailsWrapper: React.FC<{
    app: Application;
}> = ({ app }) => {
    return <CryptoDetailsPage />;
};

const RouteManager = ({ app }: { app: Application }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const memoizedNavigateTo = useCallback((x: any, a: any) => {
        const target = a && a["target"] ? a["target"] : null;
        if (target) {
            window.open(x, target);
            return;
        }
        navigate(x, a);
    }, [navigate]);

    app.NavigateTo = memoizedNavigateTo;

    app.CurrentUrl = (): string => {
        return window.location.pathname + window.location.search;
    };

    app.DisplayingModal = () => {
        history.pushState(null, '', location.pathname + location.search);
    };

    app.ClosedModal = () => {
        history.back();
        history.pushState(null, '', location.pathname + location.search);
    };

    useEffect(() => {
        const handlePopState = (event: PopStateEvent) => {
            if (app.ShouldPreventNavigation()) {
                history.replaceState(null, '', location.pathname + location.search);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [app, location]);

    return (
        <Routes>
            <Route
                path="/login/:token"
                element={
                    <LoginWrapper
                        authenticationService={app.AuthenticationService}
                        commandService={app.CommandService}
                        accessIds={app.AccessIds}
                    />
                }
            />
            <Route
                path="/login"
                element={
                    <LoginWrapper
                        authenticationService={app.AuthenticationService}
                        commandService={app.CommandService}
                        accessIds={app.AccessIds}
                    />
                }
            />
            <Route path="/register" element={<RegisterWrapper app={app} />} />
            <Route path="/reset-password" element={<ResetPasswordWrapper app={app} />} />
            <Route path="/otp" element={<OTPWrapper app={app} />} />
            <Route path="/new-password" element={<NewPasswordWrapper app={app} />} />
            <Route path="/welcome" element={<WelcomeWrapper app={app} />} />

            <Route
                path="/dashboard"
                element={
                    <ProtectedRoute isAuthenticated={app.IsLoggedIn}>
                        <DashboardWrapper app={app} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/wallets"
                element={
                    <ProtectedRoute isAuthenticated={app.IsLoggedIn}>
                        <WalletsWrapper app={app} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/wallet/:platform"
                element={
                    <ProtectedRoute isAuthenticated={app.IsLoggedIn}>
                        <WalletDetailsWrapper app={app} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/transactions"
                element={
                    <ProtectedRoute isAuthenticated={app.IsLoggedIn}>
                        <TransactionsWrapper app={app} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/tax-optimization"
                element={
                    <ProtectedRoute isAuthenticated={app.IsLoggedIn}>
                        <TaxOptimizationWrapper app={app} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/tax-reports"
                element={
                    <ProtectedRoute isAuthenticated={app.IsLoggedIn}>
                        <TaxReportsWrapper app={app} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/clients"
                element={
                    <ProtectedRoute isAuthenticated={app.IsLoggedIn}>
                        <ClientsWrapper app={app} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/settings"
                element={
                    <ProtectedRoute isAuthenticated={app.IsLoggedIn}>
                        <SettingsWrapper app={app} />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/crypto/:symbol"
                element={
                    <ProtectedRoute isAuthenticated={app.IsLoggedIn}>
                        <CryptoDetailsWrapper app={app} />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/"
                element={
                    <Navigate
                        to={app.IsLoggedIn ? "/dashboard" : "/login"}
                        replace
                    />
                }
            />
        </Routes>
    );
};

export default RouteManager;
