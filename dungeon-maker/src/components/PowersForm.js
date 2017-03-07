import React, { Component } from 'react';
// import Die from './Die';
import {_Powers, PowerTemplate} from './_Powers';
import {EntityTemplate, EntityClass} from './EntityTemplate';
import {Variables} from './Variables';
import {Weapons} from './Weapons';


import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
// import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';

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
		this.addPower = this.addPower.bind(this);
		this.loadPowerAttackModifier = this.loadPowerAttackModifier.bind(this);
    this.loadClassField = this.loadClassField.bind(this);
    this.loadPowerChooser = this.loadPowerChooser.bind(this);
    this.loadWeaponsField = this.loadWeaponsField.bind(this);
    this.handleWeaponChange = this.handleWeaponChange.bind(this);

		this.state = { 
			current_power: false,
			power: Variables.clone(PowerTemplate)
		};
	}

  componentDidMount() {
    let _this = this;
  }

  handleChoosePower(event, index) {
  	let state = this.state;
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
      this.props.onFindPowers();
    } else {
      let state = this.state;
      state.current_power = this.props.onIncludePower(this.state.power, this.state.current_power);
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

  	state.power.type = index;
		this.setState( state );
  }

  handleActionChange = (event, index) => {
		this._setEntityState( 'action', index);
  }

  handleWeaponChange = (event, index) => {
    this._setEntityState( 'weapon', index);
  }

  handleRechargeChange = (event, index) => {
		this._setEntityState( 'recharge', index);
  }

  handleAttackChange = (event, index) => {
		this._setEntityState( 'attack', index);
  }

  handleDefenseChange = (event, index) => {
		this._setEntityState( 'defense', index);
  }

  handleClassChange = (event, index) => {
    this._setEntityState( 'class', EntityClass[index]);
  }

  loadPowerAttackModifier(_power) {
  	return(
  		<TextField className="shortField" floatingLabelText="Modifier" value={_power.attack.modifier}  onChange={this.handleChange} />
  	);
  }

  loadClassField(_power){
   return (
      <SelectField maxHeight={200} style={Variables.getSelectListStyle(_power.class)} floatingLabelText="Power Class" value={EntityClass.findIndex((_class, index)=> { return _class.name === _power.class})} name="type" onChange={this.handleClassChange} >
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
    //if(this.props.entityType === 'character'){
      return (
        <SelectField floatingLabelText="Choose Power" value={this.state.current_power} onChange={this.handleChoosePower} >
          <MenuItem key={0} value={0} primaryText="Add New Power" />
          {existingPowers.map( (power, index) => (
            <MenuItem key={index+1} value={index+1} primaryText={`${power.name} - ${_Powers.powerType[power.type].name}`} />
          ))}
        </SelectField>
      );
    // } else {
    //   return (
    //     <SelectField floatingLabelText="Choose Power" value={_power._id} onChange={this.handleChoosePower} >
    //       {existingPowers.map( (power, index) => (
    //         <MenuItem key={index} value={power._id} primaryText={`${power.name} - ${power.type}`} />
    //       ))}
    //     </SelectField>
    //   );
    // }
  }

	render(){
		let { existingPowers, entityType, weapons } = this.props;
		let _power = this.state.power;
    
		return (
			<div className="PowersForm">
				
				{this.loadPowerChooser()}
        <Subheader>Add New Power</Subheader>
				<TextField className="" floatingLabelText="Power Name" value={_power.name} name="name" onChange={this.handleChange} />
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
        	{(entityType === 'monster') ? this.loadPowerAttackModifier(_power) : ''}
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
        <RaisedButton primary={true}
          label={'Save Power'}
          onTouchTap={this.addPower}
        />
        <br/>
			</div>
		);
	}
}

export default PowersForm;