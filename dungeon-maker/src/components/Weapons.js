import axios from 'axios';
import {Variables} from './Variables';
import { HalfLevelModifier } from './EntityTemplate';
import {DieRoll} from './Die';

export var WeaponTemplate = {
	category: "",  
	type: "", 
	name: "", 
	prof: 2, 
	damage: { die: '1d6', num: 1},
	price: 5, 
	weight: 2, 
	range: { low: 10, high: 20 },
  hands: 1
};

export var saveWeapon = function(_this) {
	 axios.post(`${Variables.host}/saveWeapon`, _this.state.weapon)
  .then(res => {
    let _id = _this.state.weapon._id;
    let state = _this.state;
    state.snackbarOpen = true;
    state.snackbarMsg = _this.state.weapon.name+' successfully saved';
    state.weapon = Variables.clone(WeaponTemplate);
    state.availableWeapons[_id] = res.data;
    _this.setState(state);
  });
}

export var findWeapons = (_this) => {
	axios.get(`${Variables.host}/findWeapons`)
  .then(res => {
    let state = _this.state;
    state.availableWeapons = res.data;
    _this.setState( state );
  }).catch(function(err){ 

  });  
};

export var calcWeaponDamage = (player, AttackModifier) => {
	let half = HalfLevelModifier(player.level, player._type);
	let damageMod = half + AttackModifier;

	return damageMod;
}