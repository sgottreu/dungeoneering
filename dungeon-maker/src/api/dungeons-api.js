import axios from 'axios';
import {Variables} from '../lib/Variables';
import store from '../store';
import { loadDungeons, updateExistingDungeon, setDungeon, updateKey } from '../actions/dungeons-actions';

export var findDungeons = () => {
  return axios.get(`${Variables.host}/findDungeonGrids`)
  .then(res => {
    store.dispatch(loadDungeons(res.data));
  }); 
};
export var findDungeon = (selectedDungeon) => {
  if(!selectedDungeon){
    return false;
  }
  return axios.get(`${Variables.host}/findDungeonGrid?_id=${selectedDungeon}&`+Math.random())
  .then(res => {
    store.dispatch(setDungeon(res.data));
    store.dispatch(updateKey('selectedDungeon', res.data._id));
    return res.data;
  }); 
};
export var saveDungeon = (dungeon) => {
  return axios.post(`${Variables.host}/saveDungeonGrids`, dungeon)
  .then(res => {
    store.dispatch(updateExistingDungeon(res.data._id, res.data.title));
  }); 
};