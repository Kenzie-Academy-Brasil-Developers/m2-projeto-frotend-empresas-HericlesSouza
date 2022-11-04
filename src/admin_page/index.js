import { allCompanies, allDepartments, allUsers, filterDepartmentsCompany, userAdmin } from "../scripts/request.js"
import { showModalDeleteUser, showModalDepartmentCreate, showModalDepartmentDelete, showModalDepartmentEdit, showModalDepartmentInfo, showModalEditUser } from "./modal.js";

userAdmin()
async function checkedLogged() {
    const token = localStorage.getItem('@token')
    if (!token) {
        window.location.href = '../login/index.html'
    }
    const btnLogout = document.querySelector('.btn-login-burguer')
    btnLogout.addEventListener('click', () => {
        localStorage.clear()
    })

}
checkedLogged()

async function renderAllDepartments() {
    const departments = await allDepartments()
    const ul = document.querySelector('.list-departments')
    ul.innerHTML = ""

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
                <div id="icon-edit-department" class="icon-edit"></div>
                <div id="icon-delete-department" class="icon-trash"></div>
            </div>
        </li>
        `)
    });
    await showAllModalDepartment()
    await showAllModalUser()
}

async function renderAllUsers() {
    const users = await allUsers()
    const departments = await allDepartments()
    const ul = document.querySelector('.list-users')
    ul.innerHTML = ""
    users.forEach(element => {
        if (element.username !== 'ADMIN') {

            const li = document.createElement('li')
            const divInfo = document.createElement('div')
            const h2 = document.createElement('h2')
            const pLevel = document.createElement('p')
            const pCompany = document.createElement('p')
            const divIcons = document.createElement('div')
            const divEdit = document.createElement('div')
            const divTrash = document.createElement('div')

            li.classList = 'info-user flex flex-col justify-between'
            li.id = `${element.uuid}`
            divInfo.classList = 'div-info-user flex flex-col'
            divIcons.classList = 'div-icons flex align-center justify-center'
            divEdit.classList = 'icon-edit'
            divEdit.id = 'icon-edit-user'
            divTrash.classList = 'icon-trash'
            divTrash.id = 'icon-trash-user'

            h2.innerText = `${element.username}`
            pLevel.innerText = `${element.professional_level}`
            pCompany.innerText = 'Desempregado'

            li.append(divInfo, divIcons)
            divInfo.append(h2, pLevel, pCompany)
            divIcons.append(divEdit, divTrash)
            ul.append(li)

            departments.forEach(department => {
                if (department.uuid === element.department_uuid) {
                    pCompany.innerText = department.companies.name
                }
            })

            if (!element.professional_level) {
                pLevel.innerText = 'júnior'
            }
        }
    })
}
renderAllUsers()

async function filterCompany() {
    const companies = await allCompanies()
    const select = document.querySelector('#select-all-companies')
    const option = select.options[select.selectedIndex].value

    if (select.length <= 2) {
        companies.forEach(element => {
            const options = document.createElement('option')
            options.value = element.name
            options.innerText = element.name
            select.append(options)
        })

        select.addEventListener('change', async () => {
            const options = select.options[select.selectedIndex].value
            const companies = await allCompanies()

            if (options !== 'Todas') {
                companies.forEach(async company => {
                    if (company.name === options) {
                        const companyFilter = await filterDepartmentsCompany(company.uuid)
                        renderFilterCompany(companyFilter)
                    }
                })
            } else {
                await renderAllDepartments()
            }
        })
    }

    if (option === '0' || option === 'Todas') {
        await renderAllDepartments()
    } else {
        const options = select.options[select.selectedIndex].value
        const companies = await allCompanies()

        if (options !== 'Todas') {
            companies.forEach(async company => {
                if (company.name === options) {
                    const companyFilter = await filterDepartmentsCompany(company.uuid)
                    renderFilterCompany(companyFilter)
                }
            })
        }
    }
}
filterCompany()

async function renderFilterCompany(array) {
    const ul = document.querySelector('.list-departments')
    ul.innerHTML = ""

    array.forEach(element => {
        ul.insertAdjacentHTML('beforeend', `
        <li id="${element.uuid}" class="info-department flex flex-col justify-between">
            <div class="div-info-department flex flex-col">
                <h2>${element.name}</h2>
                <p>${element.description}</p>
                <p>${element.companies.name}</p>
            </div>
            <div class="div-icons flex align-center justify-center">
                <div class="icon-eyes"></div>
                <div id="icon-edit-department" class="icon-edit"></div>
                <div id="icon-delete-department" class="icon-trash"></div>
            </div>
        </li>
        `)
    });
    await showAllModalDepartment()
    await showAllModalUser()
}

async function showAllModalDepartment() {
    showModalDepartmentEdit()
    showModalDepartmentInfo()
    showModalDepartmentDelete()
}

async function showAllModalUser() {
    showModalEditUser()
    showModalDeleteUser()
}

function clearLocalStorage() {
    const btnLogout = document.querySelector('#btn-logout')
    btnLogout.addEventListener('click', () => {
        localStorage.clear()
    })
}
clearLocalStorage()
showModalDepartmentCreate()
export { filterCompany, showAllModalDepartment, renderAllUsers, showAllModalUser }
