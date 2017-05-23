var assert = require('chai').assert;

import * as types from './action-types';
import { loadCharacters, loadMonsters } from './entities-actions';

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
    it('entitiesActions:loadCharacters.availableCharacters |-| should be an Array()', function() {
      assert.isArray(state.availableCharacters); // with optional message
    });
    it('entitiesActions:loadCharacters.availableCharacters |-| Element[0]._id should equal 123', function() {
      assert.isNumber(123, state.availableCharacters[0]._id); // with optional message
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
    it('entitiesActions:loadMonsters.availableMonsters |-| should be an Array()', function() {
      assert.isArray(state.availableMonsters); // with optional message
    });
    it('entitiesActions:loadMonsters.availableMonsters |-| Element[0]._id should equal 123', function() {
      assert.isNumber(123, state.availableMonsters[0]._id); // with optional message
    });
  });
});