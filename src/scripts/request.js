import { toast } from "./toast.js"

const baseUrl = "http://localhost:6278/"

async function userRegister(body, paragraph) {
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
            toast("successToast", "Cadastro realizado com sucesso!")
            setTimeout(() => {
                window.location.assign ('../login/index.html')
            }, 3000)
        } else {
            toast("errorToast", "Email já cadastrado!")
            paragraph.hidden = false
            throw new Error(response.error)
        }

    } catch (err) {
        console.log(err)
    }
}

export {userRegister}