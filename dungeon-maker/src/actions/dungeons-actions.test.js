var assert = require('chai').assert;

import * as types from './action-types';
import { loadDungeons, setDungeon, updateKey, updateDungeonKey, updateMouseover, setSlotEntity, addTile, duplicateDungeon } from './dungeons-actions';

var dungeons = [ {_id: 123}, {_id: 456} ];
var dungeon = { _id: 123 };

describe('loadDungeons', function() {

  var state = loadDungeons(dungeons);

  describe('type', function() {
    
    it('dungeonsActions:loadDungeons.type |-| should exist', function() {
		  assert.isString(state.type); // with optional message
    });
    it('dungeonsActions:loadDungeons.type |-| should equal LOAD_DUNGEONS', function() {
      assert.equal('LOAD_DUNGEONS', state.type); // with optional message
    });
  });
  describe('dungeons', function() {
    it('dungeonsActions:loadDungeons.dungeons |-| should be an Array()', function() {
      assert.isArray(state.dungeons); // with optional message
    });
    it('dungeonsActions:loadDungeons.dungeons |-| Element[0]._id should equal 123', function() {
      assert.isNumber(123, state.dungeons[0]._id); // with optional message
    });
  });

  it('dungeonsActions:loadDungeons.dungeons |-| should be an object', function() {
    assert.isObject(state); // with optional message
  });
});


describe('setDungeon', function() {

  var state = setDungeon(dungeon);

  describe('type', function() {    
    it('dungeonsActions:setDungeon.type |-| should exist', function() {
	  assert.isString(state.type); // with optional message
    });
    it('dungeonsActions:setDungeon.type |-| should equal SET_DUNGEON', function() {
      assert.equal('SET_DUNGEON', state.type); // with optional message
    });
  });
  describe('dungeon', function() {
    it('dungeonsActions:setDungeon.dungeon |-| should be an object()', function() {
      assert.isObject(state.dungeon); //dungeonwith optional message
    });
    it('dungeonsActions:setDungeon.dungeon |-| Element[0]._id should equal 123', function() {
      assert.isNumber(123, state.dungeon._id); // with optional message
    });
  });
});

describe('updateKey', function() {
  var state = updateKey('tileType', 'gravel');

  it('dungeonsActions:updateKey |-| should be an object', function() {
    assert.isObject(state); // with optional message
  });

  describe('type', function() {
    it('dungeonsActions:updateKey.type |-| should exist', function() {
      assert.isString(state.type, 'Is a string'); // with optional message
    });
    it('dungeonsActions:updateKey.type |-| should equal = UPDATE_KEY', function() {
      assert.equal(state.type, 'UPDATE_KEY'); // with optional message
    });
  });
  describe('key', function() {
    it('dungeonsActions:updateKey.key |-| key should equal tileType', function() {
      assert.equal(state.key, 'tileType'); // with optional message
    });
  });
  describe('value', function() {
    it('dungeonsActions:updateKey.value |-| value should equal gravel', function() {
      assert.equal(state.value, 'gravel'); // with optional message
    });
  });
});

describe('updateDungeonKey', function() {
  var state = updateDungeonKey('title', 'Shooting Gallery');

  it('dungeonsActions:updateDungeonKey |-| should be an object', function() {
    assert.isObject(state); // with optional message
  });

  describe('type', function() {
    it('dungeonsActions:updateDungeonKey.type |-| should exist', function() {
      assert.isString(state.type, 'Is a string'); // with optional message
    });
    it('dungeonsActions:updateDungeonKey.type |-| should equal = UPDATE_DUNGEON_KEY', function() {
      assert.equal(state.type, 'UPDATE_DUNGEON_KEY'); // with optional message
    });
  });
  describe('key', function() {
    it('dungeonsActions:updateDungeonKey.key |-| key should equal title', function() {
      assert.equal(state.key, 'title'); // with optional message
    });
  });
  describe('value', function() {
    it('dungeonsActions:updateDungeonKey.value |-| value should equal `Shooting Gallery`', function() {
      assert.equal(state.value, 'Shooting Gallery'); // with optional message
    });
  });
});

