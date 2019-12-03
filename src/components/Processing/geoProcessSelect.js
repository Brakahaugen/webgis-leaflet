import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import DialogContentText from '@material-ui/core/DialogContentText';

const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

//params:
// type: The type of selector
// layers: the layers we have at disposal
// tools: the tools we have at disposal.
// typeText: The text associated with the type of selector
export default function ControlledOpenSelect({initialParam, type, layers, tools, setParentValue}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(initialParam);
  const [open, setOpen] = React.useState(false);

  
  const handleChange = event => {
    setValue(event.target.value);
    setParentValue(event.target.value)
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <form autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="selector">{type}</InputLabel>
          <Select
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={value}
            onChange={handleChange}
            inputProps={{
              name: 'value',
            }}
          >
            <MenuItem value="-1">
              <em>None</em>
            </MenuItem>

            {type == 'tools'? tools? tools.map((item, index) => (
                <MenuItem value={index}>
                  <em>{item}</em>
                </MenuItem>
            ))
            : alert("Something went horribly wrong")
            : layers? layers.map((item, index) => (
                <MenuItem value={index}>
                  <em>{item.layer.name? item.layer.name: item.layer._leaflet_id}</em>
                </MenuItem>
            )) 
            : alert("No " + {layers} + 
            " to process... Add a layer by dragging it into the left column.")}

          </Select>
        </FormControl>
      </form>
    </div>
  );
}
