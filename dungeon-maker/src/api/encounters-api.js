import axios from 'axios';
import {Variables} from '../lib/Variables';
import store from '../store';
import { loadAvailableEncounters } from '../actions/encounters-actions';

export var findEncounters = () => {
  return axios.get(`${Variables.host}/findEncounters`)
	  .then(res => {
	    store.dispatch(loadAvailableEncounters(res.data));
	  }); 
};
export var saveEncounter = (party) => {
  return axios.post(`${Variables.host}/saveEncounter?`+Math.random(), party)
	  .then(res => {
			let _state = store.getState();
			let availableEncounters = _state.encountersState.availableEncounters;
			let _i = availableEncounters.findIndex(function(m) { return m._id === res.data._id});
			
			if(_i === -1) {
				availableEncounters.push( res.data );
			} else {
				availableEncounters[ _i ] = res.data;
			}
			store.dispatch(loadAvailableEncounters(availableEncounters));
	  }); 
};

