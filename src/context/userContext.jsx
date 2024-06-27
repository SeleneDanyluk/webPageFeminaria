import { createContext, useState, useEffect } from 'react'

const userType = window.localStorage.getItem("type")
const sub = window.localStorage.getItem("sub");

const UserContext = createContext({
    userType: Number(window.localStorage.getItem("type")),
    setUserType: () => { },
    sub: Number(window.localStorage.getItem("sub")),
    setUserId: () => { },
    isLoggedIn: false,
    setIsLoggedIn: () => { },
});

export const UserProvider = ({ children }) => {
    const [userType, setUserType] = useState(window.localStorage.getItem("type"))
    const [sub, setUserId] = useState(window.localStorage.getItem("sub"))
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logout = () => {
        window.localStorage.removeItem("type");
        window.localStorage.removeItem("sub");
        window.localStorage.removeItem("cartItem");
        setUserType(null);
        setUserId(null);
        setIsLoggedIn(false);
    };

    useEffect(() => {
        if (sub) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [userType, sub]);

    return (
        <UserContext.Provider value={{ userType, setUserType, sub, setUserId, isLoggedIn, setIsLoggedIn, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;