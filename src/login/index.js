import {openMenuBurguer} from "../scripts/menuBurguer.js";
import { login, validateUser } from "../scripts/request.js";

openMenuBurguer()

async function autoLogin() {
    await validateUser()
}
autoLogin()

function loginUser() {
    const form = document.querySelector('.login')
    const paragraph = document.querySelector('.paragraph-error')
    const btnLogin = document.querySelector('.btn-loading')
    
    const elements = [...form]

    form.addEventListener("submit", async (event) => {
        event.preventDefault()
        const body = {}
        elements.forEach(element => {
            if(element.tagName === "INPUT" && element.value !== ""){
                body[element.id] = element.value
            }
        })
    
        btnLogin.classList.add('button--loading')
        paragraph.hidden = true
        await login(body, paragraph)
        btnLogin.classList.remove('button--loading')
    })
}
loginUser()