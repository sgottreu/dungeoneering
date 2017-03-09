import React, { Component } from 'react';
import { EntityTemplate, AbilityModifier, AttackModifier, EntityRole, EntitySize, EntityRace, EntityClass, getInitialHitPoints, EntityArmor, calculateArmorClass, calculateDefense, saveEntity, EntityIcons, findEntity, calculateInitiative} from './EntityTemplate';

import {Variables} from './Variables';
import {_Powers} from './_Powers';
import {findWeapons} from './Weapons';
import PowersForm from './PowersForm';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import {List, ListItem} from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Snackbar from 'material-ui/Snackbar';
import Avatar from 'material-ui/Avatar';

import '../css/EntityForm.css';

class EntityForm extends Component {
  
  constructor(props){
    super(props);

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
    this.calcRemainingPoints = this.calcRemainingPoints.bind(this);
    this.calculateAbility = this.calculateAbility.bind(this);
    this._setEntityState = this._setEntityState.bind(this);
    this.handleEntitySave = this.handleEntitySave.bind(this);
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this);
    this.handleInitiativeChange = this.handleInitiativeChange.bind(this);
    this.handleArmorClassChange = this.handleArmorClassChange.bind(this);
    this.handleFortitudeChange = this.handleFortitudeChange.bind(this);
    this.handleReflexChange = this.handleReflexChange.bind(this);
    this.handleWillpowerChange = this.handleWillpowerChange.bind(this);

    this.loadRoleField = this.loadRoleField.bind(this);
    this.loadXPField = this.loadXPField.bind(this);
    this.loadClassField = this.loadClassField.bind(this);
    this.loadRaceField = this.loadRaceField.bind(this);
    this.loadEntityIconField = this.loadEntityIconField.bind(this);
    this.loadPowersForm = this.loadPowersForm.bind(this);

    this.findPowers = this.findPowers.bind(this);
    this.includePower = this.includePower.bind(this);
    this.loadPowersField = this.loadPowersField.bind(this);
    this.loadWeaponsField = this.loadWeaponsField.bind(this);
    this.handleSelectedEntity = this.handleSelectedEntity.bind(this);
    this.selectWeapon = this.selectWeapon.bind(this);
    
    let state = {};

