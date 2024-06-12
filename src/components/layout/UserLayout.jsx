import React from 'react'
import PropTypes from "prop-types";
import UserNavBar from '../navBar/UserNavBar';
import Footer from '../footer/Footer';

const UserLayout = ({ children }) => {
    return (
        <div>
            <UserNavBar></UserNavBar>
            {children}
            <Footer></Footer>
        </div>
    );
};

UserLayout.PropTypes = {
    children: PropTypes.object
};
export default UserLayout