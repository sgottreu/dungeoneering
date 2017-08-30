import * as types from '../actions/action-types';
import {Variables} from '../lib/Variables';
import {Powers} from '../lib/Powers';
import {Die} from '../lib/Die';

const initialState = {
  existingPowers: [],
  current_power: false,
  power: Variables.clone(Powers.Template)
};

const powersReducer = function(state = initialState, action) {
  let power = false;
  let powers = false;
  let current_power = false;
  let _i;

  if(action === undefined){
    return state;
  }

  switch(action.type) {
    case types.LOAD_EXISTING_POWERS:
      return Object.assign({}, state, {
        existingPowers: action.powers
      });

    case types.CHANGE_CURRENT_POWER:
      if(action.id === 0){
        power = Variables.clone(Powers.Template);
        current_power = false;
      } else {
        _i = state.existingPowers.findIndex( _power => { return _power._id === action.id });
        power = Variables.clone(state.existingPowers[_i]);
        current_power = action.id;
      }

      return Object.assign({}, state, {
        current_power: current_power,
        power: power
      });

    case types.ADD_TO_POWERS:
      powers = Variables.clone(state.existingPowers);
      if(action.power._id !== undefined && action.power._id !== false){
        let _i = powers.findIndex(function(p) { return p._id === action.power._id});
        powers[_i] = action.power;
      } else {
        powers.push(action.power);
      }

      return Object.assign({}, state, {
        existingPowers: powers
      });

    case types.RESET_CURRENT_POWER:
      power = Variables.clone(action.power);
      power._id = false;

      return Object.assign({}, state, {
        current_power: false,
        power: power
      });
    
    case types.CHANGE_DIE_TYPE:
      power = Variables.clone(state.power);
      power.damage.die = Die.types[action.index].label;

      return Object.assign({}, state, {
        power: power
      });

    case types.CHANGE_DIE_NUMBER:
      power = Variables.clone(state.power);
      power.damage.num = action.quantity;

      return Object.assign({}, state, {
        power: power
      });

    case types.CHANGE_DIE_MODIFIER:
      power = Variables.clone(state.power);
      power.damage.modifier = action.modifier;
      
      return Object.assign({}, state, {
        power: power
      });

    case types.UPDATE_KEY:
      power = Variables.clone(state.power);
      power[ action.key ] = action.value;
      
      return Object.assign({}, state, {
        power: power
      });

    case types.UPDATE_ATTACK:
      power = Variables.clone(state.power);
      power.attack[ action.key ] = action.value;
      
      return Object.assign({}, state, {
        power: power
      });
    default:
      return state;
  }
}

export default powersReducer;