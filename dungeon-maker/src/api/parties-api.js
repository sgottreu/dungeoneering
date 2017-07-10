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
  return axios.post(`${Variables.host}/saveParty`, party)
	  .then(res => {
	    store.dispatch(updateParty(party));
	  }); 
};

