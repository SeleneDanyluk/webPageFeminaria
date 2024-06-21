import {createContext, useState} from 'react' 

const UserContext = createContext({
    userType: 0,
    setUserType: () => {}
})

export const UserProvider = ({children}) => {
    const [userType, setUserType] = useState(0)

    return (
    <UserContext.Provider value={{userType, setUserType}}>
        {children}
    </UserContext.Provider>
    )
}

export default UserContext