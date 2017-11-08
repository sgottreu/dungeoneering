import React, { Component } from 'react';
import EntityTile from './EntityTile';

import '../css/DungeonGridSlot.css';

class DungeonGridSlot extends Component {

  render(){
    let { id, slot, onAddTile, entity, combatList, currentActor, onHandleObjMouseOver, availableMonsters } = this.props;

    let className = 'DungeonGridSlot ';
    className += (slot.tileType === undefined || slot.tileType === '') ? '' : slot.tileType;

    // if(onAddTile === undefined){
    //   onAddTile = () => { return false };
    // }

    return (
      <div ref={'tile'+slot.id} id={'_slot'+slot.id}
        className={className} data-slot={id} 
        onClick={ 
          (e,i,v) => { 
            if(onAddTile !== undefined){
              onAddTile(id, e) 
            } else {
              if(slot.chest !== undefined && slot.chest){
                console.log(slot);
              }
            }
          }
        }>&nbsp;
        <EntityTile 
          slot={slot}
          entity={entity}
          onHandleObjMouseOver={onHandleObjMouseOver}
          currentActor={currentActor}
          combatList={combatList}
          availableMonsters={availableMonsters}
        />
      </div>
    );
  }
}

DungeonGridSlot.propTypes = {
  	tileType: React.PropTypes.string
 };

export default DungeonGridSlot;
