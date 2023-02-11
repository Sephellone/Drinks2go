/* в этот файл добавляет скрипты*/
import { initiateBurgerButton, initiateMenu } from './modules/burger-menu.js';
import { initMap, createMap, InitLocation } from './modules/map.js';
import './modules/range-slider.js';
import './modules/slider.js';
import './modules/select.js';

initiateMenu();
initiateBurgerButton();
initMap();
createMap(InitLocation);
