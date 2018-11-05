//testing out the google fushion table
var map = L.map('map', {
  center: [37.755489,-122.407885],
  zoom: 10
});

var Style = 'dark';
// var Style = 'light';


L.tileLayer('http://{s}.basemaps.cartocdn.com/'+ Style + '_all/{z}/{x}/{y}@2x.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
  subdomains: 'abcd'
}).addTo(map);


//1.2 SWITCH BASEMAPS
$('#dark').click(function(){
  $('#map0').hide();
  $('#map').show();
  Style = 'dark';
  L.tileLayer('http://{s}.basemaps.cartocdn.com/'+ Style + '_all/{z}/{x}/{y}@2x.png', {
    maxZoom: 18,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
    subdomains: 'abcd'
  }).addTo(map);
});

$('#light').click(function(){
    $('#map0').hide();
    $('#map').show();
    Style = 'light';
    L.tileLayer('http://{s}.basemaps.cartocdn.com/'+ Style + '_all/{z}/{x}/{y}@2x.png', {
      maxZoom: 18,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
      subdomains: 'abcd'
    }).addTo(map);
});

//1.3 LOAD SATELLITE MAP
$('#satellite').click(function(){
  $('#map').hide();
  $('#map0').show();
  mapboxgl.accessToken = 'pk.eyJ1Ijoid2VuaGFvYnJpYW4iLCJhIjoiY2owaXNrNzhnMDB4ZjJxdGoxdHdkd2VibiJ9.Cn_2Ypo7UctdNZHt6OlDHA';
  var map0 = new mapboxgl.Map({
      container: 'map0', // container id
      style: 'mapbox://styles/mapbox/satellite-v9', //stylesheet location
      center: [-88.509107, 15.162820], // starting position
      zoom: 6 // starting zoom
  });

  var editorData = $.ajax(
    {
      url:"https://raw.githubusercontent.com/wenhaowuuu/InfrastructureEfficiency/master/data/muni_northerntriangle.geojson"
    }
  ).done(function(data){
          // console.log("downloadxxx");
          map0.on('load', function () {

            //REFERENCE ON LOADING ELEMENTS ON MAPBOX'S MAP
            // https://gist.github.com/danswick/339d00429ed5a201e0d7ef4fac648fa5
            // http://lyzidiamond.com/posts/external-geojson-mapbox
            // http://lyzidiamond.com/posts/external-geojson-mapbox

            //TESTING
            map0.addLayer({
                        'id': 'boundarys',
                        'type': 'fill',
                        'source': {
                        'type': 'geojson',
                              'data': {
                                        'type': 'Feature',
                                        'geometry': {
                                        'type': 'Polygon',
                                        'coordinates': [[
                                                  [-90.583466, 10.571087],
                                                  [-90.583466, -10.333333],
                                                  [-70.589323, -10.333333],
                                                  [-70.589323, 10.571087]
                                                ]]
                                                }
                                        }
                                },
                          'layout': {},
                                'paint': {
                                    'fill-color': '#0000ff',
                                    'fill-opacity': 0.5
                                 }
                          });


            //add source
              map0.addSource(
                "myData",{
                  type:"geojson",
                  data:data
                }
              );

           //LOAD MUNICIPALITIES///////
            map0.addLayer({
                  'id': 'shapes',
                  'type': 'fill',
                  'source': "myData",
                  'layout': {},
                  'paint': {
                      'fill-color': '#00ffff',
                      'fill-opacity': 0.8
                  }
                });

          });
      });
  });


// 1.3 SWITCHING SACLES
    $('#Global').click(function(){
      map.setView([15.162820, -87.509107],2);
    });

    $('#Regional').click(function(){
      map.setView([15.162820, -87.509107],5);
    });

    $('#AOI').click(function(){
      map.setView([15.162820, -87.69107],6.5);
    });


// 2. CREATE VARIABLES
// 2.1 DATA SOURCE URLS
  //THE CLEANED DATASET
  var censustract = "";

  var muni_clean = "https://raw.githubusercontent.com/wenhaowuuu/ProjectDataX/master/data/nt_muni_joined_clean.geojson";

  // ADM
  var Guatemala = "https://raw.githubusercontent.com/wenhaowuuu/ProjectDataX/master/data/guatemala.geojson?token=AWa3ujj3WJDeoABdZInPIhnTSYkS3B5Kks5Zd5vrwA%3D%3D";
  var Honduras = "https://raw.githubusercontent.com/wenhaowuuu/ProjectDataX/master/data/Honduras.geojson?token=AWa3uvKtwxzSEa1dGdu8oqlVEMSPY5alks5Zd5xEwA%3D%3D";
  var Salvador = "https://raw.githubusercontent.com/wenhaowuuu/ProjectDataX/master/data/SalVardo.geojson?token=AWa3us5Y4fPzPzYtApgHmkKpUFki0Dekks5Zd5w0wA%3D%3D";
  var department = "https://raw.githubusercontent.com/wenhaowuuu/ProjectDataX/master/data/dept_joinbase.geojson?token=AWa3ulA7r0EP6hvXnzERqDWlb0C1DWkeks5Zd5HUwA%3D%3D";


  var PrimaryRoads = [ ];
  var SecondaryRoads = [ ];
  var TertiaryRoads = [ ];
  var UrbanRoads = [ ];
  var RuralRoads = [ ];

  var Hospitals = [ ];
  var Clinics = [ ];


  //PRELOAD THE FUNCTIONS
    // $(document).ready(function(){
    //   $.ajax(muni_clean).done(function(data) {
    //     parsedData00 = JSON.parse(data);
    //     console.log(parsedData00);
    //     console.log("parsed00");
    //     layerMappedPolygons = L.geoJson(parsedData00,
    //       {
    //         style: {opacity:0.4,width:0.5,color:'#E0903F'},
    //         pointToLayer: function (feature, latlng) {
    //           return new L.Polygon(latlng, {
    //           });
    //         },
    //
    //         onEachFeature: function(feature,layer){
    //
    //           layer.bindPopup(
    //             "<b>Municipality Name: </b>" +
    //             feature.properties.m_name +
    //             "</br>" +
    //
    //             "<b>Department Name: </b>" +
    //             feature.properties.d_name +
    //             "</br>" +
    //
    //             "<b>Total Road Length: </b>" +
    //             feature.properties.rd_length.toFixed(3) + " km" +
    //             "</br>" +
    //
    //             "<b>Road Density: </b>" +
    //             feature.properties.rd_density.toFixed(3) + " per square km" +
    //             "</br>" +
    //
    //             "</br>" +
    //             "<b>Data Collected Year: </b>" +
    //             feature.properties.year
    //           )
    //
    //          }
    //         }).addTo(map);
    //         layerMappedPolygons.eachLayer(eachFeatureFunction);
    //         // console.log(layerMappedPolygons[0].id);
    //       })
    //     });
