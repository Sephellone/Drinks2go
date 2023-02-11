const toggleClasses = (element, closedClass, openClass) => {
  if (element.classList.contains(closedClass)) {
    element.classList.remove(closedClass);
    element.classList.add(openClass);
  } else {
    element.classList.remove(openClass);
    element.classList.add(closedClass);
  }
};

const isTabKey = (evt) =>  evt.keyCode === 9;

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.keyCode === 13;


export {toggleClasses, isTabKey, isEscapeKey, isEnterKey};
