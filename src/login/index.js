import {openMenuBurguer} from "../scripts/menuBurguer.js";
import { login } from "../scripts/request.js";

openMenuBurguer()

function loginUser() {
    const form = document.querySelector('.login')
    const elements = [...form]

    form.addEventListener("submit", (event) => {
        event.preventDefault()
        const body = {}

        elements.forEach(element => {
            if(element.tagName === "INPUT" && element.value !== ""){
                body[element.id] = element.value
            }
        })
        login(body)
    })
}
loginUser()