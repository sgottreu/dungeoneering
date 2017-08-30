import React from 'react';
import DungeonGridSlot from './DungeonGridSlot';
import '../css/DungeonGrid.css';

const DungeonGrid = ({slots, onAddTile, combatList, selectedAttackers, availableMonsters, onSetAttackerStatus, currentActor, onHandleObjMouseOver}) => {

  return (
    <div className="DungeonGrid">
      {
        slots.map(slot => {
  				let entity;
  				if(slot.occupied && combatList !== undefined){
  					entity = combatList.find(item => { 
  						if(item === undefined){
  							return false;
  						}
  						return item.uuid === slot.overlays.entity
            });
  				} 
  				return (	          
  					<DungeonGridSlot key={slot.id} 
  						availableMonsters={availableMonsters}
  						id={slot.id} 
  						slot={slot} 
  						entity={entity}
  						overlays={slot.overlays} 
  						onAddTile={onAddTile} 
  						onHandleObjMouseOver={onHandleObjMouseOver}
  						currentActor={currentActor}
  						selectedAttackers={selectedAttackers}
  						onSetAttackerStatus={onSetAttackerStatus}
  						combatList={combatList}
  					/>
        	)
  		  })
      }
    </div>
  );
   
}



export default DungeonGrid;
