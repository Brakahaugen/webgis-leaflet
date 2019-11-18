import React from 'react';

import './SideDrawer.css';
import SimpleList from '../LayerList/LayerListElement.js';
import LayerList from '../LayerList/LayerList.js';

const sideDrawer = props => {
  let drawerClasses = 'side-drawer';
  if (props.show) {
    drawerClasses = 'side-drawer open';
  }
  // let listItems = layers.map((layer) =>
  //   <li key={layer.layer._leaflet_id}>
  //     {layer.layer._leaflet_id}
  //   </li>
  // );
  let layers = props.layers;
    return (
      <nav className={drawerClasses}>
        <LayerList className={drawerClasses} layers={layers} />
      </nav>
    );
};

export default sideDrawer;