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
		if(nextProps.selectedDungeon !== this.props.selectedDungeon){
			this.setDungeon(nextProps.selectedDungeon);
		}
	}

   render() {
   		let {slots, onAddTile} = this.props;
	    return (
	      <div className="DungeonGrid">
	        {slots.map(slot => (	          
	          <DungeonGridSlot key={slot.id} id={slot.id} slot={slot} overlays={slot.overlays} onAddTile={onAddTile} 
							onHandleObjMouseOver={this.props.onHandleObjMouseOver}
							currentActor={this.props.currentActor}
						/>
	        ))}
	      </div>
	    );
   }
}



export default DungeonGrid;
