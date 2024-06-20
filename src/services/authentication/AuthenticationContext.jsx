import React from 'react'
import PropTypes from "prop-types";
import { useContext, useEffect, useState, createContext } from "react";

export const AuthenticationContext = createContext({
    isAuthenticated: false
});

const AuthenticationContext = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState();

    return (
        <AuthenticationContext.Provider value={isAuthenticated}>
            {children}
        </AuthenticationContext.Provider>
    );
};

AuthenticationContext.PropTypes = {
    children: PropTypes.object
};

export default AuthenticationContext;


export const useAuth = () => useContext(AuthenticationContext);

