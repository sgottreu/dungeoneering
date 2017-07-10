var assert = require('chai').assert;

import * as types from '../actions/action-types';
import {Variables} from '../lib/Variables';

import partiesReducer from './parties-reducer';

import { loadAvailableParties, updateParty

  } from '../actions/parties-actions';

var state = {
  availableParties: [],
  party: { 
      _id: false,
      name: '',
      _type: 'party',
      members: []      
    }
};

const availableCharacters = [ {_id: 123, name: 'Steelhorn'}, {_id: 456, name: 'Jarim'}, {_id: 142, name: 'Oaken-Shield'} ];

const parties = [ 
                  { _id: 123, name: 'Killers', members: [ {_id: 123, name: 'Steelhorn'}, {_id: 456, name: 'Jarim'}] }, 
                  { _id: 456, name: 'Long Bows', members: [ {_id: 142, name: 'Oaken-Shield'}, {_id: 456, name: 'Jarim'}] } ];


describe('partiesReducer', function() {


  describe('initilization', function() {
    it('partiesReducer:initilization |-| State returned if Action is not passed', function() {
      var _state = partiesReducer();
      assert.isArray(_state.availableParties); // with optional message
    });
    it('partiesReducer:initilization |-| availableParties should be empty', function() {
      var _state = partiesReducer();
      assert.lengthOf(_state.availableParties, 0); // with optional message
    });
  });

  describe('non-existant reducer', function() {
    it('partiesReducer:non-existant reducer |-| State returned if Action is not found', function() {
      var _state = partiesReducer(Variables.clone(state), "NULL");
      assert.equal(_state.party._id, false); // with optional message
    });

  });

  describe('LOAD_AVAILABLE_PARTIES', function() {
    var action;
    var _state;

    beforeEach(function() {
      _state = Variables.clone(state);
      action = loadAvailableParties( parties );
      _state = partiesReducer(_state, action);
    });

    it('partiesReducer:LOAD_AVAILABLE_PARTIES |-| loadAvailableParties should be an array', function() {
      assert.isArray(_state.availableParties); // with optional message
    });
    it('partiesReducer:LOAD_AVAILABLE_PARTIES |-| loadAvailableParties should have length of 2', function() {
      assert.lengthOf(_state.availableParties, 2, 'array has length of 2')
    });
    it('partiesReducer:LOAD_AVAILABLE_PARTIES |-| Element[0].name should equal "Killers"', function() {
      assert.equal('Killers', _state.availableParties[0].name); // with optional message
    });
  });
 
  describe('UPDATE_PARTY', function() {
    var action;
    var _state;

    describe('add new Party', function() {
      beforeEach(function() {
        _state = Variables.clone(state);
        action = loadAvailableParties( parties );
        _state = partiesReducer(_state, action);

        action = updateParty( parties[0] );
        _state = partiesReducer(_state, action);
      });

      it('partiesReducer:UPDATE_PARTY |-| party should be an array', function() {
        assert.isObject(_state.party); // with optional message
      });
      it('partiesReducer:UPDATE_PARTY |-| Element._id should equal 123', function() {
        assert.equal(123, _state.party._id); // with optional message
      });
    });
  });


});