import axios from 'axios';
import {Variables} from '../lib/Variables';
import store from '../store';
import { loadDungeons, updateExistingDungeon, setDungeon } from '../actions/weapons-actions';

export var findDungeons = () => {
  axios.get(`${Variables.host}/findDungeonGrids`)
  .then(res => {
    store.dispatch(loadDungeons(res.data));
  }); 
};
export var findDungeon = (selectedDungeon) => {
  if(!selectedDungeon){
    return false;
  }
  axios.get(`${Variables.host}/findDungeonGrid?_id=${selectedDungeon}`)
  .then(res => {
    store.dispatch(setDungeon(res.data));
    store.dispatch(updateKey(res.data._id));
  }); 
};
export var saveDungeon = (dungeon) => {
  axios.post(`${Variables.host}/saveDungeonGrids`, dungeon)
  .then(res => {
    store.dispatch(updateExistingDungeon(res.data._id, res.data.title));
  }); 
};