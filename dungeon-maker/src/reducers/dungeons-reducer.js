import * as types from '../actions/action-types';
import {Variables} from '../lib/Variables';
import SortByKey from '../lib/SortByKey';
import Slots from '../lib/Slots.js';

const initialState = {
  availableDungeons: [],
  dungeon: {      
    slots: Variables.clone(Slots),
    title: '',
    _id: false
  },
  selectedTile: '',
  selectedDungeon: false,
  hoverObj: {
    obj: false,
    type: false
  },
  mouse: {
    clientX: false,
    clientY: false
  }
};

const dungeonsReducer = function(state = initialState, action) {
  let dungeons = false;
  let dungeon = false;

  if(action === undefined){
    return state;
  }

  switch(action.type) {
    case types.LOAD_DUNGEONS:
      action.dungeons.sort(SortByKey('title'));
      return Object.assign({}, state, {
        availableDungeons: action.dungeons
      });

    case types.UPDATE_EXISTING_DUNGEON:
      let fDG = state.availableDungeons;
      if(action.id){
        fDG.push({ _id: action.id, title: action.title });
      } else {
        let _i = fDG.findIndex( (grid, i) => { return grid._id === action.id });
        if(_i > -1){
          action.dungeons[_i].title = action.title; 
        }
      }      
      
      action.dungeons.sort(SortByKey('title'));
      return Object.assign({}, state, {
        availableDungeons: action.dungeons
      });

    default:
      return state;
  }
}

export default dungeonsReducer;