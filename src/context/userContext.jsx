import {createContext, useState} from 'react' 

const type = window.localStorage.getItem("type")

const UserContext = createContext({
    userType: Number(window.localStorage.getItem("type")),
    setUserType: () => {}
})

export const UserProvider = ({children}) => {
    const [userType, setUserType] = useState(window.localStorage.getItem("type"))

    return (
    <UserContext.Provider value={{userType, setUserType}}>
        {children}
    </UserContext.Provider>
    )
}

export default UserContext