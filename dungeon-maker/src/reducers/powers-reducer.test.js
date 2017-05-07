var assert = require('chai').assert;

import * as types from '../actions/action-types';
import {Variables} from '../lib/Variables';
import {PowerTemplate} from '../components/_Powers';
import {Die} from '../lib/Die';

import powersReducer from './powers-reducer';

describe('powersReducer', function() {
  var state = {
    existingPowers: [],
    current_power: false,
    power: Variables.clone(PowerTemplate)
  };

  describe('initilization', function() {
    it('powersReducer:initilization - State returned if Action is not passed', function() {
      var state = powersReducer();
      assert.isArray(state.existingPowers); // with optional message
    });
    it('powersReducer:initilization - existingPowers should be empty', function() {
      var state = powersReducer();
      assert.isArray(state.existingPowers); // with optional message
    });
  });

  describe('LOAD_EXISTING_POWERS', function() {
    var action = {
        type: types.LOAD_EXISTING_POWERS,
        powers: [ {_id: 123}, {_id: 456} ]
      };
    var _state = powersReducer(state, action);

    it('powersReducer:LOAD_EXISTING_POWERS - existingPowers should be an array', function() {
      assert.isArray(_state.existingPowers); // with optional message
    });
    it('powersReducer:LOAD_EXISTING_POWERS - existingPowers should have length of 2', function() {
      assert.lengthOf(_state.existingPowers, 2, 'array has length of 2')
    });
    it('powersReducer:LOAD_EXISTING_POWERS - Element[0]._id should equal 123', function() {
      assert.equal(123, _state.existingPowers[0]._id); // with optional message
    });
  });
 
});