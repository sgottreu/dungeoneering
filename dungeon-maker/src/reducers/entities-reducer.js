import * as types from '../actions/action-types';
import {Variables} from '../lib/Variables';
import SortByKey from '../lib/SortByKey';
import Slots from '../lib/Slots';
import TileOptions from '../lib/TileOptions';
import * as Entity from '../lib/Entity';

const initialState = {
  availableCharacters: [],
  availableMonsters: [],
  entity: Variables.clone(Entity.Template),
  points: {
    totalRacePoints: 0,
    usedPoints: 0,
    remainingPoints: 0
  },
  selectedEntity: false,
  hoverObj: {
    obj: false,
    type: false
  },
  mouse: {
    clientX: false,
    clientY: false
  }
};

const entitiesReducer = function(state = initialState, action) {
  let _state = Variables.clone(state);

  if(action === undefined){
    return state;
  }

  switch(action.type) {
    case types.LOAD_CHARACTERS:
      action.entities.sort(SortByKey('name'));
      return Object.assign({}, state, {
        availableCharacters: action.entities
      });

    case types.LOAD_MONSTERS:
      action.entities.sort(SortByKey('name'));
      return Object.assign({}, state, {
        availableMonsters: action.entities
      });

    case types.UPDATE_KEY:
      _state[ action.key ] = action.value;
      
      if(action.value === undefined){
        return state;
      }

      return Object.assign({}, state, _state);
    
    case types.UPDATE_ENTITY_KEY:
       _state.entity = Variables.addField( _state.entity, action.key, action.value );

      if(action.value === undefined){
        return state;
      }

      return Object.assign({}, state, _state);

    case types.UPDATE_POINTS_KEY:
       _state.points = Variables.addField( _state.points, action.key, action.value );

      if(action.value === undefined){
        return state;
      }

      return Object.assign({}, state, _state);

    case types.UPDATE_MOUSEOVER:
      return Object.assign({}, state, {
        hoverObj: {
          obj: action.entity,
          type: action.entityType
        },
        mouse: {
          clientX: action.mouse.clientX,
          clientY: action.mouse.clientY
        }
      });

    case types.UPDATE_ENTITY_WEAPON:
      if( _state.entity.weapons.includes(action.id) ){
        let _i = _state.entity.weapons.findIndex(function(w) { return w === action.id});
        _state.entity.weapons.splice(_i, 1);
      } else {
        _state.entity.weapons.push(action.id);  
      }
      return Object.assign({}, state, _state);

    default:
      return state;
  }
}

export default entitiesReducer;