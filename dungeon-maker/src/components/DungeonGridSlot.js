import React, { Component } from 'react';
import Door from './Door';

import '../css/DungeonGridSlot.css';

class DungeonGridSlot extends Component {
  
  render() {
    let {id, tileType, onAddTile, overlays} = this.props;
    let className = 'DungeonGridSlot ';
    className += (tileType === undefined || tileType === 'door') ? '' : tileType;
//console.log(id);
    if(onAddTile === undefined){
      onAddTile = function() { return false };
    }

    return (
      <div className={className} data-slot={id} onClick={onAddTile.bind(this, id)}>&nbsp;
        {overlays.doors.map( (door, x) => (
          <Door key={x} door={door}/>
        ))}
        {(overlays.entity) ? <div key={overlays.entity.entity_id} className={overlays.entity.iconClass+' Entity icon'}/> : ''}


      </div>
    );
  }
}

DungeonGridSlot.propTypes = {
  	tileType: React.PropTypes.string
 };

export default DungeonGridSlot;
