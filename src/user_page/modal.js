import { editInfoUser } from "../scripts/request.js"
import { renderHeader } from "./index.js"

function showModalEditUser() {
    const btnEdit = document.querySelector('.photo-edit-user')
    const modal = document.querySelector('#edit-info-user')
    const btnClose = document.querySelector('.btn-close-modal-create')
    const paragraph = document.querySelector('.paragraph-email')
    const btnSubmit = document.querySelector('.btn-edit')
    const form = document.querySelector('#form-user-edit')
    
    btnEdit.addEventListener('click', () => {
        form.addEventListener('submit', async (event) => {
            event.preventDefault()
            const elements = [...form]
            const body = {}

            elements.forEach(element => {
                if(element.tagName === 'INPUT' && element.value !== '') {
                    body[element.id] = element.value
                }
            })
            paragraph.hidden = true
            btnSubmit.classList.add('button--loading')
            await editInfoUser(body, document.querySelector('body'), paragraph, modal)
            await renderHeader()
            btnSubmit.classList.remove('button--loading')
            modal.close()
        }, {once:true}) 
        modal.showModal()
    })

    btnClose.addEventListener('click', () => {
        modal.close()
    })
}
showModalEditUser()