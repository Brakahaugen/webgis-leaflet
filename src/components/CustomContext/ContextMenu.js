import React from 'react';
import IconButton from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DisplayDialog from '../LayerList/changeDisplay.js';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const MenuListComposition = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  let displayDialog = null;
  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const openDisplayDialog = () => {
    console.log("jada")
    displayDialog = <div><DisplayDialog
              onClick={closeDialog}
              item={props.item}
              heading={"Change display"}
              subTexts={[
                "change layer name",
                // "change edgecolor",
                // "change edgesize",
              ]}
            />
            </div>
  }

  const closeDialog = () => {
    displayDialog = null
  }

  if (displayDialog != null) {
    return displayDialog
  } else {
    return (
    <div>
    <IconButton
      ref={anchorRef}
      aria-controls={open ? 'menu-list-grow' : undefined}
      aria-haspopup="true"
      onClick={handleToggle}
    >
      <MoreVertIcon />
    </IconButton>
    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                <MenuItem onClick={props.onZoomToLayer}>Zoom to layer</MenuItem>
                <MenuItem onClick={props.changeDisplay}>Change layer display</MenuItem>
                <MenuItem onClick={openDisplayDialog}>Change display</MenuItem>
                {/* <DisplayDialog 
                  item={props.item}
                  heading={"Change display"}
                  subTexts={[
                    "change fillcolor",
                    "change edgecolor",
                    "change edgesize",
                  ]}
                /> */}

              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
    </div>
    )}
  }

export default MenuListComposition;