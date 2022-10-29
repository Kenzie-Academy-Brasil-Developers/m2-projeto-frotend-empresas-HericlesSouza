import { openMenuBurguer } from "../scripts/menuBurguer.js";
import { userRegister } from "../scripts/request.js";

openMenuBurguer()

function createUser() {
    const form = document.querySelector('.register')
    const elements = [...form.elements]
    
    form.addEventListener('submit', (event) => {
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
        userRegister(body)
    })
}
createUser()