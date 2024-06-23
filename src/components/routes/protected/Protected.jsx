import React, { useState, useContext, useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import UserContext from '../../../context/userContext'
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Protected = ({ children }) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useContext(UserContext);

    return (
        <>
            {isLoggedIn ? children : <Button onClick={() => navigate('/login')}>Acceder</Button>}
        </>
    );
};



export default Protected;