import { toggleClasses } from './util.js';

const menuButton = document.querySelector('.header__menu-toggler');
const navigation = document.querySelector('.header__nav');

const initiateMenu = () => {
  navigation.classList.remove('header__nav--no-js');
  navigation.classList.add('header__nav--closed')
}

const onMenuButtonClick = () => {
  toggleClasses(navigation, 'header__nav--closed', 'header__nav--opened');
  toggleClasses(menuButton, 'header__menu-toggler--burger', 'header__menu-toggler--cross')
}

const initiateBurgerButton = () => {
  menuButton.addEventListener('click', onMenuButtonClick)
}

export {initiateMenu, initiateBurgerButton};
