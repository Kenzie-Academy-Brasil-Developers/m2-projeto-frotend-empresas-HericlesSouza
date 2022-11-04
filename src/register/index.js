import { openMenuBurguer } from "../scripts/menuBurguer.js";
import { userRegister } from "../scripts/request.js";

openMenuBurguer()

function createUser() {
    const form = document.querySelector('.register')
    const elements = [...form.elements]
    const paragraph = document.querySelector('.paragraph-email')
    const inputEmail = document.querySelector('#email')
    const btnRegister = document.querySelector('.btn-loading')
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        const body = {}

        elements.forEach(element => {
            if (element.tagName === "INPUT" && element.value !== "") {
                body[element.id] = element.value
            }
            if (element.tagName === "SELECT" && element.options[element.selectedIndex].value !== '0') {
                body[element.id] = element.options[element.selectedIndex].value
            }
        })
        
        inputEmail.classList.remove('error')
        btnRegister.classList.add('button--loading')
        paragraph.hidden = true
        await userRegister(body, paragraph, inputEmail)
        btnRegister.classList.remove('button--loading')
    })
}
createUser()

