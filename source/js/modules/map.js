const DEFAULT_ZOOM = 20;
const PinLocation = {
  LAT: 59.968321,
  LNG: 30.317462,
};
const POPUP_TEXT = 'Санкт-Петербург, набережная реки Карповки, дом 5';
const popup = L.popup()
  .setContent('<p>Санкт-Петербург, <br /> набережная реки Карповки, дом 5<br /><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" style="opacity: 0;">...</a></p>');

const InitLocation = {
  LAT: 59.968385,
  LNG: 30.317392,
}
const PIN_ICON_WIDTH = 38;
const PIN_ICON_HEIGHT = 50;
const PIN_IMAGE = 'img/mappin.svg';

const mapContainer = document.querySelector('.map');

const initMap = () => {
  mapContainer.classList.remove('map--no-js');
}

const map = L.map('map');
const mainMarker = L.marker([0,0]);
const openStreetMapLayer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
);

const mainPinIcon = L.icon({
  iconUrl: PIN_IMAGE,
  iconSize: [PIN_ICON_WIDTH, PIN_ICON_HEIGHT],
  iconAnchor: [PIN_ICON_WIDTH / 2, PIN_ICON_HEIGHT],
});

const createMarker = () => {
  mainMarker
    .setLatLng(
      {
        lat: PinLocation.LAT,
        lng: PinLocation.LNG,
      })
    .setIcon(mainPinIcon)
    .addTo(map)
    .bindPopup(popup);
};

const createMap = (coordinate) => {
  map
    .setView(
      {
        lat: coordinate.LAT,
        lng: coordinate.LNG,
      },
      DEFAULT_ZOOM
    );

  openStreetMapLayer.addTo(map);
  createMarker();
};

export {initMap, createMap, InitLocation}
