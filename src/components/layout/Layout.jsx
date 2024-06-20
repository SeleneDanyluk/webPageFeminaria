import React from 'react'
import PropTypes from "prop-types";
import Footer from '../footer/Footer';
import NavBar from '../navBar/NavBar';

const Layout = ({ children }) => {
    return (
        <div>
            <NavBar></NavBar>
            {children}
            <Footer></Footer>
        </div>
    );
};

Layout.PropTypes = {
    children: PropTypes.object
};

export default Layout;