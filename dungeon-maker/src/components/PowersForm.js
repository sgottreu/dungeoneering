import React, { Component } from 'react';

import {Powers} from '../lib/Powers';
import {EntityTemplate, EntityClass} from './EntityTemplate';
import {Variables} from '../lib/Variables';
import {Die} from '../lib/Die';
import * as powersApi from '../api/powers-api';

import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';

import '../css/PowersForm.css';

class PowersForm extends Component {

	constructor(props){
		super(props);

		this.abilities = Variables.mapObj(EntityTemplate.abilities);
		this.defense = Variables.mapObj(EntityTemplate.defense);

    this.boundPowerAC = this.props.boundPowerAC;

		this.handleChoosePower = this.handleChoosePower.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleTypeChange = this.handleTypeChange.bind(this);
		this.handleActionChange = this.handleActionChange.bind(this);
		this.handleRechargeChange = this.handleRechargeChange.bind(this);
		this.handleAttackChange = this.handleAttackChange.bind(this);
		this.handleDefenseChange = this.handleDefenseChange.bind(this);
    this.handleAttackModifierChange = this.handleAttackModifierChange.bind(this);
    this.handleAbilityModifierChange = this.handleAbilityModifierChange.bind(this);
		this.addPower = this.addPower.bind(this);
		this.loadPowerAttackModifier = this.loadPowerAttackModifier.bind(this);
    this.loadClassField = this.loadClassField.bind(this);
    this.loadPowerChooser = this.loadPowerChooser.bind(this);
    this.loadWeaponsField = this.loadWeaponsField.bind(this);
    this.loadPowerLevel = this.loadPowerLevel.bind(this);
    this.handleWeaponChange = this.handleWeaponChange.bind(this);
    this.handleDieChange = this.handleDieChange.bind(this);
    this.handleDieNumChange = this.handleDieNumChange.bind(this);
    this.handleDieModChange = this.handleDieModChange.bind(this);
    this.loadMonsterDamageField = this.loadMonsterDamageField.bind(this);
    this.loadCharacterDamageField = this.loadCharacterDamageField.bind(this);

	}


  handleChoosePower(event, index) {
   this.boundPowerAC.changeCurrentPower(index);
  }

  addPower(){
    if(this.props.onIncludePower === undefined){
      powersApi.savePower(this.props.power);
    } else {
      
    }
    
  }

  handleChange = (event) => {
    this.boundPowerAC.updateKey( event.target.name, event.target.value);
  }

  handleTypeChange = (event, index) => {
  	this.boundPowerAC.updateAttack( 'for', Powers.powerType[index].attack.for );
    this.boundPowerAC.updateAttack( 'against', Powers.powerType[index].attack.against );
  	this.boundPowerAC.updateKey( 'class', Powers.powerType[index].class);
    this.boundPowerAC.updateKey( 'type', index );
  }

  handleActionChange = (event, index) => {
		this.boundPowerAC.updateKey( 'action', index);
  }

  handleWeaponChange = (event, index) => {
    let weapons = this.props.weapons;
    let power = this.props.power;
    power.weapon = index;
    let _weapon = this.props.availableWeapons.find(function(w, i){ return w._id === weapons[index] });

    if(_weapon.damage.die === undefined) {
      let damage = _weapon.damage.split('d');
      this.boundPowerAC.changeDieType( `d${damage[1]}` );
      this.boundPowerAC.changeDieNumber( damage[0] );
    } else {
      this.boundPowerAC.changeDieType( _weapon.damage.die );
      this.boundPowerAC.changeDieNumber( _weapon.damage.num );
    }
  }

  handleRechargeChange = (event, index) => {
		this.boundPowerAC.updateKey( 'recharge', index);
  }

  handleAttackModifierChange = (event) => {
		this.boundPowerAC.updateAttack( 'modifier', event.target.value );
  }

  handleAttackChange = (event, index) => {
	  this.boundPowerAC.updateAttack( 'for', this.abilities[index] );
  }

  handleDefenseChange = (event, index) => {
    this.boundPowerAC.updateAttack( 'against', this.defense[index]);
  }

  handleAbilityModifierChange = (event, index) => {
		this.boundPowerAC.updateKey( 'ability_modifier', (index === 0) ? false : this.abilities[index-1] );
  }

  handleClassChange = (event, index) => {
    this.boundPowerAC.updateKey( 'class', EntityClass[index]);
  }

  handleDieNumChange = (event) => {
    this.boundPowerAC.changeDieNumber(event.target.value);
  }

  handleDieChange = (event, index) => {
    this.boundPowerAC.changeDieType(index);
  }

  handleDieModChange = (event) => {
    this.boundPowerAC.changeDieModifier(event.target.value);
  }

  loadPowerAttackModifier(_power) {
  	return(
  		<TextField className="shortField" floatingLabelText="Modifier" type="number" value={_power.attack.modifier}  onChange={this.handleAttackModifierChange} />
  	);
  }

  loadPowerLevel(_power) {
  	return(
  		<TextField className="shortField" floatingLabelText="Level" type="number" value={parseInt(_power.level,10)} name="level" onChange={this.handleChange} />
  	);
  }

  loadClassField(_power){
   return (
      <SelectField className="bottomAlign" maxHeight={200} style={Variables.getSelectListStyle(_power.class)} floatingLabelText="Power Class" value={EntityClass.findIndex((_class, index)=> { return _class.name === _power.class.name})} name="type" onChange={this.handleClassChange} >
        {EntityClass.map( (_class, index) => (
          <MenuItem key={index} value={index} primaryText={_class.name} />
        ))}
      </SelectField>
      
    );
  }

