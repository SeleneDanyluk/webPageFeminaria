export const getUser = async (email, password) => {

    const body = JSON.stringify({
        email,
        password
    })
    
     return await fetch("https://localhost:7069/api/Authentication/authenticate", {
            method: "POST",
            body,
            headers: {
                "Content-Type": "application/json",
            }
        }, )
    .then((response) => {
        console.log(response.text())
        return response.text() 
    })
    .then((data) => {//
        console.log(data); //
        return data;  //
    })
    .catch((error) => {
        console.log(error)
        console.error("Error:", error);
    });

}