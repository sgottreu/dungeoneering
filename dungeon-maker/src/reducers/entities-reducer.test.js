var assert = require('chai').assert;

import * as types from '../actions/action-types';
import {Variables} from '../lib/Variables';
import Slots from '../lib/Slots.js';
import TileOptions from '../lib/TileOptions';

import entitiesReducer from './entities-reducer';

import { loadCharacters, loadMonsters } from '../actions/entities-actions';

import { EntityTemplate, AbilityModifier, AttackModifier, EntityRole, EntitySize, EntityRace, EntityClass, 
  EntityShield, calcWeightPrice,
  getInitialHitPoints, EntityArmor, calculateArmorClass, calculateDefense, saveEntity, EntityIcons, 
  findEntity, calculateInitiative} from '../components/EntityTemplate';

const state = {
  availableCharacters: [],
  availableMonsters: [],
  entity: Variables.clone(EntityTemplate)
};

const availableCharacters = [ {_id: 123, name: 'Steelhorn'}, {_id: 456, name: 'Jarim'} ];
const availableMonsters = [ {_id: 123, name: 'Wolf'}, {_id: 456, name: 'Goblin'} ];

describe('entitiesReducer', function() {
  describe('initilization', function() {
    it('entitiesReducer:initilization |-| State returned if Action is not passed', function() {
      var _state = entitiesReducer();
      assert.isArray(_state.availableCharacters); // with optional message
    });
    it('entitiesReducer:initilization |-| availableWeapons should be empty', function() {
      var _state = entitiesReducer();
      assert.lengthOf(_state.availableCharacters, 0, 'array has length of 0')
    });
  });

  describe('non-existant reducer', function() {
    it('entitiesReducer:non-existant reducer |-| State returned if Action is not found', function() {
      var _state = entitiesReducer(state, "NULL");
      assert.equal(_state.entity.name, ''); // with optional message
    });
  });
});

describe('LOAD_CHARACTERS', function() {
  let action, _state;
  beforeEach(function() {
    action = loadCharacters( availableCharacters );
    _state = entitiesReducer(Variables.clone(state), action);
  });

  it('powersReducer:LOAD_CHARACTERS |-| availableCharacters should be an array', function() {
    assert.isArray(_state.availableCharacters); // with optional message
  });
  it('powersReducer:LOAD_CHARACTERS |-| availableCharacters should have length of 2', function() {
    assert.lengthOf(_state.availableCharacters, 2, 'array has length of 2')
  });
  it('powersReducer:LOAD_CHARACTERS |-| Element[0]._id should equal 456', function() {
    assert.equal(456, _state.availableCharacters[0]._id); // with optional message
  });
});

describe('LOAD_MONSTERS', function() {
  let action, _state;
  beforeEach(function() {
    action = loadMonsters( availableMonsters );
    _state = entitiesReducer(Variables.clone(state), action);
  });

  it('powersReducer:LOAD_MONSTERS |-| availableMonsters should be an array', function() {
    assert.isArray(_state.availableMonsters); // with optional message
  });
  it('powersReducer:LOAD_MONSTERS |-| availableMonsters should have length of 2', function() {
    assert.lengthOf(_state.availableMonsters, 2, 'array has length of 2')
  });
  it('powersReducer:LOAD_MONSTERS |-| Element[0]._id should equal 456', function() {
    assert.equal(456, _state.availableMonsters[0]._id); // with optional message
  });
});

// describe('UPDATE_MOUSEOVER', function() {
//   let action, _state, entity, entityType, event;
//   beforeEach(function() {
//     let entity = { _id: 123, name: 'Goblin' };
//     let event = { clientX: 10, clientY: 20 };
//     action = updateMouseover( entity, 'entity', event);
//     _state = entitiesReducer(Variables.clone(state), action);
//   });

//   it('powersReducer:UPDATE_MOUSEOVER |-| mouse.clientX should equal `10`', function() {
//     assert.equal(_state.mouse.clientX, 10); // with optional message
//   });
//   it('powersReducer:UPDATE_MOUSEOVER |-| entity should be object', function() {
//     assert.isObject(_state.hoverObj.obj); // with optional message
//   });
//   it('powersReducer:UPDATE_MOUSEOVER |-| entity.name should equal `Goblin`', function() {
//     assert.equal(_state.hoverObj.obj.name, 'Goblin'); // with optional message
//   });
//   it('powersReducer:UPDATE_MOUSEOVER |-| entityType should equal `entity`', function() {
//     assert.equal(_state.hoverObj.type, 'entity'); // with optional message
//   });
// });

// describe('UPDATE_KEY', function() {
//   let action, _state;
//   beforeEach(function() {
//     action = updateKey( 'selectedTile', 'gravel');
//     _state = entitiesReducer(Variables.clone(state), action);
//   });

//   it('powersReducer:UPDATE_KEY |-| selectedTile should equal `gravel`', function() {
//     assert.equal(_state.selectedTile, 'gravel'); // with optional message
//   });
//   it('powersReducer:UPDATE_KEY |-| selectedTile is remains the same', function() {
//     action = updateKey( 'selectedTile', undefined);
//     _state = entitiesReducer(_state, action);
//     assert.equal(_state.selectedTile, 'gravel'); // with optional message
//   });
// });
