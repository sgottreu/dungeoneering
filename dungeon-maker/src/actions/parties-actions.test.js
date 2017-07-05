var assert = require('chai').assert;

import * as types from './action-types';
import * as _actions from './parties-actions';

let availableParties [
  [ {_id: 123, name: 'Steelhorn'}, {_id: 456, name: 'Jarim'} ],
  [ {_id: 789, name: 'Oaken-Shield'}, {_id: 987, name: 'Jester'} ]
];

describe('loadAvailableParties', function() {
  var state = _actions.loadAvailableParties(availableParties);

  describe('type', function() {
    it('paritesActions:loadAvailableParties.type |-| should exist', function() {
		  assert.isString(state.type); // with optional message
    });
    it('paritesActions:loadAvailableParties.type |-| should equal LOAD_AVAILABLE_PARTIES', function() {
      assert.equal('LOAD_AVAILABLE_PARTIES', state.type); // with optional message
    });
  });
  describe('availableCharacters', function() {
    it('paritesActions:loadAvailableParties.parties |-| should be an Array()', function() {
      assert.isArray(state.parties); // with optional message
    });
    it('paritesActions:loadAvailableParties.parties |-| Element[0][0]._id should equal 123', function() {
      assert.isNumber(123, state.parties[0][0]._id); // with optional message
    });
    it('paritesActions:loadAvailableParties.parties |-| Element[1][1]._id should equal 987', function() {
      assert.isNumber(987, state.parties[1][1]._id); // with optional message
    });
  });
});
