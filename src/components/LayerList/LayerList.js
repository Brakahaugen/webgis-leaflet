import React, { Component } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction
} from "@material-ui/core";
import RootRef from "@material-ui/core/RootRef";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import DeleteIcon from '@material-ui/icons/Delete';
import ContextMenu from '../CustomContext/ContextMenu.js';
import DisplayDialog from './changeDisplay.js';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // styles we need to apply on draggables
  ...draggableStyle,

  ...(isDragging && {
    background: "rgb(235,235,235)"
  })
});

const getListStyle = isDraggingOver => ({
  //background: isDraggingOver ? 'lightblue' : 'lightgrey',
});



class LayerList extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      items: props.layers,
      selectedIndex: null,
      displayDialog: null,
      disableDrag: false
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidMount() {
    // document.addEventListener('contextmenu', function(event){
    //   event.preventDefault();
    // }); 
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.layers !== prevProps.layers) {

      this.setState({
        items: this.props.layers
      });      
    }
  }

  onZoomToLayer = (item) => {
    console.log("yiagkdajøgaskdgøasdk")
  }

  changeDisplay = (item) => {

  }

  changeName = (item) => {
    
  }

  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    //reorders the props
    this.props.orderLayers(items);
    this.setState({
      items: items
    });
  }

   rightClick(e) {
    console.log("RIGHT CLICK BABY ")
  }



  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    let visibility = <VisibilityIcon/>
    let visibilityOff = <VisibilityOffIcon/>

      return (
      
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <RootRef rootRef={provided.innerRef}>
              <List style={getListStyle(snapshot.isDraggingOver)}>
                {this.props.layers.map((item, index) => (
                  <Draggable key={item.layer._leaflet_id} draggableId={item.layer._leaflet_id} index={index}>
                    {(provided, snapshot) => (
                      <ListItem
                        selected={this.props.selectedIndex === index}
                        onClick={event => this.props.handleListItemClick(event, index)}
                        onContextMenu={this.rightClick}
                        ContainerComponent="li"
                        ContainerProps={{ ref: provided.innerRef }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={this.state.disableDrag ? console.log() : getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <ListItemText
                          primary={item.layer.name ? item.layer.name: item.layer._leaflet_id}
                          //secondary={item.layer._leaflet_id}
                        />
                        <ListItemIcon>
                          <IconButton id={item.layer._leaflet_id} onClick={() => this.props.toggleVisibility(item.layer)}>
                            {item.layer.visibility ? visibility: visibilityOff}
                          </IconButton>
                        </ListItemIcon>
                        <IconButton id={item.layer._leaflet_id} onClick={() => this.props.onDelete(item.layer._leaflet_id )}>
                          <DeleteIcon />
                        </IconButton>
                        <div style={{
                          zIndex: '800'}}>
                        <DisplayDialog
                          onClick={() => this.state.disableDrag = true}  
                          onClose={() => this.state.disableDrag = false}                 
                          item={item}
                          heading={"Change display"}
                          subTexts={[
                            "Change layer name",
                            //"Change edgecolor",
                            // "Change edgesize",
                          ]}  
                            />
                          </div>
                        {/* <IconButton>
                          <MoreVertIcon onClick={this.setState({moreOptions: item})}/>
                        </IconButton> */}
                        <ListItemSecondaryAction/>
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </List>
            </RootRef>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}


export default LayerList;