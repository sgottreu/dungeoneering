import React, { Component } from 'react';
import {Die} from './Die';
import {Variables} from './Variables';

import {saveWeapon, findWeapons} from './Weapons';

import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';

import '../css/AddWeapon.css';

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
    this.loadRangeField = this.loadRangeField.bind(this);

    this.weaponType = ['Melee', 'Ranged', 'Both'];
    this.category = ['Simple', 'Military', 'Superior'];
    this.hands = ['One-Handed', 'Two-Handed'];
    this.dice = Die.map( (die) => { return die.label } );

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
    findWeapons(_this) ;
  }
  componentWillUnmount() {
  }

  handleWeaponSave = () => saveWeapon(this);

  _setWeaponState(key, value){
    let state = this.state;
    if(key === 'range'){
      let range = value.split("/");
      state.range = value;
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
    this._setWeaponState( 'category', this.category[index]);
  }

  handleHandsChange = (event, index) => {

    this._setWeaponState( 'hands', this.hands[index]);
  }

  handleTypeChange = (event, index) => {
    this._setWeaponState( 'type', this.weaponType[index]);
  }

  handleDieChange = (event, index) => {
    let state = this.state;
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
    state.range = (this.state.weapon.range.low === undefined) ? '' : `${this.state.weapon.range.low}/${this.state.weapon.range.high}`;

    this.setState( state );
  }

  loadRangeField(){
    return (
      <TextField className="shortField" floatingLabelText="Range" type="text" value={this.state.range} name="range" onChange={this.handleChange} />
    );
  }

	render() {
    let _weapon = this.state.weapon;
    // style={Variables.getSelectListStyle(_weapon._id, this.state.availableWeapons.map( (w) => { return w._id } ))}
		return (
			<div className="AddWeapon">
        <SelectField  floatingLabelText="Choose Weapon" value={_weapon._id} onChange={this.handleChooseWeapon} >
          {this.state.availableWeapons.map( (weapon, index) => {
            let die = (weapon.damage.die === undefined) ? weapon.damage : `${weapon.damage.num}${weapon.damage.die}`;
            return (
              <MenuItem key={index} value={weapon._id} primaryText={`${weapon.name} - ${die}`} />
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
          <TextField className="" floatingLabelText="Num of Damage Die"      type="number" value={_weapon.damage.num}      name="damage_num"      onChange={this.handleNumChange} />
          <SelectField style={ { position: 'relative', top: 15 } } floatingLabelText="Damage" name="damage_die" value={_weapon.damage.die}  onChange={this.handleDieChange} >
            {Die.map( (die, index) => (
              <MenuItem key={index} value={`${die.label}`} primaryText={`${die.label}`} />
            ))}
          </SelectField>
        </div>
        <br/>
        {(_weapon.type === 'Ranged' || _weapon.type === 'Both') ? this.loadRangeField() : ''}        
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