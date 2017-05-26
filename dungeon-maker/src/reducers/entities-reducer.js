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
  let _entity, _i, item;

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
      _entity = _state.entity;
      item = state.availableWeapons.find(function(val){ return action.id === val._id});

      if( _entity.weapons.includes(action.id) ){
        _i = _entity.weapons.findIndex(function(w) { return w === action.id});
        if(_entity._type === 'character'){
          _entity.encumbered = Entity.updateEncumbrance(_entity.encumbered, _entity.coin_purse, item, 'remove') 
          _entity.coin_purse = Entity.updateCoinPurse(_entity.coin_purse, item, 'remove') 
        }
        _entity.inventory = Entity.removeInventoryItem(item, 'weapon', _entity.inventory)     
        if(_entity.inventory.length > 0){
          _entity.inventory.forEach((inv, i) => { 
            if(inv.item._id === item._id){
              _entity.weapons.splice(_i, 1);
            }
          });        
        }
      } else {

        if(_entity._type === 'character'){
          _entity.encumbered = Entity.updateEncumbrance(_entity.encumbered, _entity.coin_purse, item, 'add') 
          _entity.coin_purse = Entity.updateCoinPurse(_entity.coin_purse, item, 'add') 
        }
        _entity.inventory = Entity.addInventory(item, 'weapon', _entity.inventory)
        _entity.inventory_log = Entity.addInventoryLog(item, 'weapon', _entity.inventory_log)

        _entity.weapons.push(action.id);  
      }
      return Object.assign({}, state, { entity: _entity } );

    case types.UPDATE_ENTITY_ARMOR:
      _entity = _state.entity;
      item = Entity._Armor[action.index]

      // Remove Old Armor
      _i = _entity.inventory_log.findIndex((it, index) => { return it.category === 'armor'} );
      if(_i !== -1){   
        let log = _entity.inventory_log[_i] ;
        if(_entity._type === 'character'){
          _entity.encumbered = Entity.updateEncumbrance(_entity.encumbered, _entity.coin_purse, log.item, 'remove') 
          _entity.coin_purse = Entity.updateCoinPurse(_entity.coin_purse, log.item, 'remove') 
        }
        _entity.inventory = Entity.removeInventoryCategory('armor', _entity.inventory)
        _entity.inventory_log = Entity.removeInventoryLog(log.item, 'armor', _entity.inventory_log) 
      }

      // Add New Armor
      if(_entity._type === 'character'){
        _entity.encumbered = Entity.updateEncumbrance(_entity.encumbered, _entity.coin_purse, item, 'add') 
        _entity.coin_purse = Entity.updateCoinPurse(_entity.coin_purse, item, 'add') 
      }
      _entity.inventory = Entity.addInventory(item, 'armor', _entity.inventory)
      _entity.inventory_log = Entity.addInventoryLog(item, 'armor', _entity.inventory_log)

      // Update Armor
      _entity.armor = action.index;

      // Update Armor Class
      _entity.defense.armorClass = Entity.calculateArmorClass(_entity);
      _state.entity = _entity;

      return Object.assign( {}, state, _state );

    case types.UPDATE_ENTITY_SHIELD:
      _entity = _state.entity;

      _i = Entity._Shield.findIndex((shd, s) => { return shd.score === action.score});
      item = Entity._Shield[_i];

      // Remove Old Shield
      _i = _entity.inventory_log.findIndex((it, index) => { return it.category === 'shield'} );
      if(_i !== -1){   
        let log = _entity.inventory_log[_i] ;
        if(_entity._type === 'character'){
          _entity.encumbered = Entity.updateEncumbrance(_entity.encumbered, _entity.coin_purse, log.item, 'remove') 
          _entity.coin_purse = Entity.updateCoinPurse(_entity.coin_purse, log.item, 'remove') 
        }
        _entity.inventory = Entity.removeInventoryCategory('shield', _entity.inventory)
        _entity.inventory_log = Entity.removeInventoryLog(log.item, 'shield', _entity.inventory_log) 
      }

      // Add New Shield
      if(_entity._type === 'character'){
        _entity.encumbered = Entity.updateEncumbrance(_entity.encumbered, _entity.coin_purse, item, 'add') 
        _entity.coin_purse = Entity.updateCoinPurse(_entity.coin_purse, item, 'add') 
      }
      _entity.inventory = Entity.addInventory(item, 'shield', _entity.inventory)
      _entity.inventory_log = Entity.addInventoryLog(item, 'shield', _entity.inventory_log)

      // Update Armor
      _entity.shield = action.score;

      // Update Armor Class
      _entity.defense.armorClass.shield = (!action.score) ? 0 : action.score;

      _entity.defense.armorClass = Entity.calculateArmorClass(_entity);
      _state.entity = _entity;

      return Object.assign( {}, state, _state );

    case types.UPDATE_ENTITY_DEFENSE:
      _entity = _state.entity;

      _entity.defense[ action.defense ] = Entity.calculateDefense(_entity, action.defense, action.value);

      _state.entity = _entity;

      return Object.assign( {}, state, _state );

    default:
      return state;
  }
}

export default entitiesReducer;