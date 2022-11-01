import { allCompanies, allDepartments, allUsers } from "../scripts/request.js"
import { showModalDepartmentCreate, showModalDepartmentDelete, showModalDepartmentEdit, showModalDepartmentInfo } from "./modal.js";

async function renderAllDepartments() {
    const departments = await allDepartments()
    const ul = document.querySelector('.list-departments')

    departments.forEach(element => {
        ul.insertAdjacentHTML('beforeend', `
        <li id="${element.uuid}" class="info-department flex flex-col justify-between">
            <div class="div-info-department flex flex-col">
                <h2>${element.name}</h2>
                <p>${element.description}</p>
                <p>${element.companies.name}</p>
            </div>
            <div class="div-icons flex align-center justify-center">
                <div class="icon-eyes"></div>
                <div class="icon-edit"></div>
                <div class="icon-trash"></div>
            </div>
        </li>
        `)
    });
}
await renderAllDepartments()

async function renderAllUsers() {
    const users = await allUsers()
    const departments = await allDepartments()
    const ul = document.querySelector('.list-users')

    users.forEach(element => {
        if(element.username !== 'ADMIN') {
            
            const li = document.createElement('li')
            const divInfo = document.createElement('div')
            const h2 = document.createElement('h2')
            const pLevel = document.createElement('p')
            const pCompany = document.createElement('p')
            const divIcons = document.createElement('div')
            const divEdit = document.createElement('div')
            const divTrash = document.createElement('div')
    
            li.classList = 'info-user flex flex-col justify-between'
            divInfo.classList = 'div-info-user flex flex-col'
            divIcons.classList = 'div-icons flex align-center justify-center'
            divEdit.classList = 'icon-edit'
            divTrash.classList = 'icon-trash'
    
            h2.innerText = `${element.username}`
            pLevel.innerText = `${element.professional_level}`
            pCompany.innerText = 'Desempregado'
    
            li.append(divInfo, divIcons)
            divInfo.append(h2, pLevel, pCompany)
            divIcons.append(divEdit, divTrash)
            ul.append(li)

            departments.forEach (department => {
                if(department.uuid === element.department_uuid) {
                    pCompany.innerText = department.companies.name
                }
            })

            if(!element.professional_level) {
                pLevel.innerText = 'júnior'
            }
        }
    })
}
renderAllUsers()

async function filterCompany() {
    const companies = await allCompanies()
    const select = document.querySelector('#select-all-companies')

    companies.forEach(element => {
        const options = document.createElement('option')
        options.value = element.name
        options.innerText = element.name
        select.append(options)
    })
    
}
filterCompany()

showModalDepartmentCreate()
showModalDepartmentInfo()
showModalDepartmentEdit()
showModalDepartmentDelete()


