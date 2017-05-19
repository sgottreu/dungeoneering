import axios from 'axios';
import {Variables} from '../lib/Variables';
import store from '../store';
import { loadAvailableWeapons, editAvailableWeapons } from '../actions/weapons-actions';

export var findWeapons = () => {
  axios.get(`${Variables.host}/findWeapons`)
  .then(res => {
    store.dispatch(loadAvailableWeapons(res.data));
  }); 
};
export var saveWeapon = (weapon) => {
  axios.post(`${Variables.host}/saveWeapon`, weapon)
  .then(res => {
    store.dispatch(editAvailableWeapons(res.data));
  }); 
};