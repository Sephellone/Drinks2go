import { isEnterKey } from './util.js';

const MIN_PRICE = 0;
const MAX_PRICE = 1000;

const submitButton = document.querySelector('.filters__button--submit');

submitButton.addEventListener('click', (evt) => evt.preventDefault());

const sliderContainer = document.querySelector('.range-slider__track');
const minHandle = sliderContainer.querySelector('.range-slider__handle--min');
const maxHandle = sliderContainer.querySelector('.range-slider__handle--max');
const resizableSlider = sliderContainer.querySelector('.range-slider__slider');
const minInput = document.querySelector('#min-price');
const maxInput = document.querySelector('#max-price');

const rangeSliderWidth = sliderContainer.getBoundingClientRect().width;
const rangeSliderLeft = sliderContainer.getBoundingClientRect().left;
const rangeSliderRight = sliderContainer.getBoundingClientRect().right;
const handleWidth = minHandle.offsetWidth;
const shiftX = handleWidth / 2;
const handleWidthPercent = handleWidth * 100 / rangeSliderWidth;

let resizableSliderChangableLeft = Math.round((resizableSlider.getBoundingClientRect().left - rangeSliderLeft) * 100 / rangeSliderWidth);
let resizableSliderChangableRight = Math.round((rangeSliderRight - resizableSlider.getBoundingClientRect().right) * 100 / rangeSliderWidth);
let target;

let roundedLeftPercent;
let leftPercent;
let roundedRightPercent;
let rightPercent;

const updateResizableSlider = () => {
  resizableSlider.setAttribute('style', `left: ${resizableSliderChangableLeft}%; right: ${resizableSliderChangableRight}%`);
}

const onMouseMove = (evt) => {
  const minHandleLeft = minHandle.getBoundingClientRect().left - rangeSliderLeft;
  const minHandleRight = rangeSliderRight - minHandle.getBoundingClientRect().right;
  const maxHandleLeft = maxHandle.getBoundingClientRect().left - rangeSliderLeft;
  const maxHandleRight = rangeSliderRight - maxHandle.getBoundingClientRect().right;

  if (target === minHandle) {
    let newLeft = evt.clientX - shiftX - rangeSliderLeft;
    if (newLeft < 0) {
      newLeft = 0;
    }
    if (newLeft > maxHandleLeft) {
      newLeft = maxHandleLeft;
    }
    leftPercent = newLeft / (rangeSliderWidth);
    roundedLeftPercent = Math.round(leftPercent * 100);
    resizableSliderChangableLeft = roundedLeftPercent;
    minInput.value = Math.round(MAX_PRICE * leftPercent);

    minHandle.setAttribute('style', `left: ${roundedLeftPercent}%;`);
  }

  if (target === maxHandle) {
    let newRight = rangeSliderRight - evt.clientX - shiftX;
    if (newRight < 0) {
      newRight = 0;
    }
    if (newRight > minHandleRight) {
      newRight = minHandleRight;
    }
    rightPercent = newRight / (rangeSliderWidth);
    roundedRightPercent = Math.round(rightPercent * 100);
    resizableSliderChangableRight = roundedRightPercent;
    maxInput.value = Math.round(MAX_PRICE - MAX_PRICE * rightPercent);

    maxHandle.setAttribute('style', `right: ${roundedRightPercent}%;`);
  }
  updateResizableSlider();
}

const onMinInputChange = () => {
  let valuePercent;
  if (minInput.value < 0) {
    minInput.value = 0;
  } else if (+minInput.value > +maxInput.value) {
    minInput.value = maxInput.value;
    valuePercent = minInput.value * 100 / MAX_PRICE - handleWidthPercent;
  } else {
    valuePercent = minInput.value * 100 / MAX_PRICE;
  }

  minHandle.setAttribute('style', `left: ${valuePercent}%;`);
  resizableSliderChangableLeft = valuePercent;
  updateResizableSlider();
}

const onMaxInputChange = () => {
  let valuePercent;

  if (+maxInput.value < +minInput.value) {
    maxInput.value = minInput.value;
  }
  valuePercent = maxInput.value * 100 / MAX_PRICE + handleWidthPercent;

  if (maxInput.value > MAX_PRICE) {
    maxInput.value = MAX_PRICE;
    valuePercent = maxInput.value * 100 / MAX_PRICE;
  }

  maxHandle.setAttribute('style', `right: ${100 - valuePercent}%;`);
  resizableSliderChangableRight = 100 - valuePercent;
  updateResizableSlider();
};

const onMouseUp = () => {
  document.removeEventListener('mouseup', onMouseUp)
  document.removeEventListener('mousemove', onMouseMove)
};

minInput.value = 0;
maxInput.value = 900;
updateResizableSlider();

minHandle.addEventListener('mousedown', () => {
  target = minHandle;
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
})

maxHandle.addEventListener('mousedown', () => {
  target = maxHandle;
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
})

minInput.addEventListener('change', onMinInputChange);
maxInput.addEventListener('change', onMaxInputChange);
