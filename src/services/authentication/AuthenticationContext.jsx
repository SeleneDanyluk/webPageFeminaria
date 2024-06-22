import React from 'react'
import PropTypes from "prop-types";
import { useContext, useEffect, useState, createContext } from "react";

export const authentication = createContext({
    isAuthenticated: false,
    login: () => { }
});

const AuthenticationContext = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <AuthenticationContext.Provider value={{ isAuthenticated, login }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

AuthenticationContext.PropTypes = {
    children: PropTypes.node.isRequired
};

export default AuthenticationContext;

export const useAuth = () => useContext(authentication);