describe('updateMouseover', function() {
  var entity = { _id: 123, name: 'Dire Wolf' };
  var event = { clientX: 5, clientY: 5 };
  var state = updateMouseover(entity, 'entity', event);

  describe('type', function() {
    it('dungeonsActions:updateMouseover.type |-| should exist', function() {
      assert.isString(state.type, 'Is a string'); // with optional message
    });
    it('dungeonsActions:updateMouseover.type |-| should equal = UPDATE_MOUSEOVER', function() {
      assert.equal(state.type, 'UPDATE_MOUSEOVER'); // with optional message
    });
  });
  describe('entity', function() {
    it('dungeonsActions:updateMouseover.entity |-| entity is object', function() {
      assert.isObject(state.entity, 'title'); // with optional message
    });
    it('dungeonsActions:updateMouseover.entity |-| entity.name should equal `Dire Wolf`', function() {
      assert.equal(state.entity.name, 'Dire Wolf'); // with optional message
    });
  });
  describe('entityType', function() {
    it('dungeonsActions:updateMouseover.entityType |-| entityType should equal `entity`', function() {
      assert.equal(state.entityType, 'entity'); // with optional message
    });
  });
  describe('mouse', function() {
    it('dungeonsActions:updateMouseover.entityType |-| mouse should be object', function() {
      assert.isObject(state.mouse); // with optional message
    });
    it('dungeonsActions:updateMouseover.mouse |-| mouse.clientX should equal `5`', function() {
      assert.equal(state.mouse.clientX, 5); // with optional message
    });
  });
});

describe('setSlotEntity', function() {
  var state = setSlotEntity(123, 10);
  
  describe('type', function() {
    it('dungeonsActions:setSlotEntity.type |-| should exist', function() {
      assert.isString(state.type, 'Is a string'); // with optional message
    });
    it('dungeonsActions:setSlotEntity.type |-| should equal = SET_SLOT_ENTITY', function() {
      assert.equal(state.type, 'SET_SLOT_ENTITY'); // with optional message
    });
  });
  describe('id', function() {
    it('dungeonsActions:setSlotEntity.id |-| id should equal `123`', function() {
      assert.equal(state.id, 123); // with optional message
    });
  });
  describe('slot', function() {
    it('dungeonsActions:setSlotEntity.slot |-| slot should equal `10`', function() {
      assert.equal(state.slot, 10); // with optional message
    });
  });
});

describe('addTile', function() {
  var event = { target: { offsetTop : 10, offsetLeft: 10 } };
  var state = addTile(10, event);
  
  describe('type', function() {
    it('dungeonsActions:addTile.type |-| should exist', function() {
      assert.isString(state.type, 'Is a string'); // with optional message
    });
    it('dungeonsActions:addTile.type |-| should equal = ADD_TILE', function() {
      assert.equal(state.type, 'ADD_TILE'); // with optional message
    });
  });
  describe('slot', function() {
    it('dungeonsActions:addTile.slot |-| slot should equal `10`', function() {
      assert.equal(state.slot, 10); // with optional message
    });
  });

  describe('event', function() {
    it('dungeonsActions:addTile.event |-| event is object', function() {
      assert.isObject(state.event); // with optional message
    });
    it('dungeonsActions:addTile.event |-| event.target.offsetTop should equal 10', function() {
      assert.equal(state.event.target.offsetTop, 10); // with optional message
    });
  });

});

describe('addduplicateDungeonTile', function() {
  var state = duplicateDungeon('Shooting Gallery');
  
  describe('type', function() {
    it('dungeonsActions:duplicateDungeon.type |-| should exist', function() {
      assert.isString(state.type, 'Is a string'); // with optional message
    });
    it('dungeonsActions:duplicateDungeon.type |-| should equal = ADD_TILE', function() {
      assert.equal(state.type, 'DUPLICATE_DUNGEON'); // with optional message
    });
  });
  describe('title', function() {
    it('dungeonsActions:duplicateDungeon.title |-| title should equal `Shooting Gallery`', function() {
      assert.equal(state.title, 'Shooting Gallery'); // with optional message
    });
  });
});
