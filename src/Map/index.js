import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';

const Wrapper = styled.div`
    width: ${props => props.width};
    height: ${props => props.height}; 
`;

function onPolyClick(e) {
    alert("You clicked the map at " + e.latlng);
}

function createPopup(feature, layer) {
	// does this feature have a property named popupContent?
	if (feature.properties && feature.properties.name) {
		layer.bindPopup(feature.properties.name);
	}
}


export default class Map extends React.Component {

    componentDidMount() {
        this.map = L.map('map', {
            center: [63,10],
            zoom: 6,
            zoomControl: false,
        });
        this.map.on('layeradd', this.props.addLayer);
        console.log(this.props.addLayer)


        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', {
            detectRetina: true,
            maxZoom: 20,
            maxNativeZoom: 17,
        }).addTo(this.map);



// Testing some code:
    // create a red polygon from an array of LatLng points
    var latlngs = [[37, -109.05],[41, -109.03],[41, -102.05],[37, -102.04]];
    var polygon = L.polygon(latlngs, {color: 'red'}).addTo(this.map);
    // zoom the map to the polygon
    this.map.fitBounds(polygon.getBounds());
    polygon.addEventListener('click', onPolyClick);


    var myLines = [{
        "type": "LineString",
        "coordinates": [[-100, 40], [-105, 45], [-110, 55]]
    }, {
        "type": "LineString",
        "coordinates": [[-105, 40], [-110, 45], [-115, 55]]
    }];

    var myLayer = L.geoJSON(myLines, {
        onEachFeature: function (feature, layer) {
        }
    }).addTo(this.map);


    
    var myLines2 = [
        {
        "type": "Feature",
        "properties": {
          "name": "Bermuda Triangle",
          "area": 1150180
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [-64.73, 32.31],
              [-80.19, 25.76],
              [-66.09, 18.43],
              [-64.73, 32.31]
            ]
          ]
        }
      },

      {
        "type": "Feature",
        "properties": {
          "name": "Flemish Diamond",
          "area": 2947
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [3.55, 51.08],
              [4.36, 50.73],
              [4.84, 50.85],
              [4.45, 51.30],
              [3.55, 51.08]
            ]
          ]
        }
      },
      
      
      {
        "type": "Feature",
        "properties": {
          "name": "Research Triangle",
          "area": 252
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [
            [
              [-78.93, 36.00],
              [-78.67, 35.78],
              [-79.04, 35.90],
              [-78.93, 36.00]
            ]
          ]
        }
      }
    ];

    var myLayer = L.geoJSON(myLines2, {
            onEachFeature: createPopup    
    }).addTo(this.map);

    var myPoint = {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [-80, 30]
        },
        "properties": {
          "name": "Dinagat Islands"
        }
      }

      var geojsonMarkerOptions = {
        radius: 8,
        fillColor: "#ff7800",
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

      var myLayer = L.geoJSON(myPoint, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, geojsonMarkerOptions);
            }
        }).addTo(this.map);
      }

    render() {
        return <Wrapper width="100%" height="500px" id='map' />
    }
}