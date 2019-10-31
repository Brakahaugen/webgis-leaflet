import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ControlledOpenSelect from './geoProcessSelect'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import createBuffer from './bufferProcess';


export default class ProcessForm extends React.Component {
  classes = makeStyles(theme => ({
    button: {
      display: 'block',
      marginTop: theme.spacing(2),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));

    constructor(props) {
      super(props);
      this.state = {
        layers: this.props.layers,
        selectedToolIndex: -1,
        open: false,
        tools: ['UNION', 'BUFFER', 'INTERSECT'],
        parameters: [],
      };
    }

  handleClickOpen = () => {
    this.setState({
      open: true
    });    
  };

  handleClose = () => {
    console.log(this.state.selectedTool)
    console.log(this.state.layers)
    this.setState({
      open: false
    });    
  };

  // openTools = () => {
  //   this.setState({
  //     toolSelector: true,
  //   });
  // }

  // closeTools = () => {
  //   this.setState({
  //     toolSelector: false,
  //   });
  // }

  setTool = (value) => {
    this.setState({
      selectedToolIndex: value,
    });        
  }

  setParam = (param) => {
    this.setState({
      parameters: [...this.state.parameters, this.props.layers[param]],
    })
    console.log(this.state.parameters)
  }

  doProcess = () => {
    let tool = this.state.tools[this.state.selectedToolIndex]
    let param = this.state.parameters[0];
    console.log(tool)
    console.log(param)
    createBuffer(param)
  }
  
  render() {
    console.log(this.state.selectedToolIndex)
    let selector;
    switch(this.state.selectedToolIndex) {
      case -1: //Not a single tool selected.
        break;
      case 1: //BUFFER
      selector = <ControlledOpenSelect 
      setParentValue={this.setParam}
      initialParam={-1} 
      tools={this.state.tools} 
      layers={this.state.layers} 
      type={'BUFFER'} 
      typeText={'Choose the layer you want to make a buffer around'} />
      break
    }
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Geoprocess
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Processing Tools</DialogTitle>
          <DialogContent>
            <ControlledOpenSelect 
            initialParam={this.state.selectedToolIndex}
            setParentValue={this.setTool} 
            tools={this.state.tools} 
            type={'tools'} 
            typeText={'Choose the tool you want to use'} />
            {selector}
        </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.doProcess} color="primary">
              Process
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}