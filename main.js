window.onload = init;

function init(){
    const map = new ol.Map({
        view: new ol.View({
            center: ol.proj.fromLonLat([16.37, 48.21]),
            zoom: 14.5,
            maxZoom: 15,
            minZoom: 14,
        }),
        layers: [
            new ol.layer.Tile({
            source: new ol.source.Stamen({layer: 'toner',})
            }),
        ],
        target: 'map'
    })

    const parks = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/trees-vienna/wms',
            params: { 'LAYERS': 'trees-vienna:parks', 'TILED': true},
            serverType: 'geoserver'
        }),
        visible: true,
        title: 'parks'
    })

    const buffers400 = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: 'http://localhost:8080/geoserver/trees-vienna/wms',
            params: { 'LAYERS': 'trees-vienna:buffers400', 'TILED': true},
            serverType: 'geoserver'
        }),
        visible: true,
        title: 'buffers400'
    })

    const cycleway = new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: 'http://localhost:8080/geoserver/trees-vienna/wms',
          params: { 'LAYERS': 'trees-vienna:cycleway', 'TILED': true},
          serverType: 'geoserver'
        }),
        visible: true,
        title: 'trees-vienna:cycleway'
    })

    const pedestrian = new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: 'http://localhost:8080/geoserver/trees-vienna/wms',
          params: { 'LAYERS': 'trees-vienna:pedestrian', 'TILED': true},
          serverType: 'geoserver'
        }),
        visible: true,
        title: 'trees-vienna:pedestrian'
    })

    const platanusxacerifolia = new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: 'http://localhost:8080/geoserver/trees-vienna/wms',
          params: { 'LAYERS': 'trees-vienna:platanusxacerifolia', 'TILED': true},
          serverType: 'geoserver'
        }),
        visible: true,
        title: 'trees-vienna:platanusxacerifolia'
    })

    const acerplatanoides = new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: 'http://localhost:8080/geoserver/trees-vienna/wms',
          params: { 'LAYERS': 'trees-vienna:acerplatanoides', 'TILED': true},
          serverType: 'geoserver'
        }),
        visible: true,
        title: 'trees-vienna:acerplatanoides'
    })

    const acerpseudoplatanus = new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: 'http://localhost:8080/geoserver/trees-vienna/wms',
          params: { 'LAYERS': 'trees-vienna:acerpseudoplatanus', 'TILED': true},
          serverType: 'geoserver'
        }),
        visible: true,
        title: 'trees-vienna:acerpseudoplatanus'
    })

    const aesculushippocastanum = new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: 'http://localhost:8080/geoserver/trees-vienna/wms',
          params: { 'LAYERS': 'trees-vienna:aesculushippocastanum', 'TILED': true},
          serverType: 'geoserver'
        }),
        visible: true,
        title: 'trees-vienna:aesculushippocastanum'
    })

    const celtisaustralis = new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: 'http://localhost:8080/geoserver/trees-vienna/wms',
          params: { 'LAYERS': 'trees-vienna:celtisaustralis', 'TILED': true},
          serverType: 'geoserver'
        }),
        visible: true,
        title: 'trees-vienna:celtisaustralis'
    })

    const tiliacordata = new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: 'http://localhost:8080/geoserver/trees-vienna/wms',
          params: { 'LAYERS': 'trees-vienna:tiliacordata', 'TILED': true},
          serverType: 'geoserver'
        }),
        visible: true,
        title: 'trees-vienna:tiliacordata'
    })

    const trees = new ol.layer.Tile({
        source: new ol.source.TileWMS({
          url: 'http://localhost:8080/geoserver/trees-vienna/wms',
          params: { 'LAYERS': 'trees-vienna:trees', 'TILED': true},
          serverType: 'geoserver'
        }),
        visible: true,
        title: 'trees-vienna:trees'
    })
    
    map.addLayer(buffers400);
    map.addLayer(parks);
    map.addLayer(cycleway);
    map.addLayer(pedestrian);
    


    //Layer group
    const treesLayerGroup = new ol.layer.Group ({
        layers: [
            trees, platanusxacerifolia, acerplatanoides, acerpseudoplatanus, aesculushippocastanum, celtisaustralis, tiliacordata
        ]
    })
    map.addLayer(treesLayerGroup);

    
    //Layer switcher logic for TreeLayers
    const treesLayerElements = document.querySelectorAll ('.sidebar > input[type=radio]');
    for (let treesLayerElement of treesLayerElements){
        treesLayerElement.addEventListener('change', function(){
            let treesLayerElementValue = this.value;
            treesLayerGroup.getLayers().forEach(function(element, index, array){
                let treeLayertitle = element.get('title');
                element.setVisible (treeLayertitle === treesLayerElementValue);
            })
        })
    }

    //Transparency buffers
    const opacityInput = document.getElementById('opacity-input');
    const opacityOutput = document.getElementById('opacity-output');
    function update() {
      const opacity = parseFloat(opacityInput.value);
      buffers400.setOpacity(opacity);
      opacityOutput.innerText = opacity.toFixed(2);
    }
    opacityInput.addEventListener('input', update);
    opacityInput.addEventListener('change', update);
    update();

    
    

}