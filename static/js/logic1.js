// Creating map object
var myMap = L.map("map", {
    center: [39.50, -98.35],
    zoom: 3.5,
//    layers: [states, counties]
  });


// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Use this link to get the geojson data.
var sLink = "static/data/gzstate.json";
//var cLink = "static/data/gzcounty.json";

// Use this link to get the election data.
var sData = "static/data/state_votes_sqlfinal.csv"
//var cData = "static/data/county_votes_sqlfinal.csv";


//Read the state election data file
var stateData = d3.csv(sData, function(data) {
    console.log(data)
});

//Read the county election data file
// var countyData = d3.csv(cData, function(data) {
//     console.log(data)
// });

// Function that will determine the color of a state based on the state_winner
function stateColor(NAME) {
  switch (NAME) {
  case "Maryland":
    return "blue";
  case "Virginia":
    return "red";
  default:
    return "black";
  }
}
// This function accepts a parameter and iterates through an array
// function stateColor(NAME, stateData) {
//     for NAME == stateData.state,
//     function stateLoop(stateData) {
//         for (var i = 0; i < stateData.length; i++) {
//             if stateData.state_winner="biden",
//                 return "blue",
//             elseif stateData.state_winner="trump",
//                 return "red",
//             else,
//                 return "black";
// }}

// Create two separate layer groups: states and counties
//var states = L.layerGroup(stateOutlines);
//var counties = L.layerGroup(countyOutlines);

// Create an overlay object
// var overlayMaps = {
//     "State": stateOutlines,
//     "County": countyOutlines
//   };

// Grabbing the state GeoJSON data..
d3.json(sLink, function(data) {
  // Creating a geoJSON layer with the retrieved data
  var stateOutlines = L.geoJson(data, {
    // Style each feature (in this case a state)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide color for each state
        fillColor: stateColor(feature.properties.NAME),
        fillOpacity: 1,
        weight: 1
      };
    },

// Grabbing the county GeoJSON data..
// d3.json(cLink, function(data) {
//     // Creating a geoJSON layer with the retrieved data
//     var countyOutlines = L.geoJson(data, {
//       // Style each feature (in this case a state)
//       style: function(feature) {
//         return {
//           color: "white",
//           // Call the chooseColor function to decide color for each state
//           fillColor: stateColor(feature.properties.NAME),
//           fillOpacity: 1,
//           weight: 1
//         };
//       },


    // Called on each feature
    onEachFeature: function(feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 100%
        mouseout: function(event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 1
          });
        },
        // When a feature (NAME) is clicked, it is enlarged to fit the screen
        click: function(event) {
          myMap.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      layer.bindPopup("<h1>" + feature.properties.NAME + "</h1> <hr> <h2>" + feature.properties.STATE + "</h2>");

    }
  }).addTo(myMap);

});
