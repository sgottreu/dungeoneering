import * as types from '../actions/action-types';
import {Variables} from '../lib/Variables';
import {PowerTemplate} from '../components/_Powers';
import {Die} from '../lib/Die';

const initialState = {
  existingPowers: [],
  current_power: false,
  power: Variables.clone(PowerTemplate)
};

const powersReducer = function(state = initialState, action) {
  let power = false;
  let powers = false;
  let current_power = false;

  switch(action.type) {
    case types.LOAD_EXISTING_POWERS:
      return Object.assign({}, state, {
        existingPowers: action.powers
      });

    case types.CHANGE_CURRENT_POWER:
      power = Variables.clone(PowerTemplate);
      if(action.index === 0){
        power = Variables.clone(PowerTemplate);
        current_power = false;
      } else {
        power = state.existingPowers[action.index-1];
        current_power = action.index;
      }

      return Object.assign({}, state, {
        current_power: current_power,
        power: power
      });

    case types.ADD_TO_POWERS:
      powers = state.existingPowers;
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
      power = state.power;
      power._id = false;

      return Object.assign({}, state, {
        current_power: false,
        power: power
      });
    
    case types.CHANGE_DIE_TYPE:
      power = state.power;
      power.damage.die = Die[action.index].label;

      return Object.assign({}, state, {
        power: power
      });

    case types.CHANGE_DIE_NUMBER:
      power = state.power;
      power.damage.num = action.quantity;

      return Object.assign({}, state, {
        power: power
      });

    case types.CHANGE_DIE_MODIFIER:
      power = state.power;
      power.damage.modifier = action.modifier;
      
      return Object.assign({}, state, {
        power: power
      });

    case types.UPDATE_KEY:
      power = state.power;
      power[ action.key ] = action.value;
      
      return Object.assign({}, state, {
        power: power
      });

    case types.UPDATE_ATTACK:
      power = state.power;
      power.attack[ action.key ] = action.value;
      
      return Object.assign({}, state, {
        power: power
      });
  }

  return state;

}

export default powersReducer;