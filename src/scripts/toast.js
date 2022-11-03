function toast (color, text) {
    const divHeader = document.querySelector('.content-header')
    const divToast = document.createElement('div')
    const h1 = document.createElement('h1')

    divToast.classList = `toast-container ${color} absolute flex align-center justify-center`
    
    h1.innerText = `${text}`

    divToast.append(h1)
    divHeader.append(divToast)
}

function toastModal(color, text, div) {
    const divToast = document.createElement('div')
    const h1 = document.createElement('h1')

    divToast.classList = `toast-container-info ${color} fixed flex align-center justify-center`
    
    h1.innerText = `${text}`
    divToast.append(h1)
    div.append(divToast)
}
export {toast, toastModal}