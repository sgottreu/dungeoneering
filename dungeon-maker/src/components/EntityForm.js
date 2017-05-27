import React, { Component } from 'react';

import {Variables} from '../lib/Variables';
import {Powers} from '../lib/Powers';
import * as Entity from '../lib/Entity';
import * as entitiesApi from '../api/entities-api';
import * as weaponsApi from '../api/weapons-api';
import * as powersApi from '../api/powers-api';
import PowersForm from './PowersForm';

import EntityChooser from './EntityChooser';
import WeaponTooltip from './WeaponTooltip';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import {List, ListItem} from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Snackbar from 'material-ui/Snackbar';
import Avatar from 'material-ui/Avatar';
import Toggle from 'material-ui/Toggle';

import '../css/EntityForm.css';

class EntityForm extends Component {
  
  constructor(props){
    super(props);

    this.boundEntityAC = this.props.boundEntityAC;
    this.rState = this.props.entitiesState;

    this.EntityType = this.props.type;
    this.input = [];

    this.handleChange = this.handleChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.handleRoleChange = this.handleRoleChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleRaceChange = this.handleRaceChange.bind(this);
    this.handleClassChange = this.handleClassChange.bind(this);
    this.handleArmorChange = this.handleArmorChange.bind(this);
    this.handleHPChange = this.handleHPChange.bind(this);
    this.handleLevelChange = this.handleLevelChange.bind(this);
    this.changeAbility = this.changeAbility.bind(this);
    this.changeIcon = this.changeIcon.bind(this);
    this.calculateAbility = this.calculateAbility.bind(this);
    this.boundEntityAC.updateKey = this.boundEntityAC.updateKey.bind(this);
    this.handleEntitySave = this.handleEntitySave.bind(this);
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this);
    this.handleInitiativeChange = this.handleInitiativeChange.bind(this);
    this.handleArmorClassChange = this.handleArmorClassChange.bind(this);
    this.handleFortitudeChange = this.handleFortitudeChange.bind(this);
    this.handleReflexChange = this.handleReflexChange.bind(this);
    this.handleWillpowerChange = this.handleWillpowerChange.bind(this);
    this.handleShieldChoice = this.handleShieldChoice.bind(this);

    this.loadRoleField = this.loadRoleField.bind(this);
    this.loadXPField = this.loadXPField.bind(this);
    this.loadClassField = this.loadClassField.bind(this);
    this.loadRaceField = this.loadRaceField.bind(this);
    this.loadEntityIconField = this.loadEntityIconField.bind(this);
    this.loadPowersForm = this.loadPowersForm.bind(this);
    this.loadWeaponTooltip = this.loadWeaponTooltip.bind(this);

    this.includePower = this.includePower.bind(this);
    this.loadPowersField = this.loadPowersField.bind(this);
    this.loadWeaponsField = this.loadWeaponsField.bind(this);
    this.handleSelectedEntity = this.handleSelectedEntity.bind(this);
    this.selectWeapon = this.selectWeapon.bind(this);
    this.selectPower = this.selectPower.bind(this);
    this.handleObjMouseOver = this.handleObjMouseOver.bind(this);
    
    let state = {
      hoverObj: {
        obj: false,
        type: false
      },
      mouse: {
        clientX: false,
        clientY: false
      }
    };

