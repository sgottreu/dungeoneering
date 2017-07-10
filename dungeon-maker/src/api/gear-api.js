import axios from 'axios';
import {Variables} from '../lib/Variables';
import store from '../store';
import { loadAvailableGear } from '../actions/gear-actions';

export var findGear = () => {
  return axios.get(`${Variables.host}/findGear`)
    .then(res => {
      store.dispatch(loadAvailableGear(res.data));
    }); 
};
