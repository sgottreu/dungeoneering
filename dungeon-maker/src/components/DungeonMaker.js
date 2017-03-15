import React, { Component } from 'react';
import Slots from './Slots.js';
import DungeonGrid from './DungeonGrid';
import TileOptions from './TileOptions';
import DungeonLoadDrawer from './DungeonLoadDrawer';
import TileDrawer from './TileDrawer';
import EntityTooltip from './EntityTooltip';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import EntityDrawer from './EntityDrawer';
import axios from 'axios';
import {Variables} from './Variables';
import {_Dungeon} from './_Dungeon';

import '../css/DungeonMaker.css';

class DungeonMaker extends Component {
  constructor(props){
    super(props);

    this.selectTile = this.selectTile.bind(this);
    this.addTile = this.addTile.bind(this);
    // this.setDoors = this.setDoors.bind(this);
    this.handleMyEvent = this.handleMyEvent.bind(this);
    this.saveDungeonGrid = this.saveDungeonGrid.bind(this);
    this.chooseDungeon = this.chooseDungeon.bind(this);
    this.setDungeon = this.setDungeon.bind(this);
    this.selectEntity = this.selectEntity.bind(this);
    this.setTile = this.setTile.bind(this);
    this.setEntity = this.setEntity.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleEntityMouseOver = this.handleEntityMouseOver.bind(this);
    this.showDupeButton = this.showDupeButton.bind(this);
    this.duplicateDungeon = this.duplicateDungeon.bind(this);
    this.setSlotDimensions = this.setSlotDimensions.bind(this);
    this.loadSaveMenu = this.loadSaveMenu.bind(this);

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
      _id: false,
      snackbarOpen: false,
      snackbarMsg: '',
      hoverEntity: false,
      mouse: {
        clientX: false,
        clientY: false
      }
    };
  }

  componentDidMount() {
    window.addEventListener("click", this.handleMyEvent);

    let _this = this;

    _Dungeon.findDungeonGrids(_this);

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

  handleEntityMouseOver = (entity, eve) => {
    let state = this.state;
    state.hoverEntity = entity;
    state.mouse.clientX = eve.clientX;
    state.mouse.clientY = eve.clientY;
    this.setState(state);
  }

  setSlotDimensions = (slot) => {
    // let state = this.state;
    
    //   state.slots[ slot.dataset.slot - 1].left = slot.offsetLeft;
    //   state.slots[ slot.dataset.slot - 1].top = slot.offsetTop;
    // this.setState(state);
  }

  saveDungeonGrid(){
    let {slots, title, _id} = this.state;
    let _this = this;
    axios.post(`${Variables.host}/saveDungeonGrids`, {slots: slots, title: title, _id: _id})
      .then(res => {
        let fDG = _this.state.foundDungeonGrids;
        if(!_id){
          fDG.push({ _id: res.data._id, title: title });
        } else {
          fDG.map( function(grid, i){ if(grid._id === _id){ grid.title = title; } return grid;});
        }

        _this.setState( {snackbarOpen: true, snackbarMsg: 'Encounter successfully saved'});
      });
  }

  setDungeon(selectedDungeon){
    if(selectedDungeon === false){
      return false;
    }
    let _this = this;
    axios.get(`${Variables.host}/findDungeonGrid?_id=${selectedDungeon}`)
      .then(res => {
        let state = _this.state;
        state.slots = res.data.slots;
        state._id = res.data._id;
        state.title = res.data.title;
        _this.setState(state);
        this.convertImageToCanvas();
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

    state.tileType = (state.tileType === tileType.label) ? '' : tileType.label;

    this.setState( state );
  }

  setEntity(e, state, slot){
    if(state.slots[ slot - 1 ].occupied === true && state.selectedEntity._id){
      state.slots[ slot - 1 ].overlays.entity = false;
      state.slots[ slot - 1 ].occupied = false;
      state.hoverEntity = false;
    } else {
      state.slots[ slot - 1 ].overlays.entity = state.selectedEntity;
      state.slots[ slot - 1 ].occupied = true;
    }

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

  addTile(slot, e) {
    let state = this.state;

    let selectedTile = state.selectedTile;
    let tileType = TileOptions.find( function(val) { return val.id === selectedTile });

    if(tileType === undefined || tileType.overlay){
      return false;
    }

    state.slots[ slot-1 ].tileType = (state.slots[ slot-1 ].tileType === tileType.label) ? '' : tileType.label;
    state.slots[ slot-1 ].left = e.target.offsetLeft;
    state.slots[ slot-1 ].top = e.target.offsetTop;

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
    let selectedEntity = this.state.availableMonsters.find(function(val){ return val._id === id});
    this.setState( { selectedEntity: selectedEntity, selectedTile: '' });
  }

  showDupeButton = () => {
    return (
      <RaisedButton
          label="Duplicate Dungeon"secondary={true} 
					className="button"
          onTouchTap={this.duplicateDungeon}
        />

    );
  }

  duplicateDungeon = () => {
    let state = this.state;
    state.selectedDungeon = false;
    state._id = false;
    state.title = 'Copy of '+state.title;
    this.setState(state);
  }

  loadSaveMenu = () => {
		return(
			<div>

				<br/>
				<TextField hintText="Dungeon Name" value={this.state.title} onChange={this.handleTitleChange} />
				<RaisedButton label="Save Dungeon" primary={true}  onClick={this.saveDungeonGrid} />
			</div>
		)
	}

  render() {
    let {slots, selectedTile, foundDungeonGrids, selectedDungeon, selectedEntity, availableMonsters} = this.state;

    return (    	
	      <div className="DungeonMaker">
          <DungeonGrid slots={slots} onSetSlotDimensions={this.setSlotDimensions} onAddTile={this.addTile} selectedDungeon={selectedDungeon} onSetDungeon={this.setDungeon} onHandleEntityMouseOver={this.handleEntityMouseOver}/>
          <TileDrawer tiles={TileOptions} onSelectTile={this.selectTile} selectedTile={selectedTile} />
          <EntityDrawer entityType="monster" availableMonsters={availableMonsters} onSelectEntity={this.selectEntity} selectedEntity={selectedEntity} />
          <EntityTooltip hoverEntity={this.state.hoverEntity} mouse={this.state.mouse} />
          <DungeonLoadDrawer showSave={true} onHandleTitleChange={this.handleTitleChange} onChooseDungeon={this.chooseDungeon} selectedDungeon={selectedDungeon} onSaveDungeonGrid={this.saveDungeonGrid} foundDungeonGrids={foundDungeonGrids} dungeonTitle={this.state.title}/>
          {selectedDungeon !== false ? this.showDupeButton() : ''}
          {this.loadSaveMenu()}
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

