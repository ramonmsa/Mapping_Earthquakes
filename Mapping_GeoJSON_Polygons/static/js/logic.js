// Accessing the airport GeoJSON URL
let torontoNeighborhoods = "https://raw.githubusercontent.com/ramonmsa/Mapping_Earthquakes/Mapping_GeoJSON_Polygons/Mapping_GeoJSON_Polygons/static/json/torontoNeighborhoods.json";



// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


// We create the tile layer that will be the background of our map.
let satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


// Create a base layer that holds both maps.
let baseMaps = {
    Satellite: satellite,
    Street: streets,
  };


// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [satellite]
})

function chooseColor(neighborhood) {
  switch (neighborhood) {
  case "Highland Creek (134)":
    return "yellow";
  case "Banbury-Don Mills (42)":
    return "red";
  case "Yonge-St.Clair (97)":
    return "orange";
  case "York University Heights (27)":
    return "green";
  case "Stonegate-Queensway (16)":
    return "purple";
  default:
    return "black";
  }
}

// Grabbing our GeoJSON data.
d3.json(torontoNeighborhoods).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data,{
  style: function (feature) {
    return {
      color: "white",
      fillColor: chooseColor(feature.properties.AREA_NAME),
      fillOpacity: 0.5,
      weight: 0.5
    }
  },
  // We turn each feature into a marker on the map.
  onEachFeature: function(feature, layer) {
    console.log(layer);
    layer.bindPopup("<h3>" + feature.properties.AREA_NAME + "</h3>");
  }
}).addTo(map);
});


// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);


