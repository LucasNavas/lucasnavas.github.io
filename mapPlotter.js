const map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.Stamen({
        layer: 'terrain'
      }) //https://mc.bbbike.org/mc/
    }) // https://wiki.openstreetmap.org/wiki/Map_internationalization
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([20.8368, 15.8282]), // Primeiro o W e depois o S 
    zoom: 3
  })
  
});


function viagem(partida1,partida2,chegada1,chegada2,cor, howMuchArrows){
var partida = ol.proj.fromLonLat([partida1, partida2]);
var chegada = ol.proj.fromLonLat([chegada1, chegada2]);
var centerpoint = [((partida[0]+chegada[0]) / 2), ((partida[1]+chegada[1]) / 2)]
var midpoint1 = [((partida[0]+centerpoint[0]) / 2), ((partida[1]+centerpoint[1]) / 2)]
var midpoint2 = [((chegada[0]+centerpoint[0]) / 2), ((chegada[1]+centerpoint[1]) / 2)]
console.log(partida)
var dx = chegada[0] - partida[0];
var dy = chegada[1] - partida[1];
var rotation = Math.atan2(dy, dx);
// LINHA
if(howMuchArrows <= 0){
  midpoint1 = 0;
  centerpoint = 0;
  midpoint2 = 0;
}

if(howMuchArrows === 1){
  midpoint1 = 0;
  midpoint2 = 0;
}

if(howMuchArrows === 2){
  centerpoint = 0;
}

var lineStyle = [

  new ol.style.Style({
    stroke: new ol.style.Stroke({
    color: cor,
    width: 1
    })
  }),

  new ol.style.Style({
    geometry: new ol.geom.Point(midpoint1),
    image: new ol.style.RegularShape({
      fill: new ol.style.Fill({color: cor}),
      points: 3,
      radius: 4,
      rotation: -rotation,
      angle: Math.PI / 2 // rotate 90°
    })
  }),

  new ol.style.Style({
    geometry: new ol.geom.Point(midpoint2),
    image: new ol.style.RegularShape({
      fill: new ol.style.Fill({color: cor}),
      points: 3,
      radius: 4,
      rotation: -rotation,
      angle: Math.PI / 2 // rotate 90°
    })
  }), 

  new ol.style.Style({
    geometry: new ol.geom.Point(centerpoint),
    image: new ol.style.RegularShape({
      fill: new ol.style.Fill({color: cor}),
      points: 3,
      radius: 4,
      rotation: -rotation,
      angle: Math.PI / 2 // rotate 90°
      
    })
  })

  ];
        
var line = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: [new ol.Feature({
      geometry: new ol.geom.LineString([partida, chegada]),
      name: 'Line',
    })]
  })
});
line.setStyle(lineStyle);
map.addLayer(line);

// VÉRTICE PARTIDA
var ponto1Style = [
  new ol.style.Style({
    image: new ol.style.Circle({
      radius: 2.5,
      fill: new ol.style.Fill({color: 'black'})
    })
  })
];

var ponto1 = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: [new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([partida1, partida2]))
    })]
  })
});
ponto1.setStyle(ponto1Style);
map.addLayer(ponto1);

// VÉRTICE CHEGADA

var ponto2Style = [
  new ol.style.Style({
    image: new ol.style.Circle({
      radius: 2.5,
      fill: new ol.style.Fill({color: 'black'})
    })
  })
];

var ponto2 = new ol.layer.Vector({
  source: new ol.source.Vector({
    features: [new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([chegada1, chegada2]))



    })]
  })
});
ponto2.setStyle(ponto2Style);
map.addLayer(ponto2); 
}