  loadWeaponsField(weapons){
    let availableWeapons = this.props.availableWeapons;
    return (
      <SelectField className="bottomAlign"   floatingLabelText="Weapon" value={this.state.power.weapon} onChange={this.handleWeaponChange} >
        {weapons.map( (weapon, index) => {
          let _weapon = availableWeapons.find(function(w, i){ return w._id === weapon});
          return (
            <MenuItem key={index} value={index} primaryText={`${_weapon.name} - ${_weapon.type}`} />
          );
        })}
      </SelectField>
    );
  }

  loadPowerChooser(){
    let { existingPowers, current_power } = this.props;

      return (
        <SelectField className="bottomAlign" floatingLabelText="Choose Power" value={current_power} onChange={this.handleChoosePower} >
          <MenuItem key={0} value={0} primaryText="Add New Power" />
          {existingPowers.map( (p, index) => (
            <MenuItem leftIcon={<div className={'icon icon_power_class '+(p.class.name === undefined? p.class : p.class.name.toLowerCase())} />} 
              key={index+1} value={index+1} primaryText={p.name} />
          ))}
        </SelectField>
      );
  }

  loadMonsterDamageField(_power){

    return (
      <div className="damage">
        <TextField className="mediumField" floatingLabelText="Num of Damage Die"      type="number" value={_power.damage.num}      name="damage_num"      onChange={this.handleDieNumChange} />
        <SelectField className="bottomAlign" style={ { position: 'relative', top: 15 } } floatingLabelText="Damage" name="damage_die" value={_power.damage.die}  onChange={this.handleDieChange} >
          {Die.map( (die, index) => (
            <MenuItem key={index} value={`${die.label}`} primaryText={`${die.label}`} />
          ))}
        </SelectField>
        <TextField className="mediumField" floatingLabelText="Damage Modifier"      type="number" value={_power.damage.modifier}      name="damage_mod"      onChange={this.handleDieModChange} />
      </div>
    );
  }

  loadCharacterDamageField(_power){

    return (
      <div className="damage">
        <TextField className="mediumField" floatingLabelText="Weapon Modifier"  
          type="number" value={_power.weapon_modifier}      name="weapon_modifier"      onChange={this.handleChange} />
        <SelectField className="bottomAlign" floatingLabelText="Ability Modifier" value={this.abilities.findIndex( (val) => { return val === _power.ability_modifier })} onChange={this.handleAbilityModifierChange} >
          <MenuItem key={-1} value={false} primaryText="None" />
          {this.abilities.map( (abl, index) => (
            <MenuItem key={index} value={index} primaryText={abl} />
          ))}
        </SelectField>
      </div>
    );
  }

	render(){
		let { entityType, weapons, power } = this.props;

		return (
			<div className={'PowersForm inset'}>
				
				{this.loadPowerChooser()}
        <br/>
				<TextField className="" floatingLabelText="Power Name" value={power.name} name="name" onChange={this.handleChange} />
        { (entityType === 'character') ? this.loadPowerLevel(power) : ''}
				<br/>
        <div className="selectRow">
  				<SelectField className="bottomAlign" maxHeight={200} style={Variables.getSelectListStyle(power.type)} floatingLabelText="Power Type" value={power.type} name="type" onChange={this.handleTypeChange} >
            {Powers.powerType.map( (type, index) => (
            	<MenuItem key={index} value={index} primaryText={type.name} />
            ))}
          </SelectField>
          
  				<SelectField className="bottomAlign" maxHeight={200} style={Variables.getSelectListStyle(power.action)} floatingLabelText="Power Action" value={power.action} name="action" onChange={this.handleActionChange} >
            {Powers.powerAction.map( (action, index) => (
            	<MenuItem key={index} value={index} primaryText={action} />
            ))}
          </SelectField>
          
  				<SelectField className="bottomAlign" maxHeight={200} style={Variables.getSelectListStyle(power.recharge)} floatingLabelText="Power Recharge" value={power.recharge} name="recharge" onChange={this.handleRechargeChange} >
            {Powers.powerRecharge.map( (recharge, index) => (
            	<MenuItem key={index} value={index} primaryText={recharge} />
            ))}
          </SelectField>
          {(entityType === 'character') ? this.loadClassField(power) : ''} 
        </div>
        <br/>
        <div className="attack">
        	{this.loadPowerAttackModifier(power)}
        	<SelectField className="bottomAlign" floatingLabelText="Offense" value={this.abilities.findIndex( (val) => { return val === power.attack.for })} onChange={this.handleAttackChange} >
	          {this.abilities.map( (abl, index) => (
	          	<MenuItem key={index} value={index} primaryText={abl} />
	          ))}
	        </SelectField>
	         vs. 
	        <SelectField className="bottomAlign" floatingLabelText="Defense" value={this.defense.findIndex( (val) => { return val === power.attack.against })} onChange={this.handleDefenseChange} >
	          {this.defense.map( (def, index) => (
	          	<MenuItem key={index} value={index} primaryText={def} />
	          ))}
	        </SelectField> 
        </div>
        {(entityType === 'monster') ? this.loadWeaponsField(weapons) : ''}
        <br/>
        {(entityType === 'monster') ? this.loadMonsterDamageField(power) : this.loadCharacterDamageField(power) }
        <br/>
        <br/>
        <RaisedButton primary={true}
          label={'Add Power'}
          onTouchTap={this.addPower}
        />
        <br/>
			</div>
		);
	}
}

export default PowersForm;