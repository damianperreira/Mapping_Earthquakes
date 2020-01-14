

  // create the earthquake layer for our map.
  let earthquakes = new L.LayerGroup();

  // We define an object that contains the overlays
  // This overlay will be visible at all time
  let overlays = {
	  Earthquakes: earthquakes
  };

  //Then we add control to the map that will allow the user
  // to change which layers are visible
  L.control.layers(baseMaps, overlays).addTo(map);