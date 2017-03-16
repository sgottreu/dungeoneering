import React, { Component } from 'react';
// import Die from './Die';
import {_Powers, PowerTemplate} from './_Powers';
import {EntityTemplate, EntityClass} from './EntityTemplate';
import {Variables} from './Variables';
import {Die} from './Die';

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

		this._setEntityState = this._setEntityState.bind(this);
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

		this.state = { 
			current_power: false,
			power: Variables.clone(PowerTemplate)
		};
	}

  componentDidMount() {
    let _this = this;
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextProps.selEntity === false && this.props.selEntity){
      let state = this.state;
      state.power = Variables.clone(PowerTemplate);
      state.current_power = false;
      this.setState( state );
    }

    return true;
  }

  handleChoosePower(event, index) {
  	let state = this.state;
    state.power = Variables.clone(PowerTemplate);
    if(index === 0){
      state.power = Variables.clone(PowerTemplate);
      state.current_power = false;
    } else {
      state.power = this.props.existingPowers[index-1];
      state.current_power = index;
    }
  	
  	this.setState( state );
  	// this.props.onIncludePower(state.current_power);
  }

  addPower(){
    
    if(this.props.onFindPowers !== undefined){
      _Powers.savePower(this);
      this.props.onFindPowers(this.state.power);
    } else {
      this.props.onIncludePower(this.state.power, this.state.current_power);
      let state = this.state;
      state.power = Variables.clone(PowerTemplate);
      state.current_power = false;
      this.setState( state );
    }
    
  }

  _setEntityState(key, value){
		let state = this.state;
		state.power[ key ] = value;
		this.setState( state );
  }

  handleChange = (event) => {
    this._setEntityState( event.target.name, event.target.value);
  }

  handleTypeChange = (event, index) => {
  	let state = this.state;
  	state.power.attack.for = _Powers.powerType[index].attack.for;
  	state.power.attack.against = _Powers.powerType[index].attack.against;

    state.power.class = _Powers.powerType[index].class;

  	state.power.type = index;
		this.setState( state );
  }

  handleActionChange = (event, index) => {
		this._setEntityState( 'action', index);
  }

  handleWeaponChange = (event, index) => {
    let weapons = this.props.weapons;
    let state = this.state;
    state.power.weapon = index;
    let _weapon = this.props.availableWeapons.find(function(w, i){ return w._id === weapons[index] });

    if(_weapon.damage.die === undefined) {
      let damage = _weapon.damage.split('d');
      state.power.damage.die = `d${damage[1]}`;
      state.power.damage.num = damage[0];
    } else {
      state.power.damage.die = _weapon.damage.die;
      state.power.damage.num = _weapon.damage.num;
    }

    this.setState( state );
  }

  handleRechargeChange = (event, index) => {
		this._setEntityState( 'recharge', index);
  }

  handleAttackModifierChange = (event) => {
    let state = this.state;
		state.power.attack.modifier = event.target.value;
		this.setState( state );
  }

  handleAttackChange = (event, index) => {
		let state = this.state;
		state.power.attack.for = this.abilities[index];
		this.setState( state );
  }

  handleDefenseChange = (event, index) => {
		let state = this.state;
		state.power.attack.against =  this.defense[index];
		this.setState( state );
  }

  handleAbilityModifierChange = (event, index) => {
		let state = this.state;
		state.power.ability_modifier = (index === 0) ? false : this.abilities[index-1];
		this.setState( state );
  }

  handleClassChange = (event, index) => {
    this._setEntityState( 'class', EntityClass[index]);
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
      <SelectField maxHeight={200} style={Variables.getSelectListStyle(_power.class)} floatingLabelText="Power Class" value={EntityClass.findIndex((_class, index)=> { return _class.name === _power.class.name})} name="type" onChange={this.handleClassChange} >
        {EntityClass.map( (_class, index) => (
          <MenuItem key={index} value={index} primaryText={_class.name} />
        ))}
      </SelectField>
      
    );
  }

  loadWeaponsField(weapons){
    let availableWeapons = this.props.availableWeapons;
    return (
      <SelectField   floatingLabelText="Weapon" value={this.state.power.weapon} onChange={this.handleWeaponChange} >
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
    let _power = this.state.power;
    let existingPowers = this.props.existingPowers;

      return (
        <SelectField floatingLabelText="Choose Power" value={this.state.current_power} onChange={this.handleChoosePower} >
          <MenuItem key={0} value={0} primaryText="Add New Power" />
          {existingPowers.map( (power, index) => (
            <MenuItem leftIcon={<div className={'icon icon_power_class '+(power.class.name === undefined? power.class : power.class.name.toLowerCase())} />} key={index+1} value={index+1} primaryText={power.name} />
          ))}
        </SelectField>
      );
  }

  loadMonsterDamageField(_power){

    return (
      <div className="damage">
        <TextField className="mediumField" floatingLabelText="Num of Damage Die"      type="number" value={_power.damage.num}      name="damage_num"      onChange={this.handleDieNumChange} />
        <SelectField style={ { position: 'relative', top: 15 } } floatingLabelText="Damage" name="damage_die" value={_power.damage.die}  onChange={this.handleDieChange} >
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
        <SelectField floatingLabelText="Ability Modifier" value={this.abilities.findIndex( (val) => { return val === _power.ability_modifier })} onChange={this.handleAbilityModifierChange} >
          <MenuItem key={-1} value={false} primaryText="None" />
          {this.abilities.map( (abl, index) => (
            <MenuItem key={index} value={index} primaryText={abl} />
          ))}
        </SelectField>
      </div>
    );
  }

  handleDieNumChange = (event) => {
    let state = this.state;
    state.power.damage.num = event.target.value;
    this.setState( state );
  }

  handleDieChange = (event, index) => {
    let state = this.state;
    state.power.damage.die = Die[index].label;
    this.setState( state );
  }

  handleDieModChange = (event) => {
    let state = this.state;
    state.power.damage.modifier = event.target.value;
    this.setState( state );
  }

	render(){
		let { entityType, weapons } = this.props;
		let _power = this.state.power;

		return (
			<div className={'PowersForm inset'}>
				
				{this.loadPowerChooser()}
        <br/>
				<TextField className="" floatingLabelText="Power Name" value={_power.name} name="name" onChange={this.handleChange} />
        { (entityType === 'character') ? this.loadPowerLevel(_power) : ''}
				<br/>
        <div className="selectRow">
  				<SelectField maxHeight={200} style={Variables.getSelectListStyle(_power.type)} floatingLabelText="Power Type" value={_power.type} name="type" onChange={this.handleTypeChange} >
            {_Powers.powerType.map( (type, index) => (
            	<MenuItem key={index} value={index} primaryText={type.name} />
            ))}
          </SelectField>
          
  				<SelectField maxHeight={200} style={Variables.getSelectListStyle(_power.action)} floatingLabelText="Power Action" value={_power.action} name="action" onChange={this.handleActionChange} >
            {_Powers.powerAction.map( (action, index) => (
            	<MenuItem key={index} value={index} primaryText={action} />
            ))}
          </SelectField>
          
  				<SelectField maxHeight={200} style={Variables.getSelectListStyle(_power.recharge)} floatingLabelText="Power Recharge" value={_power.recharge} name="recharge" onChange={this.handleRechargeChange} >
            {_Powers.powerRecharge.map( (recharge, index) => (
            	<MenuItem key={index} value={index} primaryText={recharge} />
            ))}
          </SelectField>
          {(entityType === 'character') ? this.loadClassField(_power) : ''} 
        </div>
        <br/>
        <div className="attack">
        	{this.loadPowerAttackModifier(_power)}
        	<SelectField floatingLabelText="Offense" value={this.abilities.findIndex( (val) => { return val === _power.attack.for })} onChange={this.handleAttackChange} >
	          {this.abilities.map( (abl, index) => (
	          	<MenuItem key={index} value={index} primaryText={abl} />
	          ))}
	        </SelectField>
	         vs. 
	        <SelectField floatingLabelText="Defense" value={this.defense.findIndex( (val) => { return val === _power.attack.against })} onChange={this.handleDefenseChange} >
	          {this.defense.map( (def, index) => (
	          	<MenuItem key={index} value={index} primaryText={def} />
	          ))}
	        </SelectField> 
        </div>
        {(entityType === 'monster') ? this.loadWeaponsField(weapons) : ''}
        <br/>
        {(entityType === 'monster') ? this.loadMonsterDamageField(_power) : this.loadCharacterDamageField(_power) }
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