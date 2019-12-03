import React, { Component, useCallback } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import Map from './Map/index';
import LayerList from './components/LayerList/LayerList.js';
import DragAndDrop from './components/DragAndDrop.js';
import Dropzone from 'react-dropzone';
import { Resizable, ResizableBox } from 'react-resizable';
import { colors, Hidden } from '@material-ui/core';
import { textAlign } from '@material-ui/system';
import MyDropzone from './components/DropZone.js';
import SimpleSnackbar from './components/Processing/Snackbar.js';

class App extends Component {

  constructor(props) {
    super(props)
    this.orderLayers = this.orderLayers.bind(this)
    this.addLayer = this.addLayer.bind(this)
    this.handleNewFile = this.handleNewFile.bind(this);
  }

  state = {
    sideDrawerOpen: true,  
    layers: [],
    selectedIndex: null,
    file: null,
    deletedLayers: [],
    deletedLayer: null,
    hide: null,
    unhide: null,
    zoomTo: [],
    createLayerMode: [],
  }

  componentDidUpdate = () => {
    console.log(this.state.layers)
  }

  drawerToggleClickHandler = () => {
    console.log("HALØKJFASKJFLSJØF")
    if (this.state.createLayerMode[0]) {
      console.log("stop")
      this.setState({
        createLayerMode: []
      })
    } else {
      this.state.createLayerMode.push('start')
      console.log("start")
    }
    var exfile = { "type": "FeatureCollection",
    "features": [
      { "type": "Feature",
        "geometry": {"type": "Point", "coordinates": [10.3888517,63.4279697]},
        "properties": {"prop0": "value0"}
        },
      { "type": "Feature",
        "geometry": {"type": "Point", "coordinates": [10.3898517,63.4279697]},
        "properties": {"prop0": "value0"}
        },
      { "type": "Feature",
        "geometry": {"type": "Point", "coordinates": [10.3898517,63.4289697]},
        "properties": {"prop0": "value0"}
        },
      { "type": "Feature",
        "geometry": {"type": "Point", "coordinates": [10.3888517,63.4289697]},
        "properties": {"prop0": "value0"}
        },
      ]
    }
      console.log("handling")
      this.handleNewFile(exfile)
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });
  };

  openGeoProcess = () => {}

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  };

  handleNewFile = (file) => {
    console.log(file);
    this.setState({
      file: file
    });  
  }

  handleListItemClick = (event, index) => {
    this.setState({
      selectedIndex: index,
    });

    try {
      console.log(this.state.layers[index].layer.name);
    } catch {
      console.log("could not find name");
    }
//    this.highlightFeature(this.state.layers[index])
  };




  handleDelete = itemId => {
    
    try {
      //Finds the layer we are going to delete
      let layerToDelete = this.state.layers.filter(l => l.layer._leaflet_id == itemId)[0]

      // Save the deleted layer so you can undo it later;
      // updates the new state... Does not add the layer...
      this.state.deletedLayers.push(layerToDelete)
      console.log(layerToDelete.layer._leaflet_id)
      this.setState({
        deletedLayer: layerToDelete.layer,
        layers: this.state.layers.filter(l => l.layer._leaflet_id !== itemId)
      });
    } catch {
      alert('could not remove the layer');
    }
  };

  orderLayers(newLayers) {
    this.setState({
       layers: newLayers
    })
    //should implement here that you can redo it.
  };


  addLayer = (layer) => {
    //Checks if the layer exists from before
    let existingLayer = this.state.layers.find(l => l.layer._leaflet_id == layer.layer._leaflet_id)

    if (layer.layer._layers && !layer.layer._svgSize && existingLayer == undefined) {
      console.log(layer)
      console.log(this.state.layers)
      console.log(layer === this.state.layers[0])
      this.state.layers.push(layer);
      layer.key = layer.layer._leaflet_id
    } 
  }



//Leaflet functions for passing on to layerlist
  resetHighlight = (e) => {
    e.target.setStyle({
      weight: 1,
      dashArray: '',
      fillOpacity: 0.4
    });
  }

  zoomToLayer = (e) => {
    console.log("KJØASKFJØASJFKKASFJØ")
    this.setState({
      zoomTo: e
    })
  }

  toggleVisibility = (e) => {
    console.log(e)
    if (e.visibility) {
      this.setState({
        hide: e
      })
    } else {
      this.setState({
        unhide: e
      })
    }
    e.visibility = !e.visibility
  }

  clickCreateMode = (click) => {
    if (this.state.createLayerMode === undefined || this.state.createLayerMode == 0) {
      console.log(click)
      // var layer = L.Point(latlngs).addTo(map);
    }
  }


  resetFile = () => {
    this.setState({
      file: null,
      deletedLayer: null,
      hide: null,
      unhide: null,
   })  
  }
  
  
  highlightFeature = (e) => {
    console.log(e)
    e.target.setStyle({
      weight: 2,
      dashArray: '',
      fillOpacity: 0.6
    });
  }
  
  selectLayer = (id) => {

  }


  render() {
    let backdrop;
    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }
    return (
      <div style={{
        height: '100%',
        width: '100%'}}>
        <div style={{
          height: '100vh - 46px',
          width: '19.5vw',
          position: 'absolute',
          marginTop: "46px",
          marginLeft: "0.1vw",
          }}>
          <MyDropzone 
            handleNewFile={this.handleNewFile}  
          />
          <LayerList 
          handleListItemClick={this.handleListItemClick} 
          selectedIndex={this.state.selectedIndex}
          layers={this.state.layers} 
          orderLayers={this.orderLayers} 
          onDelete={this.handleDelete}
          toggleVisibility={this.toggleVisibility}
          zoomTo={this.state.zoomTo}
          />

                    
        </div>
        <Toolbar 
        drawerClickHandler={this.drawerToggleClickHandler} 
        layers={this.state.layers}
        handleNewFile={this.handleNewFile}
        />
        <main style={{marginLeft: '20vw', height: '100vh', width: '80vw', overflow: 'auto', zIndex: "-1999"}}>
          <Map  
            addLayer={this.addLayer}
            createLayer={this.createLayer}
            highlightFeature={this.highlightFeature}
            resetHighlight={this.resetHighlight}
            selectLayer={this.selectLayer}
            file={this.state.file}
            resetFile={this.resetFile}
            layers={this.state.layers}
            deletedLayers={this.state.deletedLayers}
            deletedLayer={this.state.deletedLayer}
            toggleVisibility={this.toggleVisibility}
            hide={this.state.hide}
            unhide={this.state.unhide}
            zoomTo={this.state.zoomTo}
            createLayerMode={this.state.createLayerMode}
          />
          </main>

        {/*
        {//backdrop}
        }
        <SideDrawer layers={this.state.layers} show={this.state.sideDrawerOpen} />
 */}
      </div>
    );
  }
}

export default App;
