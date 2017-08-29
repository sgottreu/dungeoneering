import React, { Component } from 'react';
import Slots from '../lib/Slots.js';
import DungeonGrid from './DungeonGrid';
import AttackDialog from './AttackDialog';
import EncounterLoadDrawer from './EncounterLoadDrawer';
import EntityTooltip from './EntityTooltip';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import {Variables} from '../lib/Variables';
import {_Dungeon} from './_Dungeon';
import {Die} from '../lib/Die';
import * as Entity from '../lib/Entity';
import uuidV4  from 'uuid/v4';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import '../css/RunEncounter.css';

// import * as weaponsApi from '../api/weapons-api';
import * as powersApi from '../api/powers-api';

import store from '../store';



class RunEncounter extends Component {
  constructor(props){
    super(props);

    this.boundEncounterAC      = this.props.boundEncounterAC;
    this.boundEntityAC      = this.props.boundEntityAC;
    this.boundDungeonAC       = this.props.boundDungeonAC;

    this.selectTile = this.selectTile.bind(this);
    this.handleMyEvent = this.handleMyEvent.bind(this);
    this.addTile = this.addTile.bind(this);
    this.chooseDungeon = this.chooseDungeon.bind(this);
    // this.chooseEncounter = this.chooseEncounter.bind(this);
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
    this.pickCombatList = this.pickCombatList.bind(this);
    this.resetAttack = this.resetAttack.bind(this);
    this.closeAttackDialog = this.closeAttackDialog.bind(this);
    this.openDrawer = this.openDrawer.bind(this);

    this.state = { 
      slots: Slots,
      combatList: [],
      pickingCombat: false,
      moving: false,
    	selectedTile: '',
    	connectedDoor: true,
    	choosingEntrance: false,
    	choosingExit: false,
      showAttackDialog: false,
      attacking: false,
      selectedDungeon: false,
      selectedEncounter: false,
      selectedAttackers: [],
      attackStatus: false,
      availableParties: [],
      selectedParty: false,
      selectedEntity : false,
      partyXP: 0,
      party: false,      
      currentActor: {slot: false, roll: false},
      drawers: {
        encounter: false
      },
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

  openDrawer = (name, status) => {
    let state = this.state;
    state.drawers[ name ] = (status === undefined) ? !state.drawers[ name ] : status;
    this.setState( state );
  }

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

    let _weapon = false;
    if(attacker.inventory !== undefined){
      _weapon = attacker.inventory.find(function(w, i){ return w.item._id === attacker.currentWeapon });
    }    
    _weapon = (_weapon === false) ? false : _weapon.item;

    let natAttackRoll = Die.dieRoll(20);
    let AttackMod = attacker.abilities[ _power.attack.for ].AttackModifier;
    let PowerMod = parseInt(_power.attack.modifier, 10);
    let Profiency = (_weapon) ? _weapon.prof : 0;
    let attackRoll = natAttackRoll + AttackMod + PowerMod + Profiency;

    state.selectedAttackers[0].natAttackRoll = natAttackRoll;
    state.selectedAttackers[0].attackMod = AttackMod;
    state.selectedAttackers[0].powerMod = PowerMod;
    state.selectedAttackers[0].attackRoll = attackRoll;

    let defense = target.defense[ _power.attack.against ].total;
    state.selectedAttackers[1].defense = defense;

    if(natAttackRoll === 20 || attackRoll > defense){
      state.attackStatus = 'hit';
 
      //Get weapon from dropdown then search through entity's weapons.

      let die, num = 0, totalDamage = 0, _damage;

      if(_weapon){
        _damage = _weapon.damage;
        totalDamage += Entity.calcWeaponDamage(attacker, AttackMod);
      } else {
        _damage = _power.damage;
        totalDamage += _power.damage.modifier;
      }

      let die_damage = (_damage.die === undefined) ? _damage.split('d') : _damage.die.split('d');
      die = parseInt(die_damage[1], 10);
      num = ( _damage.die === undefined) ? parseInt(die_damage[0], 10) : parseInt(_damage.num, 10);

      for(var i=1;i<=num;i++){
        totalDamage += Die.dieRoll(die);
      }

      state.selectedAttackers[1].damage = totalDamage;

      let _i = state.combatList.findIndex(cb => { return cb.uuid === trg.uuid } );
      let hp = parseInt(state.combatList[ _i ].hp, 10) - totalDamage;
      state.combatList[ _i ].hp = hp;
      state.slots[ state.combatList[ _i ].slot - 1 ].overlays.entity.hp = hp;

      if(hp <=0 && state.combatList[ _i ]._type === 'monster'){
        state.partyXP += parseInt(state.slots[ state.combatList[ _i ].slot - 1 ].overlays.entity.xp, 10);
        state.slots[ state.combatList[ _i ].slot - 1 ].overlays.entity = false;
      }

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
      state.selectedAttackers = [];
    }    

    for(var x = 0; x<state.combatList.length;x++){
      if(state.combatList[x].hp <= 0 && state.combatList[x]._type === 'monster'){
        delete state.combatList[x];
      }
    }

    this.setState(state);
  }

  handlePartyChange = (e, index) => {
    let state = this.state;
    state.selectedParty = this.props.availableParties[ index ];
    state.party = this.props.availableParties[ index ];

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
    _Dungeon.rollInitiative(this, this.props.existingPowers);
  }

  pickCombatList = () => {
    let state = this.state;
    state.combatList = [];
    state.pickingCombat = (state.pickingCombat) ? false : true;
    this.setState(state);
  }

  setEncounter(selectedEncounter){
    if(selectedEncounter === false){
      return false;
    }

    let state = this.state;
    state.selectedEncounter = selectedEncounter;
    this.setState(state);

    let _selected = this.props.availableEncounters.find(e => { return e._id === selectedEncounter } );
    this.boundEncounterAC.updateEncounter( _selected );
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

      state.slots = _Dungeon.addCharToMap(state.selectedParty, state.slots, this.props.availableCharacters);
      state = _Dungeon.setUuidMonsters(state);
      state.selectedDungeon = selectedDungeon;

      _this.setState(state);
    });
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
      state.slots[ slot - 1 ].overlays.entity = Variables.clone(state.selectedEntity);
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
        entity = state.slots[ slot-1 ].overlays.entity; //state.combatList.find(function(val){ return parseInt(val.slot, 10) === parseInt(slot, 10); });
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
        entity = state.combatList.find(function(val){ 
          if(val === undefined){
            return false;
          }
          return parseInt(val.slot, 10) === parseInt(slot, 10); 
        });
        let _status = (state.selectedAttackers.length === 0) ? 'Attacker' : 'Target';
        state.selectedAttackers.push( { uuid: entity.uuid, status: _status, attackRoll: false, natAttackRoll: false, attackMod: false, defense: false } );

