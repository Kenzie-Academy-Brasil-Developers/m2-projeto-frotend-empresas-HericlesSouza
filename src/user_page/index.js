import { getCompanyUser, getCoworks, getInfoUser, userNormal} from "../scripts/request.js"

userNormal()
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

async function renderHeader() {
    const h1 = document.querySelector('.user-name')
    const pEmail = document.querySelector('.user-email')
    const pLevel = document.querySelector('.profissional-level')
    const pWork = document.querySelector('.type-work')
    const user = await getInfoUser()

    h1.innerText = `${user.username}`.toUpperCase()
    pEmail.innerText = `Email: ${user.email}`

    if (!user.kind_of_work) {
        pWork.classList.add('hidden')
    } else {
        const typeWork = pWork.innerText = `${user.kind_of_work}`
        const typeWorkFormated = typeWork[0].toUpperCase() + typeWork.substring(1);
        pWork.innerText = typeWorkFormated
    }

    if (!user.professional_level) {
        pLevel.classList.add('hidden')
    } else {
        const level = pLevel.innerText = `${user.professional_level}`
        const levelFormated = level[0].toUpperCase() + level.substring(1);
        pLevel.innerText = levelFormated
    }

    if (!user.department_uuid) {
        const displayUnemployed = document.querySelector('.user-without-company')
        const displayEmployed = document.querySelector('.info-company')
        displayUnemployed.classList.remove('hidden')
        displayEmployed.classList.add('hidden')
    }
}
renderHeader()

async function callFunctionRenders() {
    const user = await getInfoUser()
    if (user.department_uuid) {
        renderNameCompany()
        renderCoworks()
    }
}
callFunctionRenders()

async function renderNameCompany() {
    const company = document.querySelector('.title-company')
    const user = await getInfoUser()
    const userCompany = await getCompanyUser()

    userCompany.departments.forEach(element => {
        if (element.uuid === user.department_uuid) {
            company.innerText = `${userCompany.name} - ${element.name}`
        }
    })
}


async function renderCoworks() {
    const ul = document.querySelector('.cowork-list')
    const user = await getInfoUser()
    const departmentCoworks = await getCoworks()
    const usersCoworks = departmentCoworks[0].users

    usersCoworks.forEach(element => {
        if (user.uuid !== element.uuid) {
            ul.insertAdjacentHTML('beforeend', `
                    <li class="info-cowork">
                        <h2>${element.username}</h2>
                        <p>${element.professional_level}</p>
                    </li>
                `)
        }
    })
}

export { renderHeader }