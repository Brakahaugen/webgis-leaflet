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
import InboxIcon from "@material-ui/icons/Inbox";
import EditIcon from "@material-ui/icons/Edit";


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
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.layers !== prevProps.layers) {
      this.setState({
        items: this.props.layers
      });      
    }
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


  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {

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
                        ContainerComponent="li"
                        ContainerProps={{ ref: provided.innerRef }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          provided.draggableProps.style
                        )}
                      >
                        <ListItemIcon>
                          <InboxIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={item.layer._leaflet_id}
                          secondary={item.layer._leaflet_id}
                        />
                        <ListItemSecondaryAction>
                          <IconButton id={item.layer._leaflet_id} onClick={() => this.props.onDelete(item.layer._leaflet_id )}
>
                            <EditIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
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

// import React, { Component } from "react";
// import {
//   List,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   IconButton,
//   ListItemSecondaryAction
// } from "@material-ui/core";
// import RootRef from "@material-ui/core/RootRef";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import InboxIcon from "@material-ui/icons/Inbox";
// import EditIcon from "@material-ui/icons/Edit";

// const reorder = (list, startIndex, endIndex) => {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);
  
//     return result;
//   };
  
//   const getItemStyle = (isDragging, draggableStyle) => ({
//     // styles we need to apply on draggables
//     ...draggableStyle,
  
//     ...(isDragging && {
//       background: "rgb(235,235,235)"
//     })
//   });
  
//   const getListStyle = isDraggingOver => ({
//     //background: isDraggingOver ? 'lightblue' : 'lightgrey',
//   });

//   class LayerList extends Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         items: props.layers
//       };
//       this.onDragEnd = this.onDragEnd.bind(this);
//     }
  
//     onDragEnd(result) {
//       // dropped outside the list
//       if (!result.destination) {
//         return;
//       }
  
//       const items = reorder(
//         this.state.items,
//         result.source.index,
//         result.destination.index
//       );
  
//       this.setState({
//         items
//       });
//     }

//     render() {
//         return (
//           <DragDropContext 
//           onDragEnd={this.onDragEnd}>

//             <Droppable droppableId="droppable">
//               {(provided, snapshot) => (
//                 <RootRef rootRef={provided.innerRef}>
//                   <List style={getListStyle(snapshot.isDraggingOver)}>
//                     {this.state.items.map((item, index) => (
//                       <Draggable key={item.layer._leaflet_id} draggableId={item.layer._leaflet_id} index={index}>
//                         {(provided, snapshot) => (
//                           <ListItem
//                             ContainerComponent="li"
//                             ContainerProps={{ ref: provided.innerRef }}
//                             {...provided.draggableProps}
//                             {...provided.dragHandleProps}
//                             style={getItemStyle(
//                               snapshot.isDragging,
//                               provided.draggableProps.style
//                             )}
//                           >
//                             <ListItemIcon>
//                               <InboxIcon />
//                             </ListItemIcon>
//                             <ListItemText
//                               primary={item.layer._leaflet_id}
//                               secondary={item.layer._leaflet_id}
//                             />
//                             <ListItemSecondaryAction>
//                               <IconButton>
//                                 <EditIcon />
//                               </IconButton>
//                             </ListItemSecondaryAction>
//                           </ListItem>
//                         )}
//                       </Draggable>
//                     ))}
//                     {provided.placeholder}
//                   </List>
//                 </RootRef>
//               )}
//             </Droppable>
//           </DragDropContext>
//         );
//       }
//     }

// export default LayerList;