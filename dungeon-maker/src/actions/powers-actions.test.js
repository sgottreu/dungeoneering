var assert = require('chai').assert;

import * as types from './action-types';
import { loadExistingPowers, addToPowers, resetCurrentPower, changeCurrentPower, changeDieType, changeDieNumber, changeDieModifier, updateKey, updateAttack } from './powers-actions';

var powers = [ {_id: 123}, {_id:456} ];
var power = { _id: 123 };

describe('loadExistingPowers', function() {

  var state = loadExistingPowers(powers);

  describe('type', function() {
    
    it('powersActions:loadExistingPowers.type |-| should exist', function() {
		  assert.isString(state.type); // with optional message
    });
    it('powersActions:loadExistingPowers.type |-| should equal LOAD_EXISTING_POWERS', function() {
      assert.equal('LOAD_EXISTING_POWERS', state.type); // with optional message
    });
  });
  describe('powers', function() {
    it('powersActions:loadExistingPowers.powers |-| should be an Array()', function() {
      assert.isArray(state.powers); // with optional message
    });
    it('powersActions:loadExistingPowers.powers |-| Element[0]._id should equal 123', function() {
      assert.isNumber(state.powers[0]._id); // with optional message
    });
  });

  it('powersActions:loadExistingPowers.powers |-| should be an object', function() {
    assert.isObject(state); // with optional message
  });
});


describe('addToPowers', function() {
  var state = addToPowers(power);

  describe('type', function() {
    it('powersActions:addToPowers.type |-| should exist', function() {
      assert.isString(state.type, 'Is a string'); // with optional message
    });
    it('powersActions:addToPowers.type |-| should equal = ADD_TO_POWERS', function() {
      assert.equal('ADD_TO_POWERS', state.type); // with optional message
    });
  });
  describe('power', function() {
    it('powersActions:addToPowers.power |-| should be an Object()', function() {
      assert.isObject(state.power); // with optional message
    });
    it('powersActions:addToPowers.power |-| _id should equal 123', function() {
      assert.isNumber(state.power._id); // with optional message
    });
  });

  it('powersActions:addToPowers.power |-| should be an object', function() {
    assert.isObject(state); // with optional message
  });
});

describe('resetCurrentPower', function() {
  var state = resetCurrentPower(power);

  it('powersActions:resetCurrentPower.powers |-| should be an object', function() {
    assert.isObject(state); // with optional message
  });

  describe('type', function() {
    it('powersActions:resetCurrentPower.type |-| should exist', function() {
      assert.isString(state.type, 'Is a string'); // with optional message
    });
    it('powersActions:resetCurrentPower.type |-| should equal = RESET_CURRENT_POWER', function() {
      assert.equal(state.type, 'RESET_CURRENT_POWER', ); // with optional message
    });
  });
  describe('powers', function() {
    it('powersActions:resetCurrentPower.power |-| should be an Object()', function() {
      assert.isObject(state.power); // with optional message
    });
    it('powersActions:resetCurrentPower.power |-| _id should equal 123', function() {
      assert.isNumber(state.power._id); // with optional message
    });
  });

  
});

describe('changeCurrentPower', function() {
  var state = changeCurrentPower(123);

  it('powersActions:changeCurrentPower |-| should be an object', function() {
    assert.isObject(state); // with optional message
  });

  describe('type', function() {
    it('powersActions:changeCurrentPower.type |-| should exist', function() {
      assert.isString(state.type, 'Is a string'); // with optional message
    });
    it('powersActions:changeCurrentPower.type |-| should equal = CHANGE_CURRENT_POWER', function() {
      assert.equal(state.type, 'CHANGE_CURRENT_POWER'); // with optional message
    });
  });
  describe('id', function() {
    it('powersActions:changeCurrentPower.power |-| id should equal 123', function() {
      assert.equal(state.id, 123); // with optional message
    });
  });

  
});


describe('updateKey', function() {
  var state = updateKey('class', 'ranger');

  it('powersActions:updateKey |-| should be an object', function() {
    assert.isObject(state); // with optional message
  });

  describe('type', function() {
    it('powersActions:updateKey.type |-| should exist', function() {
      assert.isString(state.type, 'Is a string'); // with optional message
    });
    it('powersActions:updateKey.type |-| should equal = UPDATE_KEY', function() {
      assert.equal(state.type, 'UPDATE_KEY'); // with optional message
    });
  });
  describe('key', function() {
    it('powersActions:updateKey.key |-| key should equal class', function() {
      assert.equal(state.key, 'class'); // with optional message
    });
  });
  describe('value', function() {
    it('powersActions:updateKey.value |-| value should equal ranger', function() {
      assert.equal(state.value, 'ranger'); // with optional message
    });
  });
});


describe('updateAttack', function() {
  var state = updateAttack('damage', '1d4');

  it('powersActions:updateAttack |-| should be an object', function() {
    assert.isObject(state); // with optional message
  });

  describe('type', function() {
    it('powersActions:updateAttack.type |-| should exist', function() {
      assert.isString(state.type, 'Is a string'); // with optional message
    });
    it('powersActions:updateAttack.type |-| should equal = UPDATE_ATTACK', function() {
      assert.equal(state.type, 'UPDATE_ATTACK'); // with optional message
    });
  });
  describe('key', function() {
    it('powersActions:updateAttack.key |-| key should equal damage', function() {
      assert.equal(state.key, 'damage'); // with optional message
    });
  });
  describe('value', function() {
    it('powersActions:updateAttack.value |-| value should equal 1d4', function() {
      assert.equal(state.value, '1d4'); // with optional message
    });
  });

  
});