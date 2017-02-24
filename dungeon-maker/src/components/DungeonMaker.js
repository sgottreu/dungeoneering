import React, { Component } from 'react';
import Slots from './Slots.js';
import DungeonGrid from './DungeonGrid';
import TileOptions from './TileOptions';
import DungeonLoadDrawer from './DungeonLoadDrawer';
import TileDrawer from './TileDrawer';
import Snackbar from 'material-ui/Snackbar';
import EntityDrawer from './EntityDrawer';
import axios from 'axios';
import {Variables} from './Variables';



class DungeonMaker extends Component {
  constructor(props){
    super(props);

    this.selectTile = this.selectTile.bind(this);
    this.addTile = this.addTile.bind(this);
    this.setDoors = this.setDoors.bind(this);
    this.handleMyEvent = this.handleMyEvent.bind(this);
    this.saveDungeonGrid = this.saveDungeonGrid.bind(this);
    this.chooseDungeon = this.chooseDungeon.bind(this);
    this.setDungeon = this.setDungeon.bind(this);
    this.selectEntity = this.selectEntity.bind(this);
    this.setTile = this.setTile.bind(this);
    this.setEntity = this.setEntity.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);

    this.state = { 
      slots: Slots,
      title: '',
    	selectedTile: '',
    	connectedDoor: true,
    	choosingEntrance: false,
    	choosingExit: false,
      foundDungeonGrids: [],
      selectedDungeon: false,
      availableMonsters: [],
      availableCharacters: [],
      encounter_id: false,
      snackbarOpen: false,
      snackbarMsg: ''
    };
  }

  componentDidMount() {
    window.addEventListener("click", this.handleMyEvent);

    let _this = this;

    axios.get(`${Variables.host}/findDungeonGrids`)
    .then(res => {
      let state = _this.state;
      state.foundDungeonGrids = res.data;
      _this.setState( state );
    });    

    axios.get(`${Variables.host}/findEntities`)
    .then(res => {
      let state = _this.state;
      state.availableMonsters = res.data.monster;
      state.availableCharacters = res.data.character;
      _this.setState( state );
    });   

  }
  componentWillUnmount() {
    window.removeEventListener("click", this.handleMyEvent);
  }

  saveDungeonGrid(){
    let {slots, title, encounter_id} = this.state;
    let _this = this;
    axios.post(`${Variables.host}/saveDungeonGrids`, {slots: slots, title: title, encounter_id: encounter_id})
      .then(res => {
        _this.setState( {snackbarOpen: true, snackbarMsg: 'Encounter successfully saved'});
      });
  }

  setDungeon(selectedDungeon){
    let _this = this;
    axios.get(`${Variables.host}/findDungeonGrid?encounter_id=${selectedDungeon}`)
      .then(res => {
        let state = _this.state;
        state.slots = res.data.slots;
        state.encounter_id = res.data.encounter_id;
        state.title = res.data.title;
        _this.setState(state);
      });
  }

  chooseDungeon(id){
    let state = this.state;
    state.selectedDungeon = id;
    state.snackbarOpen = false;
    this.setState( state );


  }

  setTile(e, state, slot){
    let tileType = TileOptions.find( function(val) { return val.id === state.selectedTile });

    if(tileType === undefined){
      return false;
    } 

    state.tileType = tileType.label;

    // if(tileType.overlay){
    //   state = this.setDoors(state, e, slot);        
    //   this.setState( state );    
    // } 
  }

  setEntity(e, state, slot){
    state.slots[ slot - 1 ].overlays.entity = state.selectedEntity;
    state.slots[ slot - 1 ].occupied = true;
    this.setState( state );
  }

  handleMyEvent(e) {
    let state = this.state;
    if(e.target.dataset.slot === undefined){
      return false;
    }
  
    let slot = e.target.dataset.slot;

    if(state.selectedEntity){
      this.setEntity(e, state, slot);
    }

    if(state.selectedTile){
      this.setTile(e, state, slot);
    }
   
  }

  handleTitleChange = (e) => {
    this.setState( { title: e.target.value } );
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
          { side1: {x: e.target.offsetLeft, y: e.target.offsetTop, slot: slot },
            side2: startSlotSide1 } 
        );      
      }
      state.connectedDoor = false;
    } else {
      state.slots[ slot - 1 ].overlays.doors.push( 
        {
          side1: {x: e.target.offsetLeft, y: e.target.offsetTop, slot: slot },
          side2: false 
        } 
      );
      state.connectedDoor = { side1: slot, side2: false };
    }

    return state;
  }

  addTile(slot) {
    let state = this.state;

    let selectedTile = state.selectedTile;
    let tileType = TileOptions.find( function(val) { return val.id === selectedTile });
    
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
    let selectedTile = this.state.selectedTile;
    this.setState( { selectedTile: (selectedTile === id) ? '' : id, selectedEntity: false });
  }

  selectEntity(id) {
    let selectedEntity = this.state.availableMonsters.find(function(val){ return val.entity_id === id});
    this.setState( { selectedEntity: selectedEntity, selectedTile: '' });
  }

  render() {
    let {slots, selectedTile, foundDungeonGrids, selectedDungeon, selectedEntity, availableMonsters} = this.state;
//console.log(this.state);
    return (    	
	      <div className="DungeonMaker">
          <DungeonGrid slots={slots} onAddTile={this.addTile} selectedDungeon={selectedDungeon} onSetDungeon={this.setDungeon}/>
          <TileDrawer tiles={TileOptions} onSelectTile={this.selectTile} selectedTile={selectedTile} />
          <EntityDrawer entityType="monster" availableMonsters={availableMonsters} onSelectEntity={this.selectEntity} selectedEntity={selectedEntity} />
          <DungeonLoadDrawer onHandleTitleChange={this.handleTitleChange} onChooseDungeon={this.chooseDungeon} selectedDungeon={selectedDungeon} onSaveDungeonGrid={this.saveDungeonGrid} foundDungeonGrids={foundDungeonGrids} dungeonTitle={this.state.title}/>

          <Snackbar
            open={this.state.snackbarOpen}
            message={this.state.snackbarMsg}
            autoHideDuration={4000}
            
          />

        </div>
    );
  }
}

export default DungeonMaker;

