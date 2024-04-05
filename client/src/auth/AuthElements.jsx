import React from 'react';
import { Navigate } from 'react-router-dom';
import {useAuth} from "./AuthContext";

export const AuthenticatedElement = ({ element }) => {
    const { isLoggedIn, isLoading } = useAuth();

    console.log(isLoggedIn, isLoading)

    if (isLoading) {
        return <div className="m-40">Loading Auth Status...</div>;
    }

    return isLoggedIn ? element : <Navigate to={`/login`} />;
};

export const UnauthenticatedElement = ({ element }) => {
    const { isLoggedIn, isLoading } = useAuth();

    console.log(isLoggedIn, isLoading)

    if (isLoading) {
        return <div className="m-40">Loading Auth Status...</div>;
    }

    return !isLoggedIn ? element : <Navigate to={`/clothes`} />;
};
