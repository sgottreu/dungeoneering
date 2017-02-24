import React, { Component } from 'react';
import { EntityTemplate, AbilityModifier, AttackModifier, AbilityScorePoints, EntityRole, EntitySize, EntityRace, EntityClass, getInitialHitPoints, HalfLevelModifier, EntityArmor, calculateArmorClass, calculateDefense, saveEntity, EntityIcons} from './EntityTemplate';
import PowersForm from './PowersForm';
import {Variables} from './Variables';
import {_Powers} from './_Powers';

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

    this.loadRoleField = this.loadRoleField.bind(this);
    this.loadXPField = this.loadXPField.bind(this);
    this.loadClassField = this.loadClassField.bind(this);
    this.loadRaceField = this.loadRaceField.bind(this);
    this.loadEntityIconField = this.loadEntityIconField.bind(this);

    this.findPowers = this.findPowers.bind(this);
    this.includePower = this.includePower.bind(this);
    this.loadPowersField = this.loadPowersField.bind(this);
    
    let state = {};

    state.entity = Variables.clone(EntityTemplate);
    state.entity.type = this.EntityType;
    state.totalRacePoints = 0;
    state.usedPoints = 0;
    state.snackbarOpen = false;
    state.snackbarMsg = '';
    state.existingPowers = [];
    this.state = state;
  }

  componentDidMount(){
    let state = this.calcRemainingPoints(this.state);
    this.setState( state );
    this.findPowers();
  }

  findPowers(){
    _Powers.findPowers(this);
  }

  handleSnackBarClose = () => {
    this.setState({
      snackbarOpen: false,
    });
  };

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

  includePower = (power) => {
    let state = this.state;
    state.entity.powers.push(power);
    this.setState(state);
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
    if(state.remainingPoints === 0){ // AbilityScorePoints + ((state.entity.level-1)*2) + state.totalRacePoints){
      return false;
    } else {
      let state = this.state;
      
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
      state.entity.initiative = HalfLevelModifier(state.entity.level, state.entity.type) + state.entity.abilities.dexterity.abilityMod;
      state = calculateDefense(state);
      state = calculateArmorClass(state);
      this.setState( state );      
    }
  }

  calculateAbility(state, label, level, score){
    state.entity.abilities[ label ].score = score;
    state.entity.abilities[ label ].abilityMod = AbilityModifier(score);
    state.entity.abilities[ label ].AttackModifier = AttackModifier(level, score, state.entity.type);

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
  	let selectStyle = {};//{marginTop: '56px'};
    return (
    	<SelectField style={selectStyle} listStyle={selectStyle} menuStyle={selectStyle}  floatingLabelText="Role" value={this.state.entity.role} onChange={this.handleRoleChange} >
        {EntityRole.map( (role, index) => (
        	<MenuItem key={index} value={index} primaryText={role} />
        ))}
      </SelectField>
    );
  }

  loadRaceField(){
    let selectStyle = {};//{marginTop: '56px'};
    return (
      <SelectField style={selectStyle} listStyle={selectStyle} menuStyle={selectStyle}  floatingLabelText="Race" value={this.state.entity.race} onChange={this.handleRaceChange} >
        {EntityRace.map( (race, index) => (
          <MenuItem key={index} value={index} primaryText={race.name} />
        ))}
      </SelectField>
    );
  }

  loadClassField(){
    let selectStyle = {};//{marginTop: '56px'};
    return (
      <SelectField style={selectStyle} listStyle={selectStyle} menuStyle={selectStyle}  floatingLabelText="Class" value={this.state.entity.class} onChange={this.handleClassChange} >
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

  loadEntityIconField(){
    let _this = this;
    let listStyle = { height: '100px', width: '250px', overflowY: 'scroll' };
    return(
      <div>
        <Subheader>Entity Icons</Subheader>
        <List className="EntityIcons" style={listStyle}>
          
          {EntityIcons.map( (icon, index) => {
            if(icon.type !== this.EntityType){
              return false;
            }
            let className = ((icon.class === _this.state.entity.iconClass) ? ' active' : '');
            return (
              <ListItem className={className} key={index} data-icon={icon.class} 
                onTouchTap={this.changeIcon}
                primaryText={<div data-icon={icon.class}>{icon.label}</div>}  
                leftAvatar={<Avatar data-icon={icon.class} className={`icon ${icon.class}`} />}
                
              />
            );
          })}
        </List>
      </div>
    );
  }

  loadPowersField(){
    let _this = this;
    let listStyle = { height: '100px', width: '250px', overflowY: 'scroll' };
    return(
      <div>
        <Subheader>Powers</Subheader>
        <List className="EntityPowers" style={listStyle}>
          
          {this.state.entity.powers.map( (power, index) => {
            
            let _power = _Powers.matchPower(this.state.existingPowers, power.power_id);
            let _pt = _Powers.powerType.find(function(type, i) { 
              return index === i
            });
            let className = _pt.class;
            return (
              <ListItem className={className} key={index} 
                primaryText={<div >{power.name}</div>}  
                leftAvatar={<Avatar className={`icon ${_pt.class}`} />}
              />
            );
          })}
        </List>
      </div>
    );
  }

	render() {
		let selectStyle = {};//{marginTop: '56px'};
    
    let abilities = this.state.entity.abilities;
    let AbilityMap = new Map(Object.entries(abilities));
    let _this = this;

		return (
			<div className="EntityForm">
				<TextField  floatingLabelText="Name" value={this.state.entity.name} name="name" onChange={this.handleChange} />
        <br/>
				{(this.EntityType === 'character') ? this.loadRaceField() : ''}
        {(this.EntityType === 'character') ? this.loadClassField() : ''}
        {(this.EntityType === 'monster') ? this.loadRoleField() : ''}
        <SelectField menuStyle={selectStyle} floatingLabelText="Size" value={this.state.entity.size} onChange={this.handleSizeChange} >
          {EntitySize.map( (size, index) => (
            <MenuItem key={index} value={index} primaryText={`${size.label}`} />
          ))}
        </SelectField>
        <SelectField menuStyle={selectStyle} floatingLabelText="Armor" value={this.state.entity.armor} onChange={this.handleArmorChange} >
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
        <TextField className="shortField" floatingLabelText="Armor Class" type="number" value={this.state.entity.defense.armorClass.total} name="armorClass"  />
        <TextField className="shortField" floatingLabelText="Fortitude" type="number" value={this.state.entity.defense.fortitude.total} name="fortitude"  />
        <TextField className="shortField" floatingLabelText="Reflex" type="number" value={this.state.entity.defense.reflex.total} name="reflex"  />
        <TextField className="shortField" floatingLabelText="Initiative" type="number" value={this.state.entity.defense.willpower.total} name="willpower"  />
        <TextField className="shortField" floatingLabelText="Initiative" type="number" value={this.state.entity.initiative} name="initiative" onChange={this.handleChange} />
        {this.loadEntityIconField()}
        {this.loadPowersField()}
        <PowersForm entityType={this.EntityType} existingPowers={this.state.existingPowers} onFindPowers={this.findPowers} onIncludePower={this.includePower}/>        
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