import * as types from '../actions/action-types';
import {Variables} from '../lib/Variables';
import {WeaponTemplate} from '../lib/Weapons';
import {Die} from '../lib/Die';

const initialState = {
  availableWeapons: [],
  weapon: Variables.clone(WeaponTemplate)
};

const weaponsReducer = function(state = initialState, action) {
  let weapon = false;
  let availableWeapons = false;

  if(action === undefined){
    return state;
  }

  switch(action.type) {
    case types.LOAD_AVAILABLE_WEAPONS:
      return Object.assign({}, state, {
        availableWeapons: action.weapons
      });

    case types.EDIT_AVAILABLE_WEAPONS:
      availableWeapons = state.availableWeapons;
      if(action.weapon._id === undefined){
        availableWeapons.push(action.weapon);
      } else {
        let _i = availableWeapons.findIndex( (w) => { return w._id === action.weapon._id });
        availableWeapons[_i] = action.weapon;
      }

      return Object.assign({}, state, {
        availableWeapons: availableWeapons
      });

    case types.CHANGE_WEAPON:
      weapon = Variables.clone(WeaponTemplate);
      if(action.index === 0){
        weapon = Variables.clone(WeaponTemplate);
      } else {
        weapon = Variables.clone(state.availableWeapons[action.index-1]);
      }

      if(weapon.damage.die === undefined) {
        let damage = weapon.damage.split('d');
        weapon.damage = { die: `d${damage[1]}`, num: damage[0] };
      }

      return Object.assign({}, state, {
        weapon: weapon
      });
    
    case types.CHANGE_DIE_TYPE:
      weapon = Variables.clone(state.weapon);
      weapon.damage.die = Die.types[action.index].label;

      return Object.assign({}, state, {
        weapon: weapon
      });

    case types.CHANGE_DIE_NUMBER:
      weapon = Variables.clone(state.weapon);
      weapon.damage.num = action.quantity;

      return Object.assign({}, state, {
        weapon: weapon
      });


    case types.UPDATE_KEY:
      weapon = Variables.clone(state.weapon);
      weapon[ action.key ] = action.value;
      
      return Object.assign({}, state, {
        weapon: weapon
      });

    case types.UPDATE_RANGE:
      weapon = Variables.clone(state.weapon);
      weapon.range[ action.key ] = action.value;
      
      return Object.assign({}, state, {
        weapon: weapon
      });

  }

  return state;

}

export default weaponsReducer;