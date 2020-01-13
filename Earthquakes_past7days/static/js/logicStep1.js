// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Street": streets,
  "Satellite Streets": satelliteStreets
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [39.5, -98.5],
	zoom: 3,
	layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data).addTo(map);
});
// Accessing the toronto GeoJSON URL
//let torontoHoods = 'https://raw.githubusercontent.com/damianperreira/Mapping_Earthquakes/Earthquakes_past7days/torontoNeighborhoods.json';

// Grabbing our GeoJSON data.
//d3.json(torontoHoods).then(function(data) {
//    console.log(data);
//  // Creating a GeoJSON layer with the retrieved data.
//  L.geoJson(data).addTo(map);
//});


// Create the map object with center and zoom level.
// let map = L.map('mapid').setView([30, 30], 2);
// Create the map object with a center and zoom level.
//let map = L.map("mapid", {
//  center: [40.7, -94.5],
//  zoom: 4
//});

//notes:
//https://raw.githubusercontent.com/damianperreira/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/torontoRoutes.json