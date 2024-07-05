import { createContext, useState, useEffect } from 'react'

const userType = window.localStorage.getItem("type")
const sub = window.localStorage.getItem("sub");
const userName = window.localStorage.getItem("name");

const UserContext = createContext({
    userType: Number(window.localStorage.getItem("type")),
    setUserType: () => { },
    sub: Number(window.localStorage.getItem("sub")),
    setUserId: () => { },
    userName: String(window.localStorage.getItem("name")),
    setUserName: () => { },
    isLoggedIn: false,
    setIsLoggedIn: () => { },
});

export const UserProvider = ({ children }) => {
    const [userType, setUserType] = useState(window.localStorage.getItem("type"))
    const [sub, setUserId] = useState(window.localStorage.getItem("sub"))
    const [userName, setUserName] = useState(window.localStorage.getItem("name"))
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const logout = () => {
        window.localStorage.removeItem("type");
        window.localStorage.removeItem("sub");
        window.localStorage.removeItem("cartItem");
        window.localStorage.removeItem("name");
        setUserType(null);
        setUserId(null);
        setUserName(null);
        setIsLoggedIn(false);
    };

    useEffect(() => {
        if (sub) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, [userType, sub, userName]);

    return (
        <UserContext.Provider value={{ userType, setUserType, sub, setUserId, isLoggedIn, setIsLoggedIn, logout, userName, setUserName }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;