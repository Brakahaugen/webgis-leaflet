import React from 'react';
import ProcessForm from '../Processing/ProcessForm'
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';
import './Toolbar.css';

const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
        <div className="toolbar__toggle-button">
            <DrawerToggleButton click={props.drawerClickHandler} />
        </div>
        <div></div>
        <div className="spacer" />
        <div className="toolbar_navigation-items">
            <ul>
              <ProcessForm layers={props.layers} />
            </ul>
        </div>
    </nav>
  </header>
);

export default toolbar;
