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
    this.map.on('click', this.props.clickCreateLayer)
  }

  componentDidUpdate = (prevProps) => {
    console.log(prevProps)
    console.log(this.props)

    try {
    //If createlayermode just swapped to false or clickedpoints length just swapped to zero.
    if (((prevProps.createLayerMode != false) && (!this.props.createLayerMode)) || ((prevProps.clickedPoints.length != 0) && (this.props.clickedPoints.length == 0))) {
      console.log("YOUAG")
      //If the createlayermode just was switched off:
      this.map.removeLayer(this.state.layer)
      //reversing coordinates to make them geojson order.
      let coordinates = prevProps.clickedPoints
      coordinates.forEach(latlng => {
        latlng.reverse();
      });
      console.log("creating layer! WOOOHOOO")

      let thisThing = {
        "type": "Feature",
        "name": "Created layer",
        "geometry": {
            "type": prevProps.createLayerMode,
            "coordinates": coordinates,
        },
      }
      console.log(thisThing)
      console.log(prevProps.createLayerMode);
      if(prevProps.createLayerMode == "Polygon") {
        console.log("change the rules")
        coordinates = [coordinates]
      }
      this.createLayer(
              {
                "type": "Feature",
                "name": "Created layer",
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
      console.log("CLICKED POINTS CHANGED LETS GO")
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
    else if (this.props.zoomTo[0]) {
      console.log(this.props.zoomTo)
      return this.map.fitBounds(this.props.zoomTo[0].target.getBounds())
      // this.map.fitBounds()
    }
  }
  


  zoomToFeature = (e) => {
    try { 
      console.log(e)
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
    console.log("creating a geojsonlayer")
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
    return <Wrapper width="100%" height="100%" id='map' />
  }
}
