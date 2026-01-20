import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
    isAuthenticated: boolean;
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated, children }) => {
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to={`/login?redirectUrl=${encodeURIComponent(location.pathname)}`} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
