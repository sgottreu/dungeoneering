import React, { Component } from 'react';
import Die from './Die';
import {Variables} from './Variables';
import axios from 'axios';

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

    this.state = { 
  		availableWeapons: [],
  		weapon: {
        _id: false,
        category: "",  
        type: "", 
        name: "", 
        prof: 2, 
        damage: '1d6',
        price: 5, 
        weight: 2, 
        range: { low: 10, high: 20 }
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

  _setWeaponState(key, value){
    let state = this.state;
    state.weapon[ key ] = value;
    this.setState( state );
  }

  handleChange = (event) => {
    this._setWeaponState( event.target.name, event.target.value);
  }

  handleChooseWeapon(event, index) {
    let state = this.state;
    state.weapon = this.state.availableWeapons[index];
    this.setState( state );
  }

	render() {
		return (
			<div className="AddWeapon">
        <SelectField floatingLabelText="Choose Weapon" value={this.state.weapon._id} onChange={this.handleChooseWeapon} >
          {this.state.availableWeapons.map( (weapon, index) => (
            <MenuItem key={index} value={weapon._id} primaryText={`${weapon.name} - ${weapon.damage}`} />
          ))}
        </SelectField>
        <h3>Add New Weapon</h3>
        <TextField className="shortField" floatingLabelText="Name"      type="text" value={this.state.weapon.name}      name="name"      onChange={this.handleChange} />
        <SelectField floatingLabelText="Category" value={this.state.weapon.category}  onChange={this.handleChange} >
          <MenuItem key={0} value={'Simple'} primaryText='Simple' />
          <MenuItem key={1} value={'Military'} primaryText='Military' />
          <MenuItem key={2} value={'Superior'} primaryText='Superior' />
        </SelectField>
        <SelectField floatingLabelText="Type" value={this.state.weapon.type}  onChange={this.handleChange} >
          <MenuItem key={0} value={'melee'} primaryText='Melee' />
          <MenuItem key={1} value={'ranged'} primaryText='Ranged' />
        </SelectField>
        <TextField className="shortField" floatingLabelText="Weight"      type="number" value={this.state.weapon.weight}      name="weight"      onChange={this.handleChange} />
			</div>
		);

	}

}

export default AddWeapon;