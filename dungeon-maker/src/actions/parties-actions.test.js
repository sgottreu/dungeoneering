var assert = require('chai').assert;

import * as types from './action-types';
import * as _actions from './parties-actions';

import {Variables} from '../lib/Variables';

let availableParties = [ 
                  { _id: 123, name: 'Killers', members: [ 123, 456] }, 
                  { _id: 456, name: 'Long Bows', members: [ 142, 456] } 
                ];

let party = [ { _id: 123, name: 'Killers', members: [ 123, 456] } ];

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
  describe('parties', function() {
    it('paritesActions:loadAvailableParties.parties |-| should be an Array()', function() {
      assert.isArray(state.parties); // with optional message
    });
    it('paritesActions:loadAvailableParties.parties |-| Element[0][0]._id should equal 123', function() {
      assert.isNumber(123, state.parties[0]._id); // with optional message
    });
    it('paritesActions:loadAvailableParties.parties |-| Element[1][1]._id should equal 456', function() {
      assert.isNumber(987, state.parties[1]._id); // with optional message
    });
  });
});


describe('updateParty', function() {
  var state = _actions.updateParty(availableParties[0]);

  describe('type', function() {
    it('paritesActions:updateParty.type |-| should exist', function() {
		  assert.isString(state.type); // with optional message
    });
    it('paritesActions:updateParty.type |-| should equal UPDATE_PARTY', function() {
      assert.equal('UPDATE_PARTY', state.type); // with optional message
    });
  });
  describe('party', function() {
    it('paritesActions:updateParty.party |-| should be an Object', function() {
      assert.isObject(state.party); // with optional message
    });
    it('paritesActions:updateParty.party |-| Element._id should equal 123', function() {
      assert.isNumber(123, state.party._id); // with optional message
    });
  });
});



describe('updatePartyMember', function() {
  var state = _actions.updatePartyMember(123);

  describe('type', function() {
    it('paritesActions:updatePartyMember.type |-| should exist', function() {
		  assert.isString(state.type); // with optional message
    });
    it('paritesActions:updatePartyMember.type |-| should equal UPDATE_PARTY_MEMBER', function() {
      assert.equal('UPDATE_PARTY_MEMBER', state.type); // with optional message
    });
  });
  describe('member', function() {
    it('paritesActions:updatePartyMember.member |-| member should equal 123', function() {
      assert.equal('123', state.member); // with optional message
    });
  });  

});