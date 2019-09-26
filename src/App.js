import React, { Component } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';
import Map from './Map/index';
import LayerList from './components/LayerList.js';


class App extends Component {

  constructor(props) {
    super(props)
    this.orderLayers = this.orderLayers.bind(this)
    this.addLayer = this.addLayer.bind(this)
    
  }

  state = {
    sideDrawerOpen: true,  
    layers: [],
    selectedIndex: null,
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });

  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  };


  handleListItemClick = (event, index) => {
    console.log(this.state.layers);
    this.setState({
      selectedIndex: index,
    });
    this.highlightFeature(this.state.layers[index])
  };




  handleDelete = itemId => {
    //finds the layer and removes it

    let layerToDelete = this.state.layers.find(l => l.layer._leaflet_id !== itemId)
    try {
      layerToDelete.layer.remove();
      //Save the deleted layer so you can undo it later;

      //updates the new state
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
    if (layer.layer._layers) {
      this.state.layers.push(layer);
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
  
  highlightFeature = (e) => {

 

    //this.handleListItemClick(event, layersa)
    //ERROR CANT DESELECT
    //ERROR CANT SELECT TILEMAP
    try {
      e.target.setStyle({
        weight: 2,
        dashArray: '',
        fillOpacity: 0.6
      });

      //Jalla opplegg
      for (let i = 0; i < this.state.layers.length; i++) {
       if (e.target._leaflet_id === this.state.layers[i].layer._leaflet_id) {
         console.log("HAPPY DAY");
         console.log(i);
         
         this.setState({
           selectedIndex: i,
         })
       }
      } 

    } catch {
      e.layer.setStyle({
        weight: 2,
        dashArray: '',
        fillOpacity: 0.6
      });
    } finally {
      console.log(e);
    }
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
          <LayerList 
          handleListItemClick={this.handleListItemClick} 
          selectedIndex={this.state.selectedIndex}
          layers={this.state.layers} 
          orderLayers={this.orderLayers} 
          onDelete={this.handleDelete}/>
        </div>

        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />

        <main style={{paddingTop: '56px', paddingLeft: '300px', zIndex: "-1"}}>
          <Map  
            addLayer={this.addLayer}
            highlightFeature={this.highlightFeature}
            resetHighlight={this.resetHighlight}
            selectLayer={this.selectLayer}
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
