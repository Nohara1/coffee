const buttonClose = document.querySelector('.header__container-burger-menu-close');
const burgerMenu = document.querySelector('.header__container-burger-menu');
const buttonActive = document.querySelector('.header__container-burger');
const menuButtons = document.querySelectorAll('.header__container-burger-menu-navigation-ul-link');


buttonClose.addEventListener('click', () =>{
    burgerMenu.style.display = 'none';
});

buttonActive.addEventListener('click', () =>{
    burgerMenu.style.display = 'flex';
});

menuButtons.forEach((button) =>{
    button.addEventListener('click', () =>{
        burgerMenu.style.display = 'none';
    })
})