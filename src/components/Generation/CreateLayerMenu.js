import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import BuildIcon from '@material-ui/icons/Build';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';


import { create } from 'domain';
import { IconButton, Snackbar } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';



const classes = makeStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
    color: 'white',
    floodColor: 'black'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  input: {
    margin: theme.spacing(1),
  },
}));


export default class CreateLayerMenu extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        open: false,
        icon: <AddIcon>kjøasdf</AddIcon>,
        text: "create new layer",
        color: "primary",
        type: "LineString",
        // snackbarMsg: "",
        // snackbarType: "",
      };  
    }

  handleClick = () => {
    if (this.state.open) {
      this.handleClose()
    } else {
      this.handleOpen()
    }
  }

  handleOpen = () => {
    this.setState({
      open: true,
      icon: <SaveIcon />,
      text: "Save layer",
      color: "default",
      type: "LineString",
    });    
    this.props.toggleCreateMode(this.state.type)
  };

  handleClose = () => {
    this.setState({
      open: false,
      icon: <AddIcon />,
      text: "create new layer",
      color: "primary",
    });   
    this.props.toggleCreateMode(false)
  };

  handleSelect = event => {
    console.log(event.target.value)
    this.props.toggleCreateMode(event.target.value)
    this.setState({
      type: event.target.value
    });  
  };

  // toggleSnackbar = (msg, type) => {
  //   if ((typeof msg === 'string' || msg instanceof String) && (typeof type === 'string' || type instanceof String)) {
  //     console.log(msg)
  //     console.log(type)
  //     this.setState({
  //       snackbar: true,
  //       snackbarMsg: msg,
  //       snackbarType: type,
  //     })
  //   } else if (type !== "clickaway") {
  //     //Hmmm....
  //     this.setState({
  //       snackbar: false,
  //       snackbarMsg: "",
  //       snackbarType: "",
  //     })
  //   }
  // }




  // displaySnackbar = () => {
  //   let snackbar = ( 
  //     <SimpleSnackbar
  //       open={this.state.snackbar}
  //       toggleSnackbar={this.toggleSnackbar}
  //       msgType={this.state.snackbarType ? this.state.snackbarType: "success"}//success, warning, error, info
  //       msg={this.state.snackbarMsg ? this.state.snackbarMsg: "hello"}//Input: string of mesage
  //     />)      

  //   console.log(snackbar)
  //   return snackbar
  // }

  render() {

    return (
      <div style={{spacing: 50}}>
        {this.state.open ? 
        <Select
          value={this.state.type}
          onChange={this.handleSelect}
        >
          <MenuItem value={"LineString"}>LineString</MenuItem>
          <MenuItem value={"Polygon"}>Polygon</MenuItem>
          <MenuItem value={"MultiPoint"}>MultiPoint</MenuItem>
        </Select>: ""}
        <Button
          variant="contained"
          color={this.state.color}
          className={classes.button}
          onClick={this.handleClick}
        >
          {this.state.icon}{this.state.text}
        </Button>


        
        {/* {this.state.snackbar ? this.displaySnackbar(): ""} */}
        
      </div>
    );
  }
}