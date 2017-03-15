import React, { Component } from 'react';
import Slots from './Slots.js';
import DungeonGrid from './DungeonGrid';
import EncounterLoadDrawer from './EncounterLoadDrawer';
import EntityTooltip from './EntityTooltip';
import axios from 'axios';
import {Variables} from './Variables';
import {_Dungeon} from './_Dungeon';

class RunEncounter extends Component {
  constructor(props){
    super(props);

    this.selectTile = this.selectTile.bind(this);
    this.handleMyEvent = this.handleMyEvent.bind(this);
    this.addTile = this.addTile.bind(this);
    this.chooseDungeon = this.chooseDungeon.bind(this);
    this.chooseEncounter = this.chooseEncounter.bind(this);
    this.setEncounter = this.setEncounter.bind(this);
    this.setDungeon = this.setDungeon.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleEntityMouseOver = this.handleEntityMouseOver.bind(this);

    this.state = { 
      slots: Slots,
    	selectedTile: '',
    	connectedDoor: true,
    	choosingEntrance: false,
    	choosingExit: false,
      foundDungeonGrids: [],
      availableEncounters: [],
      selectedDungeon: false,
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
    
    axios.get(`${Variables.host}/findEncounters`)
    .then(res => {
        let state = _this.state;
        state.availableEncounters = res.data;
        _this.setState(state);
    });

  }
  componentWillUnmount() {
    window.removeEventListener("click", this.handleMyEvent);
  }

	componentWillReceiveProps(nextProps){
		if(nextProps.selectedEncounter !== this.props.selectedEncounter){
			this.setEncounter(nextProps.selectedEncounter);
		}
	}

  handleMyEvent(e) {
  
  }

  handleEntityMouseOver = (entity, eve) => {
    let state = this.state;
    state.hoverEntity = entity;
    state.mouse.clientX = eve.clientX;
    state.mouse.clientY = eve.clientY;
    this.setState(state);
  }

  addTile(slot) {
  }

  handleTitleChange = (e) => {
  }

  saveDungeonGrid() {
    
  }

  setEncounter(selectedEncounter){
    if(selectedEncounter === false){
      return false;
    }
    let _this = this;
    axios.get(`${Variables.host}/findEncounter?_id=${selectedEncounter}`)
      .then(res => {
        let state = _this.state;
        state.selectedEncounter = selectedEncounter;
        state.encounter = res.data;
console.log('findEncounter');
console.log(state.encounter);
        _this.setState(state);
        this.props.onSetEncounter(state.encounter);
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
      });
  }

  chooseEncounter(id){
    let state = this.state;
    state.selectedEncounter = id;
    this.setState( state );
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

  render() {
    let {slots, foundDungeonGrids, selectedDungeon, selectedEncounter} = this.state;

    return (    	
	      <div className="RunEncounter">
          <DungeonGrid slots={slots} onAddTile={this.addTile} selectedDungeon={selectedDungeon} onSetDungeon={this.setDungeon} 
            onHandleEntityMouseOver={this.handleEntityMouseOver} />
          <EncounterLoadDrawer onSetEncounter={this.setEncounter} selectedEncounter={selectedEncounter} availableEncounters={this.state.availableEncounters} />
          <EntityTooltip hoverEntity={this.state.hoverEntity} mouse={this.state.mouse} />
        </div>
    );
  }
}

export default RunEncounter;

