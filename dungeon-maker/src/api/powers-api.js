import axios from 'axios';
import {Variables} from '../lib/Variables';
import store from '../store';
import { loadExistingPowers, addToPowers, resetCurrentPower } from '../actions/powers-actions';

export var findPowers = () => {
  axios.get(`${Variables.host}/findPowers`)
  .then(res => {
    store.dispatch(loadExistingPowers(res.data));
  }); 
};
export var savePower = (power) => {
  axios.post(`${Variables.host}/savePower`, power)
  .then(res => {
    store.dispatch(addToPowers(power));
    store.dispatch(resetCurrentPower(power))
  }); 
};

