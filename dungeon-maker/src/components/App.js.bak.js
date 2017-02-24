import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import DungeonGrid from './DungeonGrid';
import TilePool, {availableTiles} from './TilePool';
import Player from './Player';
import axios from 'axios';

import './App.css';

class App extends Component {
  constructor(props){
    super(props);

  	let slots = [];
  
    for(var x=0;x<100;x++){
      slots[x] = {id: x+1, overlays: { doors : [] }, entrance: false, exit: false };
    }

    this.selectTile = this.selectTile.bind(this);
    this.addTile = this.addTile.bind(this);
    this.playerActive = this.playerActive.bind(this);
    this.actionChoice = this.actionChoice.bind(this);
    this.setDoors = this.setDoors.bind(this);
    this.saveDungeonGrid = this.saveDungeonGrid.bind(this);
    
    this.handleMyEvent = this.handleMyEvent.bind(this);

    this.state = { 
    	slots: slots,
    	selectedTile: '',
    	tiles : availableTiles,
    	playerActive: 0,
    	playerPosition: { x: false, y: false, slot: 0 },
    	connectedDoor: true,
    	choosingEntrance: false,
    	choosingExit: false
    };
  }

  handleMyEvent(e) {
  	let state = this.state;
    if(e.target.dataset.slot === undefined){
			return false;
		}
  	
  	let slot = e.target.dataset.slot;

  	if(state.playerActive){		
  		state.playerPosition = { x: e.target.offsetLeft, y: e.target.offsetTop, slot: slot};
  		this.setState( state );
  	} else {
			let tileType = state.tiles.find( function(val) { return val.id === state.selectedTile });

			if(tileType === undefined){
				return false;
			} else {

			}

			if(tileType.overlay){
				state = this.setDoors(state, e, slot);				
				this.setState( state );
			}
  	}    
  }

  setDoors(state, e, slot){
  	if(typeof state.connectedDoor === "object" ){
			let startSlot = state.connectedDoor.side1;

			//Update Original 

  		let i = state.slots[ startSlot - 1 ].overlays.doors.findIndex( function(val) { return val.side1.slot === startSlot} );
  		state.slots[ startSlot - 1 ].overlays.doors[ i ].side2 = {x: e.target.offsetLeft, y: e.target.offsetTop, slot: slot };
  		let startSlotSide1 = state.slots[ startSlot - 1 ].overlays.doors[ i ].side1;

  		if(startSlot !== slot){
    		state.slots[ slot - 1 ].overlays.doors.push( 
					{	side1: {x: e.target.offsetLeft, y: e.target.offsetTop, slot: slot },
	  				side2: startSlotSide1 } 
	  		);			
  		}
  		state.connectedDoor = false;
  	} else {
  		state.slots[ slot - 1 ].overlays.doors.push( 
  			{
  				side1: {x: e.target.offsetLeft, y: e.target.offsetTop, slot: slot },
  				side2: false } 
  			);
			state.connectedDoor = { side1: slot, side2: false };
  	}

  	return state;
  }

  componentDidMount() {
    window.addEventListener("click", this.handleMyEvent);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.handleMyEvent);
  }

  saveDungeonGrid(){
  	let slots = this.state.slots;
  	let url = '';
  	if(process !== undefined && process.env !== undefined && process.env.NODE_ENV == 'development'){
  		url = 'http://localhost:3000/save';
  	} else {
  		url = '/save';
  	}

  	axios.post(url, slots)
      .then(res => {
        //console.log(res);
      });
  }

  actionChoice(choice, id){
  	if(choice === 'addTile'){
  		this.addTile(id);
  	} else {
  		this.playerActive();
  	}
  }

  addTile(slot) {
  	let state = this.state;
  	if(state.playerActive){
  		return true;
  	}
  	

    let selectedTile = state.selectedTile;
    let tileType = state.tiles.find( function(val) { return val.id === selectedTile });
    
		if(tileType === undefined || tileType.overlay){
			return false;
		}

    state.slots[ slot-1 ].tileType = (selectedTile === '') ? '' : tileType.label;

    if(tileType.entrance) {
    	state.slots[ slot-1 ].entrance = true;
    }

    if(tileType.exit) {
    	state.slots[ slot-1 ].exit = true;
    }

    this.setState( state );
  }

  selectTile(id) {
  	let state = this.state;
    let selectedTile = state.selectedTile;
    this.setState( { selectedTile: (selectedTile === id) ? '' : id });
  }

  playerActive(){
  	let state = this.state;

  	state.playerActive = !state.playerActive;
  	state.selectedTile = '';
  	this.setState( state );
  }

  render() {
    let {tiles, slots, selectedTile} = this.state;

    return (    	
	      <div className="App">
	      	<TextField hintText="Encounter Name" />
	      	<RaisedButton label="Save Encounter" primary={true}  onClick={this.saveDungeonGrid} />

	        <DungeonGrid slots={slots} onActionChoice={this.actionChoice} />
	        <TilePool tiles={tiles} onSelectTile={this.selectTile} selectedTile={selectedTile} />
	        
	      </div>
    );
  }
}

export default App;


//<Player playerPosition={this.state.playerPosition} onActionChoice={this.actionChoice} playerActive={this.state.playerActive}/>