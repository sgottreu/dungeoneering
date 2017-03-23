import React, { Component } from 'react';
import Slots from './Slots.js';
import DungeonGrid from './DungeonGrid';
import EncounterLoadDrawer from './EncounterLoadDrawer';
import EntityTooltip from './EntityTooltip';
import axios from 'axios';
import {Variables} from './Variables';
import {_Dungeon} from './_Dungeon';
import { EntitySize, EntityClass} from './EntityTemplate';

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
    this.handlePartyChange = this.handlePartyChange.bind(this);
    this.handleObjMouseOver = this.handleObjMouseOver.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.loadCharacterTile = this.loadCharacterTile.bind(this);

    this.state = { 
      slots: Slots,
    	selectedTile: '',
    	connectedDoor: true,
    	choosingEntrance: false,
    	choosingExit: false,
      foundDungeonGrids: [],
      availableEncounters: [],
      selectedDungeon: false,
      selectedEncounter: false,
      availableParties: [],
      selectedParty: false,
      hoverEntity: false,
      party: false,
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
    axios.get(`${Variables.host}/findParties`)
    .then(res => {
      let state = _this.state;
      state.availableParties = res.data;
      _this.setState( state );
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

  addTile(slot) {
  }

  handlePartyChange = (e, index) => {
    let state = this.state;
    state.selectedParty = state.availableParties[ index ]._id;
    state.party = state.availableParties[ index ];
    this.setState(state);
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

        _this.setState(state);
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

  handleMouseOver = (entity, type, eve) => {
    this.handleObjMouseOver(entity, type, eve);
  }

  loadCharacterTile(character){
    let size = EntitySize.find(s => { return s.label === character.size});
    let iconClass = EntityClass[character.class].name.toLowerCase();
    let style = {
      width: (75 * size.space),
      height: (75 * size.space),
      backgroundSize: (75 * size.space)
    }

    return (
      <div onMouseEnter={this.handleMouseOver.bind(this, character, 'entity')} onMouseLeave={this.handleMouseOver.bind(this, false, false)} 
        style={style} key={character._id} className={iconClass+' Entity icon'} />
    );
  }

  render() {
    let {slots, selectedDungeon, selectedEncounter, selectedParty, availableParties, availableEncounters} = this.state;
    let party = availableParties.find(p => { return p._id === selectedParty} );
    if(party === undefined) {
      party = { members: [] };
    }

    return (    	
	      <div className="RunEncounter">
          <DungeonGrid slots={slots} onAddTile={this.addTile} selectedDungeon={selectedDungeon} onSetDungeon={this.setDungeon} 
            onHandleObjMouseOver={this.handleObjMouseOver} />
          <EncounterLoadDrawer 
            onHandlePartyChange={this.handlePartyChange}
            onSetEncounter={this.setEncounter} 
            onSetDungeon={this.setDungeon} 
            selectedEncounter={selectedEncounter} 
            selectedDungeon={selectedDungeon}
            selectedParty={selectedParty}            
            availableParties={availableParties}
            availableEncounters={availableEncounters}
             />
          <EntityTooltip hoverEntity={this.state.hoverEntity} mouse={this.state.mouse} />
          <div className="startingPartyArea">
            	{party.members.map( (character, x) => {
							return (
								this.loadCharacterTile(character)
							)
						})}
          </div>
        </div>
    );
  }
}

export default RunEncounter;

