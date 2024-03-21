// PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth'; // Adjust import path as per your project structure

const PrivateRoute = () => {
    const auth = isAuthenticated(); // Check if user is authenticated
    return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
