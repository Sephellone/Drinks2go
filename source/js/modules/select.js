import { isEscapeKey, isTabKey, isEnterKey } from './util.js';

const selectElement = document.querySelector('#sort');
const focusableElment = document.querySelector('.catalog__sort--styled');
const pseudoSelect = document.querySelector('#styled-sort');
const styledSelectOptionsList = document.querySelector('.styled-select');
const unstyledSelectContainer = document.querySelector('.catalog__sort-wrapper--no-js');
const styledSelectContainer = document.querySelector('.catalog__sort-wrapper--js');
const buttons = styledSelectOptionsList.querySelectorAll('.styled-select__option');

const hideUnstyledSelect = () => {
  unstyledSelectContainer.classList.add('catalog__sort-wrapper--hidden');
  styledSelectContainer.classList.remove('catalog__sort-wrapper--hidden');
}

hideUnstyledSelect();

function onSelectEscKeydown (evt) {
  if (isEscapeKey(evt)) {
    closeStyledOptionsList();
  }
}

const openStyledOptionsList = () => {
  styledSelectOptionsList.classList.add('styled-select--open');
  styledSelectOptionsList.classList.remove('styled-select--closed');
  styledSelectContainer.classList.toggle('catalog__sort-wrapper--open');
  document.addEventListener('keydown', onSelectEscKeydown);
  document.addEventListener('click', onOutsideClick);
}

const closeStyledOptionsList = () => {
  styledSelectOptionsList.classList.remove('styled-select--open');
  styledSelectOptionsList.classList.add('styled-select--closed');
  styledSelectContainer.classList.toggle('catalog__sort-wrapper--open');
  document.removeEventListener('keydown', onSelectEscKeydown);
  document.removeEventListener('click', onOutsideClick);
}

function onOutsideClick (evt) {
  if (!evt.target.closest('.styled-select')
    && evt.target !== pseudoSelect) {
    closeStyledOptionsList();
  }
}

const onButtonOptionClick = (evt) => {
  buttons.forEach(button => {
    button.classList.remove('styled-select__option--selected');
  })
  evt.target.classList.add('styled-select__option--selected');
  selectElement.value = evt.target.name;
  pseudoSelect.textContent = evt.target.textContent;
  closeStyledOptionsList();
}

buttons.forEach(button => {
  button.addEventListener('click', onButtonOptionClick);
});

const onSelectClick = () => {
  if (styledSelectOptionsList.classList.contains('styled-select--closed')) {
    openStyledOptionsList()
  } else {
    closeStyledOptionsList()
  }
}

const onFocusElementTab = (evt) => {
  if (isTabKey(evt)) {
    if (document.activeElement === focusableElment) {
      openStyledOptionsList();
    }

    if (styledSelectOptionsList.classList.contains('styled-select--open')
      && document.activeElement !== focusableElment
      && !document.activeElement.classList.contains('styled-select__option')) {
        closeStyledOptionsList();
    }
  }
}

document.addEventListener('keydown', onFocusElementTab);

const onPseudoSelectEnterPress = (evt) => {
  if (isEnterKey(evt)) {
    onSelectClick();
  }
}

pseudoSelect.addEventListener('click', onSelectClick);
focusableElment.addEventListener('keydown', onPseudoSelectEnterPress);
