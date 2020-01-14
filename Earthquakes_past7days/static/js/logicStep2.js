// Add console.log to check to see if our code is working.
console.log("step 2 is working");
// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

	function styleInfo(feature) {
		return {
		  opacity: 1,
		  fillOpacity: 1,
		  fillColor: "#ffae42",
		  color: "#000000",
		  radius: getRadius(feature.properties.mag),
		  stroke: true,
		  weight: 0.5
		};
	  }

	  	// This function determines the radius of the earthquake marker based on its magnitude.
	// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
	function getRadius(magnitude) {
		if (magnitude === 0) {
		  return 1;
			}
		return magnitude * 4;
			}


	  });






