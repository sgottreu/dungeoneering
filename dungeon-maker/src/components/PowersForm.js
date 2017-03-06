import React, { Component } from 'react';
// import Die from './Die';
import {_Powers, PowerTemplate} from './_Powers';
import {EntityTemplate, EntityClass} from './EntityTemplate';
import {Variables} from './Variables';


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
  	state.power = this.props.existingPowers[index];
  	this.setState( state );
  	// this.props.onIncludePower(state.current_power);
  }

  addPower(){
    if(this.props.onFindPowers !== undefined){
      _Powers.savePower(this);
      this.props.onFindPowers();
    } else {
      this.props.onIncludePower(this.state.power);
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

	render(){
		let { existingPowers, entityType } = this.props;
		let _power = this.state.power;
    
		return (
			<div className="PowersForm">
				
				<SelectField floatingLabelText="Choose Power" value={_power._id} onChange={this.handleChoosePower} >
          {existingPowers.map( (powers, index) => (
          	<MenuItem key={index} value={powers._id} primaryText={`${powers.name} - ${_Powers.powerType[powers.type].name}`} />
          ))}
        </SelectField>
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
          {(this.EntityType === 'character') ? this.loadClassField(_power) : ''} 
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