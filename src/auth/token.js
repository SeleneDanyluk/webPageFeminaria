import {jwtVerify} from 'jose'

export const getUser = async (email, password) => {

    const body = JSON.stringify({
        email,
        password
    })
    
     const { token } = await fetch("https://localhost:7069/api/Authentication/authenticate", {
            method: "POST",
            body,
            headers: {
                "Content-Type": "application/json",
            }
        }, )
    .then((response) => {
        return response.json() 
    })
    .catch((error) => {
        console.log(error)
        console.error("Error:", error);
    });

    const {payload} = await jwtVerify(token, new TextEncoder().encode("thisisthesecretforgeneratingakey(mustbeatleast32bitlong)"))

    return payload
}