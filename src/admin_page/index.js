import { allDepartments, allUsers } from "../scripts/request.js"
import { showModalDepartmentCreate, showModalDepartmentDelete, showModalDepartmentEdit, showModalDepartmentInfo } from "./modal.js";

async function renderAllDepartments() {
    const departments = await allDepartments()
    const ul = document.querySelector('.list-departments')

    departments.forEach(element => {
        ul.insertAdjacentHTML('beforeend', `
        <li class="info-department flex flex-col justify-between">
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
    const ul = document.querySelector('.list-users')

    users.forEach(element => {
        ul.insertAdjacentHTML('beforeend', `
            <li class="info-user flex flex-col justify-between">
                <div class="div-info-user flex flex-col">
                    <h2>${element.username}</h2>
                    <p>${element.professional_level}</p>
                    <p>Company Name</p>
                </div>
                <div class="div-icons flex align-center justify-center">
                    <div class="icon-edit"></div>
                    <div class="icon-trash"></div>
                    </div>
            </li>
        `)
    })
}

renderAllUsers()
allUsers()

showModalDepartmentCreate()
showModalDepartmentInfo()
showModalDepartmentEdit()
showModalDepartmentDelete()


