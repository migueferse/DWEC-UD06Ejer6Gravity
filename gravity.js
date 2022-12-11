var map;

function initMap() {
  map = L.map('map');
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
}

function setISSPosition(arrayCoordinates) {
  map.setView(arrayCoordinates, 8);
  L.marker(arrayCoordinates).addTo(map)
  .bindPopup('ISS Position')
  .openPopup();
}

async function centerISS() {
  var URLAPISS = 'http://api.open-notify.org/iss-now.json';
  try {
    let response = await fetch(URLAPISS);
    if (response.status !== 200) {throw `Respuesta: ${response.status}`}
    let data = await response.json();
    let arrayCoordinates = Object.values(data.iss_position);
    map.panTo(arrayCoordinates)
  } catch (error) {
    console.log(error);
  }
}

function start() {
  initMap();
  setInterval(getISSCoordinates, 10000);  
  let button = document.getElementById('button');
  button.addEventListener('click',centerISS);  
}

async function getISSCoordinates() {
  var URLAPISS = 'http://api.open-notify.org/iss-now.json';
  try {
    let response = await fetch(URLAPISS);
    if (response.status !== 200) {throw `Respuesta: ${response.status}`}
    let data = await response.json();
    let arrayCoordinates = Object.values(data.iss_position);
    setISSPosition(arrayCoordinates);  
  } catch (error) {
    console.log(error);
  }
}

start();