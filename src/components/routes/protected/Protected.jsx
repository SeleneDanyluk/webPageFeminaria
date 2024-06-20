import { Outlet, Navigate } from 'react-router-dom';
import { AuthenticationContext, useAuth } from '../../../services/authentication/AuthenticationContext';
import React from 'react'

const Protected = () => {
    const authentication = useAuth();
    return (
        authentication.isAuthenticated ? <Outlet></Outlet> : <Navigate to="/login"></Navigate>
    );
};

export default Protected;