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
import {DieRoll} from './Die';
import {calcWeaponDamage} from './Weapons';
import {_Powers} from './_Powers';
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
    this.handlePowerSelect = this.handlePowerSelect.bind(this);

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
      attackStatus: false,
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
    _Powers.findPowers(_this);

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
    let attacker = state.combatList.find(cb => { return cb.uuid === att.uuid } );
    let target = state.combatList.find(cb => { return cb.uuid === trg.uuid } );

    let _power = attacker.powers.find(function(p, i){ return p.uuid === attacker.currentPower });
    //attack  { against, for, modifier}
    let natAttackRoll = DieRoll(20);
    let AttackMod = attacker.abilities[ _power.attack.for ].AttackModifier;
    let PowerMod = parseInt(_power.attack.modifier, 10);
    let attackRoll = natAttackRoll + AttackMod + PowerMod;

    state.selectedAttackers[0].natAttackRoll = natAttackRoll;
    state.selectedAttackers[0].attackMod = AttackMod;
    state.selectedAttackers[0].powerMod = PowerMod;
    state.selectedAttackers[0].attackRoll = attackRoll;

    let defense = target.defense[ _power.attack.against ].total;
    state.selectedAttackers[1].defense = defense;

    if(natAttackRoll === 20 || attackRoll > defense){
      state.attackStatus = 'hit';
 
      //Get weapon from dropdown then search through entity's weapons.

      let _weapon = attacker.inventory.find(function(w, i){ return w.item._id === attacker.currentWeapon });
      _weapon = _weapon.item;
      let die, num;
      if(_weapon.damage.die === undefined) {
        let damage = _weapon.damage.split('d');
        die = parseInt(damage[1], 10);
        num = parseInt(damage[0], 10);
      } else {
        let damage = _weapon.damage.split('d');
        die = parseInt(damage[1], 10);
        num = parseInt(_weapon.damage.num, 10);
      }

      let damageMod = calcWeaponDamage(attacker, AttackMod, _weapon);

      let totalDamage = 0;

      for(var i=1;i<=num;i++){
        totalDamage += DieRoll(die);
      }
      totalDamage += damageMod;
      state.selectedAttackers[1].damage = totalDamage;


      let _i = state.combatList.findIndex(cb => { return cb.uuid === trg.uuid } );
      state.combatList[ _i ].hp -= totalDamage;

   } else {
      state.attackStatus = 'miss';
    }


    this.setState(state);
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
      state.showAttackDialog = false;

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

  handlePowerSelect = (attUuid, e, index) => {
    let state = this.state;
    if(state.selectedAttackers.length === 0){
      return state;
    }
    let _i = state.combatList.findIndex( (cb, i) => { return cb.uuid === attUuid });

    state.combatList[_i].currentPower = state.combatList[_i].powers[index].uuid;

    this.setState(state);
  }

  handleWeaponSelect = (attUuid, w_id) => {
    let state = this.state;
    if(state.selectedAttackers.length === 0){
      return state;
    }
    let _i = state.combatList.findIndex( (cb, i) => { return cb.uuid === attUuid });

    state.combatList[_i].currentWeapon = w_id;

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
      state = _Dungeon.setAttackAttributes(state);
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
        state.selectedAttackers.push( { uuid: entity.uuid, status: false, attackRoll: false, natAttackRoll: false, attackMod: false, defense: false } );
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
    return (<AttackDialog 
              onHandlePowerSelect={this.handlePowerSelect} 
              attackers={ this.state.selectedAttackers} 
              combatList={ this.state.combatList} 
              onRollAttack={this.rollAttack} 
              onHandleWeaponSelect={this.handleWeaponSelect}
              attackStatus={this.state.attackStatus}
              />);
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
          <div className="actions">
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
            <br />
          
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
           <EntityTooltip hoverObj={this.state.hoverObj} mouse={this.state.mouse} />
           {this.state.showAttackDialog ? this.loadAttackDialog() : '' }
        </div>
    );
  }
}

export default RunEncounter;

