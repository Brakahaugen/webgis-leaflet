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



  constructor(props) {
    super(props)
  }

  state = {
    file: this.props.file,
  }

  componentDidMount = () => {
    this.map = L.map('map', {
        center: [63.43,10.4],
        zoom: 14,
        zoomControl: false,
        layers: L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png', {
          // 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?'
                  detectRetina: true,
                  maxZoom: 20,
                  maxNativeZoom: 17,
        }),
    });
    this.map.on('layeradd', this.props.addLayer);
  }

  componentDidUpdate = () => {
    //Create file from new imported geojson
    if (this.props.file) {
      this.createLayer(this.props.file);
      this.props.resetFile();
    }
    //Remove the requested file
    else if (this.props.deletedLayer) {
      console.log(this.props.deletedLayer)
      this.map.removeLayer(this.props.deletedLayer)
      this.props.resetFile();
    }
    //hide the layer L by removing it from the map
    else if (this.props.hide) {
      console.log(this.props.hide)
      this.map.removeLayer(this.props.hide)
      this.props.resetFile();
    }
    //unhide the layer L by re-adding it to the map
    else if (this.props.unhide) {
      this.props.unhide.addTo(this.map)
      this.map.addLayer(this.props.unhide)
      this.props.resetFile();
    }
    else if (this.props.zoomTo) {
      console.log(this.props.zoomTo)
      console.log(this.props.zoomTo.getBounds())
      console.log(this.props.zoomTo.target.getBounds())
      // this.map.fitBounds()
    }
  }
  
  zoomToFeature = (e) => {
    console.log(e)
    return (e.layer ? this.map.fitBounds(e.target.getBounds()): "$10.00");
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
            fillOpacity: 0.8
          });
      },
      style: {color: "#0000ff"},
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
    return <Wrapper width="100%" height="500px" id='map' />
  }
}
