import React from 'react'
import PropTypes from "prop-types";
import Footer from '../footer/Footer';
import NavBar from '../navBar/NavBar';
import './Layout.css'

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            <NavBar></NavBar>
            <div className="main-content">
                {children}
            </div>
            <Footer></Footer>
        </div>
    );
};

Layout.PropTypes = {
    children: PropTypes.object,
};

export default Layout;