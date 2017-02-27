import React, { Component } from 'react';
import Door from './Door';

import '../css/DungeonGridSlot.css';

class DungeonGridSlot extends Component {
  
  constructor(props){
    super(props);
    this.loadEntityTile = this.loadEntityTile.bind(this);

  }

  loadEntityTile(slot){
    if(!slot.overlays.entity){
      return false;
    }
    let entity = slot.overlays.entity;
console.log(entity);
    let style = {
      width: (75 * entity.size),
      height: (75 * entity.size),
      position: 'absolute',
      top: slot.top,
      left: slot.left,
      backgroundSize: (75 * entity.size)
    }

    return (
      <div style={style} data-slot={slot.id} key={slot.overlays.entity.entity_id} className={slot.overlays.entity.iconClass+' Entity icon'}/>
    );
  }


  render() {
    let {id, slot, onAddTile, overlays, availableCharacters, availableMonsters} = this.props;
    let className = 'DungeonGridSlot ';
    className += (slot.tileType === undefined || slot.tileType === '') ? '' : slot.tileType;

    if(onAddTile === undefined){
      onAddTile = function() { return false };
    }

    return (
      <div className={className} data-slot={id} onClick={onAddTile.bind(this, id)}>&nbsp;
        {this.loadEntityTile(slot)}
      </div>
    );
  }
}

DungeonGridSlot.propTypes = {
  	tileType: React.PropTypes.string
 };

export default DungeonGridSlot;
