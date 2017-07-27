import axios from 'axios';
import {Variables} from '../lib/Variables';
import store from '../store';
import SortByKey from '../lib/SortByKey';

import { loadAvailableGear } from '../actions/gear-actions';

export var findGear = () => {
  return axios.get(`${Variables.host}/findGear`)
    .then(res => {
      let gear = res.data.sort(SortByKey('name'));
      store.dispatch(loadAvailableGear(gear));
    }); 
};

