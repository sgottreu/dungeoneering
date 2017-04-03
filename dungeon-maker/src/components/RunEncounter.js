import React, { Component } from 'react';
import Slots from './Slots.js';
import DungeonGrid from './DungeonGrid';
import AttackDialog from './AttackDialog';
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
    this.handleMyEvent = this.handleMyEvent.bind(this);
    this.selectEntity = this.selectEntity.bind(this);
    this.setEntity = this.setEntity.bind(this);
    this.rollInitiative = this.rollInitiative.bind(this);
    this.setToMove = this.setToMove.bind(this);
    this.endTurn = this.endTurn.bind(this);
    this.setToAttack = this.setToAttack.bind(this);
    this.setAttackerStatus = this.setAttackerStatus.bind(this);
    this.loadAttackDialog = this.loadAttackDialog.bind(this);
    this.rollAttack = this.rollAttack.bind(this);

    this.state = { 
      slots: Slots,
      combatList: [],
      moving: false,
    	selectedTile: '',
    	connectedDoor: true,
    	choosingEntrance: false,
    	choosingExit: false,
      showAttackDialog: false,
      foundDungeonGrids: [],
      availableEncounters: [],
      availableMonsters: [],
      availableCharacters: [],
      attacking: false,
      selectedDungeon: false,
      selectedEncounter: false,
      selectedAttackers: [],
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

  setToAttack = () => {
    let state = this.state;
    state.attacking = true;
    state.selectedAttackers = [];
    this.setState(state);
  }

  rollAttack = () => {
    let state = this.state;

    let [ att, trg ] = state.selectedAttackers;
    let attacker = combatList.find(cb => { return cb.uuid === att.uuid } );
    let target = combatList.find(cb => { return cb.uuid === trg.uuid } );

    //Get weapon from dropdown then search through entity's weapons.

    // let _weapon = this.props.availableWeapons.find(function(w, i){ return w._id === weapons[index] });

    // if(_weapon.damage.die === undefined) {
    //   let damage = _weapon.damage.split('d');
    //   state.power.damage.die = `d${damage[1]}`;
    //   state.power.damage.num = damage[0];
    // } else {
    //   state.power.damage.die = _weapon.damage.die;
    //   state.power.damage.num = _weapon.damage.num;
    // }

    let attackRoll = (Math.floor(Math.random() * (20 - 1)) + 1) + attacker.abilities.strength.AttackModifier;

    let defense = defense.armorClass.total;
  }

  endTurn = () => {
    let state = this.state;
 
    let index = state.combatList.findIndex( (cmb) => {
      return cmb.uuid === state.currentActor.uuid; 
    });

    if(index > -1){
      index++;
      if(index === state.combatList.length){
        index = 0;
      }

      let roll = state.combatList[ index ].initiative.current;
      let {slot, uuid} = state.combatList[ index ];
      state = _Dungeon.setCurrentActor(state, roll, slot, uuid, true);

      this.setState(state);
    }    
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
      state = _Dungeon.addCharToMap(state);
      state.selectedDungeon = selectedDungeon;

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
        entity = state.combatList.find(function(val){ return parseInt(val.slot, 10) === parseInt(slot, 10); });
        state = this.selectEntity(entity.uuid, entity._type, state, entity);
      } else {
        // Add Entity to new slot
        state = this.setEntity(e, state, slot);
        if(state.currentActor.uuid === state.selectedEntity.uuid){
          state.currentActor.slot = slot;
        }
        
        // Remove Entity from old slot
        state = this.setEntity(e, state, state.moving);
        state.selectedEntity = false;
        state.moving = false;
      }
    } 
    if(state.attacking){
        entity = state.combatList.find(function(val){ return parseInt(val.slot, 10) === parseInt(slot, 10); });
        state.selectedAttackers.push( {uuid: entity.uuid, status: false});
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

  setAttackerStatus = (uuid, status) => {
    let state = this.state;
    let _status = (status) ? 'Attacker' : 'Target';

    state.selectedAttackers.map((sa, i) => {
      if(sa.uuid === uuid){
        state.selectedAttackers[i].status = _status;
      }
    });

    if(_status === 'Target'){
      state.attacking = false;
      state.showAttackDialog = true;
    }

    this.setState( state );
  }

  loadAttackDialog = () => {
    return (<AttackDialog attackers={ this.state.selectedAttackers} combatList={ this.state.combatList} onRollAttack={this.rollAttack} />);
  }

  render() {
    let {slots, selectedDungeon, selectedEncounter, selectedParty, availableParties, availableEncounters, combatList, currentActor, selectedAttackers} = this.state;
    let party = availableParties.find(p => { return p._id === selectedParty} );
    if(party === undefined) {
      party = { members: [] };
    }
    let state = this.state;

    return (    	
	      <div className="RunEncounter">
          <DungeonGrid slots={slots} 
            onAddTile={this.addTile} 
            selectedDungeon={selectedDungeon} 
            onSetDungeon={this.setDungeon} 
            combatList={combatList}
            currentActor={currentActor}
            onHandleObjMouseOver={this.handleObjMouseOver}
            selectedAttackers={selectedAttackers} 
            onSetAttackerStatus={this.setAttackerStatus}
          />
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
          {this.state.showAttackDialog ? this.loadAttackDialog() : '' }
          <div className="actions">
            <RaisedButton
              label={'Roll Initiative'} 
              secondary={true} 
              onTouchTap={this.rollInitiative}
              className="button"
            />
            <br/>
            <RaisedButton
              label={'Move'} 
              secondary={true} 
              onTouchTap={this.setToMove}
              disabled={(this.state.moving) ? true : false}
              className="button"
            />
            <br/>
            <RaisedButton
              label={'Attack'} 
              secondary={true} 
              onTouchTap={this.setToAttack}
              disabled={(this.state.attacking) ? true : false}
              className="button"
            />
            <br/>
            <RaisedButton
              label={'End Turn'} 
              secondary={true} 
              onTouchTap={this.endTurn}
              className="button"
            />
          </div>
        </div>
    );
  }
}

export default RunEncounter;

