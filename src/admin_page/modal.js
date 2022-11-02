import { allCompanies, allDepartments, allUsers, createDepartment, deleteDepartment, deleteEmplyoee, editDescriptionDepartment, editEmplyoee, fireEmplyoee, hireEmployee, unemployedUsers } from "../scripts/request.js"
import { filterCompany, renderAllUsers, showAllModalDepartment, showAllModalUser } from "./index.js"

async function showModalDepartmentCreate() {
    const buttonIcon = document.querySelector('.btn-create-department')
    const modal = document.querySelector("#create-department")
    const buttonClose = document.querySelector('.btn-close-modal-create')
    const form = document.querySelector('#form-create-company')
    const select = document.querySelector('#company_uuid')

    const companies = await allCompanies()

    companies.forEach(element => {
        const options = document.createElement('option')
        options.value = element.name
        options.innerText = element.name
        select.append(options)
    })

    buttonIcon.addEventListener('click', () => {
        const elements = [...form]
        elements.forEach(element => {
            if (element.tagName === 'INPUT') {
                element.value = ""
            }
        })

        modal.showModal()
    })

    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        
        const elements = [...form]
        const companies = await allCompanies()
        console.log(companies)
        const body = {}

        elements.forEach(element => {
            if (element.tagName === 'INPUT') {
                body[element.id] = element.value
            }

            if (element.tagName === "SELECT" && element.options[element.selectedIndex].value !== '0') {
                companies.forEach(company => {
                    if (company.name === element.options[element.selectedIndex].value)
                        body[element.id] = company.uuid
                })
            }

            if (element.tagName === 'BUTTON') {
                element.addEventListener('click', () => {
                    console.log('oi')
                    modal.close()
                })
            }
        })
        modal.close()
        await createDepartment(body)
        await filterCompany()

    })

    buttonClose.addEventListener('click', () => {
        modal.close()
    })

}

async function renderSelectUnemployed(unemployed) {
    const listUnemployed = document.querySelector('#user-select')

    listUnemployed.innerHTML = ""

    const option = document.createElement('option')
    option.value = 'Selecionar funcionário'
    option.innerText = 'Selecionar funcionário'
    option.hidden = true
    listUnemployed.append(option)

    unemployed.forEach(element => {
        const option = document.createElement('option')
        option.value = element.username
        option.innerText = element.username
        listUnemployed.append(option)
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
                h2.id = `${user.uuid}`
                h2.innerText = `${user.username}`
                pLevel.innerText = `${user.professional_level}`
                pCompany.innerText = `${department.companies.name}`
                button.innerText = 'Desligar'

                li.append(h2, pLevel, pCompany, button)
                listEmployees.append(li)

                if (!user.professional_level) {
                    pLevel.innerText = 'júnior'
                }

                button.addEventListener('click', async () => {
                    const users = await allUsers()
                    users.forEach(async user => {
                        if (user.uuid === h2.id) {
                            await fireEmplyoee(user.uuid)
                            await renderUsersDepartment(nameDepartment)
                            await renderSelectUnemployed(await unemployedUsers())
                            await renderAllUsers()
                        }
                    })
                })
            }
        })
    })
    return listEmployees
}

function showModalDepartmentInfo() {
    const buttonIcon = document.querySelectorAll('.icon-eyes')
    const modal = document.querySelector('#info-department')
    const buttonClose = document.querySelector('.btn-close-modal')

    buttonIcon.forEach(element => {
        element.addEventListener('click', async (event) => {
            event.preventDefault()
            const departments = await allDepartments()
            const unemployeds = await unemployedUsers()

            const department = event.path[2].id
            const nameDepartment = document.querySelector('.department-name')
            const description = document.querySelector('.department-description')
            const company = document.querySelector('.department-company')
            const btnHire = document.querySelector('.hire-btn')
            renderSelectUnemployed(unemployeds)

            departments.forEach(element => {
                if (element.uuid == department) {
                    nameDepartment.innerText = `${element.name}`
                    description.innerText = `${element.description}`
                    company.innerText = `${element.companies.name}`
                }

            })

            btnHire.addEventListener('click', hire)
            async function hire() {
                const unemployedsBtn = await unemployedUsers()
                const listUnemployed = document.querySelector('#user-select')
                const emplyoee = listUnemployed.options[listUnemployed.selectedIndex].value
                const body = {}

                unemployedsBtn.forEach(element => {
                    if (element.username === emplyoee) {
                        body['user_uuid'] = element.uuid
                        body['department_uuid'] = department
                    }
                })
                await hireEmployee(body)
                await renderUsersDepartment(department)
                await renderSelectUnemployed(await unemployedUsers())
                await renderAllUsers()
                await showAllModalUser()
            }

            await renderUsersDepartment(department)
            modal.showModal(department)

            buttonClose.addEventListener('click', () => {
                btnHire.removeEventListener('click', hire)
                modal.close()
            })
        })
    })

}