    this.state = {
      snackbarOpen: false,
      snackbarMsg: ''
    };
  }

  resetForm(){
    this.boundEntityAC.updateKey('selectedEntity', false);
    this.boundEntityAC.updateKey('entity', Variables.clone(Entity.Template));
  }

  handleSelectedEntity = (event, index) => {
    this.boundEntityAC.updateKey('selectedEntity', index);
    let key = (this.EntityType === 'monster') ? 'availableMonsters' : 'availableCharacters';
    this.boundEntityAC.updateKey( 'entity', Variables.clone( this.props.entity[key][index] ) );
  }

  handleSnackBarClose = () => {
    this.setState({
      snackbarOpen: false,
    });
  };

  selectWeapon = (id) => {
    this.boundEntityAC.updateEntityWeapon(id);
  }

  handleChange = (event) => {
    this.boundEntityAC.updateEntityKey( event.target.name, event.target.value);
  }

	handleRoleChange = (event, index) => {
		this.boundEntityAC.updateEntityKey('role', index);
	}

  handleArmorChange = (event, index) => {
    this.boundEntityAC.updateEntityArmor( index );
  }

  handleShieldChoice = (event, isInputChecked) => {
    let {entity} = this.props;  
    let shield = (isInputChecked === true && entity.shield !== event.target.dataset.shield) ? parseInt(event.target.dataset.shield, 10) : false;

    this.boundEntityAC.updateEntityShield( shield );
  }

	handleSizeChange = (event, index) => {
		this.boundEntityAC.updateEntityKey('size', EntitySize[index].label);
	}

  handleClassChange = (event, index) => {    
    let state = this.state;
    state.entity.class = index;
    state.entity.hp = getInitialHitPoints(state, state.entity.class);
    state.entity.bloodied = Math.floor( state.entity.hp / 2 );
    state.entity.healingSurge = Math.floor( state.entity.hp / 4 );

    state.entity.surgesPerDay = parseInt(Entity._Class[index].surges, 10) + parseInt(state.entity.abilities.constitution.abilityMod, 10);

    state.entity.iconClass = Entity._Class[ index ].name.toLowerCase();

    for(let c in Entity._Class[index].defenseMod){
      if(Entity._Class[index].defenseMod.hasOwnProperty(c)){
        state.entity.defense[ c ].classBonus = parseInt(Entity._Class[index].defenseMod[c], 10);
      }
    }

    this.setState(state);
  }

  changeIcon = (event) => {
    this.boundEntityAC.updateEntityKey('iconClass', event.target.dataset.icon);
  }

  includePower = (power, current_power=false) => {
    let state = this.state;
    if(current_power !== false){
      state.entity.powers[current_power-1] = power;
    } else {
      state.entity.powers.push(power);
      current_power = state.entity.powers.length;
    }
    this.setState(state);

    return current_power;
  }

  handleRaceChange = (event, index) => {
    let state = this.state;
    state.entity.race = index;
    state.entity.size = EntityRace[index].size;
    state.entity.speed = EntityRace[index].speed;
    state.totalRacePoints = 0;

    if(index !== state.entity.race){
      state.remainingPoints = 4 + ((state.entity.level-1)*2);
      for(let a in state.entity.abilities){
        if(state.entity.abilities.hasOwnProperty(a)){
          state.entity.abilities[ a ].score = 12;
        }
      }
    }

    if(EntityRace[index].abilityMod.any === undefined){
      for(let a in EntityRace[index].abilityMod){
        if(EntityRace[index].abilityMod.hasOwnProperty(a)){
          let score = state.entity.abilities[ a ].score + parseInt(EntityRace[index].abilityMod[ a ], 10);
          state.totalRacePoints += parseInt(EntityRace[index].abilityMod[ a ], 10);
          state = this.calculateAbility(state, a, state.entity.level, score);
        }
      }
    } else {
      state.totalRacePoints = EntityRace[index].abilityMod.any;
    }

    if(EntityRace[index].skillBonus.any === undefined){
      for(let a in EntityRace[index].skillBonus){
        if(EntityRace[index].skillBonus.hasOwnProperty(a)){
          state.entity.skills[a].raceModifier = parseInt(EntityRace[index].skillBonus[ a ], 10);
        }
      }
    } 
    this.setState( state );   
  }

  handleHPChange(event){
    let state = this.state;
    state.entity.hp = event.target.value;
    state.entity.bloodied = Math.floor( state.entity.hp / 2 );
    this.setState( state ); 
  }

  handleInitiativeChange(event){
    let state = this.state;
    state.entity.initiative = calculateInitiative(state, event.target.value);
    this.setState( state ); 
  }

  handleArmorClassChange(event){
    let state = calculateArmorClass(this.state, event.target.value);
    this.setState( state ); 
  }

  handleFortitudeChange(event){
    this.boundEntityAC.updateEntityDefense('fortitude', event.target.value);
  }
  handleReflexChange(event){
    this.boundEntityAC.updateEntityDefense('reflex', event.target.value);
  }
  handleWillpowerChange(event){
    this.boundEntityAC.updateEntityDefense('willpower', event.target.value);
  }


  handleLevelChange = (event) => {
    let state = this.state;
    state.entity.level = event.target.value;
    state = this.calcRemainingPoints(this.state);
    this.setState(state);
  }

  handleEntitySave = () => saveEntity(this);

  changeAbility = (event) => {
    let state = this.state;
    state = this.calcRemainingPoints(state, event.target);
    if(state.remainingPoints === 0 ){ 
      if(event.target.value >= state.entity.abilities[ event.target.name ].score){
        return false;
      }
      
    } 
    
    if( state.entity.abilities[ event.target.name ].score < event.target.value ){
      state.remainingPoints--;
    } else {
      state.remainingPoints++;
    }
    state = this.calculateAbility(state, event.target.name, this.state.entity.level, event.target.value);
    
    if(state.entity.class){
      state.entity.surgesPerDay = parseInt(Entity._Class[ state.entity.class ].surges, 10) + parseInt(state.entity.abilities.constitution.abilityMod, 10);
      state.entity.hp = getInitialHitPoints(state, state.entity.class);
    }
    state.entity.initiative = calculateInitiative(state);
    state = calculateDefense(state);
    state = calculateArmorClass(state);
    this.setState( state );      
    
  }

  calculateAbility(state, label, level, score){
    state.entity.abilities[ label ].score = score;
    state.entity.abilities[ label ].abilityMod = AbilityModifier(score);
    state.entity.abilities[ label ].AttackModifier = AttackModifier(level, score, state.entity._type);

    return state;
  }

  loadRoleField(){
  	return (
    	<SelectField style={Variables.getSelectListStyle(this.state.entity.role, EntityRole.map( (role, index) => {return index}) )} floatingLabelText="Role" value={this.state.entity.role} onChange={this.handleRoleChange} >
        {EntityRole.map( (role, index) => (
        	<MenuItem key={index} value={index} primaryText={role} />
        ))}
      </SelectField>
    );
  }

  loadRaceField(){
    return (
      <SelectField   floatingLabelText="Race" value={this.state.entity.race} onChange={this.handleRaceChange} >
        {EntityRace.map( (race, index) => (
          <MenuItem key={index} value={index} primaryText={race.name} />
        ))}
      </SelectField>
    );
  }

  loadClassField(){
    return (
      <SelectField   floatingLabelText="Class" value={this.state.entity.class} onChange={this.handleClassChange} >
        {Entity._Class.map( (_class, index) => (
          <MenuItem key={index} value={index} primaryText={_class.name} />
        ))}
      </SelectField>
    );
  }

  loadXPField(){
    return (
      <TextField className="shortField" floatingLabelText="XP" type="number" value={this.state.entity.xp} name="xp" onChange={this.handleChange} />
    );
  }

  loadPowersForm() {
    return (
      <PowersForm selEntity={this.state.selectedEntity} existingPowers={this.state.entity.powers} entityType="monster" onIncludePower={this.includePower} availableWeapons={this.state.availableWeapons} weapons={this.state.entity.weapons} />
    );
  }

  loadEntityIconField(){
    let _this = this;
    let listStyle = { height: '150px', width: '250px', overflowY: 'scroll' };

    EntityIcons.sort(function(a, b) {
      var nameA = a.label.toUpperCase(), nameB = b.label.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      } else {
        if (nameA > nameB) {
          return 1;
        }
      }
      return 0;
    });

    let selIcons = EntityIcons.filter(function(val){ return val.class === _this.state.entity.iconClass });
    let remIcons = EntityIcons.filter(function(val){ return val.class !== _this.state.entity.iconClass });

    return(
      <div className="container">
        <Subheader>Entity Icons</Subheader>
        <List className="EntityIcons" style={listStyle}>
          
          {selIcons.concat(remIcons).map( (icon, index) => {
            if(icon.type !== this.EntityType){
              return false;
            }
            let className = ((icon.class === _this.state.entity.iconClass) ? ' active' : '');
            return (
              <ListItem className={className} key={index} data-icon={icon.class} 
                onTouchTap={this.changeIcon}
                primaryText={<div data-icon={icon.class}>{icon.label}</div>}  
                leftAvatar={<Avatar data-icon={icon.class} style={ {backgroundSize: '40px !important'} } className={'icon '+icon.class} />}
                
              />
            );
          })}
        </List>
      </div>
    );
  }

  selectPower = (power, event) => {
    if(power._id === undefined){
      return false;
    }

    let state = this.state;
    if( state.entity.powers.includes(power._id) ){
      let _i = state.entity.powers.findIndex(function(p) { return p === power._id})
      state.entity.powers.splice(_i, 1);
    } else {
      state.entity.powers.push(power._id);  
    }
    this.setState( state ); 
  }

  loadPowersField(){
    let _this = this;
    let listStyle = { height: '150px', width: '250px', overflowY: 'scroll' };

    let _powers = (this.EntityType === 'character') ? this.state.existingPowers : this.state.entity.powers;

    return(
      <div className="container">
        <Subheader>Powers</Subheader>
        <List className="EntityPowers" style={listStyle}>
          
          {_powers.map( (power, index) => {
            if(!this.state.entity.class){
              return (
                <ListItem  key={index} 
                  primaryText={<div >{power.name}</div>}  
                  leftAvatar={<Avatar className={'icon weapon_'+power.class} />}
                />
              );
            } else {
              if(Entity._Class[this.state.entity.class].name !== power.class.name){
                return false;
              }

              let _found = _this.state.entity.powers.findIndex(function(p) { 
                return power._id === p
              });
              let className = (_found > -1) ? ' active' : '';

              return (
                <ListItem className={className} key={index} 
                  primaryText={<div >{power.name}</div>}  
                  leftAvatar={<Avatar className={'icon weapon_'+Powers.powerType[power.type].class} onTouchTap={this.selectPower.bind(this, power)}/>}
                />
              );
            }
            
          })}
        </List>
      </div>
    );
  }

  loadWeaponsField(){
    let _this = this;
    let listStyle = { height: '150px', width: '250px', overflowY: 'scroll' };

    let selWeapons = this.state.availableWeapons.filter(function(val){ 
      return _this.state.entity.weapons.includes(val._id);
    });
    let remWeapons = this.state.availableWeapons.filter(function(val){ return !_this.state.entity.weapons.includes(val._id) });
    let {boundEntityAC} = this.props;
    return(
      <div className="container">
        <Subheader>Weapons</Subheader>
        <List className="EntityWeapons" style={listStyle}>
          {selWeapons.concat(remWeapons).map( (weapon, index) => {
            let _found = _this.state.entity.weapons.findIndex(function(w) { 
              return weapon._id === w
            });
            let className = (_found > -1) ? ' active' : '';
            let weapon_icon = (weapon.type !== undefined) ? `weapon_${weapon.type.toLowerCase()}` : '';
            //
            return (
              <ListItem className={className} key={index}  
                onTouchTap={this.selectWeapon.bind(this, weapon._id)}
                primaryText={<div >{weapon.name}</div>}  
                leftAvatar={<Avatar className={'icon '+weapon_icon} />}
                onMouseEnter={(e,i,v) => { boundDungeonAC.updateMouseover(weapon, 'weapon', e) } } 
                onMouseLeave={(e,i,v) => { boundDungeonAC.updateMouseover(false, false, e) } }
              />
            );
          })}
        </List>
      </div>
    );
  }

  loadWeaponTooltip = () => {
    return (
      <WeaponTooltip hoverObj={this.state.hoverObj} mouse={this.state.mouse} />
    );
  }

	render() {
    
    let abilities = this.state.entity.abilities;
    let AbilityMap = new Map(Object.entries(abilities));
    let _this = this;
    let saveEntities = (this.EntityType === 'monster') ? this.state.availableMonsters : this.state.availableCharacters;

    let selectedStyle = Variables.getSelectListStyle(this.state.selectedEntity, saveEntities, true);
    // selectedStyle.top = selectedStyle.top+15;
		return (
			<div className="EntityForm inset">
        {(this.state.hoverObj.type === 'weapon') ? this.loadWeaponTooltip() : ''}
        <EntityChooser onHandleSelectedEntity={this.handleSelectedEntity.bind(this)} saveEntities={saveEntities} EntityType={this.EntityType} selectedStyle={selectedStyle} selectedEntity={this.state.selectedEntity} />
        
				<TextField  floatingLabelText="Name" value={this.state.entity.name} name="name" onChange={this.handleChange} />
        <RaisedButton primary={true}
          label="Reset"
          onTouchTap={this.resetForm}
        />
        <br/>
				{(this.EntityType === 'character') ? this.loadRaceField() : ''}
        {(this.EntityType === 'character') ? this.loadClassField() : ''}
        {(this.EntityType === 'monster') ? this.loadRoleField() : ''}

        <SelectField style={Variables.getSelectListStyle(this.state.entity.size, EntitySize.map( (size, index) => {return index}) )} 
          floatingLabelText="Size" 
          value={ EntitySize.findIndex( (size, i) => {return this.state.entity.size === size.label } ) }  
          onChange={this.handleSizeChange} >
          {EntitySize.map( (size, index) => (
            <MenuItem key={index} value={index} primaryText={`${size.label}`} />
          ))}
        </SelectField>
        <SelectField style={Variables.getSelectListStyle(this.state.entity.armor, Entity._Armor.map( (armor, index) => {return index}) )} floatingLabelText="Armor" value={this.state.entity.armor} onChange={this.handleArmorChange} >
          {Entity._Armor.map( (armor, index) => (
            <MenuItem key={index} value={index} primaryText={`${armor.name}`} />
          ))}
        </SelectField>
        <br/>
        <TextField className="shortField" floatingLabelText="Level" type="number" value={this.state.entity.level} name="level" onChange={this.handleLevelChange} />
        {(this.EntityType === 'monster') ? this.loadXPField() : ''}
        <TextField className="shortField" floatingLabelText="HP"         type="number" value={this.state.entity.hp}         name="hp"         onChange={this.handleHPChange} />
        <TextField className="shortField" floatingLabelText="Speed"      type="number" value={this.state.entity.speed}      name="speed"      onChange={this.handleChange} />
        <div className="AbilityBox">
          <Subheader>Remaining Ability Points: {this.state.remainingPoints}</Subheader>
          <div className="AbilityList">
            {[...AbilityMap.entries()].map(function(a, i) {
              let attackMod = AttackModifier(_this.state.entity.level, a[1].score);
              let RaceBonus = (EntityRace[_this.state.entity.race] === undefined || EntityRace[_this.state.entity.race].abilityMod[ a[0] ] === undefined) ? 0 : EntityRace[_this.state.entity.race].abilityMod[ a[0] ];
              let styleRaceBonus = (RaceBonus===0) ? {display:'none'} : {};

              return (
                <div className={a[0]+" Ability"} key={JSON.stringify(a[0])}>
                  <TextField className="miniField" floatingLabelText={a[0]}  type="number" 
                      value={ abilities[ a[0] ].score } name={a[0]} onChange={_this.changeAbility} />
                  <Chip tabIndex={-1} className="abilityChip">Atk: {(attackMod > 0 ? '+' : '') + attackMod}</Chip>    
                  <Chip tabIndex={-1} className="abilityChip">Abl: {(AbilityModifier(a[1].score) > 0 ? '+' : '') + AbilityModifier(a[1].score)}</Chip>
                  <Chip tabIndex={-1} className="abilityChip" style={styleRaceBonus }>Race: +{RaceBonus}</Chip>
                  
                </div>
              );
            })}
          </div>
        </div>
        <TextField className="shortField" floatingLabelText="Armor Class" type="number" value={this.state.entity.defense.armorClass.total} name="armorClass" onChange={this.handleArmorClassChange} />
        <TextField className="shortField" floatingLabelText="Fortitude" type="number" value={this.state.entity.defense.fortitude.total} name="fortitude" onChange={this.handleFortitudeChange} />
        <TextField className="shortField" floatingLabelText="Reflex" type="number" value={this.state.entity.defense.reflex.total} name="reflex" onChange={this.handleReflexChange} />
        <TextField className="shortField" floatingLabelText="Willpower" type="number" value={this.state.entity.defense.willpower.total} name="willpower" onChange={this.handleWillpowerChange} />
        <TextField className="shortField" floatingLabelText="Initiative" type="number" value={this.state.entity.initiative.total} name="initiative" onChange={this.handleInitiativeChange} />
        <div className="Lists">
          {this.loadEntityIconField()}
          {this.loadPowersField()}
          {this.loadWeaponsField()}
        </div>
        <br/>
        <div className="shields">
          <Subheader>Shield</Subheader>
          {Entity._Shield.map( (shield, index) => {
            return (
              <Toggle key={index}
                label={shield.name}
                toggled={ this.state.entity.shield === shield.score ? true : false }
                data-shield={shield.score}
                onToggle={this.handleShieldChoice}
              />
            );
            })}
        </div>
        {(this.EntityType === 'monster') ? this.loadPowersForm() : ''}   
        <br/><br/>
        <RaisedButton primary={true}
          label={(this.EntityType === 'character') ? 'Save Character' : 'Save Monster'}
          onTouchTap={this.handleEntitySave}
        />
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMsg}
          autoHideDuration={4000}
          onRequestClose={this.handleSnackBarClose}          
        />
			</div>
		);
	}

}

export default EntityForm;