import React from 'react';
import ProcessForm from '../Processing/ProcessForm'
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import CreateLayerMenu from '../Generation/CreateLayerMenu.js';
import './Toolbar.css';

const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
        <div className="toolbar__toggle-button">
            <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <div className="spacer" />
        <div className="toolbar_navigation-items">
          <CreateLayerMenu 
            createLayerMode={props.createLayerMode}
            toggleCreateMode={props.toggleCreateMode}
          />
        </div>
        <div className="minispacer" />
        <div className="toolbar_navigation-items">
              <ProcessForm 
                layers={props.layers} 
                handleNewFile={props.handleNewFile}
              />
        </div>
    </nav>
  </header>
);

export default toolbar;