function showModalDepartmentEdit() {
    const buttonIcon = document.querySelectorAll('#icon-edit-department')
    const modal = document.querySelector("#edit-department")
    const buttonClose = document.querySelector('.btn-close-modal-edit')
    const descriptionModal = document.querySelector('#department-description')
    const buttonSave = document.querySelector('#btn-save')

    buttonIcon.forEach(element => {
        element.addEventListener('click', async (event) => {
            const departments = await allDepartments()
            const department = event.path[2].id

            departments.forEach(element => {
                if (element.uuid === department) {
                    descriptionModal.value = element.description
                }
            })

            buttonSave.addEventListener('click', async (event) => {
                event.preventDefault()
                const body = {
                    description: descriptionModal.value
                }
                await editDescriptionDepartment(department, body)
                await filterCompany()

                modal.close()
            }, { once: true })

            modal.showModal()
        })
    })

    buttonClose.addEventListener('click', () => {
        modal.close()
    })
}

function showModalDepartmentDelete() {
    const buttonIcon = document.querySelectorAll('#icon-delete-department')
    const modal = document.querySelector("#delete-department")
    const buttonClose = document.querySelector('.btn-close-modal-delete')
    const nameDepartment = document.querySelector('#name-department')

    buttonIcon.forEach(element => {
        element.addEventListener('click', async (event) => {
            const departmentId = event.path[2].id
            const department = await allDepartments()

            department.forEach(element => {
                if (element.uuid === departmentId) {
                    nameDepartment.innerText = element.name
                }
            })
            modal.showModal()

            const btnDelete = document.querySelector('.btn-delete-employees-confirm')
            btnDelete.addEventListener('click', async () => {
                await deleteDepartment(departmentId)
                await filterCompany()
                await renderAllUsers()

                modal.close()
            }, { once: true })
        })
    })

    buttonClose.addEventListener('click', () => {
        modal.close()
    })
}

function showModalEditUser() {
    const buttonIcon = document.querySelectorAll('#icon-edit-user')
    const modal = document.querySelector("#edit-user")
    const buttonClose = document.querySelector('.btn-close-modal-edit-user')

    buttonIcon.forEach(element => {
        element.addEventListener('click', (event) => {
            const id = event.path[2].id
            const form = document.querySelector('#form-edit-user')
            const elements = [...form]
            const body = {}

            elements.forEach(element => {
                if (element.tagName === 'SELECT') {
                    element.addEventListener('change', () => {
                        if (element.tagName === 'SELECT' && element.options[element.selectedIndex].value !== '0') {
                            body[element.id] = element.options[element.selectedIndex].value
                        }
                    })
                }
                if (element.tagName === 'BUTTON') {
                    element.addEventListener('click', async (event) => {
                        event.preventDefault()
                        await editEmplyoee(id, body)
                        await renderAllUsers()
                        await showAllModalDepartment()
                        await showAllModalUser()
                        modal.close()
                    }, { once: true })
                }
            })

            modal.showModal()
        })
    })

    buttonClose.addEventListener('click', () => {
        modal.close()
    })
}

function showModalDeleteUser() {
    const buttonIcon = document.querySelectorAll('#icon-trash-user')
    const modal = document.querySelector("#delete-user")
    const buttonClose = document.querySelector('.btn-close-modal-delete-user')

    buttonIcon.forEach(element => {
        element.addEventListener('click', async (event) => {
            const id = event.path[2].id
            const li = event.path[2]
            const name = li.firstChild.firstChild.innerText
            const nameUser = document.querySelector('#name-user')
            nameUser.innerText = name

            const buttonDelete = document.querySelector('.btn-delete-user-confirm')

            buttonDelete.addEventListener('click', async () => {
                await deleteEmplyoee(id)
                await renderAllUsers()
                await showAllModalDepartment()
                await showAllModalUser()
                modal.close()
            }, { once: true })
            modal.showModal()
        })
    })

    buttonClose.addEventListener('click', () => {
        modal.close()
    })
}
export { showModalDepartmentCreate, showModalDepartmentInfo, showModalDepartmentEdit, showModalDepartmentDelete, showModalEditUser, showModalDeleteUser }