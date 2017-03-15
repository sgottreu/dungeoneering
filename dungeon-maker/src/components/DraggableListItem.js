import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import {ListItem} from 'material-ui/List';

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
};

const dListItemSource = {
  beginDrag(props) {
    return {
      name: props.name,
      _id: props._id
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    if (dropResult) {
      props.onGetDroppedItem(item);
    }
  },
};

const collect = function(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

class DraggableListItem extends Component {
   constructor(props){
    super(props);
    this.selectDungeon = this.selectDungeon.bind(this);
   }

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    onHandleDungeonChoice: PropTypes.func.isRequired
  };

  selectDungeon(_id){
    this.props.onHandleDungeonChoice(_id);
  }

  render() {
    const { isDragging, connectDragSource } = this.props;
    const { name, _id } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return (
      connectDragSource(
        <div>
          <ListItem 
              style={{ ...style, opacity }}
              onTouchTap={this.selectDungeon.bind(this, _id)}
              primaryText={name}
          />
        </div>
      )
    );
  }
}

export default DragSource('draggableListItem', dListItemSource, collect)(DraggableListItem);

// export default DragDropContext(HTML5Backend)(DraggableListItem);