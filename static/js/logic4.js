// Creating map object
var myMap = L.map("map", {
  center: [39.50, -98.35],
  zoom: 3.5
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

//Read the state election data file
var stateShape = d3.json(sLink, function(data) {
  console.log(data)
});

// Function that will determine the color of a state based on the borough it belongs to
function chooseColor(NAME) {
  switch (NAME) {
  case "Maine":
    return "blue";
  case "Maryland":
    return "blue";
  case "Virginia":
    return "blue";
  case "Georgia":
    return "blue";
  case "Pennsylvania":
    return "blue";
  // case "New York":
  //   return "blue";
  // case "New Jersey":
  //   return "blue";
  // case "Delaware":
  //   return "blue";
  // case "Vermont":
  //   return "blue";
  // case "Massachusetts":
  //   return "blue";
  // case "New Hampshire":
  //   return "blue";
  // case "Connecticut":
  //   return "blue";
  // case "Illinois":
  //   return "blue";
  // case "Michigan":
  //   return "blue";
  // case "Minnesota":
  //   return "blue";
  // case "Nevada":
  //   return "blue";
  //   case "Arizona":
  //     return "blue";
  //   case "Oregon":
  //     return "blue";
  //   case "Washington":
  //     return "blue";
  //   case "California":
  //     return "blue";
  //   case "Hawaii":
  //     return "blue";
  //   case "Idaho":
  //     return "red";
  //   case "Montana":
  //     return "red";
  //   case "Alaska":
  //     return "red";
  //   case "Indiana":
  //     return "red";
  //   case "Ohio":
  //     return "red";
  //   case "Oklahoma":
  //     return "red";
  //   case "North Carolina":
  //     return "red";
  //   case "South Carolina":
  //     return "red";
  //   case "North Dakota":
  //     return "red";
  //   case "South Dakota":
  //     return "red";  
case "Florida":
return "red";
    case "Texas":
      return "red";
  //   case "Wisconsin":
  //     return "blue";
  //   case "Missouri":
  //     return "red";
  //   case "Louisiana":
  //     return "red";
  //   case "Iowa":
  //     return "red";
  //   case "Arkansas":
  //     return "red";
  //   case "Mississippi":
  //     return "red";
  //   case "Alabama":
  //     return "red";
  //   case "Kentucky":
  //     return "red";  
  // case "Tennessee":
  //   return "red";
  // case "West Virginia":
  //   return "red";
  //   case "Colorado":
  //     return "red";
  //   case "Utah":
  //     return "red";  
  // case "Wyoming":
  //   return "red";
  //   case "Nebraska":
  //     return "red";
  //   case "New Mexico":
  //     return "blue";  
  // case "Kansas":
  //   return "red";
  //   case "Rhode Island":
  //     return "blue";      
  default:
    return "black";
  }
}

// Grabbing our GeoJSON data..
d3.json(sLink, function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    // Style each feature (in this case a neighborhood)
    style: function(feature) {
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: chooseColor(feature.properties.NAME),
        fillOpacity: 1,
        weight: 1
      };
    },
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
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
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
