import * as types from '../actions/action-types';
import SortByKey from '../lib/SortByKey';
import {Variables} from '../lib/Variables';

const initialState = {
  availableParties: [],
  party: { 
      _id: false,
      name: '',
      _type: 'party',
      members: []      
    }
};

const partiesReducer = function(state = initialState, action) {
  let _state = false;

  if(action === undefined){
    return state;
  }

  switch(action.type) {
    case types.LOAD_AVAILABLE_PARTIES:
      action.parties.sort(SortByKey('name'));

      return Object.assign({}, state, {
        availableParties: action.parties
      });

    case types.UPDATE_PARTY:
      return Object.assign({}, state, {
        party: action.party
      });

    case types.UPDATE_PARTY_MEMBER:
      _state = Variables.clone(state);
      if(action.member !== undefined){

        let _i = _state.party.members.findIndex(function(m) { return m === action.member});

        if(_i === -1) {
          _state.party.members.push( action.member );
        } else {
          _state.party.members.splice(_i, 1);
        }
      } 

      return Object.assign({}, state, {
        party: _state.party
      });

    default:
      return state;    
  }

  

}

export default partiesReducer;