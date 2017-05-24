var assert = require('chai').assert;

import * as types from '../actions/action-types';
import {Variables} from '../lib/Variables';
import Slots from '../lib/Slots.js';
import TileOptions from '../lib/TileOptions';

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

describe('SET_DUNGEON', function() {
  let action, _state;
  beforeEach(function() {
    let dungeon = {_id: 456, title: 'Forest Clearing', slots: Variables.clone(Slots) };
    action = setDungeon( dungeon );
    _state = dungeonsReducer(Variables.clone(state), action);
  });

  it('powersReducer:LOAD_DUNGEONS |-| dungeon should be an object', function() {
    assert.isObject(_state.dungeon); // with optional message
  });

  it('powersReducer:LOAD_DUNGEONS |-| dungeon.title should equal `Forest Clearing`', function() {
    assert.equal('Forest Clearing', _state.dungeon.title); // with optional message
  });
});

describe('UPDATE_EXISTING_DUNGEON', function() {
  let action, _state;
  beforeEach(function() {
    action = loadDungeons( dungeons );
    _state = dungeonsReducer(Variables.clone(state), action);

    action = updateExistingDungeon(456, 'Clearing' );
    _state = dungeonsReducer(_state, action);
  });

  it('powersReducer:UPDATE_EXISTING_DUNGEON |-| Element[0].title should equal `Clearing`', function() {
    assert.equal('Clearing', _state.availableDungeons[0].title); // with optional message
  });
  it('powersReducer:UPDATE_EXISTING_DUNGEON |-| Element[0].title should equal `Pitfall`', function() {
    action = updateExistingDungeon(false, 'Pitfall' );
    _state = dungeonsReducer(_state, action);
    assert.equal('Pitfall', _state.availableDungeons[1].title); // with optional message
  });
});

describe('UPDATE_MOUSEOVER', function() {
  let action, _state, entity, entityType, event;
  beforeEach(function() {
    let entity = { _id: 123, name: 'Goblin' };
    let event = { clientX: 10, clientY: 20 };
    action = updateMouseover( entity, 'entity', event);
    _state = dungeonsReducer(Variables.clone(state), action);
  });

  it('powersReducer:UPDATE_MOUSEOVER |-| mouse.clientX should equal `10`', function() {
    assert.equal(_state.mouse.clientX, 10); // with optional message
  });
  it('powersReducer:UPDATE_MOUSEOVER |-| entity should be object', function() {
    assert.isObject(_state.hoverObj.obj); // with optional message
  });
  it('powersReducer:UPDATE_MOUSEOVER |-| entity.name should equal `Goblin`', function() {
    assert.equal(_state.hoverObj.obj.name, 'Goblin'); // with optional message
  });
  it('powersReducer:UPDATE_MOUSEOVER |-| entityType should equal `entity`', function() {
    assert.equal(_state.hoverObj.type, 'entity'); // with optional message
  });
});

describe('UPDATE_KEY', function() {
  let action, _state;
  beforeEach(function() {
    action = updateKey( 'selectedTile', 'gravel');
    _state = dungeonsReducer(Variables.clone(state), action);
  });

  it('powersReducer:UPDATE_KEY |-| selectedTile should equal `gravel`', function() {
    assert.equal(_state.selectedTile, 'gravel'); // with optional message
  });
  it('powersReducer:UPDATE_KEY |-| selectedTile is remains the same', function() {
    action = updateKey( 'selectedTile', undefined);
    _state = dungeonsReducer(_state, action);
    assert.equal(_state.selectedTile, 'gravel'); // with optional message
  });
});

describe('UPDATE_DUNGEON_KEY', function() {
  let action, _state;
  beforeEach(function() {
    action = updateDungeonKey( 'title', 'Forest Clearing');
    _state = dungeonsReducer(Variables.clone(state), action);
  });

  it('powersReducer:UPDATE_DUNGEON_KEY |-| dungeon.title should equal `Forest Clearing`', function() {
    assert.equal(_state.dungeon.title, 'Forest Clearing'); // with optional message
  });
});

describe('SET_SLOT_ENTITY', function() {
  describe('setting entity', function() {
    let action, _state;
    beforeEach(function() {
      action = setSlotEntity( 1234, 5);
      _state = dungeonsReducer(Variables.clone(state), action);
    });

    it('powersReducer:SET_SLOT_ENTITY |-| occupied should equal true', function() {
      assert.equal(_state.dungeon.slots[ 5 - 1 ].occupied, true); // with optional message
    });
    it('powersReducer:SET_SLOT_ENTITY |-| overlays.entity should equal 1234', function() {
      assert.equal(_state.dungeon.slots[ 5 - 1 ].overlays.entity, 1234); // with optional message
    });
  });

  describe('resetting entity', function() {
    let action, _state;
    beforeEach(function() {
      action = setSlotEntity( 1234, 5);
      _state = dungeonsReducer(Variables.clone(state), action);
      action = setSlotEntity( false, 5);
      _state = dungeonsReducer(_state, action);
    });

    it('powersReducer:SET_SLOT_ENTITY |-| occupied should equal false', function() {
      assert.equal(_state.dungeon.slots[ 5 - 1 ].occupied, false); // with optional message
    });
    it('powersReducer:SET_SLOT_ENTITY |-| overlays.entity should equal 1234', function() {
      assert.equal(_state.dungeon.slots[ 5 - 1 ].overlays.entity, false); // with optional message
    });
  });

});

describe('ADD_TILE', function() {
  describe('adding valid tile', function() {
    let action, _state;
    beforeEach(function() {
      action = updateKey( 'selectedTile', 't1');
      _state = dungeonsReducer(Variables.clone(state), action);
      let event = { offsetTop: 10, offsetLeft: 20};
      action = addTile( 65, event);
      _state = dungeonsReducer(_state, action);
    });

    it('powersReducer:ADD_TILE |-| tileType should equal floor', function() {
      assert.equal(_state.dungeon.slots[ 65 - 1 ].tileType, 'floor'); // with optional message
    });
    it('powersReducer:ADD_TILE |-| top should equal 10', function() {
      assert.equal(_state.dungeon.slots[ 65 - 1 ].top, 10); // with optional message
    });
    it('powersReducer:ADD_TILE |-| entrance should equal false', function() {
      assert.equal(_state.dungeon.slots[ 65 - 1 ].entrance, false); // with optional message
    });
  });
  describe('adding invalid tile', function() {

    let action, _state;
    beforeEach(function() {
      _state = dungeonsReducer(Variables.clone(state), action);
      let event = { offsetTop: 10, offsetLeft: 20};
      action = addTile( 65, event);
      _state = dungeonsReducer(_state, action);
    });

    it('powersReducer:ADD_TILE |-| tileType should equal undefined', function() {
      assert.equal(_state.dungeon.slots[ 65 - 1 ].tileType, undefined); // with optional message
    });

  });
});

