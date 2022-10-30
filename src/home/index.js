import { openMenuBurguer } from "../scripts/menuBurguer.js";
import { allCompanies } from "../scripts/request.js";

openMenuBurguer()

const array = await allCompanies()

async function cardsCompanies(array) {
    const ul = document.querySelector('.list-companies')
    array.forEach(element => {
        const li = document.createElement('li')
        const h2 = document.createElement('h2')
        const p = document.createElement('p')
        const button = document.createElement('button')

        li.classList = 'company'
        button.classList = 'sector-company'

        h2.innerText = element.name
        p.innerText = `${element.opening_hours} horas`
        button.innerText = element.sectors.description

        li.append(h2, p, button)
        ul.append(li)
    });
    return ul
}
cardsCompanies(array)