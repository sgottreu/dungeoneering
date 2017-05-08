var assert = require('chai').assert;

import * as types from '../actions/action-types';
import {Variables} from '../lib/Variables';
import {PowerTemplate} from '../components/_Powers';
import {Die} from '../lib/Die';

import powersReducer from './powers-reducer';

import { loadExistingPowers, addToPowers, resetCurrentPower, changeCurrentPower, changeDieType, changeDieNumber, changeDieModifier, updateKey, updateAttack } from '../actions/powers-actions';


describe('powersReducer', function() {
  var state = {
    existingPowers: [],
    current_power: false,
    power: Variables.clone(PowerTemplate)
  };

  var powers = [ {_id: 123}, {_id: 456} ];

  describe('initilization', function() {
    it('powersReducer:initilization |-| State returned if Action is not passed', function() {
      var _state = powersReducer();
      assert.isArray(_state.existingPowers); // with optional message
    });
    it('powersReducer:initilization |-| existingPowers should be empty', function() {
      var _state = powersReducer();
      assert.isArray(_state.existingPowers); // with optional message
    });
  });

  describe('LOAD_EXISTING_POWERS', function() {
    var action = loadExistingPowers( powers );
    var _state = powersReducer(state, action);

    it('powersReducer:LOAD_EXISTING_POWERS |-| existingPowers should be an array', function() {
      assert.isArray(_state.existingPowers); // with optional message
    });
    it('powersReducer:LOAD_EXISTING_POWERS |-| existingPowers should have length of 2', function() {
      assert.lengthOf(_state.existingPowers, 2, 'array has length of 2')
    });
    it('powersReducer:LOAD_EXISTING_POWERS |-| Element[0]._id should equal 123', function() {
      assert.equal(123, _state.existingPowers[0]._id); // with optional message
    });
  });
 
  describe('CHANGE_CURRENT_POWER', function() {
    var _state = state;
    _state.existingPowers = powers;

    it('powersReducer:CHANGE_CURRENT_POWER |-| change from current_power: false to 1', function() {
      var action = changeCurrentPower( 1 );
      _state = powersReducer(_state, action);      
      assert.equal(_state.current_power, 1); // with optional message
    });
    it('powersReducer:CHANGE_CURRENT_POWER |-| change power._id: false to 123', function() {
      var action = changeCurrentPower( 1 );
      _state = powersReducer(state, action);      
      assert.equal(_state.power._id, 123); // with optional message
    });
  
    it('powersReducer:CHANGE_CURRENT_POWER |-| change from current_power: 1 to false', function() {
      var action = changeCurrentPower( 1 );
      _state = powersReducer(_state, action);

      action = changeCurrentPower( 0 );
      _state = powersReducer(_state, action);

      assert.equal(_state.current_power, false); // with optional message
    });
    it('powersReducer:CHANGE_CURRENT_POWER |-| change power._id: 123 to false', function() {
      var action = changeCurrentPower( 1 );
      _state = powersReducer(_state, action);

      action = changeCurrentPower( 0 );
      _state = powersReducer(_state, action);      
      assert.equal(_state.power._id, undefined); // with optional message
    });

  });

  describe('UPDATE_KEY', function() {
    var action = updateKey('class', 'ranger');
    var _state = powersReducer(state, action);

    it('powersReducer:UPDATE_KEY |-| class should be "ranger"', function() {
      assert.equal(_state.power.class, 'ranger'); // with optional message
    });
  });

  describe('UPDATE_ATTACK', function() {
    var action = updateAttack('damage', '1d4');
    var _state = powersReducer(state, action);

    it('powersReducer:UPDATE_ATTACK |-| attack.damage should be "1d4"', function() {
      assert.equal(_state.power.attack.damage, '1d4'); // with optional message
    });
  });

});