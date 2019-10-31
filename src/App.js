import React, { Component, useCallback } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import Map from './Map/index';
import LayerList from './components/LayerList.js';
import DragAndDrop from './components/DragAndDrop.js';
import Dropzone from 'react-dropzone';
import {useDropzone} from 'react-dropzone';
import { colors } from '@material-ui/core';


function MyDropzone(props) {
 const onDrop = useCallback(acceptedFiles => {
    const reader = new FileReader()
  
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      // Do whatever you want with the file contents
      const binaryStr = reader.result
      let jsonLayer = JSON.parse(binaryStr)
      props.handleNewFile(jsonLayer);
      console.log(jsonLayer);
    }
  
      acceptedFiles.forEach(file => reader.readAsBinaryString(file))
    }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>
    )
  }

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
  }

  componentDidUpdate = () => {
//    console.log(this.state.file);
//    console.log(this.state.layers)
  }

  drawerToggleClickHandler = () => {
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
    //finds the layer and removes it

    let layerToDelete = this.state.layers.find(l => l.layer._leaflet_id !== itemId)
    console.log(this.state.layers.length)
    console.log(this.state.layers[0].layer)
    
      if((this.state.layers.length === 1) && (this.state.layers[0].layer._leaflet_id === itemId)) {
        let selectedLayer = this.state.layers[0]
        this.state.layers[0].layer.remove();
        this.setState({
          layers: [],
          deletedLayers: this.state.deletedLayers.push(selectedLayer)
        })
        return
      }
    try {
      layerToDelete.layer.remove();
      //Save the deleted layer so you can undo it later;

      //updates the new state... Does not add the layer...
    this.setState({ layers: this.state.layers.filter(l => l.layer._leaflet_id !== itemId)});

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
    console.log(this.state.layers)
    if (layer.layer._layers && !layer.layer._svgSize) {
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

  resetFile = () => {
    this.setState({
      file: null
   })  
  }
  
  
  highlightFeature = (e) => {
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
          height: '20%',
          width: '25%',
          position: 'absolute',
          marginTop: "56px",
          }}>
          <MyDropzone 
            handleNewFile={this.handleNewFile} 
          />
          <LayerList 
          handleListItemClick={this.handleListItemClick} 
          selectedIndex={this.state.selectedIndex}
          layers={this.state.layers} 
          orderLayers={this.orderLayers} 
          onDelete={this.handleDelete}/>          
        </div>
        <Toolbar 
        drawerClickHandler={this.drawerToggleClickHandler} 
        layers={this.state.layers}
        />
        <main style={{paddingTop: '56px', paddingLeft: '300px', zIndex: "-1"}}>
          <Map  
            addLayer={this.addLayer}
            createLayer={this.createLayer}
            highlightFeature={this.highlightFeature}
            resetHighlight={this.resetHighlight}
            selectLayer={this.selectLayer}
            file={this.state.file}
            resetFile={this.resetFile}
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
