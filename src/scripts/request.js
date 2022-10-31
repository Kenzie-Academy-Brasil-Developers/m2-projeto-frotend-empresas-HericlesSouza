import { toast } from "./toast.js"

const baseUrl = "http://localhost:6278/"

async function userRegister(body, paragraph) {
    try {
        const request = await fetch(`${baseUrl}auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })

        const response = await request.json()

        if (request.ok) {
            toast("successToast", "Cadastro realizado com sucesso!")
            setTimeout(() => {
                window.location.assign('../login/index.html')
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

async function login(body) {
    try {
        const request = await fetch(`${baseUrl}auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
        const response = await request.json()

        if (request.ok) {
            localStorage.setItem('@token', (JSON.stringify(response)))
            validateUser()
        } else {
            throw new Error(response.error)
        }

    } catch (err) {
        console.log(err)
    }
}

async function validateUser() {
    const token = JSON.parse(localStorage.getItem('@token'))
    try {
        const request = await fetch(`${baseUrl}auth/validate_user`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.token}`,
            }
        })
        const response = await request.json()

        if (request.ok) {
            if (response.is_admin) {
                window.location.assign("../admin_page/index.html")
            } else {
                window.location.assign("../user_page/index.html")
            }
        } else {
            throw new Error(response.error)
        }

    } catch (err) {
        console.log(err)
    }
}

async function allCompanies() {
    try {
        const request = await fetch(`${baseUrl}companies`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const response = await request.json()
        if (request.ok) {
            return response

        } else {
            throw new Error(response.error)
        }
    } catch (err) {
        console.log(err)
    }
}

async function allSectors() {
    try {
        const request = await fetch(`${baseUrl}sectors`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const response = await request.json()
        if (request.ok) {
            return response
        } else {
            throw new Error(response.error)
        }
    } catch (err) {
        console.log(err)
    }
}

async function filterSector(sector) {
    try {
        const request = await fetch(`${baseUrl}companies/${sector}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const response = await request.json()
        if (request.ok) {
            return response
        } else {
            throw new Error(response.error)
        }
    } catch (err) {
        console.log(err)
    }
}
export { userRegister, login, allCompanies, allSectors, filterSector }