      if(state.selectedAttackers.length === 2){ //_status === 'Target'){
        state.attacking = false;
        state.showAttackDialog = true;
      }
    } 

    if(state.pickingCombat){
      entity = Variables.clone(state.slots[ slot-1 ].overlays.entity);
      entity.slot = state.slots[ slot-1 ].id;

      if(entity._type === undefined){
        let _uuid = Variables.clone(entity.uuid);
        let _slot = Variables.clone(entity.slot);

        let _entity = state.availableMonsters.find( m => {
          return m._id === entity._id;
        });
        entity = _entity;
        entity.uuid = _uuid;
        entity.slot = _slot;
      }


      let cb = state.combatList.find(function(val){ return parseInt(val.slot, 10) === parseInt(slot, 10); });
      if(cb === undefined){
        state.combatList.push( entity );
      }
      
    } 

    if(state !== undefined){
      this.setState( state );
    }
    
  }

  resetAttack = () => {
    let state = this.state;
    state.selectedAttackers = [];
    state.showAttackDialog = false;
    state.attacking = true;

    this.setState( state );
  }

  closeAttackDialog = () => {
    let state = this.state;
    state.showAttackDialog = false;
    this.setState( state );
  }

  selectEntity(uuid, entityType='monster', state, saved=false) {
    if(state === false) {
      state = this.state;
    }
    
    if(saved){
      state.selectedEntity = saved;
    } else {
      state.selectedEntity = state.combatList.find(function(val){ 
        if(val === undefined)  {
          return false;
        }
        return val.uuid === uuid;
      });
    }

    if(saved){
      return state;
    }
    this.setState( state );
  }

  setAttackerStatus = (uuid, status) => {
    let state = this.state;
    let _status = (state.selectedAttackers.length === 0) ? 'Attacker' : 'Target';
    // let _status = (status) ? 'Attacker' : 'Target';

    state.selectedAttackers.map((sa, i) => {
      if(sa.uuid === uuid){
        state.selectedAttackers[i].status = _status;
        return true;
      }
      return false;
    });

    if(state.selectedAttackers.length === 2){ //_status === 'Target'){
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
              onResetAttack={this.resetAttack}
              onCloseAttackDialog={this.closeAttackDialog}
              />);
  }

  render() {
    let {slots, selectedDungeon, selectedEncounter, selectedParty, combatList, currentActor, selectedAttackers} = this.state;
    let {availableParties, availableEncounters, availableMonsters, availableCharacters, availableDungeons} = this.props;
    let party = availableParties.find(p => { return p._id === selectedParty} );
    if(party === undefined) {
      party = { members: [] };
    }

    return (    	
	      <div className="RunEncounter">
          <DungeonGrid slots={slots} 
            availableMonsters={availableMonsters}
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
              availableDungeons={availableDungeons}
              availableEncounters={availableEncounters}
              onOpenDrawer={this.openDrawer}
              open={this.state.drawers.encounter}
              />
            <br />
            <RaisedButton
              label={'Set Combat List'} 
              secondary={(this.state.pickingCombat) ? false : true} 
              primary={(this.state.pickingCombat) ? true : false }
              onTouchTap={this.pickCombatList}
              className="button"
            />
            <br/>
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


            <div>
              <Chip key="awd_xp">
                <Avatar size={32}><i className="fa fa-trophy" aria-hidden="true"></i></Avatar>
                {this.state.partyXP}
              </Chip>
            </div>

          </div>
          
           <EntityTooltip hoverObj={this.state.hoverObj} mouse={this.state.mouse} combatList={combatList}/>
           {this.state.showAttackDialog ? this.loadAttackDialog() : '' }
        </div>
    );
  }
}

export default RunEncounter;

