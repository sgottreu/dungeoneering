import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import { DropTarget } from 'react-dnd';

const style = {
  height: '12rem',
  width: '12rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
  border: '1px solid #000',
  overflowY: 'scroll'
};

const dListItemTarget = {
  drop() {
    return { name: 'DroppableList' };
  },
};

const collect = function(connect, monitor){
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  }
};

class DroppableList extends Component {
  constructor(props){
    super(props);
    this.selectDungeon = this.selectDungeon.bind(this);
    this.makeItemMover = this.makeItemMover.bind(this);
  }
  
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
  };

  selectDungeon(_id){
    this.props.onHandleDungeonChoice(_id);
  }

  makeItemMover(index, dir){
    return (
      <i className={"fa fa-chevron-"+dir} aria-hidden="true" 
        onClick={this.props.onMoveItem.bind(this, index, dir)}></i>
    );
  }

  render() {
    const { canDrop, isOver, connectDropTarget, encounterDungeons } = this.props;
    const isActive = canDrop && isOver;

    let backgroundColor = '#fff';
    if (isActive) {
      backgroundColor = '#CCC';
    } 

    return connectDropTarget(
      <div>
        <List style={{ ...style, backgroundColor }}>
          {encounterDungeons.map( (grid, index) => {
            return (
              <div key={index} className="selectedDungeons">
                <ListItem className="listItem"
                  primaryText={grid.title}
                  onTouchTap={this.selectDungeon.bind(this, grid._id)}
                />
                <div className="moveItem">
                  {(index > 0) ? this.makeItemMover(index, 'up') : ''}
                  {(index < encounterDungeons.length - 1) ? this.makeItemMover(index, 'down') : ''}
                </div>
              </div>
            );
          })}
       </List>
      </div>
    );
  }
}

export default DropTarget('draggableListItem', dListItemTarget, collect)(DroppableList);