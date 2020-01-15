// We create the tile layer that will be the background of our map.
var streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
var satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create the map object with center, zoom level and default layer.
var map = L.map('mapid', {
	center: [39.5, -98.5],
	zoom: 3,
	layers: [streets]
});


// create the earthquake layer and tectonic plate layer for our map.
  var earthquakes = new L.LayerGroup();
  var tectonicplates = new L.layerGroup();

// Create a base layer that holds both maps.
var baseMaps = {
  "Street": streets,
  "Satellite Streets": satelliteStreets
};

// Create overlay layer
var overlays = {
  Earthquakes: earthquakes,
  "Tectonic Plates": tectonicplates
};

  // Then we add control to the map that will allow the user
  // to change which layers are visible
  L.control.layers(baseMaps, overlays, {collapsed: false}).addTo(map);


// Add console.log to check to see if our code is working.
console.log("step 3 is working");
// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

	function styleInfo(feature) {
		return {
			opacity: 1,
			fillOpacity: 1,
			fillColor: getColor(feature.properties.mag),
			color: "#000000",
			radius: getRadius(feature.properties.mag),
			stroke: true,
			weight: 0.5
		};
    }

// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
	if (magnitude > 5) {
	  return "#ea2c2c";
	}
	if (magnitude > 4) {
	  return "#ea822c";
	}
	if (magnitude > 3) {
	  return "#ee9c00";
	}
	if (magnitude > 2) {
	  return "#eecc00";
	}
	if (magnitude > 1) {
	  return "#d4ee00";
	}
	return "#98ee00";
  }

	// This function determines the radius of the earthquake marker based on its magnitude.
	// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
	function getRadius(magnitude) {
		if (magnitude === 0) {
		  return 1;
			}
		return magnitude * 4;
			}

  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
	  pointToLayer: function(feature, latlng) {
		  //console.log(data);
		  return L.circleMarker(latlng);
	  },
		// We set the style for each circleMarker using our styleInfo function.
		style: styleInfo,
		// We create a popup for each circleMarker to display the magnitude and location of the earthquake
		// after the marker has been created and styled.
		onEachFeature: function(feature, layer) {
		layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
		}	  
  }).addTo(earthquakes);

  //Then we add the earthquake layer to the map.
  earthquakes.addTo(map);

// Adding a legend to the map
var legend = L.control({position: 'bottomright'});

legend.onAdd = function () {

  var div = L.DomUtil.create('div', 'info legend'),
  magnitudes = [0, 1, 2, 3, 4, 5],
  colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"
  ];

// Looping through our intervals to generate a label with a colored square for each interval.
for (var i = 0; i < magnitudes.length; i++) {
//console.log(colors[i]);
div.innerHTML +=
  "<i style='background: " + colors[i] + "'></i> " +
  magnitudes[i] + (magnitudes[i + 1] ? "–" + magnitudes[i + 1] + "<br>" : "+");
}
return div;

};
//final step add legend to map
legend.addTo(map);

////////////////////////////challenge///////////////////////////////////////

// Create layer for tectonic plates

d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json").then(function(data) {

    var tecstyle = {
        "color": "orange",
        "weight": 2,
        "opacity": 1
    };

    L.geoJSON(data, {
        style: tecstyle,
        onEachFeature: function (feature, LAYER) {
          LAYER.bindPopup("<h3><u>plate name</u>: " + feature.properties.Name + "</h3>");

            tectonicplates.addLayer(LAYER);
        }
    });
});

});




















