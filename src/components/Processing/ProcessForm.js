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
import createUnion from './unionProcess';
import createIntersect from './intersectProcess';
import createSimplify from './simplifyProcess';
import Input from '@material-ui/core/Input';
import BuildIcon from '@material-ui/icons/Build';
import CloseIcon from '@material-ui/icons/Close';
import { create } from 'domain';
import { IconButton, Snackbar } from '@material-ui/core';
import SimpleSnackbar from './Snackbar'
import preProcess from "./preProcess.js";
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import createClip from './clipProcess';



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


export default class ProcessForm extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        layers: this.props.layers,
        selectedToolIndex: -1,
        open: false,
        tools: ['UNION', 'BUFFER', 'INTERSECT', 'SIMPLIFY', "CLIP"],
        parameters: [],
        param1: null,
        param2: null,
        numberParameter: 0.001,
        snackbar: false,
        snackbarMsg: "",
        snackbarType: "",
      };  
    }

  handleClickOpen = () => {
    this.setState({
      open: true
    });    
  };

  toggleSnackbar = (msg, type) => {
    if ((typeof msg === 'string' || msg instanceof String) && (typeof type === 'string' || type instanceof String)) {
      console.log(msg)
      console.log(type)
      this.setState({
        snackbar: true,
        snackbarMsg: msg,
        snackbarType: type,
      })
    } else if (type !== "clickaway") {
      //Hmmm....
      this.setState({
        snackbar: false,
        snackbarMsg: "",
        snackbarType: "",
      })
    }
  }

  handleClose = () => {
    console.log(this.state.selectedTool)
    console.log(this.props.layers)
    this.setState({
      open: false
    });    
  };


  setTool = (value) => {
    this.setState({
      selectedToolIndex: value,
    });        
  }

  setParam = (param) => {
    if (this.state.param1 == param) {
      console.log("samesies")
      return 
    } else if (this.state.param2 == param) {
      this.toggleSnackbar("You must choose two differen't layers", "warning")
    }
    this.setState({
      param1: param
    })
  }

  setParam2 = (param) => {
    if (this.state.param2 == param) {
      console.log("samesies")
      return 
    } else if (this.state.param1 == param) {
      this.toggleSnackbar("You must choose two differen't layers", "warning")
    }
    this.setState({
      param2: param
    })
  }

  setNumberParam = (param) => {
    this.setState({
      numberParameter: param.target.value,
    })
    console.log(param.target.value)
  }

  displaySnackbar = () => {
    let snackbar = ( 
      <SimpleSnackbar
        open={this.state.snackbar}
        toggleSnackbar={this.toggleSnackbar}
        msgType={this.state.snackbarType ? this.state.snackbarType: "success"}//success, warning, error, info
        msg={this.state.snackbarMsg ? this.state.snackbarMsg: "hello"}//Input: string of mesage
      />)      

    console.log(snackbar)
    return snackbar
  }

  doProcess = () => {
    let tool = this.state.tools[this.state.selectedToolIndex]
    let json1 = this.props.layers[this.state.param1]
    let json2 = this.props.layers[this.state.param2]
    let dist = this.state.numberParameter
    let file = null;

    switch(tool) {
      case "UNION":
        file = createUnion([json1, json2], dist, this.toggleSnackbar)
        break;

      case "BUFFER":
        file = createBuffer(json1, dist, this.toggleSnackbar)
        break;

      case "INTERSECT":
        file = createIntersect([json1, json2], this.toggleSnackbar)
        break;

      case "SIMPLIFY":
        file = createSimplify(json1, dist, this.toggleSnackbar)
        break;
        
      case "CLIP":
        file = createClip(json1, json2, this.toggleSnackbar)
      break;
    }
    if (file != null) {
      this.props.handleNewFile(file);
      this.toggleSnackbar("...Success!", "success")
    }

    this.setState({
      open: false,
      param1: null,
      param2: null,
      numberParameter: 0.001,
    });    
  }
  
  render() {

    let selector;
    let numberParameter;
    let numberParameterText;

    switch(this.state.selectedToolIndex) {
      case -1: //Not a single tool selected.
        break;
      
        case 0: //Union
        selector = 
          <div>
            <DialogContentText>
              {'Choose the layers you want to find the union of.'} 
            </DialogContentText>

            <div style={{display: "flex"}}>
            <ControlledOpenSelect 
              setParentValue={this.setParam}
              initialParam={-1} 
              tools={this.state.tools} 
              layers={this.props.layers} 
              type={'1st Input layer'} 
            />

            <ControlledOpenSelect 
              setParentValue={this.setParam2}
              initialParam={-1} 
              tools={this.state.tools} 
              layers={this.props.layers} 
              type={'2nd Input layer'} 
            />
            </div>
        </div>
        break;

      case 1: //BUFFER
        selector = <ControlledOpenSelect 
          setParentValue={this.setParam}
          initialParam={-1} 
          tools={this.state.tools} 
          layers={this.props.layers} 
          type={'Input'} 
          typeText={'Choose the layer you want to make a buffer around.'} 
        />
        numberParameter = <Input
          onChange={this.setNumberParam}
          placeholder="Buffer distance (km)"
          inputProps={{
            'aria-label': 'description',
          }}
        />
        numberParameterText = <DialogContentText>
          {"Insert the buffer distance. In kilometres"}
        </DialogContentText>
        break;
      
      case 2: //Intersect 
        selector = 
          <div>
            <DialogContentText>
              {'Choose the layers you want to find the intersection of.'} 
            </DialogContentText>

            <div style={{display: "flex"}}>
            <ControlledOpenSelect 
              setParentValue={this.setParam}
              initialParam={-1} 
              tools={this.state.tools} 
              layers={this.props.layers} 
              type={'1st Input layer'} 
            />

            <ControlledOpenSelect 
              setParentValue={this.setParam2}
              initialParam={-1} 
              tools={this.state.tools} 
              layers={this.props.layers} 
              type={'2nd Input layer'} 
            />
            </div>
        </div>
        break;

      case 3: //Simplify 
        selector = 
          <div>
            <DialogContentText>
              {'Choose the layer you want to simplify.'} 
            </DialogContentText>

            <div style={{display: "flex"}}>
            <ControlledOpenSelect 
              setParentValue={this.setParam}
              initialParam={-1} 
              tools={this.state.tools} 
              layers={this.props.layers} 
              type={'Input layer'} 
            />
            </div>
        </div>

        numberParameter = 
          <Input
            onChange={this.setNumberParam}
            placeholder="Default 0.001"
            inputProps={{
              'aria-label': 'description',
            }}
          />

      numberParameterText = 
        <DialogContentText>
          {"Insert tolerance factor. Must be higher than 0."}
        </DialogContentText>
      break;

      case 4: //CLIP 
        selector = 
          <div>
            <DialogContentText>
              {'Choose the layer you want to clip.'} 
            </DialogContentText>

            <div style={{display: "flex"}}>
            <ControlledOpenSelect 
              setParentValue={this.setParam}
              initialParam={-1} 
              tools={this.state.tools} 
              layers={this.props.layers} 
              type={'Input line-layer'} 
            />
            <ControlledOpenSelect 
              setParentValue={this.setParam2}
              initialParam={-1} 
              tools={this.state.tools} 
              layers={this.props.layers} 
              type={'clip on polygon:'} 
            />
            </div>
        </div>
      break;
    }

    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handleClickOpen}
        ><BuildIcon />Geoprocess</Button>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Processing Tools</DialogTitle>
          <DialogContent>
          <DialogContentText>
            {'Choose the tool you want to use'}
          </DialogContentText>
            <ControlledOpenSelect 
            initialParam={this.state.selectedToolIndex}
            setParentValue={this.setTool} 
            tools={this.state.tools} 
            type={'tools'} 
            />
            {selector}
            {numberParameterText}
            {numberParameter}
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
        {this.state.snackbar ? this.displaySnackbar(): ""}
        
      </div>
    );
  }
}