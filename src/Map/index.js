import React from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import { create } from 'domain';

const Wrapper = styled.div`
    width: ${props => props.width};
    height: ${props => props.height}; 
`;

function createPopup(feature, layer) {
	// does this feature have a property named popupContent?
	if (feature.properties && feature.properties.name) {
		layer.bindPopup(feature.properties.name);
	}
}

export default class Map extends React.Component {



  constructor(props) {
    super(props)
  }

  state = {
    file: this.props.file,
    createLayerMode: this.props.createLayerMode,
    createdLayer: null,
  }

  

  componentDidMount = () => {
    this.map = L.map('map', {
        center: [40.7292369,-73.996565],
        zoom: 13,
        zoomControl: false,
        layers: L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
          // 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?'
                  detectRetina: true,
                  maxZoom: 20,
                  maxNativeZoom: 17,
        }),
    });
    this.map.on('layeradd', this.props.addLayer);
    this.map.on('click', this.props.clickCreateLayer)
  }

  componentDidUpdate = (prevProps) => {

    try {

      
      //If createlayermode just swapped to false or clickedpoints length just swapped to zero.
    if (((prevProps.createLayerMode != false) && (this.props.createLayerMode == false)) || ((prevProps.clickedPoints.length != 0) && (this.props.clickedPoints.length == 0))) {
      
      this.map.removeLayer(this.state.layer)

      //reversing coordinates to make them geojson order.
      let coordinates = prevProps.clickedPoints
      coordinates.forEach(latlng => {
        latlng.reverse();
      });

      if(prevProps.createLayerMode == "Polygon") {
        coordinates = [...coordinates, coordinates[0]]
        coordinates = [coordinates]
      }

      this.createLayer(
              {
                "type": "Feature",
                "name": "Created " + prevProps.createLayerMode,
                "geometry": {
                    "type": prevProps.createLayerMode,
                    "coordinates": coordinates,
                },
              }
      )

      this.setState({
        layer: null,
      })
      return
    }
  } catch {console.log("nevermind")}

    //Add new points
    //If new points was added: or layermode was changed
    if ((this.props.clickedPoints.length != prevProps.clickedPoints.length) || (this.props.createLayerMode != prevProps.createLayerMode)) {
       if (this.state.layer != null) {
        this.map.removeLayer(this.state.layer)
      }
      let newLayer;
      if (this.props.createLayerMode == "LineString") {
        newLayer = L.polyline(this.props.clickedPoints, {color: 'green'}).addTo(this.map);
      } else if (this.props.createLayerMode == "Polygon") {
        newLayer = L.polygon(this.props.clickedPoints, {color: 'green'}).addTo(this.map);
      }
      // } else if (this.props.createLayerMode == "MultiPoint") {
      //   newLayer = L.polyline(this.props.clickedPoints, {color: 'red'}).addTo(this.map);
      // } 

      this.setState({
        layer: newLayer,
      })  
    }

    //Create file from new imported geojson
    if (this.props.file) {
      this.createLayer(this.props.file);
      this.props.resetFile();
    }
    //Remove the requested file
    else if (this.props.deletedLayer) {
      this.map.removeLayer(this.props.deletedLayer)
      this.props.resetFile();
    }
    //hide the layer L by removing it from the map
    else if (this.props.hide) {
      this.map.removeLayer(this.props.hide)
      this.props.resetFile();
    }
    //unhide the layer L by re-adding it to the map
    else if (this.props.unhide) {
      this.props.unhide.addTo(this.map)
      this.map.addLayer(this.props.unhide)
      this.props.resetFile();
    }
    else if (this.props.zoomTo.length != 0) {
      try {
        return this.map.fitBounds(this.props.zoomTo[0].layer.getBounds())
      } catch {}
      this.props.resetZoom()
    }
  }
  


  zoomToFeature = (e) => {
    try { 
      return (e.layer ? this.map.fitBounds(e.target.getBounds()): "$10.00");
    } catch {
      
    }
  }

  onEachFeature = (e) => {
    this.map.on({
      click: this.props.hideLayer,
    })
  }

    //Creating a new layer from geojson-data
  createLayer = (geojsonData) => {

    let geoj = L.geoJSON(geojsonData, {
      pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, {
            radius: 5,
            fillColor: "#ff7800",
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.9,
          });
      },
      style: {color: '#'+Math.floor(Math.random()*16777215).toString(16), fillOpacity: 0.9},
      onEachFeature: this.onEachFeature,
      }).addTo(this.map);

    geoj.name = geojsonData.name;
    geoj.type = geojsonData.type;
    geoj.visibility = true
    geoj.setZIndex(-800);
    geoj.bindPopup("part of: " + geojsonData.name);
    geoj.on({
    //  mouseover: this.props.highlightFeature,
    //  mouseout: this.props.resetHighlight,
      click: this.zoomToFeature
    })
  }

  render() {
    return <Wrapper width="100%" height="100%" id='map' />
  }
}
