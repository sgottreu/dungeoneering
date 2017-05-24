import * as types from '../actions/action-types';
import {Variables} from '../lib/Variables';
import SortByKey from '../lib/SortByKey';
import Slots from '../lib/Slots';
import TileOptions from '../lib/TileOptions';
import { EntityTemplate, AbilityModifier, AttackModifier, EntityRole, EntitySize, EntityRace, EntityClass, 
  EntityShield, calcWeightPrice,
  getInitialHitPoints, EntityArmor, calculateArmorClass, calculateDefense, saveEntity, EntityIcons, 
  findEntity, calculateInitiative} from '../components/EntityTemplate';

const initialState = {
  availableCharacters: [],
  availableMonsters: [],
  totalRacePoints: 0,
  remainingPoints: 0,
  usedPoints: 0,
  selectedEntity: false,
  entity: Variables.clone(EntityTemplate),
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
      let _state = Variables.clone(state);
      _state[ action.key ] = action.value;
      
      if(action.value === undefined){
        return state;
      }

      return Object.assign({}, state, _state);
      
    // case types.UPDATE_MOUSEOVER:
    //   return Object.assign({}, state, {
    //     hoverObj: {
    //       obj: action.entity,
    //       type: action.entityType
    //     },
    //     mouse: {
    //       clientX: action.mouse.clientX,
    //       clientY: action.mouse.clientY
    //     }
    //   });


    default:
      return state;
  }
}

export default entitiesReducer;