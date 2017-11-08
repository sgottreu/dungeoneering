import * as types from '../actions/action-types';
import {Variables} from '../lib/Variables';
import SortByKey from '../lib/SortByKey';
import Slots from '../lib/Slots';
import TileOptions from '../lib/TileOptions';

const initialState = {
  availableDungeons: [],
  dungeon: {      
    slots: Variables.clone(Slots),
    title: '',
    _id: false
  },
  selectedTile: false,
  tileType: false,
  selectedEntity: false,
  selectedDungeon: false
};

const dungeonsReducer = function(state = initialState, action) {
  let dungeon = false;
  let slots = Variables.clone(state.dungeon.slots);
  let s;

  if(action === undefined){
    return state;
  }

  switch(action.type) {
    case types.LOAD_DUNGEONS:
      action.dungeons.sort(SortByKey('title'));
      return Object.assign({}, state, {
        availableDungeons: action.dungeons
      });

    case types.SET_DUNGEON:
      return Object.assign({}, state, {
        dungeon: action.dungeon
      });

    case types.UPDATE_EXISTING_DUNGEON:
      let _dungeons = state.availableDungeons;
      if(!action.id){
        _dungeons.push({ _id: action.id, title: action.title });
      } else {
        let _i = _dungeons.findIndex( (grid, i) => { return grid._id === action.id });
        if(_i > -1){
          _dungeons[_i].title = action.title; 
        }
      }      
      
      _dungeons.sort(SortByKey('title'));
      return Object.assign({}, state, {
        availableDungeons: _dungeons
      });

    case types.UPDATE_KEY:
      let _state = Variables.clone(state);
      _state[ action.key ] = action.value;
      
      if(action.value === undefined){
        return state;
      }

      return Object.assign({}, state, _state);

    case types.UPDATE_DUNGEON_KEY:
      dungeon = Variables.clone(state.dungeon);
      dungeon[ action.key ] = action.value;

      return Object.assign({}, state, {
        dungeon: dungeon
      });

    case types.SET_SLOT_ENTITY:
      s = action.slot - 1;

      if(slots[ s ].occupied === true && action.id){
        slots[ s ].overlays.entity = false;
        slots[ s ].occupied = false;
      } else {
        slots[ s ].overlays.entity = { _id: action.id, _type: action._type, uuid: action.uuid };
        slots[ s ].occupied = true;
      }

      dungeon = Variables.clone(state.dungeon);
      dungeon.slots = slots;

      return Object.assign({}, state, {
        dungeon: dungeon
      });

    case types.ADD_TILE:
      let tileType = TileOptions.find( function(val) { return val.id === state.selectedTile });
      s = action.slot - 1;

      if(tileType === undefined || tileType.overlay){
        return state;
      }

      slots[ s ].tileType = (slots[ s ].tileType === tileType.label) ? '' : tileType.label;
      slots[ s ].left = action.event.offsetLeft;
      slots[ s ].top = action.event.offsetTop;

      let props = ['entrance', 'exit', 'door', 'chest'];

      for(var x=0;x<props.length;x++){
        slots[ s ][ props[ x ] ] = false;
        if(tileType[ props[ x ] ]) {
          slots[ s ][ props[ x ] ] = true;
        }
      }

      dungeon = Variables.clone(state.dungeon);
      dungeon.slots = slots;

      return Object.assign({}, state, {
        dungeon: dungeon
      });

    default:
      return state;
  }
}

export default dungeonsReducer;