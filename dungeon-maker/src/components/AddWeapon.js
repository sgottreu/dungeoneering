import React, { Component } from 'react';
import {Die} from './Die';
import {Variables} from './Variables';
import axios from 'axios';
import {saveWeapon} from './Weapons';

import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Subheader from 'material-ui/Subheader';
import RaisedButton from 'material-ui/RaisedButton';

class AddWeapon extends Component {
  constructor(props){
    super(props);

    this.handleChooseWeapon = this.handleChooseWeapon.bind(this);
    this._setWeaponState = this._setWeaponState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleWeaponSave = this.handleWeaponSave.bind(this);
    this.handleDieChange = this.handleDieChange.bind(this);
    this.handleNumChange = this.handleNumChange.bind(this);
    this.handleProfChange = this.handleProfChange.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.handleHandsChange = this.handleHandsChange.bind(this);

    this.state = { 
  		availableWeapons: [],
  		weapon: {
        _id: false,
        category: "",  
        type: "", 
        name: "", 
        prof: 2, 
        damage: { die: 'd6', num: 1},
        price: 5, 
        weight: 2, 
        range: '',
        hands: 1
      } 
    };
  }

  componentDidMount() {
    let _this = this;
    
    axios.get(`${Variables.host}/findWeapons`)
    .then(res => {
      let state = _this.state;
      state.availableWeapons = res.data;
      _this.setState( state );
    }).catch(function(err){ 

    });   

  }
  componentWillUnmount() {
  }

  handleWeaponSave = () => saveWeapon(this);

  _setWeaponState(key, value){
    console.log(key);
    let state = this.state;
    if(key === 'range'){
      console.log(value);
      let range = value.split("/");
      state.weapon[ key ] = (value === '') ? false : { low: range[0], high: range[1] };
    } else {
      state.weapon[ key ] = value;
    }
    
    this.setState( state );
  }

  handleChange = (event) => {
    this._setWeaponState( event.target.name, event.target.value);
  }

  handleNumChange = (event) => {
    let state = this.state;
    state.weapon.damage = {
      die: state.weapon.damage.die,
      num : event.target.value
    };
    this.setState( state );
  }

  handleCategoryChange = (event, index) => {
    let cat = ['Simple', 'Military', 'Superior'];
    this._setWeaponState( 'category', cat[index]);
  }

  handleHandsChange = (event, index) => {
    let hand = ['One-Handed', 'Two-Handed'];
    this._setWeaponState( 'hands', hand[index]);
  }

  handleTypeChange = (event, index) => {
    let type = ['Melee', 'Ranged'];
    this._setWeaponState( 'type', type[index]);
  }

  handleDieChange = (event, index) => {
    let state = this.state;
    console.log(index);
    state.weapon.damage = {
      die: Die[index].label,
      num : state.weapon.damage.num
    };
    this.setState( state );
  }

  handleProfChange = (event, index) => {
    this._setWeaponState( 'prof', index+2);
  }

  handleChooseWeapon(event, index) {
    let state = this.state;
    state.weapon = this.state.availableWeapons[index];

    if(state.weapon.damage.die === undefined) {
      let damage = state.weapon.damage.split('d');
      state.weapon.damage = { die: `d${damage[1]}`, num: damage[0] };
    }
    state.weapon.range = (this.state.weapon.range.low === undefined) ? '' : `${this.state.weapon.range.low}/${this.state.weapon.range.high}`;

    this.setState( state );
  }

	render() {
    
    console.log(this.state)
		return (
			<div className="AddWeapon">
        <SelectField floatingLabelText="Choose Weapon" value={this.state.weapon._id} onChange={this.handleChooseWeapon} >
          {this.state.availableWeapons.map( (weapon, index) => {
            let die = (weapon.damage.die === undefined) ? weapon.damage : `${weapon.damage.num}${weapon.damage.die}`;
            return (
              <MenuItem key={index} value={weapon._id} primaryText={`${weapon.name} - ${die}`} />
            );
          })}
        </SelectField>
        <h3>Add New Weapon</h3>
        <TextField className="shortField" floatingLabelText="Name"      type="text" value={this.state.weapon.name}      name="name"      onChange={this.handleChange} />
        <SelectField floatingLabelText="Category" value={this.state.weapon.category}  onChange={this.handleCategoryChange} >
          <MenuItem key={0} value={'Simple'} primaryText='Simple' />
          <MenuItem key={1} value={'Military'} primaryText='Military' />
          <MenuItem key={2} value={'Superior'} primaryText='Superior' />
        </SelectField>
        <SelectField floatingLabelText="Type" value={this.state.weapon.type}  onChange={this.handleTypeChange} >
          <MenuItem key={0} value={'Melee'} primaryText='Melee' />
          <MenuItem key={1} value={'Ranged'} primaryText='Ranged' />
        </SelectField>
        <SelectField floatingLabelText="Hands" value={this.state.weapon.hands}  onChange={this.handleHandsChange} >
          <MenuItem key={0} value={'One-Handed'} primaryText='One-Handed' />
          <MenuItem key={1} value={'Two-Handed'} primaryText='Two-Handed' />
        </SelectField>
        <SelectField floatingLabelText="Proficiency" value={this.state.weapon.prof}  onChange={this.handleProfChange} >
          <MenuItem key={0} value={2} primaryText='+2' />
          <MenuItem key={1} value={3} primaryText='+3' />
        </SelectField>
        <TextField className="shortField" floatingLabelText="Num of Damage Die"      type="number" value={this.state.weapon.damage.num}      name="damage_num"      onChange={this.handleNumChange} />
        <SelectField floatingLabelText="Damage" name="damage_die" value={this.state.weapon.damage.die}  onChange={this.handleDieChange} >
          {Die.map( (die, index) => (
            <MenuItem key={index} value={`${die.label}`} primaryText={`${die.label}`} />
          ))}
        </SelectField>
        <TextField className="shortField" floatingLabelText="Range"      type="text" value={this.state.weapon.range}      name="range"      onChange={this.handleChange} />
        <TextField className="shortField" floatingLabelText="Price"      type="number" value={this.state.weapon.price}      name="price"      onChange={this.handleChange} />
        <TextField className="shortField" floatingLabelText="Weight"      type="number" value={this.state.weapon.weight}      name="weight"      onChange={this.handleChange} />
        <RaisedButton primary={true}
          label="Save Weapon"
          onTouchTap={this.handleWeaponSave}
        />
			</div>
		);

	}

}

export default AddWeapon;