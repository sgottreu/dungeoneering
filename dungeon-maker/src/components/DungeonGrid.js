import React, { Component } from 'react';
import DungeonGridSlot from './DungeonGridSlot';
import '../css/DungeonGrid.css';

class DungeonGrid extends Component {
  constructor(props){
    super(props);

    this.setDungeon = this.props.onSetDungeon.bind(this);
  }

	componentDidMount(){
	}

	componentWillReceiveProps(nextProps){

	}

   render() {
   		let {slots, onAddTile, combatList, selectedAttackers, availableMonsters} = this.props;

			

	    return (
	      <div className="DungeonGrid">
	        {slots.map(slot => {
						let entity;
						if(slot.occupied && combatList !== undefined){
							entity = combatList.find(item => { 
								if(item === undefined){
									return false;
								}
								return item.uuid === slot.overlays.entity} );
						} 
						return (	          
							<DungeonGridSlot key={slot.id} 
								availableMonsters={availableMonsters}
								id={slot.id} 
								slot={slot} 
								entity={entity}
								overlays={slot.overlays} 
								onAddTile={onAddTile} 
								onHandleObjMouseOver={this.props.onHandleObjMouseOver}
								currentActor={this.props.currentActor}
								selectedAttackers={selectedAttackers}
								onSetAttackerStatus={this.props.onSetAttackerStatus}
								combatList={combatList}
							/>
	        	)
					})}
	      </div>
	    );
   }
}



export default DungeonGrid;
