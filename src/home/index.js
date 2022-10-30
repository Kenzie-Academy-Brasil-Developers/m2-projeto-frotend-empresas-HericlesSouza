import { openMenuBurguer } from "../scripts/menuBurguer.js";
import { allCompanies } from "../scripts/request.js";

openMenuBurguer()

async function cardsCompanies() {
    const companies = await allCompanies()
    companies.forEach(element => {
        renderCompanies(element)
    });
}
cardsCompanies()

async function renderCompanies(array) {
    const ul = document.querySelector('.list-companies')

    const li = document.createElement('li')
    const h2 = document.createElement('h2')
    const p = document.createElement('p')
    const button = document.createElement('button')

    li.classList = 'company'
    button.classList = 'sector-company'

    h2.innerText = array.name
    p.innerText = `${array.opening_hours} horas`
    button.innerText = array.sectors.description

    li.append(h2, p, button)
    ul.append(li)

    return ul
}

async function filterCompanies(array) {
    const button = document.querySelector('.btn-select-sector')
    console.log(button)
}

filterCompanies()