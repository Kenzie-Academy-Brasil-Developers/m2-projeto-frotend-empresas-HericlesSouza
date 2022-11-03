function openMenuBurguer() {
    const menu = document.querySelector('.img-burguer')
    const divBurguer = document.querySelector('.menu-burguer')
    const closeMenu = document.querySelector('.btn-close-menu')

    menu.addEventListener('click', () => {
        divBurguer.hidden = false;
    })

    closeMenu.addEventListener('click', () => {
        divBurguer.hidden = true;
    })
}
export {openMenuBurguer}