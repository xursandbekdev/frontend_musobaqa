
import React from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
    const token = localStorage.getItem('x-auth-token');

    if (!token) {
        return <Navigate to="/auth/register" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
