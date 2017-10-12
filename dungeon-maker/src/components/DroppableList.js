import React, { Component, PropTypes } from 'react';
import { List, ListItem } from 'material-ui/List';
import { DropTarget } from 'react-dnd';

const style = {
  color: 'white',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  border: '1px solid #000'
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
    const { canDrop, isOver, connectDropTarget, encounterDungeons, availableDungeons, onRemoveDungeon } = this.props;
    const isActive = canDrop && isOver;

    let backgroundColor = '#fff';
    if (isActive) {
      backgroundColor = '#CCC';
    } 

    return connectDropTarget(
      <div className="encounterDungeons" style={{ ...style, backgroundColor }}>
        <List style={{width: '100%', height: '100%'}}>
          {encounterDungeons.map( (grid, index) => {
            let dungeon = availableDungeons.find(function(m) { return m._id === grid});
            let title = (dungeon === undefined) ? '' : dungeon.title;
            return (
              <div key={index} className="selectedDungeons">
                <ListItem className="listItem"
                  primaryText={title}
                  leftIcon={
                    <div onTouchTap={this.selectDungeon.bind(this, grid)}>
                      <i className="fa fa-wrench" aria-hidden="true"></i>
                    </div>
                  }
                  rightIcon={
                    <div onTouchTap={() => {
                        onRemoveDungeon(grid)    ;
                      }
                    }>
                      <i className="fa fa-remove" aria-hidden="true"></i>
                    </div>
                  }
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