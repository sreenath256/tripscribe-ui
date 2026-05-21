import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../Common/api';

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const verifyAuth = async () => {
            try {
                // Backend handles the auth checking via httpOnly cookies using withCredentials
                await axios.get(`${URL}/auth/user`, { withCredentials: true });
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Auth verification failed or no session found.");
                setIsAuthenticated(false);
            }
        };
        verifyAuth();
    }, []);

    if (isAuthenticated === null) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;
