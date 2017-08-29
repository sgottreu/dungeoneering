import axios from 'axios';
import {Variables} from '../lib/Variables';
import store from '../store';
import { loadAvailableParties, updateParty } from '../actions/parties-actions';

export var findParties = () => {
  return axios.get(`${Variables.host}/findParties`)
	  .then(res => {
	    store.dispatch(loadAvailableParties(res.data));
	  }); 
};
export var saveParty = (party) => {
  return axios.post(`${Variables.host}/saveParty?`+Math.random(), party)
	  .then(res => {
			store.dispatch(updateParty(res.data));
			
			let _state = store.getState();
			let availableParties = _state.partiesState.availableParties;
			let _i = availableParties.findIndex(function(m) { return m._id === res.data._id});
			
			if(_i === -1) {
				availableParties.push( res.data );
			} else {
				availableParties[ _i ] = res.data;
			}
			store.dispatch(loadAvailableParties(availableParties));
	  }); 
};

