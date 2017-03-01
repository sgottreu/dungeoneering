import axios from 'axios';
import {Variables} from './Variables';

export var Weapons = [
	{ category: "Simple",  type: "melee", name: "Club", range: { low: 0, high: 0 } },
	{ category: "Simple",  type: "melee", name: "Dagger", range: { low: 0, high: 0 } },
	{ category: "Simple",  type: "melee", name: "Javelin", prof: 2, damage: '1d6', price: 5, weight: 2, range: { low: 10, high: 20 } },
	{ category: "Simple",  type: "melee", name: "Mace", range: { low: 0, high: 0 } },
	{ category: "Simple",  type: "melee", name: "Sickle", range: { low: 0, high: 0 } },
	{ category: "Simple",  type: "melee", name: "Spear", prof: 2, damage: '1d8', price: 5, weight: 6, range: false},
	{ category: "Simple",  type: "melee", name: "Greatclub", range: { low: 0, high: 0 } },
	{ category: "Simple",  type: "melee", name: "Morningstar", range: { low: 0, high: 0 } },
	{ category: "Simple",  type: "melee", name: "Quarterstaff", range: { low: 0, high: 0 } },
	{ category: "Simple",  type: "melee", name: "Scythe", range: { low: 0, high: 0 } },
	{ category: "Military",  type: "melee", name: "Battleaxe", prof: 2, damage: '1d10', price: 15, weight: 6, range: false },
	{ category: "Military",  type: "melee", name: "Flail", range: { low: 0, high: 0 } },
	{ category: "Military",  type: "melee", name: "Handaxe", range: { low: 0, high: 0 } },
	{ category: "Military",  type: "melee", name: "Longsword", range: { low: 0, high: 0 } },
	{ category: "Military",  type: "melee", name: "Scimitar", range: { low: 0, high: 0 } },
	{ category: "Military",  type: "melee", name: "Short sword", prof: 3, damage: '1d6', price: 10, weight: 2, range: false},
	{ category: "Military",  type: "melee", name: "Throwing hammer", range: { low: 0, high: 0 } },
	{ category: "Military",  type: "melee", name: "Warhammer", range: { low: 0, high: 0 } },
	{ category: "Military",  type: "melee", name: "War pick", range: { low: 0, high: 0 } },
	{ category: "Military",  type: "melee", name: "Falchion", range: { low: 0, high: 0 } },
	{ category: "Military",  type: "melee", name: "Glaive", range: { low: 0, high: 0 } },
	{ category: "Military",  type: "melee", name: "Greataxe", range: { low: 0, high: 0 } },
	{ category: "Military",  type: "melee", name: "Greatsword", range: { low: 0, high: 0 } },
	{ category: "Military",  type: "melee", name: "Halberd", range: { low: 0, high: 0 } },
	{ category: "Military",  type: "melee", name: "Heavy flail", range: { low: 0, high: 0 } },
	{ category: "Military",  type: "melee", name: "Longspear", range: { low: 0, high: 0 } },
	{ category: "Military",  type: "melee", name: "Maul", range: { low: 0, high: 0 } },
	{ category: "Superior",  type: "melee", name: "Bastard sword", range: { low: 0, high: 0 } },
	{ category: "Superior",  type: "melee", name: "Katar", range: { low: 0, high: 0 } },
	{ category: "Superior",  type: "melee", name: "Rapier", range: { low: 0, high: 0 } },
	{ category: "Superior",  type: "melee", name: "Spiked chain", range: { low: 0, high: 0 } },
	{ category: "Simple",  type: "ranged", name: "Hand crossbow", range: { low: 0, high: 0 } },
	{ category: "Simple",  type: "ranged", name: "Sling", range: { low: 0, high: 0 } },
	{ category: "Simple",  type: "ranged", name: "Crossbow", range: { low: 0, high: 0 } },
	{ category: "Military",  type: "ranged", name: "Longbow", range: { low: 0, high: 0 } },
	{ category: "Military",  type: "ranged", name: "Shortbow", prof: 2, damage: '1d8', price: 25, weight: 2, range: { low: 15, high: 30 } },
	{ category: "Superior",  type: "ranged", name: "Shuriken", range: { low: 0, high: 0 } }
];

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