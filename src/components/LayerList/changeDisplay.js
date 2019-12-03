import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/Button';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { SliderPicker, AlphaPicker } from 'react-color';

import MenuItem from '@material-ui/core/MenuItem';
import { isTemplateElement } from '@babel/types';


const DisplayDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const [newColor, changeColor] = React.useState();
  const [name, changeName] = React.useState();

  const [newOpacity, changeOpacity] = React.useState();
  
  const handleClickOpen = () => {
    props.onClick()
    setOpen(true);
  };

  const handleClose = () => {
    props.onClose()
    setOpen(false);
  };

  const handleNameChange = (e) => {
    changeName(e.target.value);
  }

  const handleColorChange = (color) => {
    changeColor(color)
  }

  const handleOpacityChange = (opacity) => {
    changeOpacity(opacity.rgb.a)
  }

  const doChanges = () => {
    props.item.layer.name = name
    if (newColor) {
      props.item.layer.setStyle({ 
        weight: 2,
        dashArray: '',
        fillOpacity: 0.6,
        fillColor: newColor.hex,
        color: newColor.hex
      })
    }
    handleClose();
  };

  let subFields = []

  for (var i = 0; i < props.subTexts.length; i++) {
    subFields.push(                  
    <div>
      <DialogContentText>
        {props.subTexts[i]}
      </DialogContentText>
      <TextField
      autoFocus
      margin="dense"
      id={i}
      onChange={(i==0) ? e => handleNameChange(e): ""}
      fullWidth
    />
    </div>
    )
  }

  return (
    <div>
      <IconButton
      onClick={handleClickOpen}
    >
      <MoreVertIcon />
    </IconButton>
  {/* <MenuItem onClick={handleClickOpen}>{props.heading}</MenuItem> */}
      <Dialog open={open} 
              aria-labelledby="form-dialog-title" 
              fullWidth={"sm"} 
              maxWidth={"sm"} 
              onClose={handleClose}>
        <DialogTitle id="form-dialog-title">{props.item.layer.name ? props.item.layer.name: props.item.layer._leaflet_id}</DialogTitle>
        <DialogContent>
          {subFields}
        </DialogContent>
        <div
        style={{paddingTop: '4%',
                marginLeft: '4%',
                marginRight: '4%'
              }}>
        <SliderPicker
          color={newColor}
          onChange={handleColorChange}
        />
        </div>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={doChanges} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default DisplayDialog