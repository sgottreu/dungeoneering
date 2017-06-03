import axios from 'axios';
import {Variables} from '../lib/Variables';
import store from '../store';
import { loadCharacters, loadMonsters, updateEntityKey, updateKey } from '../actions/entities-actions';

export var findCharacters = () => {
  return axios.get(`${Variables.host}/findCharacters`)
  .then(res => {
    store.dispatch(loadCharacters(res.data));
  }); 
};
export var findMonsters = () => {
  return axios.get(`${Variables.host}/findMonsters`)
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
  return axios.post(`${Variables.host}/saveEntity`, entity)
  .then(res => {
    let key = (entity._type === 'monster') ? 'availableMonsters' : 'availableCharacters';
    store.dispatch(updateEntityKey("_id", res.data._id));
    store.dispatch(updateEntityKey("name", res.data.title));

    let state = store.getState();
    let entitiesState = state.entitiesState;
    let key2 = Variables.clone(entitiesState.selectedEntity);

    if(entitiesState[key][key2] === undefined){
      entitiesState[key].push(res.data);
    } else {
      entitiesState[key][key2] = res.data;
    }

    store.dispatch(updateKey(key, entitiesState[ key ] ));

  }); 
};