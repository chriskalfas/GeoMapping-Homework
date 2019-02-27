//Legend
var legend = L.control({position:'bottomleft'});

legend.onAdd = function(myMap){
    var div = L.DomUtil.create('div','info legend'),
    grades = [0,1,2,3,4,5],
    labels = [];
    for (var i=0;i<grades.length;i++){
        div.innerHTML += '<i style="background:'+getColor(grades[i]+1)+ 
                        '"></i>'+ (grades[i+1]?'&ndash;' + 
                        grades[i+1]+'<br>':'+');
    }
return div;
};
legend.addTo(myMap);