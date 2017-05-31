import axios from 'axios';
import {Variables} from '../lib/Variables';
import store from '../store';
import { loadCharacters, loadMonsters, updateEntityKey } from '../actions/entities-actions';

export var findCharacters = () => {
  axios.get(`${Variables.host}/findCharacters`)
  .then(res => {
    store.dispatch(loadCharacters(res.data));
  }); 
};
export var findMonsters = () => {
  axios.get(`${Variables.host}/findMonsters`)
  .then(res => {
    store.dispatch(loadMonsters(res.data));
  }); 
};

// export var findEntity = (selectedEntity) => {
//   if(!selectedEntity){
//     return false;
//   }
//   axios.get(`${Variables.host}/findEntity?_id=${selectedEntity}`)
//   .then(res => {
//     store.dispatch(setEntity(res.data));
//     store.dispatch(updateKey('selectedEntity', res.data._id));
//   }); 
// };

export var saveEntity = (entity) => {
  axios.post(`${Variables.host}/saveEntity`, entity)
  .then(res => {
    store.dispatch(updateEntityKey("_id", res.data._id));
    store.dispatch(updateEntityKey("name", res.data.title));
  }); 
};