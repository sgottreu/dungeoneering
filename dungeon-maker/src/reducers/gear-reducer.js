import * as types from '../actions/action-types';
import SortByKey from '../lib/SortByKey';
import {Variables} from '../lib/Variables';

const initialState = {
  availableGear: [],
  gear: {
    _id: false,
    category: "",
    name: "",
    price: 0,
    weight: 0,
    quantity: 0,
    _type: "gear",
    slot: false,
    rare: false,
    level: false,
    enhanceBonus: 0,
    attackModifier: 0,
    damage: { die: '1d6', num: 0},
    abilityMod: 0, 
    armorBonus: 0,
    speedBonus: 0,
    "weapon": {
      "category": "",
      "type": "",
      "prof": false,
      "range": false,
      "hands": false
  }
}
};

const gearReducer = function(state = initialState, action) {
  if(action === undefined){
    return state;
  }
  var gear = false;

  switch(action.type) {
    case types.LOAD_AVAILABLE_GEAR:
      action.gear.sort(SortByKey('name'));

      return Object.assign({}, state, {
        availableGear: action.gear
      });

    case types.UPDATE_KEY:
      gear = Variables.clone(state.gear);
      gear[ action.key ] = action.value;
      
      return Object.assign({}, state, {
        gear: gear
      });

    case types.CHANGE_GEAR:
      gear = state.availableGear[ action.index - 1];

      if(gear === undefined){
        gear = initialState.gear;
      }

      return Object.assign({}, state, {
        gear: gear
      });

    case types.UPDATE_EXISTING_GEAR:
      let availableGear = state.availableGear;
      if(!action.gear.id){
        availableGear.push(action.gear);
      } else {
        let _i = availableGear.findIndex( (grid, i) => { return grid._id === action.id });
        if(_i > -1){
          availableGear[_i] = action.gear; 
        }
      }      
      
      availableGear.sort(SortByKey('name'));
      return Object.assign({}, state, {
        availableGear: availableGear
      });

    default:
      return state;    
  }

  

}

export default gearReducer;