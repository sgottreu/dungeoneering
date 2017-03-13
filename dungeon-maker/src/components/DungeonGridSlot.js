import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/DungeonGridSlot.css';

class DungeonGridSlot extends Component {
  
  constructor(props){
    super(props);
    this.loadEntityTile = this.loadEntityTile.bind(this);

    this.handleMouseOver = this.handleMouseOver.bind(this);

  }

  handleMouseOver = (entity, eve) => {
    this.props.onHandleEntityMouseOver(entity, eve);
  }

  componentDidMount(){
    this.props.onSetSlotDimensions(ReactDOM.findDOMNode(this));
  }

  loadEntityTile(slot){
    if(!slot.overlays.entity){
      return false;
    }
    let entity = slot.overlays.entity;

    let style = {
      width: (75 * entity.size),
      height: (75 * entity.size),
      position: 'absolute',
      top: `${slot.top}px`,
      left: slot.left,
      backgroundSize: (75 * entity.size)
    }

    return (
      <div onMouseEnter={this.handleMouseOver.bind(this, entity)} onMouseLeave={this.handleMouseOver.bind(this, false)} 
        style={style} data-slot={slot.id} key={slot.overlays.entity._id} className={slot.overlays.entity.iconClass+' Entity icon'} />
    );
  }


  render() {
    let {id, slot, onAddTile} = this.props;
    let className = 'DungeonGridSlot ';
    className += (slot.tileType === undefined || slot.tileType === '') ? '' : slot.tileType;

    if(onAddTile === undefined){
      onAddTile = function() { return false };
    }

    return (
      <div ref={'tile'+slot.id}
        className={className} data-slot={id} onClick={onAddTile.bind(this, id)}>&nbsp;
        {this.loadEntityTile(slot)}
      </div>
    );
  }
}

DungeonGridSlot.propTypes = {
  	tileType: React.PropTypes.string
 };

export default DungeonGridSlot;
