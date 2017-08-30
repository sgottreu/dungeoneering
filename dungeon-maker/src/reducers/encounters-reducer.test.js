var assert = require('chai').assert;

import * as types from '../actions/action-types';
import {Variables} from '../lib/Variables';

import encountersReducer from './encounters-reducer';

import { loadAvailableEncounters, updateEncounter, updateEncounterDungeons, updateEncounterName

  } from '../actions/encounters-actions';

var state = {
  availableEncounters: [],
  encounter: { 
      _id: false,
      name: '',
      _type: 'encounter',
      dungeons: []      
    }
};

const availableEncounters = [ 
                  { _id: 123, name: 'Killer Halls', dungeons: [ 123, 456] }, 
                  { _id: 456, name: 'Death Hallows', dungeons: [ 142, 987] } 
                ];


describe('encountersReducer', function() {


  describe('initilization', function() {
    it('encountersReducer:initilization |-| State returned if Action is not passed', function() {
      var _state = encountersReducer();
      assert.isArray(_state.availableEncounters); // with optional message
    });
    it('encountersReducer:initilization |-| availableEncounters should be empty', function() {
      var _state = encountersReducer();
      assert.lengthOf(_state.availableEncounters, 0); // with optional message
    });
  });

  describe('non-existant reducer', function() {
    it('encountersReducer:non-existant reducer |-| State returned if Action is not found', function() {
      var _state = encountersReducer(Variables.clone(state), "NULL");
      assert.equal(_state.encounter._id, false); // with optional message
    });

  });

  describe('LOAD_AVAILABLE_ENCOUNTERS', function() {
    var action;
    var _state;

    beforeEach(function() {
      _state = Variables.clone(state);
      action = loadAvailableEncounters( availableEncounters );
      _state = encountersReducer(_state, action);
    });

    it('encountersReducer:LOAD_AVAILABLE_ENCOUNTERS |-| loadAvailableEncounters should be an array', function() {
      assert.isArray(_state.availableEncounters); // with optional message
    });
    it('encountersReducer:LOAD_AVAILABLE_ENCOUNTERS |-| loadAvailableEncounters should have length of 2', function() {
      assert.lengthOf(_state.availableEncounters, 2, 'array has length of 2')
    });
    it('encountersReducer:LOAD_AVAILABLE_ENCOUNTERS |-| Element[0].name should equal "Killer Halls"', function() {
      assert.equal('Death Hallows', _state.availableEncounters[0].name); // with optional message
    });
  });

  describe('UPDATE_ENCOUNTER', function() {
    var action;
    var _state;

    beforeEach(function() {
      _state = Variables.clone(state);
      action = updateEncounter( availableEncounters[0] );
      _state = encountersReducer(_state, action);
    });

    it('encountersReducer:UPDATE_ENCOUNTER |-| encounter should be an object', function() {
      assert.isObject(_state.encounter); // with optional message
    });
    it('encountersReducer:UPDATE_ENCOUNTER |-| encounter.name should equal "Death Hallows"', function() {
      assert.equal('Death Hallows', _state.encounter.name); // with optional message
    });
  
  }); 

  describe('UPDATE_ENCOUNTER_NAME', function() {
    var action;
    var _state;

    beforeEach(function() {
      _state = Variables.clone(state);
      action = updateEncounter( availableEncounters[0] );
      _state = encountersReducer(_state, action);

      action = updateEncounterName( 'Encounter of Doom' );
      _state = encountersReducer(_state, action);
    });

    it('encountersReducer:UPDATE_ENCOUNTER_NAME |-| encounter should be a string', function() {
      assert.isString(_state.encounter.name); // with optional message
    });
    it('encountersReducer:UPDATE_ENCOUNTER_NAME |-| encounter.name should equal "Encounter of Doom"', function() {
      assert.equal('Encounter of Doom', _state.encounter.name); // with optional message
    });
  
  }); 

  describe('UPDATE_ENCOUNTER_DUNGEON', function() {
    var action;
    var _state;

    describe('add new Dungeon', function() {
      beforeEach(function() {
        _state = Variables.clone(state);
        action = updateEncounter( availableEncounters[0] );
        _state = encountersReducer(_state, action);

        action = updateEncounterDungeons( 253 );
        _state = encountersReducer(_state, action);
      });

      it('encountersReducer:UPDATE_ENCOUNTER_DUNGEON |-| encounter.dungeons should be an array', function() {
        assert.isArray(_state.encounter.dungeons); // with optional message
      });
      it('encountersReducer:UPDATE_ENCOUNTER_DUNGEON |-| encounter.dungeons should have length of 1', function() {
        assert.lengthOf(_state.encounter.dungeons, 3, 'array has length of 3')
      });
      it('encountersReducer:member |-| encounter.dungeons[2] should equal 253', function() {
        assert.equal(253, _state.encounter.dungeons[2]); // with optional message
      });
    });

    describe('remove Dungeon', function() {
      beforeEach(function() {
        _state = Variables.clone(state);
        action = updateEncounter( availableEncounters[0] );
        _state = encountersReducer(_state, action);
        
        action = updateEncounterDungeons( 987 );
        _state = encountersReducer(_state, action);
      });

      it('encountersReducer:UPDATE_ENCOUNTER_DUNGEON |-| encounter should be an array', function() {
        assert.isArray(_state.encounter.dungeons); // with optional message
      });
      it('encountersReducer:UPDATE_ENCOUNTER_DUNGEON |-| encounter.dungeons should have length of 1', function() {
        assert.lengthOf(_state.encounter.dungeons, 1, 'array has length of 1')
      });
      it('encountersReducer:member |-| encounter.dungeons[0] should equal 142', function() {
        assert.equal(142, _state.encounter.dungeons[0]); // with optional message
      });
    });

  });

});