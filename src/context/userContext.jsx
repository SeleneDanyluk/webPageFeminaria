import {createContext, useState} from 'react' 

const type = window.localStorage.getItem("type")
const sub = window.localStorage.getItem("sub"); 

const UserContext = createContext({
    userType: Number(window.localStorage.getItem("type")),
    setUserType: () => {},
    sub: Number(window.localStorage.getItem("sub")),
    setUserId: () => {}
})


export const UserProvider = ({children}) => {
    const [userType, setUserType] = useState(window.localStorage.getItem("type"))
    const [sub, setUserId] = useState(window.localStorage.getItem("sub"))
    return (
    <UserContext.Provider value={{userType, setUserType, sub, setUserId}}>
        {children}
    </UserContext.Provider>
    )
}

export default UserContext