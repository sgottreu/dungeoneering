import React, { Component } from 'react';
import {List} from 'material-ui/List';
import Slots from '../lib/Slots';
import DungeonGrid from './DungeonGrid';
import EntityTooltip from './EntityTooltip';
import DroppableList from './DroppableList';
import DraggableListItem from './DraggableListItem';
import {Variables} from '../lib/Variables';
import {_Dungeon} from './_Dungeon';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import * as dungeonsApi from '../api/dungeons-api';
import * as encountersApi from '../api/encounters-api';

import '../css/CreateEncounter.css';

class CreateEncounter extends Component {
  constructor(props){
    super(props);

    this.boundEncounterAC      = this.props.boundEncounterAC;
    this.boundEntityAC      = this.props.boundEntityAC;
    this.boundDungeonAC       = this.props.boundDungeonAC;

    this.selectTile = this.selectTile.bind(this);
    this.handleMyEvent = this.handleMyEvent.bind(this);
    this.addTile = this.addTile.bind(this);
    this.chooseDungeon = this.chooseDungeon.bind(this);
    this.setDungeon = this.setDungeon.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleObjMouseOver = this.handleObjMouseOver.bind(this);
    this.handleDungeonChoice = this.handleDungeonChoice.bind(this);
    this.getDroppedItem = this.getDroppedItem.bind(this);
    this.moveItem = this.moveItem.bind(this);
    this.removeDungeon = this.removeDungeon.bind(this);

    this.updateSnackBar = this.updateSnackBar.bind(this);
    this.changeEncounter = this.changeEncounter.bind(this);

    this.state = { 
      slots: Slots,
    	selectedTile: '',
    	connectedDoor: true,
    	choosingEntrance: false,
    	choosingExit: false,
      selectedDungeon: false,
      snackbarOpen: false,
      snackbarMsg: '',
      hoverObj: false,
      mouse: {
        clientX: false,
        clientY: false
      }
    };
  }

  componentDidMount() {
    window.addEventListener("click", this.handleMyEvent);

  }
  componentWillUnmount() {
    window.removeEventListener("click", this.handleMyEvent);
  }

  handleMyEvent(e) {
  
  }

  removeDungeon = (grid) => {
    let encounter = this.props.encountersState.encounter;
    
    let _i = encounter.dungeons.findIndex(function(m) { return m === grid});
    
    if(_i > -1) {
      encounter.dungeons.splice(_i, 1);
    }

    this.boundEncounterAC.updateEncounter( encounter );
  }

  handleObjMouseOver = (obj, _type, eve) => {
    let state = this.state;
    state.hoverObj = {
      obj: obj,
      type: _type
    };
    state.mouse.clientX = eve.clientX;
    state.mouse.clientY = eve.clientY;
    this.setState(state);
  }

  moveItem = (index, dir) => {
    let from = index;
    let to = (dir === 'up') ? index-1 : index+1;

    let encounter = this.props.encountersState.encounter;
    encounter.dungeons = Variables.moveArray(encounter.dungeons, from, to);

    this.boundEncounterAC.updateEncounter( encounter );
  }

  addTile(slot) {
  }

  handleTitleChange = (e) => {
    let encounter = this.props.encountersState.encounter;
    encounter.name = e.target.value;
    this.boundEncounterAC.updateEncounter( encounter );
  }

  saveDungeonGrid() {
    
  }

  setDungeon(selectedDungeon){
    dungeonsApi.findDungeon(selectedDungeon);
  }

  handleDungeonChoice(id, event){
		this.chooseDungeon(id);
    this.setDungeon(id);
	}

  changeEncounter(_id){
    let { availableEncounters } = this.props.encountersState;
    let encounter = availableEncounters.find(e => { return e._id === _id });
    this.boundEncounterAC.updateEncounter( encounter );
  }

  chooseDungeon(id){
    let state = this.state;
    state.selectedDungeon = id;
    this.setState( state );
  }

  selectTile(id) {
    let selectedTile = this.state.selectedTile;
    this.setState( { selectedTile: (selectedTile === id) ? '' : id });
  }

  getDroppedItem = (item) => {
    this.boundEncounterAC.updateEncounterDungeons( item._id );
  }

  updateSnackBar = (msg, open=false) => {
    this.setState( { snackbarMsg: msg, snackbarOpen: open } );
  }

  render() {
    let {slots, selectedDungeon} = this.state;
    let { availableMonsters, availableDungeons} = this.props;
    let { encounter, availableEncounters } = this.props.encountersState;
    let updateSnackBar = this.updateSnackBar;

    if(this.props.dungeonsState.dungeon._id !== false){
      slots = this.props.dungeonsState.dungeon.slots;
    }
    

    return (    	
      <div className="CreateEncounter">
        <DungeonGrid 
          slots={slots} 
          availableMonsters={availableMonsters}
          onAddTile={this.addTile} 
          selectedDungeon={selectedDungeon} 
          onSetDungeon={this.setDungeon} 
          onHandleObjMouseOver={this.handleObjMouseOver}
        />
        <SelectField 
          onChange={(e,i,v) => { this.changeEncounter(v) } }
          value={selectedDungeon} 
          floatingLabelText="Encounters" >
          {availableEncounters.map( (enc, x) => {
            let label = (enc.name) ? enc.name : enc._id;
            return (
              <MenuItem key={enc._id} value={enc._id} primaryText={label} />
            )
          })}
        </SelectField>
        <br/>
        <TextField hintText="Encounter Name" value={encounter.name} onChange={this.handleTitleChange} />
        <List className="AvailableDungeons">
          {availableDungeons.map( (grid, index) => {
            return (
              <DraggableListItem key={index} onGetDroppedItem={this.getDroppedItem} onHandleDungeonChoice={this.handleDungeonChoice} name={grid.title} _id={grid._id}/>
            );
          })}
        </List>
        <DroppableList 
          onMoveItem={this.moveItem} 
          availableDungeons={availableDungeons} 
          encounterDungeons={encounter.dungeons} 
          onHandleDungeonChoice={this.handleDungeonChoice}
          onRemoveDungeon={this.removeDungeon}  
        />
        <EntityTooltip hoverObj={this.state.hoverObj} mouse={this.state.mouse} />
        <br/>
				
				<RaisedButton label="Save Encounter" primary={true}
          onClick={(e,i,v) => { 
            encountersApi.saveEncounter(encounter).then( function(response){
              updateSnackBar('Encounter saved.', true)
            });
          }}

        />
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMsg}
          autoHideDuration={4000}            
        />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(CreateEncounter);
