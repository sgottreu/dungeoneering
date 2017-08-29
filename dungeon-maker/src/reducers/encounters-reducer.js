import * as types from '../actions/action-types';
import SortByKey from '../lib/SortByKey';
import {Variables} from '../lib/Variables';

const initialState = {
  availableEncounters: [],
  encounter: {
    _id: false,
    name: '',
    _type: 'encounter',
    dungeons: []
  }
};

const encountersReducer = function(state = initialState, action) {
  let _state = false;

  if(action === undefined){
    return state;
  }

  switch(action.type) {
    case types.LOAD_AVAILABLE_ENCOUNTERS:
      action.encounters.sort(SortByKey('name'));

      return Object.assign({}, state, {
        availableEncounters: action.encounters
      });

    case types.UPDATE_ENCOUNTER:
      _state = Variables.clone(state);
      return Object.assign({}, state, {
        encounter: action.encounter
      });

    case types.UPDATE_ENCOUNTER_NAME:
      _state = Variables.clone(state);
      _state.encounter.name = action.name;

      return Object.assign({}, state, {
        encounter: _state.encounter
      });

    case types.UPDATE_ENCOUNTER_DUNGEONS:
      _state = Variables.clone(state);
      if(action.dungeon !== undefined){
        let _i = _state.encounter.dungeons.findIndex(function(m) { return m === action.dungeon});

        if(_i === -1) {
          _state.encounter.dungeons.push( action.dungeon );
        } else {
          _state.encounter.dungeons.splice(_i, 1);
        }
      } 

      return Object.assign({}, state, {
        encounter: _state.encounter
      });

    default:
      return state;    
  }

  

}

export default encountersReducer;