    state.entity = Variables.clone(EntityTemplate);
    state.entity._type = this.EntityType;
    state.totalRacePoints = 0;
    state.usedPoints = 0;
    state.snackbarOpen = false;
    state.snackbarMsg = '';
    state.existingPowers = [];
    state.availableMonsters = [];
    state.availableCharacters = [];
    state.availableWeapons = [];
    state.selectedEntity = false;
    this.state = state;
  }

  componentDidMount(){
    let state = this.calcRemainingPoints(this.state);
    this.setState( state );
    //this.findPowers();
    findEntity(this);
    findWeapons(this);
  }

  resetForm(){
    let state = this.state;
    state.selectedEntity = false;
    state.entity = Variables.clone(EntityTemplate);
    this.setState(state);
  }

  handleSelectedEntity = (event, index) => {
    let state = this.state;
    state.selectedEntity = index;
    let key = (this.EntityType === 'monster') ? 'availableMonsters' : 'availableCharacters';
    state.entity = state[key][index];

    this.setState(state);
  }

  findPowers(){
    _Powers.findPowers(this);
  }

  handleSnackBarClose = () => {
    this.setState({
      snackbarOpen: false,
    });
  };

  selectWeapon = (id) => {
    let state = this.state;
    if( state.entity.weapons.includes(id) ){
      let _i = state.entity.weapons.findIndex(function(w) { return w === id})
      state.entity.weapons.splice(_i, 1);
    } else {
      state.entity.weapons.push(id);  
    }
    this.setState( state ); 
  }

  _setEntityState(key, value){
		let state = this.state;
		state.entity[ key ] = value;
		this.setState( state );
  }

  handleChange = (event) => {
    this._setEntityState( event.target.name, event.target.value);
  }

	handleRoleChange = (event, index) => {
		this._setEntityState('role', index);
	}

  handleArmorChange = (event, index) => {
    let state = this.state;
    state.entity.armor = index;
    state = calculateArmorClass(state);
    this.setState( state );
  }

	handleSizeChange = (event, index) => {
		this._setEntityState('size', index);
	}

  handleClassChange = (event, index) => {    
    let state = this.state;
    state.entity.class = index;
    state.entity.hp = getInitialHitPoints(state, state.entity.class);
    state.entity.bloodied = Math.floor( state.entity.hp / 2 );
    state.entity.healingSurge = Math.floor( state.entity.hp / 4 );

    state.entity.surgesPerDay = parseInt(EntityClass[index].surges, 10) + parseInt(state.entity.abilities.constitution.abilityMod, 10);

    for(let c in EntityClass[index].defenseMod){
      if(EntityClass[index].defenseMod.hasOwnProperty(c)){
        state.entity.defense[ c ].classBonus = parseInt(EntityClass[index].defenseMod[c], 10);
      }
    }

    this.setState(state);
  }

  changeIcon = (event) => {
    let state = this.state;
    state.entity.iconClass = event.target.dataset.icon;
    this.setState(state);
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

    // for(let c in EntityRace[index].defenseMod){
    //   if(EntityRace[index].defenseMod.hasOwnProperty(c)){
    //     state.entity.defense[ c ].classBonus = parseInt(EntityRace[index].defenseMod[c], 10);
    //   }
    // }

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
    let state = calculateDefense(this.state, 'fortitude', event.target.value);
    this.setState( state ); 
  }
  handleReflexChange(event){
    let state = calculateDefense(this.state, 'reflex', event.target.value);
    this.setState( state ); 
  }
  handleWillpowerChange(event){
    let state = calculateDefense(this.state, 'willpower', event.target.value);
    this.setState( state ); 
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
      state.entity.surgesPerDay = parseInt(EntityClass[ state.entity.class ].surges, 10) + parseInt(state.entity.abilities.constitution.abilityMod, 10);
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

  calcRemainingPoints(state, target){
    if(target === undefined){
      state.remainingPoints = 4 + ((state.entity.level-1)*2);
    } else {
      state.usedPoints = 0;
      for(let a in state.entity.abilities){
        if(state.entity.abilities.hasOwnProperty(a)){
          if(target.name === a){
            state.usedPoints += parseInt( target.value, 10 );
          } else {
            state.usedPoints += parseInt( state.entity.abilities[ a ].score, 10 );
          }          
        }
      }
    }
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
        {EntityClass.map( (_class, index) => (
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
                leftAvatar={<Avatar data-icon={icon.class} className={'icon '+icon.class} />}
                
              />
            );
          })}
        </List>
      </div>
    );
  }

  loadPowersField(){
    let _this = this;
    let listStyle = { height: '150px', width: '250px', overflowY: 'scroll' };
    return(
      <div className="container">
        <Subheader>Powers</Subheader>
        <List className="EntityPowers" style={listStyle}>
          
          {this.state.entity.powers.map( (power, index) => {
            let className = power.class;
            console.log(power);
            return (
              <ListItem className={className} key={index} 
                primaryText={<div >{power.name}</div>}  
                leftAvatar={<Avatar className={'icon weapon_'+power.class} />}
              />
            );
          })}
        </List>
      </div>
    );
  }

  loadWeaponsField(){
    let _this = this;
    let listStyle = { height: '150px', width: '250px', overflowY: 'scroll' };

    this.state.availableWeapons.sort(function(a, b) {
      var nameA = a.name.toUpperCase(), nameB = b.name.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      } else {
        if (nameA > nameB) {
          return 1;
        }
      }
      return 0;
    });

    let selWeapons = this.state.availableWeapons.filter(function(val){ 
      return _this.state.entity.weapons.includes(val._id);
    });
    let remWeapons = this.state.availableWeapons.filter(function(val){ return !_this.state.entity.weapons.includes(val._id) });


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
              />
            );
          })}
        </List>
      </div>
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
			<div className="EntityForm">
        <SelectField floatingLabelText={`Saved ${this.EntityType}`} value={this.state.selectedEntity} onChange={this.handleSelectedEntity} 
        style={selectedStyle}>
          {saveEntities.map( (entity, index) => {
            return (
              <MenuItem key={index} value={index} primaryText={`${entity.name} - Lvl: ${entity.level}`} />
            );
          })}
        </SelectField>
        
				<TextField  floatingLabelText="Name" value={this.state.entity.name} name="name" onChange={this.handleChange} />
        <RaisedButton primary={true}
          label="Reset"
          onTouchTap={this.resetForm}
        />
        <br/>
				{(this.EntityType === 'character') ? this.loadRaceField() : ''}
        {(this.EntityType === 'character') ? this.loadClassField() : ''}
        {(this.EntityType === 'monster') ? this.loadRoleField() : ''}
        <SelectField style={Variables.getSelectListStyle(this.state.entity.size, EntitySize.map( (size, index) => {return index}) )} floatingLabelText="Size" value={this.state.entity.size} onChange={this.handleSizeChange} >
          {EntitySize.map( (size, index) => (
            <MenuItem key={index} value={index} primaryText={`${size.label}`} />
          ))}
        </SelectField>
        <SelectField style={Variables.getSelectListStyle(this.state.entity.armor, EntityArmor.map( (armor, index) => {return index}) )} floatingLabelText="Armor" value={this.state.entity.armor} onChange={this.handleArmorChange} >
          {EntityArmor.map( (armor, index) => (
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
                  <TextField className="shortField" floatingLabelText={a[0]}  type="number" 
                      value={ abilities[ a[0] ].score } name={a[0]} onChange={_this.changeAbility} />
                  <Chip tabIndex={-1} className="abilityChip">Attack: {(attackMod > 0 ? '+' : '') + attackMod}</Chip>    
                  <Chip tabIndex={-1} className="abilityChip">Abl: {(AbilityModifier(a[1].score) > 0 ? '+' : '') + AbilityModifier(a[1].score)}</Chip>
                  <Chip tabIndex={-1} className="abilityChip" style={styleRaceBonus }>Race Bonus: +{RaceBonus}</Chip>
                  
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
        {(this.EntityType === 'monster') ? this.loadPowersForm() : ''}   
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
//<PowersForm entityType={this.EntityType} existingPowers={this.state.existingPowers} onFindPowers={this.findPowers} onIncludePower={this.includePower}/>   
	}

}

export default EntityForm;