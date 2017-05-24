var assert = require('chai').assert;

import * as types from './action-types';
import { loadCharacters, loadMonsters, updateKey } from './entities-actions';

var availableCharacters = [ {_id: 123, name: 'Steelhorn'}, {_id: 456, name: 'Jarim'} ];
var availableMonsters = [ {_id: 123, name: 'Goblin'}, {_id: 456, name: 'Wolf'} ];
var entity = { _id: 123 };

describe('loadCharacters', function() {
  var state = loadCharacters(availableCharacters);

  describe('type', function() {
    it('entitiesActions:loadCharacters.type |-| should exist', function() {
		assert.isString(state.type); // with optional message
    });
    it('entitiesActions:loadCharacters.type |-| should equal LOAD_CHARACTERS', function() {
      assert.equal('LOAD_CHARACTERS', state.type); // with optional message
    });
  });
  describe('availableCharacters', function() {
    it('entitiesActions:loadCharacters.entities |-| should be an Array()', function() {
      assert.isArray(state.entities); // with optional message
    });
    it('entitiesActions:loadCharacters.entities |-| Element[0]._id should equal 123', function() {
      assert.isNumber(123, state.entities[0]._id); // with optional message
    });
  });
});

describe('loadMonsters', function() {
  var state = loadMonsters(availableMonsters);

  describe('type', function() {
    it('entitiesActions:loadMonsters.type |-| should exist', function() {
		assert.isString(state.type); // with optional message
    });
    it('entitiesActions:loadMonsters.type |-| should equal LOAD_CHARACTERS', function() {
      assert.equal('LOAD_MONSTERS', state.type); // with optional message
    });
  });
  describe('availableMonsters', function() {
    it('entitiesActions:loadMonsters.entities |-| should be an Array()', function() {
      assert.isArray(state.entities); // with optional message
    });
    it('entitiesActions:loadMonsters.entities |-| Element[0]._id should equal 123', function() {
      assert.isNumber(123, state.entities[0]._id); // with optional message
    });
  });
});

describe('updateKey', function() {
  var state = updateKey('usedPoints', 4);

  it('entitiesActions:updateKey |-| should be an object', function() {
    assert.isObject(state); // with optional message
  });

  describe('type', function() {
    it('entitiesActions:updateKey.type |-| should exist', function() {
      assert.isString(state.type, 'Is a string'); // with optional message
    });
    it('entitiesActions:updateKey.type |-| should equal = UPDATE_KEY', function() {
      assert.equal(state.type, 'UPDATE_KEY'); // with optional message
    });
  });
  describe('key', function() {
    it('entitiesActions:updateKey.key |-| key should equal usedPoints', function() {
      assert.equal(state.key, 'usedPoints'); // with optional message
    });
  });
  describe('value', function() {
    it('entitiesActions:updateKey.value |-| value should equal 4', function() {
      assert.equal(state.value, 4); // with optional message
    });
  });
});