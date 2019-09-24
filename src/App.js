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
    sideDrawerOpen: false,  
    layers: [],
  }

  orderLayers(newLayers) {
    this.setState({
       layers: newLayers
    })
    //should implement here that you can redo it.
  };

  addLayer = (layer) => {
    this.state.layers.push(layer);
    console.log(this.state.layers);
  }

  drawerToggleClickHandler = () => {
    this.state.layers.pop();
    this.setState((prevState) => {
      return {sideDrawerOpen: !prevState.sideDrawerOpen};
    });

  };

  backdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
  };



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
          <LayerList layers={this.state.layers} orderLayers={this.orderLayers}/>
        </div>
        <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
        <main style={{paddingTop: '56px', paddingLeft: '300px', zIndex: "-1"}}>
          <Map addLayer={this.addLayer}/>
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
