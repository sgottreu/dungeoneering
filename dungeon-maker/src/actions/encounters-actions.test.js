var assert = require('chai').assert;

import * as types from './action-types';
import * as _actions from './encounters-actions';

import {Variables} from '../lib/Variables';

let availableEncounters = [ 
                  { _id: 123, name: 'Killing Grounds', dungeons: [ 123, 456] }, 
                  { _id: 456, name: 'Corridors', dungeons: [ 142, 456] } 
                ];

let encounter = [ { _id: 123, name: 'Corridors', dungeons: [ 123, 456 ] } ];

describe('loadAvailableEncounters', function() {
  var state = _actions.loadAvailableEncounters(availableEncounters);

  describe('type', function() {
    it('encountersActions:loadAvailableEncounters.type |-| should exist', function() {
		  assert.isString(state.type); // with optional message
    });
    it('encountersActions:loadAvailableEncounters.type |-| should equal LOAD_AVAILABLE_ENCOUNTERS', function() {
      assert.equal('LOAD_AVAILABLE_ENCOUNTERS', state.type); // with optional message
    });
  });
  describe('encounters', function() {
    it('encountersActions:loadAvailableEncounters.encounters |-| should be an Array()', function() {
      assert.isArray(state.encounters); // with optional message
    });
    it('encountersActions:loadAvailableEncounters.encounters |-| Element[0][0]._id should equal 123', function() {
      assert.equal(123, state.encounters[0]._id); // with optional message
    });
    it('encountersActions:loadAvailableEncounters.encounters |-| Element[1][1]._id should equal 456', function() {
      assert.equal(456, state.encounters[1]._id); // with optional message
    });
  });
});


describe('updateEncounterName', function() {
  var state = _actions.updateEncounterName('Mordor');

  describe('type', function() {
    it('encountersActions:updateEncounterName.type |-| should exist', function() {
		  assert.isString(state.type); // with optional message
    });
    it('encountersActions:updateEncounterName.type |-| should equal UPDATE_ENCOUNTER_NAME', function() {
      assert.equal('UPDATE_ENCOUNTER_NAME', state.type); // with optional message
    });
  });
  describe('encounter', function() {
    it('encountersActions:updateEncounterName.encounter |-| should be an String', function() {
      assert.isString(state.name); // with optional message
    });
    it('encountersActions:updateEncounterName.encounter |-| Element.name should equal "Mordor"', function() {
      assert.equal('Mordor', state.name); // with optional message
    });
  });
});



describe('updateEncounterDungeons', function() {
  var state = _actions.updateEncounterDungeons(123);

  describe('type', function() {
    it('encountersActions:updateEncounterDungeons.type |-| should exist', function() {
		  assert.isString(state.type); // with optional message
    });
    it('encountersActions:updateEncounterDungeons.type |-| should equal UPDATE_ENCOUNTER_DUNGEONS', function() {
      assert.equal('UPDATE_ENCOUNTER_DUNGEONS', state.type); // with optional message
    });
  });
  describe('dungeon', function() {
    it('encountersActions:updateEncounterDungeons.dungeon |-| dungeon should equal 123', function() {
      assert.equal(123, state.dungeon); // with optional message
    });
  });  

});