import { allDepartments, allUsers, unemployedUsers } from "../scripts/request.js"

function showModalDepartmentCreate() {
    const buttonIcon = document.querySelector('.btn-create-department')
    const modal = document.querySelector("#create-department")
    const buttonClose = document.querySelector('.btn-close-modal-create')
    buttonIcon.addEventListener('click', () => {
        modal.showModal()
    })

    buttonClose.addEventListener('click', () => {
        modal.close()
    })
}

function showModalDepartmentInfo() {
    const buttonIcon = document.querySelectorAll('.icon-eyes')
    const modal = document.querySelector('#info-department')
    const buttonClose = document.querySelector('.btn-close-modal')

    buttonIcon.forEach(element => {
        element.addEventListener('click', async (event) => {
            const departments = await allDepartments()
            const unemployeds = await unemployedUsers()
            const users = await allUsers()

            const department = event.path[2].id
            const nameDepartment = document.querySelector('.department-name')
            const description = document.querySelector('.department-description')
            const company = document.querySelector('.department-company')
            const listUnemployed = document.querySelector('#user-select')

            departments.forEach(element => {
                if (element.uuid == department) {
                    nameDepartment.innerText = `${element.name}`
                    description.innerText = `${element.description}`
                    company.innerText = `${element.companies.name}`
                }

            })

            unemployeds.forEach(element => {
                const option = document.createElement('option')
                option.value = element.username
                option.innerText = element.username
                listUnemployed.append(option)
            })
            await renderUsersDepartment(department)
            modal.showModal()
        })
    })

    buttonClose.addEventListener('click', () => {
        modal.close()
    })
}

async function renderUsersDepartment(nameDepartment) {
    const listEmployees = document.querySelector('.list-employees')
    listEmployees.innerHTML = ""
    const departments = await allDepartments()
    const users = await allUsers()

    users.forEach(user => {
        departments.forEach(department => {
            if ((user.department_uuid === department.uuid) && (department.uuid === nameDepartment)) {
                const li = document.createElement('li')
                const h2 = document.createElement('h2')
                const pLevel = document.createElement('p')
                const pCompany = document.createElement('p')
                const button = document.createElement('button')
                
                li.classList = 'employee flex flex-col'
                h2.classList = 'name'
                pLevel.classList = 'profissional_level'
                pCompany.classList = 'company-name'
                button.classList = 'dismiss align-self-center'

                h2.innerText = `${user.username}`
                pLevel.innerText = `${user.professional_level}`
                pCompany.innerText = `${department.companies.name}`
                button.innerText = 'Desligar'

                li.append(h2, pLevel, pCompany, button)
                listEmployees.append(li)

                if(!user.professional_level) {
                    pLevel.innerText = 'júnior'
                }
            }
        })
    })
    return listEmployees
}

function showModalDepartmentEdit() {
    const buttonIcon = document.querySelector('.icon-edit')
    const modal = document.querySelector("#edit-department")
    const buttonClose = document.querySelector('.btn-close-modal-edit')
    buttonIcon.addEventListener('click', () => {
        modal.showModal()
    })

    buttonClose.addEventListener('click', () => {
        modal.close()
    })
}

function showModalDepartmentDelete() {
    const buttonIcon = document.querySelector('.icon-trash')
    const modal = document.querySelector("#delete-department")
    const buttonClose = document.querySelector('.btn-close-modal-delete')
    buttonIcon.addEventListener('click', () => {
        modal.showModal()
    })

    buttonClose.addEventListener('click', () => {
        modal.close()
    })
}

export { showModalDepartmentCreate, showModalDepartmentInfo, showModalDepartmentEdit, showModalDepartmentDelete }