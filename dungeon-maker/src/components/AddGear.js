import React, { Component } from 'react';
import * as Gear from '../lib/Gear';
import * as gearApi from '../api/gear-api';
import {Die} from '../lib/Die';
import {Variables} from '../lib/Variables';

import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Toggle from 'material-ui/Toggle';

import '../css/AddGear.css';

class AddGear extends Component {
  constructor(props){
    super(props);
    this.boundGearAC = this.props.boundGearAC;

    this.handleChange = this.handleChange.bind(this);
    this.handleGearSave = this.handleGearSave.bind(this);
    this.updateSnackBar = this.updateSnackBar.bind(this);

    this.state = {
      snackbarOpen: false,
      snackbarMsg: ''
    }
  }

  updateSnackBar = (msg, open=false) => {
    this.setState( { snackbarMsg: msg, snackbarOpen: open } );
  }

  handleGearSave = () => {
    let gear = this.props.gear;
    let updateSnackBar = this.updateSnackBar;
    gearApi.saveGear(gear).then( function(response){
      updateSnackBar('Gear saved.', true);
    });
  }

  handleChange = (event) => {
    this.boundGearAC.updateKey( event.target.name, event.target.value );
  }

  handleChooseGear(event, index) {
    this.boundGearAC.changeGear( index );
  }

	render() {
    let _gear = this.props.gear;
    let availableGear = this.props.availableGear;
    let _i = availableGear.findIndex( (w, index) => { return w._id === _gear._id });

		return (
			<div className="AddGear">
        <SelectField  floatingLabelText="Choose Gear" value={_i+1} 
          onChange={(e, i) => { 
            this.boundGearAC.changeGear( i ); 
          } 
        } >
          <MenuItem key={0} value={0} primaryText="Add New Gear" />
          {availableGear.map( (w, index) => {
            return (
              <MenuItem key={index+1} value={index+1} primaryText={`${w.name}`} />
            );
          })}
        </SelectField>
        <h3>Add New Gear</h3>
        <TextField className="" floatingLabelText="Name"      type="text" value={_gear.name}      name="name"      onChange={this.handleChange} />
        <br/>
        <div className="damage">
            <SelectField className="bottomAlign" floatingLabelText="Category" value={_gear.category} 
              onChange={(e, i) => {
              let value = (i === 0) ? false : Gear.GearCategories[i-1];
              this.boundGearAC.updateKey( 'category', value );
            }} >
              <MenuItem key={0} value={false} primaryText="" />
              { Gear.GearCategories.map( (cat, index) => (
                <MenuItem key={index+1} value={`${cat}`} primaryText={`${cat}`} />
              ))
              }

            </SelectField>
        </div>
        <br/>

        <TextField className="shortField" floatingLabelText="Price"      type="number" value={_gear.price}      name="price"      onChange={this.handleChange} />
        <TextField className="shortField" floatingLabelText="Weight"     type="number" value={_gear.weight}     name="weight"     onChange={this.handleChange} />
        <TextField className="shortField" floatingLabelText="Quantity"   type="number" value={_gear.quantity}   name="quantity"   onChange={this.handleChange} />
        <br/>

        <div className="damage">
          <TextField className="" floatingLabelText="Attack Modifier"   type="number" value={_gear.attackModifier}   name="attackModifier"   onChange={this.handleChange} />
          <TextField className="" floatingLabelText="Num of Damage Die"      type="number" value={_gear.damage.num}      name="damage_num"      
            onChange={ (event) => {
              let dmg = Variables.clone(_gear.damage);
              dmg.num = event.target.value;
              this.boundGearAC.updateKey( 'damage', dmg );
            }} />
          <SelectField className="bottomAlign" floatingLabelText="Damage" name="damage_die" value={_gear.damage.die}  
            onChange={ (event, i) => {
              let dmg = Variables.clone(_gear.damage);
              dmg.die = Die.types[ i ].label;
              this.boundGearAC.updateKey( 'damage', dmg );     
            }} >
            {Die.types.map( (die, index) => (
              <MenuItem key={index} value={`${die.label}`} primaryText={`${die.label}`} />
            ))}
          </SelectField>
        </div>
        <br/>

        <TextField className="shortField" floatingLabelText="Armor Bonus"      type="number" value={_gear.armorBonus}      name="armorBonus"      onChange={this.handleChange} />
        <TextField className="shortField" floatingLabelText="Ability Mod"     type="number" value={_gear.abilityMod}     name="abilityMod"     onChange={this.handleChange} />
        <TextField className="shortField" floatingLabelText="Speed Bonus"   type="number" value={_gear.speedBonus}   name="speedBonus"   onChange={this.handleChange} />
        <br/>

        <SelectField className="bottomAlign" floatingLabelText="Item Slot" value={_gear.slot}  
          onChange={(e, i) => {
            let value = (i === 0) ? false : Gear.GearSlots[i-1];
            this.boundGearAC.updateKey( 'slot', value );
          }} >
          <MenuItem key={0} value={false} primaryText="" />
          { Gear.GearSlots.map( (cat, index) => (
            <MenuItem key={index+1} value={`${cat}`} primaryText={`${cat}`} />
          ))
          }

        </SelectField>
        <br/>
        <Toggle
          label="Rare"
          defaultToggled={_gear.rare}
          name="rare" 
          onToggle={() => { this.boundGearAC.updateKey( 'rare', !_gear.rare ); }}
          style={ {width: '250px'} }
        />
        <br/>
        <br/>
        <RaisedButton primary={true}
          label="Save Gear"
          onTouchTap={this.handleGearSave}
        />
        <Snackbar
          open={this.state.snackbarOpen}
          message={this.state.snackbarMsg}
          autoHideDuration={4000}            
        />
			</div>
		);

	}

}

export default AddGear;