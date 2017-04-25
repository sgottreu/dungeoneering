import React, { Component } from 'react';
import {List} from 'material-ui/List';
import Slots from './Slots';
import DungeonGrid from './DungeonGrid';
import EntityTooltip from './EntityTooltip';
import DroppableList from './DroppableList';
import DraggableListItem from './DraggableListItem';
import axios from 'axios';
import {Variables} from './Variables';
import {_Dungeon} from './_Dungeon';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import '../css/CreateEncounter.css';

class CreateEncounter extends Component {
  constructor(props){
    super(props);

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
    this.saveEncounter = this.saveEncounter.bind(this);

    this.state = { 
      slots: Slots,
    	selectedTile: '',
    	connectedDoor: true,
    	choosingEntrance: false,
    	choosingExit: false,
      availableEncounters: [],
      foundDungeonGrids: [],
      selectedDungeon: false,
      availableEncounters: [],
      snackbarOpen: false,
      snackbarMsg: '',
      hoverObj: false,
      mouse: {
        clientX: false,
        clientY: false
      },
      encounter: {
        _id: false,
        title: '',
        encounterDungeons: []
      }
     
    };
  }

  componentDidMount() {
    window.addEventListener("click", this.handleMyEvent);

    let _this = this;
    
    _Dungeon.findDungeonGrids(_this); 

    axios.get(`${Variables.host}/findEncounters`)
    .then(res => {
      let state = _this.state;
      state.availableEncounters = res.data;
      _this.setState(state);
    });

    axios.get(`${Variables.host}/findEntities`)
    .then(res => {
      let state = _this.state;
      state.availableMonsters = res.data.monster;
      _this.setState( state );
    });  


  }
  componentWillUnmount() {
    window.removeEventListener("click", this.handleMyEvent);
  }

  handleMyEvent(e) {
  
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

    let state = this.state;
    state.encounter.encounterDungeons = Variables.moveArray(state.encounter.encounterDungeons, from, to);
    this.setState(state);
  }

  addTile(slot) {
  }

  handleTitleChange = (e) => {
    let state = this.state;
    state.encounter.title = e.target.value;
    this.setState(state);
  }

  saveDungeonGrid() {
    
  }

  setDungeon(selectedDungeon){
    let _this = this;
    axios.get(`${Variables.host}/findDungeonGrid?_id=${selectedDungeon}`)
      .then(res => {
        let state = _this.state;
        state.slots = res.data.slots;
        _this.setState(state);
      });
  }

  handleDungeonChoice(id, event){
		this.chooseDungeon(id);
    this.setDungeon(id);
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
    let state = this.state;
    state.encounter.encounterDungeons.push( { _id: item._id, title: item.name } );
    this.setState(state);
  }

  saveEncounter(){
    let {encounter} = this.state;
    let _this = this;
    axios.post(`${Variables.host}/saveEncounter`, encounter)
      .then(res => {
        let fDG = _this.state.availableEncounters;
        if(!encounter._id){
          fDG.push({ _id: res.data._id, title: encounter.title, encounterDungeons: encounter.encounterDungeons });
        } else {
          fDG.map( function(enc, i){ 
            if(enc._id === encounter._id){ 
              enc.title = encounter.title; 
              enc.encounterDungeons = encounter.encounterDungeons;
            } 
            return enc;
          });
        }

        _this.setState( {availableEncounters: fDG, snackbarOpen: true, snackbarMsg: 'Encounter successfully saved'});
      });
  }

  render() {
    let {slots, selectedDungeon, availableMonsters} = this.state;

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
        <List className="AvailableDungeons">
          {this.state.foundDungeonGrids.map( (grid, index) => {
            return (
              <DraggableListItem key={index} onGetDroppedItem={this.getDroppedItem} onHandleDungeonChoice={this.handleDungeonChoice} name={grid.title} _id={grid._id}/>
            );
          })}
        </List>
        <DroppableList onMoveItem={this.moveItem} encounterDungeons={this.state.encounter.encounterDungeons} onHandleDungeonChoice={this.handleDungeonChoice}/>
        <EntityTooltip hoverObj={this.state.hoverObj} mouse={this.state.mouse} />
        <br/>
				<TextField hintText="Encounter Name" value={this.state.encounter.title} onChange={this.handleTitleChange} />
				<RaisedButton label="Save Encounter" primary={true}  onClick={this.saveEncounter} />
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
