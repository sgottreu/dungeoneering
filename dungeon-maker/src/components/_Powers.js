import axios from 'axios';
import {Variables} from './Variables';

export var PowerTemplate = {
  name: '',
  type: false,
  _type: "power",
  action: false,
  recharge: false,
  class: false,
  reach: 1,
  attack: { for: false, against: 'armorClass', modifier: 0},
  against: '',
  damage: {
    modifier: 0,
    die: 'd6',
    num: 1
  },
  defense: false,
  weapon: false,
  weapon_modifier: 0,
  ability_modifier: false
};

class _Powers {};

_Powers.powerTemplate = PowerTemplate;

_Powers.powerType = [
  { name: 'Melee', class: 'melee', attack: {for: 'strength', against: 'armorClass', modifier: 0}, defense: {} },
  { name: 'Ranged', class: 'ranged', attack: {for: 'dexterity', against: 'armorClass', modifier: 0}, defense: {} },
  { name: 'Close', class: 'blast_affect', attack: {for: 'wisdom', against: 'armorClass', modifier: 0}, defense: {} },
  { name: 'Area', class: 'area_affect', attack: {for: 'charisma', against: 'armorClass', modifier: 0}, defense: {} },
];

_Powers.powerAction = [
  'Standard',
  'Move',
  'Minor',
  'Free'
];

_Powers.powerRecharge = [
  'At-Will',
  'Encounter',
  'Daily',
  'Recharge'
];
_Powers.findPowers = (_this) => {
  axios.get(`${Variables.host}/findPowers`)
  .then(res => {
    _this.state.existingPowers = res.data;
    _this.setState( _this.state );
  }); 
};
_Powers.savePower = (_this) => {
  axios.post(`${Variables.host}/savePower`, _this.state.power)
  .then(res => {
    _this.state.current_power = false;//Variables.clone(res.data._id);
    // _this.state.power = Variables.clone(PowerTemplate);
    _this.state.power._id = false;
    _this.setState( _this.state );
  }); 
};

_Powers.matchPower = (powers, id) => {
  let power = powers.find( function(val) { return val._id === id });
  return power;
};

export {_Powers};