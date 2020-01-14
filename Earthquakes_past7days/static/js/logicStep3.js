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
		  console.log(data);
		  return L.circleMarker(latlng);
	  },
		// We set the style for each circleMarker using our styleInfo function.
		style: styleInfo,
		//
		//
		onEachFeature: function(feature, layer) {
		layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
		}	  
  }).addTo(earthquakes);

  //Then we add the earthquake layer to the map.
  earthquakes.addTo(map);
});


