import * as types from '../actions/action-types';
import SortByKey from '../lib/SortByKey';

const initialState = {
  availableGear: [],
  gear: {}
};

const gearReducer = function(state = initialState, action) {
  if(action === undefined){
    return state;
  }

  switch(action.type) {
    case types.LOAD_AVAILABLE_GEAR:
      action.gear.sort(SortByKey('name'));

      return Object.assign({}, state, {
        availableGear: action.gear
      });


    default:
      return state;    
  }

  

}

export default gearReducer;