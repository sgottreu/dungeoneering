var assert = require('chai').assert;

import * as types from './action-types';
import { loadExistingPowers, addToPowers, resetCurrentPower, changeCurrentPower, changeDieType, changeDieNumber, changeDieModifier, updateKey, updateAttack } from './powers-actions';


describe('loadExistingPowers', function() {
  var action = {
    type: types.LOAD_EXISTING_POWERS,
    powers: [ {}, {} ]
  };

  describe('type', function() {
    it('should exist', function() {
		  assert.isString('LOAD_EXISTING_POWERS', action.type); // with optional message
    });
    it('should equal LOAD_EXISTING_POWERS', function() {
      assert.equal('LOAD_EXISTING_POWERS', action.type); // with optional message
    });
  });
  describe('powers', function() {
    it('should be an Array()', function() {
      assert.isArray(action.powers); // with optional message
    });
  });

  it('should be an object', function() {
    assert.isObject(action); // with optional message
  });
});


describe('addToPowers', function() {
  var action = {
    type: types.ADD_TO_POWERS,
    power: { _id: '123' }
  };

  describe('type', function() {
    it('should exist', function() {
      assert.isString('ADD_TO_POWERS', action.type, 'Is a string'); // with optional message
    });
    it('should equal = ADD_TO_POWERS', function() {
      assert.equal('ADD_TO_POWERS', action.type); // with optional message
    });
  });
  describe('powers', function() {
    it('should be an Object()', function() {
      assert.isObject(action.power); // with optional message
    });
  });

  it('should be an object', function() {
    assert.isObject(action); // with optional message
  });
});

describe('resetCurrentPower', function() {
  var action = {
    type: types.RESET_CURRENT_POWER,
    power: { _id: '123' }
  };

  describe('type', function() {
    it('should exist', function() {
      assert.isString('RESET_CURRENT_POWER', action.type, 'Is a string'); // with optional message
    });
    it('should equal = RESET_CURRENT_POWER', function() {
      assert.equal('RESET_CURRENT_POWER', action.type); // with optional message
    });
  });
  describe('powers', function() {
    it('should be an Object()', function() {
      assert.isObject(action.power); // with optional message
    });
  });

  it('should be an object', function() {
    assert.isObject(action); // with optional message
  });
});

