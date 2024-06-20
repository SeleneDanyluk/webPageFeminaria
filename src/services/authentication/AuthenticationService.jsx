import axios from 'axios';
import React from 'react'

const AuthenticationService = () => {

    const login = async (email, password) => {
        const response = await axios.post('https://localhost:7069/api/Authentication/authenticate', {
            email,
            password,
            userType: 1
        });

        return (
            <div>AuthenticationService</div>
        );
    };
};

export default AuthenticationService;