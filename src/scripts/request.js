const baseUrl = "http://localhost:6278/"

async function userRegister(body) {
    try {
        const request = await fetch (`${baseUrl}auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })

        const response = await request.json()
    
        if(request.ok) {
            console.log("Usuário Registrado")
        } else {
            throw new Error(response.error)
        }

    } catch (err) {
        console.log(err)
    }
}

export {userRegister}