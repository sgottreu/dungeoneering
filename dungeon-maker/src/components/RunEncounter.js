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
import uuidV4  from 'uuid/v4';

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
      combatList: [],
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

    state.party.members.map((p, x) => {
      p.uuid = uuidV4();
      return p;
    });

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

      state = _Dungeon.setCombatList(state);

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
    if(state.slots[ slot - 1 ].occupied === true && state.selectedEntity.uuid){
      state.slots[ slot - 1 ].overlays.entity = false;
      state.slots[ slot - 1 ].occupied = false;
      state.hoverObj = false;
    } else {
      state.slots[ slot - 1 ].overlays.entity = Variables.clone(state.selectedEntity.uuid);
      state.slots[ slot - 1 ].occupied = true;

      state.combatList.map(function(val){ if(val.uuid === state.selectedEntity.uuid) {val.slot = slot} return val; });
    }
    state.selectedEntity = false;
    
    return state;
  }

  handleMyEvent(e) {
    let state = this.state;
    if(e.target.dataset.slot === undefined){
      return false;
    }
  
    let slot = e.target.dataset.slot;

    let entity;

    if(state.moving !== false){
      if(!state.selectedEntity){
        state.moving = slot;
        entity = state.combatList.find(function(val){ 
           return parseInt(val.slot, 10) === parseInt(slot, 10); 
          });

        state = this.selectEntity(entity.uuid, entity._type, state, entity);
      } else {
        // Add Entity to new slot
        state = this.setEntity(e, state, slot);
        state.currentActor.slot = slot;
        // Remove Entity from old slot
        state = this.setEntity(e, state, state.moving);

        state.moving = false;
      }
    } else {
      if(state.selectedEntity){
        state = this.setEntity(e, state, slot);
      } else {
        entity = state.combatList.find(function(val){  return val.slot === slot; });
        state = this.selectEntity(entity.uuid, entity._type, state);
      }
    }
    if(state !== undefined){
      this.setState( state );
    }
    
  }

  selectEntity(uuid, entityType='monster', state, saved=false) {
    if(state === false) {
      state = this.state;
    }
    
    if(saved){
      state.selectedEntity = saved;
    } else {
      state.selectedEntity = state.combatList.find(function(val){ return val.uuid === uuid});
    }

    if(saved){
      return state;
    }
    this.setState( state );
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
      <div onClick={this.selectEntity.bind(this, character.uuid, 'character', false, false)} onMouseEnter={this.handleMouseOver.bind(this, character, 'entity')} onMouseLeave={this.handleMouseOver.bind(this, false, false)} 
        style={style} key={character.uuid} className={iconClass+' Entity icon'} />
    );
  }

  render() {
    let {slots, selectedDungeon, selectedEncounter, selectedParty, availableParties, availableEncounters, combatList} = this.state;
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
            combatList={this.state.combatList}
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

