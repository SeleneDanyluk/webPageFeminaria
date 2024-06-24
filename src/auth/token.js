import {jwtVerify} from 'jose'

export const getUser = async (email, password) => {
    try {
        const body = JSON.stringify({
            email,
            password
        });

        const response = await fetch("https://localhost:7069/api/Authentication/authenticate", {
            method: "POST",
            body,
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const { token } = await response.json();

        if (!token) {
            throw new Error('No token received');
        }

        const { payload } = await jwtVerify(token, new TextEncoder().encode("thisisthesecretforgeneratingakey(mustbeatleast32bitlong)"));

        return payload;
    } catch (error) {
        console.error("Error in getUser:", error);
        throw new Error('Authentication failed');
    }
};