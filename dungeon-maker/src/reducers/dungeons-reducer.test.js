var assert = require('chai').assert;

import * as types from '../actions/action-types';
import {Variables} from '../lib/Variables';
import Slots from '../lib/Slots.js';

import dungeonsReducer from './dungeons-reducer';

import { loadDungeons, updateExistingDungeon, setDungeon, updateKey, updateDungeonKey, updateMouseover, setSlotEntity, addTile, duplicateDungeon } from '../actions/dungeons-actions';

const state = {
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

const dungeons = [ 
                  {_id: 123, title: 'Shooting Gallery', slots: Variables.clone(Slots) }, 
                  {_id: 456, title: 'Forest Clearing', slots: Variables.clone(Slots) }
                ];

describe('dungeonsReducer', function() {
  describe('initilization', function() {
    it('dungeonsReducer:initilization |-| State returned if Action is not passed', function() {
      var _state = dungeonsReducer();
      assert.isArray(_state.availableDungeons); // with optional message
    });
    it('dungeonsReducer:initilization |-| availableWeapons should be empty', function() {
      var _state = dungeonsReducer();
      assert.lengthOf(_state.availableDungeons, 0, 'array has length of 0')
    });
  });

  describe('non-existant reducer', function() {
    it('dungeonsReducer:non-existant reducer |-| State returned if Action is not found', function() {
      var _state = dungeonsReducer(state, "NULL");
      assert.equal(_state.dungeon._id, false); // with optional message
    });
  });
});

describe('LOAD_DUNGEONS', function() {
  let action, _state;
  beforeEach(function() {
    action = loadDungeons( dungeons );
    _state = dungeonsReducer(Variables.clone(state), action);
  });

  it('powersReducer:LOAD_DUNGEONS |-| availableDungeons should be an array', function() {
    assert.isArray(_state.availableDungeons); // with optional message
  });
  it('powersReducer:LOAD_DUNGEONS |-| availableDungeons should have length of 2', function() {
    assert.lengthOf(_state.availableDungeons, 2, 'array has length of 2')
  });
  it('powersReducer:LOAD_DUNGEONS |-| Element[0]._id should equal 456', function() {
    assert.equal(456, _state.availableDungeons[0]._id); // with optional message
  });
});

describe('UPDATE_EXISTING_DUNGEON', function() {
  let action, _state;
  beforeEach(function() {
    action = loadDungeons( dungeons );
    _state = dungeonsReducer(Variables.clone(state), action);

    action = updateExistingDungeon( { _id: 456, title: 'Clearing' } );
    _state = dungeonsReducer(_state, action);
  });

  it('powersReducer:UPDATE_EXISTING_DUNGEON |-| Element[0].name should equal 456', function() {
    assert.equal('Clearing', _state.availableDungeons[0].name); // with optional message
  });
});