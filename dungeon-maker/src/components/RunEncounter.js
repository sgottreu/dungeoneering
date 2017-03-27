import React, { Component } from 'react';
import Slots from './Slots.js';
import DungeonGrid from './DungeonGrid';
import EncounterLoadDrawer from './EncounterLoadDrawer';
import EntityTooltip from './EntityTooltip';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import {Variables} from './Variables';
import {_Dungeon} from './_Dungeon';
import { EntitySize, EntityClass} from './EntityTemplate';

import '../css/RunEncounter.css';

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
    this.handleMyEvent = this.handleMyEvent.bind(this);
    this.selectEntity = this.selectEntity.bind(this);
    this.setEntity = this.setEntity.bind(this);
    this.rollInitiative = this.rollInitiative.bind(this);
    this.setToMove = this.setToMove.bind(this);

    this.state = { 
      slots: Slots,
      moving: false,
    	selectedTile: '',
    	connectedDoor: true,
    	choosingEntrance: false,
    	choosingExit: false,
      foundDungeonGrids: [],
      availableEncounters: [],
      availableMonsters: [],
      availableCharacters: [],
      selectedDungeon: false,
      selectedEncounter: false,
      availableParties: [],
      selectedParty: false,
      selectedEntity : false,
      hoverObj: false,
      party: false,
      currentActor: {slot: false, roll: false},
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

	componentWillReceiveProps(nextProps){
		if(nextProps.selectedEncounter !== this.props.selectedEncounter){
			this.setEncounter(nextProps.selectedEncounter);
		}
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

  addTile(slot) {}

  setToMove = () => {
    let state = this.state;
    state.moving = true;
    this.setState(state);
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

  rollInitiative(){
    _Dungeon.rollInitiative(this);
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

  setEntity(e, state, slot){
    if(state.slots[ slot - 1 ].occupied === true && state.selectedEntity._id){
      state.slots[ slot - 1 ].overlays.entity = false;
      state.slots[ slot - 1 ].occupied = false;
      state.hoverObj = false;
    } else {
      // if(state.selectedEntity){
        state.slots[ slot - 1 ].overlays.entity = state.selectedEntity;
        state.slots[ slot - 1 ].occupied = true;
      // }
    }
    state.selectedEntity = false;
    this.setState( state );
  }

  handleMyEvent(e) {
    let state = this.state;
    if(e.target.dataset.slot === undefined){
      return false;
    }
  
    let slot = e.target.dataset.slot;

    if(state.moving){
      this.selectEntity(state.slots[e].overlays.entity._id, state.slots[e].overlays.entity._type, state.slots[e].overlays.entity);
      state.moving = false;
    }

    if(state.selectedEntity){
      this.setEntity(e, state, slot);
    }
   
  }

  selectEntity(id, entityType='monster', saved=false) {
    let selectedEntity;
    
    if(saved){
      selectedEntity = saved;
    } else {
      if(entityType === 'monster'){
        selectedEntity = this.state.availableMonsters.find(function(val){ return val._id === id});
      } else {
        selectedEntity = this.state.availableCharacters.find(function(val){ return val._id === id});
      }
    }

    this.setState( { selectedEntity: selectedEntity });
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
      <div onClick={this.selectEntity.bind(this, character._id, 'character')} onMouseEnter={this.handleMouseOver.bind(this, character, 'entity')} onMouseLeave={this.handleMouseOver.bind(this, false, false)} 
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
          <DungeonGrid slots={slots} 
            onAddTile={this.addTile} 
            selectedDungeon={selectedDungeon} 
            onSetDungeon={this.setDungeon} 
            currentActor={this.state.currentActor}
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
          <EntityTooltip hoverObj={this.state.hoverObj} mouse={this.state.mouse} />
          <RaisedButton
            label={'Roll Initiative'} 
            secondary={true} 
            onTouchTap={this.rollInitiative}
            className="button"
          />
          <RaisedButton
            label={'Move'} 
            secondary={true} 
            onTouchTap={this.setToMove}
            className="button"
          />
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

