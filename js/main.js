import {GEO} from "./location.js";

const APP = {
  baseURL: 'https://api.mapbox.com/styles/v1/mapbox',
  style: 'streets-v11', //matches HTML
  lon: -122.4241,
  lat: 37.78,
  zoom: 10, //matches HTML
  bearing: 0,
  pitch: 60, //matches HTML
  size: '1000x600',
  token:
  'sk.eyJ1IjoiZHVkaDAwMDQiLCJhIjoiY2tsaWRqbTh6MDNtbDJvb3V4c2I1enhmaCJ9.1BSTdaulLRZpzsHzGN94Gw',
  init() {
    APP.addListeners();
    //initial load with default image
    APP.loadMap();
  },
  addListeners() {
    //zoom listener
    document.getElementById('zoom').addEventListener('change', APP.setZoom);
    //style listener
    document.getElementById('style').addEventListener('change', APP.setStyle);
    //pitch listener
    document.getElementById('pitch').addEventListener('change', APP.setPitch);

    //TODO:
    //geolocation listener
    document.body.addEventListener('click', APP.getPosition);
    //TODO:
    //image load and error listener
    let img = document.getElementById('map');
    img.addEventListener('load', (ev) => {
      img.alt = `Map image for ${APP.lat}, ${APP.lon}`;
    });
    img.addEventListener('error', (err) => {
      img.alt = `Failed to load map image. ${err.message}`;
    });
  },
  setZoom(ev) {
    let select = ev.target;
    APP.zoom = select.value;
    APP.loadMap();
  },
  setStyle(ev) {
    let select = ev.target;
    APP.style = select.value;
    APP.loadMap();
  },
  setPitch(ev) {
    let select = ev.target;
    APP.pitch = select.value;
    APP.loadMap();
  },
  getPosition() {
    GEO.location(APP.loadMap, APP.failure);
  },
  loadMap(pos) {
    if (pos) {
      APP.lon = pos.coords.longitude;
      APP.lat = pos.coords.latitude;

    } else {
      let pos = {
        coords: {
          latitude: APP.lat,
          longitude: APP.lon,
        },
      };
    }
    let url = `${APP.baseURL}/${APP.style}/static/${APP.lon},${APP.lat},${APP.zoom},${APP.bearing},${APP.pitch}/${APP.size}?access_token=${APP.token}`;
    let img = document.getElementById('map');
    img.alt = 'loading new map image';
    img.src = url;
  },
  // //TODO: add a geolocation error failure
failure() {
    let modal = document.querySelector('.modal');
    modal.classList.remove('off');
    modal.classList.add('on');
    document.getElementById('close').addEventListener('click',modalHide);

    function modalHide(ev) {
      let modal = document.querySelector('.modal');
      modal.classList.remove('show');
      modal.classList.add('hide');
    }
  }
};
document.addEventListener('DOMContentLoaded', APP.init);
