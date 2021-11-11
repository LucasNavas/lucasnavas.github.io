var source = new ol.source.Vector();

var styleFunction = function (feature) {
    var geometria = feature.getGeometry();
    var styless = [
        // linestring
        new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: '#000',
                width: 2
            })
        })
    ];

    geometria.forEachSegment(function (start, end) {
        var ponto1 = (start[0]+end[0]) / 2
        var ponto2 = (start[1]+end[1]) / 2
        var midpoint = [ponto1, ponto2]
        console.log(ponto1)
        var dx = end[0] - start[0];
        var dy = end[1] - start[1];
        var rotation = Math.atan2(dy, dx);
        console.log(start)
        console.log(end)
        styless.push(new ol.style.Style({
          geometry: new ol.geom.Point(midpoint),
          image: new ol.style.RegularShape({
            fill: new ol.style.Fill({color: '#000'}),
            points: 3,
            radius: 8,
            rotation: -rotation,
            angle: Math.PI / 2 // rotate 90°
          })
        }));

        styless.push(new ol.style.Style({
          geometry: new ol.geom.Point(end),
          image: new ol.style.RegularShape({
            fill: new ol.style.Fill({color: '#000'}),
            points: 3,
            radius: 8,
            rotation: -rotation,
            angle: Math.PI / 2 // rotate 90°
          })
        }));
    });

    return styless;
};

var map = new ol.Map({
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }),
        new ol.layer.Vector({
            source: source,
            style: styleFunction
        })
    ],
    target: 'map',
    view: new ol.View({
        center: [0, 0],
        zoom: 3
    })
});

map.addInteraction(new ol.interaction.Draw({
    source: source,
    type: ('LineString')
}));