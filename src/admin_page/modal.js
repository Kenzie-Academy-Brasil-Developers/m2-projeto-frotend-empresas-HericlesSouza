function showModalDepartmentCreate() {
    const buttonIcon = document.querySelector('.btn-create-department')
    const modal = document.querySelector("#create-department")
    const buttonClose = document.querySelector('.btn-close-modal-create')
    buttonIcon.addEventListener('click', () => {
        modal.showModal()
    })
    console.log(buttonClose)
    buttonClose.addEventListener('click', () => {
        modal.close()
    })
}
showModalDepartmentCreate()

function showModalDepartmentInfo() {
    const buttonIcon = document.querySelector('.icon-eyes')
    const modal = document.querySelector('#info-department')
    const buttonClose = document.querySelector('.btn-close-modal')
    buttonIcon.addEventListener('click', () => {
        modal.showModal()
    })
    console.log(buttonClose)
    buttonClose.addEventListener('click', () => {
        modal.close()
    })
}
showModalDepartmentInfo()

function showModalDepartmentEdit() {
    const buttonIcon = document.querySelector('.icon-edit')
    const modal = document.querySelector("#edit-department")
    const buttonClose = document.querySelector('.btn-close-modal-edit')
    buttonIcon.addEventListener('click', () => {
        modal.showModal()
    })
    console.log(buttonClose)
    buttonClose.addEventListener('click', () => {
        modal.close()
    })
}
showModalDepartmentEdit()

function showModalDepartmentDelete() {
    const buttonIcon = document.querySelector('.icon-trash')
    const modal = document.querySelector("#delete-department")
    const buttonClose = document.querySelector('.btn-close-modal-delete')
    buttonIcon.addEventListener('click', () => {
        modal.showModal()
    })
    console.log(buttonClose)
    buttonClose.addEventListener('click', () => {
        modal.close()
    })
}
showModalDepartmentDelete()
