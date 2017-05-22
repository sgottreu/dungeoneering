import axios from 'axios';
import {Variables} from '../lib/Variables';
import store from '../store';
import { loadDungeons } from '../actions/weapons-actions';

export var findDungeons = () => {
  axios.get(`${Variables.host}/findDungeonGrids`)
  .then(res => {
    store.dispatch(loadDungeons(res.data));
  }); 
};
export var findDungeon = () => {
  axios.get(`${Variables.host}/findDungeonGrid?_id=${selectedDungeon}`)
  .then(res => {
    store.dispatch(loadAvailableWeapons(res.data));
  }); 
};
export var saveDungeon = (dungeon) => {
  axios.post(`${Variables.host}/saveDungeonGrids`, dungeon)
  .then(res => {
    //store.dispatch(editAvailableWeapons(res.data));
  }); 
};