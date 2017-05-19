import React, { Component } from 'react';
import {Die} from '../lib/Die';
import {Variables} from '../lib/Variables';
import {WeaponTemplate} from '../lib/Weapons';
import * as weaponsApi from '../api/weapons-api';

import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';

import '../css/AddWeapon.css';

class AddWeapon extends Component {
  constructor(props){
    super(props);
    this.boundWeaponAC = this.props.boundWeaponAC;
    this.handleChooseWeapon = this.handleChooseWeapon.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRangeChange = this.handleRangeChange.bind(this);
    this.handleWeaponSave = this.handleWeaponSave.bind(this);
    this.handleDieChange = this.handleDieChange.bind(this);
    this.handleDieNumChange = this.handleDieNumChange.bind(this);
    this.handleProfChange = this.handleProfChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleHandsChange = this.handleHandsChange.bind(this);
    this.loadRangeField = this.loadRangeField.bind(this);

    this.weaponType = ['Melee', 'Ranged', 'Both'];
    this.category = ['Simple', 'Military', 'Superior'];
    this.hands = ['One-Handed', 'Two-Handed'];

    this.state = {
      snackbarOpen: false,
      snackbarMsg: ''
    }
  }


  handleWeaponSave = () => {
    let weapon = this.props.weapon;
    weaponsApi.saveWeapon(weapon);
    this.setState( {
      snackbarOpen: true,
      snackbarMsg: (weapon._id) ? 'Weapon Updated' : 'Weapon Added'
    });
  }

  handleChange = (event) => {
    this.boundWeaponAC.updateKey( event.target.name, event.target.value );
  }

  handleRangeChange = (event) => {
    this.boundWeaponAC.updateRange( event.target.name, event.target.value );
  }

  handleDieNumChange = (event) => {
    this.boundWeaponAC.changeDieNumber( event.target.value );
  }

  handleDieChange = (event, index) => {
    this.boundWeaponAC.changeDieType( index );
  }

  handleCategoryChange = (event, index) => {    
    this.boundWeaponAC.updateKey( 'category', this.category[index]);
  }

  handleHandsChange = (event, index) => {
    this.boundWeaponAC.updateKey( 'hands', this.hands[index]);
  }

  handleTypeChange = (event, index) => {
    this.boundWeaponAC.updateKey( 'type', this.weaponType[index]);
  }



  handleProfChange = (event, index) => {
    this.boundWeaponAC.updateKey( 'prof', index+2);
  }

  handleChooseWeapon(event, index) {
    this.boundWeaponAC.changeWeapon( index );
  }

  loadRangeField(weapon){
    return (
      <div>
        <label>Range</label>
        <TextField className="shortField" floatingLabelText="Low" type="text" value={weapon.range.low} name="low" onChange={this.handleRangeChange} />
        <TextField className="shortField" floatingLabelText="High" type="text" value={weapon.range.high} name="high" onChange={this.handleRangeChange} />
      </div>
    );
  }

	render() {
    let _weapon = this.props.weapon;
    let availableWeapons = this.props.availableWeapons;
    let _i = availableWeapons.findIndex( (w, index) => { return w._id === _weapon._id });
		return (
			<div className="AddWeapon">
        <SelectField  floatingLabelText="Choose Weapon" value={_i+1} onChange={this.handleChooseWeapon} >
          <MenuItem key={0} value={0} primaryText="Add New Power" />
          {availableWeapons.map( (w, index) => {
            let die = (w.damage.die === undefined) ? w.damage : `${w.damage.num}${w.damage.die}`;
            return (
              <MenuItem key={index+1} value={index+1} primaryText={`${w.name}`} />
            );
          })}
        </SelectField>
        <h3>Add New Weapon</h3>
        <TextField className="" floatingLabelText="Name"      type="text" value={_weapon.name}      name="name"      onChange={this.handleChange} />
        <br/>
        <div className="damage">
        <SelectField style={Variables.getSelectListStyle(_weapon.category, this.category)} floatingLabelText="Category" value={_weapon.category}  onChange={this.handleCategoryChange} >
          <MenuItem key={0} value={'Simple'} primaryText='Simple' />
          <MenuItem key={1} value={'Military'} primaryText='Military' />
          <MenuItem key={2} value={'Superior'} primaryText='Superior' />
        </SelectField>
        <SelectField style={Variables.getSelectListStyle(_weapon.type, this.weaponType)} floatingLabelText="Type" value={_weapon.type}  onChange={this.handleTypeChange} >
          {this.weaponType.map( (type, index) => (
            <MenuItem key={index} value={type} primaryText={type} />
          ))}          
        </SelectField>
        <SelectField style={Variables.getSelectListStyle(_weapon.hands, this.hands)} floatingLabelText="Hands" value={_weapon.hands}  onChange={this.handleHandsChange} >
          <MenuItem key={0} value={'One-Handed'} primaryText='One-Handed' />
          <MenuItem key={1} value={'Two-Handed'} primaryText='Two-Handed' />
        </SelectField>
        <SelectField style={Variables.getSelectListStyle(_weapon.prof, [2,3])} floatingLabelText="Proficiency" value={_weapon.prof}  onChange={this.handleProfChange} >
          <MenuItem key={0} value={2} primaryText='+2' />
          <MenuItem key={1} value={3} primaryText='+3' />
        </SelectField>
        </div>
        <br/>
        <div className="damage">
          <TextField className="" floatingLabelText="Num of Damage Die"      type="number" value={_weapon.damage.num}      name="damage_num"      onChange={this.handleDieNumChange} />
          <SelectField style={ { position: 'relative', top: 15 } } floatingLabelText="Damage" name="damage_die" value={_weapon.damage.die}  onChange={this.handleDieChange} >
            {Die.types.map( (die, index) => (
              <MenuItem key={index} value={`${die.label}`} primaryText={`${die.label}`} />
            ))}
          </SelectField>
        </div>
        <br/>
        {(_weapon.type === 'Ranged' || _weapon.type === 'Both') ? this.loadRangeField(_weapon) : ''}        
        <TextField className="shortField" floatingLabelText="Price"      type="number" value={_weapon.price}      name="price"      onChange={this.handleChange} />
        <TextField className="shortField" floatingLabelText="Weight"      type="number" value={_weapon.weight}      name="weight"      onChange={this.handleChange} />
        <br/>
        <br/>
        <RaisedButton primary={true}
          label="Save Weapon"
          onTouchTap={this.handleWeaponSave}
        />
			</div>
		);

	}

}

export default AddWeapon;