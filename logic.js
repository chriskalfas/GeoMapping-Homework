//Data - Links
var earthquake = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

//Get request
d3.json(earthquake, function(data){
    createFeatures(data.features);
})

//createFeatures function
function createFeatures(earthquakedata){
  
    
    var earthquakes = L.geoJSON(earthquakedata,{
        onEachfeature: function(feature,layer){
            //popup feature of layer - where, when, magnitude
            layer.bindPopup("<h3>Location"+feature.properties.place+"</h3><p>"+ new Date(feature.properties.time)+"</p><hr><h3>Magnitude"+feature.properties.mag+"</h3>");
        },
            //dots feature of layer - radius, fill, opacity, etc.
        pointToLayer: function(feature,latlng){
            return new L.circle(latlng,
                {radius: getRadius(feature.properties.mag),
                fillColor: getColor(feature.properties.mag),
                fillOpacity:.6,
                color:"#000",
                stroke: true,
                weight:.3
                })
        }
    });
    
    createMap(earthquakes)
};



//getRadius function
function getRadius(integer){
    return integer*17500
}

//getColor function
function getColor(color){
    return color>5?"red":
    color>4 ? "green":
    color>3 ? "blue":
    color>2 ? "yellow":
    color>1 ? "orange":
    "purple";
}

//Map Framework
function createMap(earthquakes){
    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
      });
    
      // var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      //   maxZoom: 18,
      //   id: "mapbox.dark",
      //   accessToken: API_KEY
      // });
    
      // Define a baseMaps object to hold our base layers
      var baseMaps = {
        "Street Map": streetmap,
        // "Dark Map": darkmap
      };
    
      // Create overlay object to hold our overlay layer
      var overlayMaps = {
        Earthquakes: earthquakes
      };
    
      // Create our map, giving it the streetmap and earthquakes layers to display on load
      var myMap = L.map("map", {
        center: [
          37.09, -95.71
        ],
        zoom: 5,
        layers: [streetmap, earthquakes]
      });
    
      // Create a layer control
      // Pass in our baseMaps and overlayMaps
      // Add the layer control to the map
      L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(myMap);
};