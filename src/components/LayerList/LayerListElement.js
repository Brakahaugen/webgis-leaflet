import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import Checkbox from '@material-ui/core/Checkbox';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '200px',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>;
}

function createListItem(layers) {
  var layerItems = layers.map((layer) =>
  <ListItem button>
    <ListItemIcon>
      <Checkbox
      edge="start"
      //checked={checked.indexOf(value) !== -1}
      tabIndex={-1}
      disableRipple
      //inputProps={{ 'aria-labelledby': labelId }}
      />
    </ListItemIcon>
    <ListItemText primary={layer.layer._leaflet_id} />
  </ListItem>  
  );
  return layerItems;
}

  const SimpleList = (props) => {

  const classes = useStyles();
  const layers = props.layers;

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {createListItem(layers)}
      </List>
    </div>
  );
}

export default SimpleList;

{/* <ListItem button>
<ListItemIcon>
  <InboxIcon />
</ListItemIcon>
<ListItemText primary="Inbox" />
</ListItem>
<ListItem button>
<ListItemIcon>
  <DraftsIcon />
</ListItemIcon>
<ListItemText primary="Drafts" />
</ListItem>
</List>
<Divider />
<List component="nav" aria-label="secondary mailbox folders">
<ListItem button>
<ListItemText primary="Trash" />
</ListItem>
<ListItemLink href="#simple-list">
<ListItemText primary="Spam" />
</ListItemLink> */}

// const layerListElement = props => {

//     return (
//       // Try setting `justifyContent` to `center`.
//       // Try setting `flexDirection` to `row`.
//       <nav style={{
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//       }}>
//       <nav style={{width: 50, height: 5, margin: 5, backgroundColor: 'steelblue'}} />
//         <div>
//         </div>
//       </nav>
//     );
//   };