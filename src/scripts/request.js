import { toast, toastModal } from "./toast.js"

const baseUrl = "http://localhost:6278/"

async function userRegister(body, paragraph, input) {
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
            input.classList.add('error')
            paragraph.hidden = false
            throw new Error(response.error)
        }

    } catch (err) {
        console.log(err)
    }
}

async function login(body, paragraph) {
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
            toast("errorToast", "Email ou senha inválido!")
            paragraph.hidden = false
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

async function allDepartments() {
    const token = JSON.parse(localStorage.getItem('@token'))

    try {
        const request = await fetch(`${baseUrl}departments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.token}`
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

async function allUsers() {
    const token = JSON.parse(localStorage.getItem('@token'))

    try {
        const request = await fetch(`${baseUrl}users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token.token}`
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

async function unemployedUsers() {
    const token = JSON.parse(localStorage.getItem('@token'))
    try {
        const request = await fetch(`${baseUrl}admin/out_of_work`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${token.token}`
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

async function editDescriptionDepartment(id, body) {
    const token = JSON.parse(localStorage.getItem('@token'))
    try {
        const request = await fetch(`${baseUrl}departments/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${token.token}`
            },
            body: JSON.stringify(body)
        })
        const response = await request.json()
        if (!request.ok) {
            throw new Error (response.error)
        }
    } catch (err) {
        console.log(err)
    }
}

async function createDepartment(body) {
    const token = JSON.parse(localStorage.getItem('@token'))
    try {
        const request = await fetch(`${baseUrl}departments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${token.token}`
            },
            body: JSON.stringify(body)
        })
        const response = request.json()
        if (!request.ok) {
            throw new Error(response.error)
        }
    } catch (err) {
        console.log(err)
    }
}

async function hireEmployee(body) {
    const token = JSON.parse(localStorage.getItem('@token'))
    try {
        const request = await fetch(`${baseUrl}departments/hire/`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${token.token}`
            },
            body: JSON.stringify(body)
        })
        const response = await request.json()
        if (!request.ok) {
            throw new Error (console.log(response.error))
        }
    } catch (err) {
        console.log(err)
    }
}

async function fireEmplyoee(user) {
    const token = JSON.parse(localStorage.getItem('@token'))
    try {
        const request = await fetch(`${baseUrl}departments/dismiss/${user}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${token.token}`
            },
        })
        const response = await request.json()

        if (!request.ok) {
            throw new Error (response.error)
        }

    } catch (err) {
        console.log(err)
    }
}

async function deleteDepartment(id) {
    const token = JSON.parse(localStorage.getItem('@token'))
    try {
        const request = await fetch(`${baseUrl}departments/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${token.token}`
            }
        })

        if (!request.ok) {
            throw new Error(request.error)
        }
    } catch (err) {
        console.log(err)
    }
}

async function filterDepartmentsCompany(id) {
    const token = JSON.parse(localStorage.getItem('@token'))
    try {
        const request = await fetch(`${baseUrl}departments/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${token.token}`
            }
        })
        const response = await request.json()

        if (request.ok) {
            console.log(response)
            return response
        } else {
            throw new Error(request.error)
        }
    } catch (err) {
        console.log(err)
    }
}

async function editEmplyoee(id, body) {
    const token = JSON.parse(localStorage.getItem('@token'))
    try {
        const request = await fetch(`${baseUrl}admin/update_user/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${token.token}`
            },
            body: JSON.stringify(body)
        })
        const response = request.json()
        if (!request.ok) {
            throw new Error (response.error)
        } 
    } catch (err) {
        console.log(err)
    }
}

async function deleteEmplyoee(id) {
    const token = JSON.parse(localStorage.getItem('@token'))
    try {
        const request = await fetch(`${baseUrl}admin/delete_user/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${token.token}`
            },
        })

        if (!request.ok) {
            throw new Error(request.error)
        } 
    } catch (err) {
        console.log(err)
    }
}

async function getInfoUser() {
    const token = JSON.parse(localStorage.getItem('@token'))
    try {
        const request = await fetch(`${baseUrl}users/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${token.token}`
            }
        })

        const response = await request.json()

        if (request.ok) {
            return response
        } else {
            throw new Error(request.error)
        }
    } catch (err) {
        console.log(err)
    }
}

async function getCompanyUser() {
    const token = JSON.parse(localStorage.getItem('@token'))
    try {
        const request = await fetch(`${baseUrl}users/departments`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${token.token}`
            }
        })

        const response = await request.json()

        if (request.ok) {
            return response
        } else {
            throw new Error(request.error)
        }
    } catch (err) {
        console.log(err)
    }
}

async function getCoworks() {
    const token = JSON.parse(localStorage.getItem('@token'))
    try {
        const request = await fetch(`${baseUrl}users/departments/coworkers`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${token.token}`
            }
        })

        const response = await request.json()

        if (request.ok) {
            return response
        } else {
            throw new Error(request.error)
        }
    } catch (err) {
        console.log(err)
    }
}

async function editInfoUser(body) {
    const token = JSON.parse(localStorage.getItem('@token'))
    try {
        const request = await fetch(`${baseUrl}users`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer: ${token.token}`
            },
            body: JSON.stringify(body)
        })

        if (request.ok) {
            console.log('Informações atualizadas')

        } else {
            throw new Error(request.error)
        }
    } catch (err) {
        console.log(err)
    }
}
export { userRegister, login, validateUser, allCompanies, allSectors, filterSector, allDepartments, allUsers, unemployedUsers, editDescriptionDepartment, createDepartment, hireEmployee, fireEmplyoee, deleteDepartment, filterDepartmentsCompany, editEmplyoee, deleteEmplyoee, getInfoUser, getCompanyUser, getCoworks, editInfoUser }