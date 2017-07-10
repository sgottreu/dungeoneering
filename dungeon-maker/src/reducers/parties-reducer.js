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
  let party = false;
  let availableParties = false;

  if(action === undefined){
    return state;
  }

  switch(action.type) {
    case types.LOAD_AVAILABLE_PARTIES:
      action.parties.sort(SortByKey('name'));

      return Object.assign({}, state, {
        availableParties: action.parties
      });

// export const UPDATE_PARTY = 'UPDATE_PARTY';
// export const UPDATE_PARTY_MEMBER = 'UPDATE_PARTY_MEMBER';

    case types.UPDATE_PARTY:
      return Object.assign({}, state, {
        party: action.party
      });

    // case types.CHANGE_WEAPON:
    //   party = Variables.clone(WeaponTemplate);
    //   if(action.index === 0){
    //     party = Variables.clone(WeaponTemplate);
    //   } else {
    //     party = Variables.clone(state.availableParties[action.index-1]);
    //   }

    //   if(party.damage.die === undefined) {
    //     let damage = party.damage.split('d');
    //     party.damage = { die: `d${damage[1]}`, num: damage[0] };
    //   }

    //   return Object.assign({}, state, {
    //     party: party
    //   });
    
    // case types.CHANGE_DIE_TYPE:
    //   party = Variables.clone(state.party);
    //   party.damage.die = Die.types[action.index].label;

    //   return Object.assign({}, state, {
    //     party: party
    //   });

    // case types.CHANGE_DIE_NUMBER:
    //   party = Variables.clone(state.party);
    //   party.damage.num = action.quantity;

    //   return Object.assign({}, state, {
    //     party: party
    //   });


    // case types.UPDATE_KEY:
    //   party = Variables.clone(state.party);
    //   party[ action.key ] = action.value;
      
    //   return Object.assign({}, state, {
    //     party: party
    //   });

    // case types.UPDATE_RANGE:
    //   party = Variables.clone(state.party);
    //   party.range[ action.key ] = action.value;
      
    //   return Object.assign({}, state, {
    //     party: party
    //   });

    default:
      return state;    
  }

  

}

export default partiesReducer;