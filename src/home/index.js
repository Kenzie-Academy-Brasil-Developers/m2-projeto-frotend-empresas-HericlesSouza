import { openMenuBurguer } from "../scripts/menuBurguer.js";
import { allCompanies, allSectors, filterSector } from "../scripts/request.js"

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

async function renderOptionsSelect() {
    const sectors = await allSectors()
    const select = document.querySelector('.sector-select')

    sectors.forEach(element => {
        const options = document.createElement('option')
        options.value = element.description
        options.innerText = element.description
        select.append(options)
    })
}
renderOptionsSelect()

async function filterCompanies() {
    const select = document.querySelector('.sector-select')

    select.addEventListener('change', async () => {
        const option = select.options[select.selectedIndex].value
        const ul = document.querySelector('.list-companies')
        const sector = await filterSector(option)

        if (option !== "Todos os setores") {
            ul.innerHTML = ""
            sector.forEach(element => {
                renderCompanies(element)
            })
        } else {
            ul.innerHTML = ""
            cardsCompanies()
        }
    })
}
filterCompanies()
