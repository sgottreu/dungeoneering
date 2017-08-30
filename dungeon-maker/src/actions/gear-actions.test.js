var assert = require('chai').assert;

import * as types from './action-types';
import { loadAvailableGear } from './gear-actions';

var gear = [ {_id: 123, name: "Torch"}, {_id:456, name: 'Bedroll'} ];

describe('loadAvailableGear', function() {

  var state = loadAvailableGear(gear);

  describe('type', function() {
    
    it('GearActions:loadAvailableGear.type |-| should exist', function() {
		  assert.isString(state.type); // with optional message
    });
    it('GearActions:loadAvailableGear.type |-| should equal LOAD_AVAILABLE_GEAR', function() {
      assert.equal('LOAD_AVAILABLE_GEAR', state.type); // with optional message
    });
  });
  describe('gear', function() {
    it('GearActions:loadAvailableGear.gear |-| should be an Array()', function() {
      assert.isArray(state.gear); // with optional message
    });
    it('GearActions:loadAvailableGear.gear |-| Element[0]._id should equal 123', function() {
      assert.equal(456, state.gear[1]._id); // with optional message
    });
  });
});
