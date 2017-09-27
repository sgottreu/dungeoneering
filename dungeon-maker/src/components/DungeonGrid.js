import React, { Component } from 'react';
import DungeonGridSlot from './DungeonGridSlot';
import '../css/DungeonGrid.css';

class DungeonGrid extends Component {
	shouldComponentUpdate(nextProps) {
		return (nextProps.slots !== this.props.slots
				 || nextProps.combatList !== this.props.combatList
				 || nextProps.selectedDungeon !== this.props.selectedDungeon);
	}
  render (){



		let {slots, onAddTile, combatList, selectedAttackers, availableMonsters, onSetAttackerStatus, currentActor, onHandleObjMouseOver} = this.props;

		return(
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
   
}



export default DungeonGrid;
