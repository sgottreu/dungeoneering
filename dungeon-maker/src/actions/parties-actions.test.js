var assert = require('chai').assert;

import * as types from './action-types';
import * as _actions from './parties-actions';

import {Variables} from '../lib/Variables';

let availableParties = [
  [ {_id: 123, name: 'Steelhorn'}, {_id: 456, name: 'Jarim'} ],
  [ {_id: 789, name: 'Oaken-Shield'}, {_id: 987, name: 'Jester'} ]
];

let party = [ {_id: 123, name: 'Steelhorn'}, {_id: 456, name: 'Jarim'} ];

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
      assert.isNumber(123, state.parties[0][0]._id); // with optional message
    });
    it('paritesActions:loadAvailableParties.parties |-| Element[1][1]._id should equal 987', function() {
      assert.isNumber(987, state.parties[1][1]._id); // with optional message
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
    it('paritesActions:updateParty.party |-| should be an Array()', function() {
      assert.isArray(state.party); // with optional message
    });
    it('paritesActions:updateParty.party |-| Element[0]._id should equal 123', function() {
      assert.isNumber(123, state.party[0]._id); // with optional message
    });
  });
});


describe('updatePartyName', function() {
  var state = _actions.updatePartyName('Killers');

  describe('type', function() {
    it('paritesActions:updatePartyName.type |-| should exist', function() {
		  assert.isString(state.type); // with optional message
    });
    it('paritesActions:updatePartyName.type |-| should equal UPDATE_PARTY_NAME', function() {
      assert.equal('UPDATE_PARTY_NAME', state.type); // with optional message
    });
  });
  describe('name', function() {
    it('paritesActions:updatePartyName.name |-| should be an string()', function() {
      assert.isString(state.name); // with optional message
    });
    it('paritesActions:updatePartyName.name |-| Name should equal "Killers"', function() {
      assert.equal('Killers', state.name); // with optional message
    });
  });
});

describe('updatePartyMember', function() {
  var state = _actions.updatePartyMember(availableParties[0][0], 1);

  describe('type', function() {
    it('paritesActions:updatePartyMember.type |-| should exist', function() {
		  assert.isString(state.type); // with optional message
    });
    it('paritesActions:updatePartyMember.type |-| should equal UPDATE_PARTY_MEMBER', function() {
      assert.equal('UPDATE_PARTY_MEMBER', state.type); // with optional message
    });
  });
  describe('member', function() {
    it('paritesActions:updatePartyMember.member |-| should be an object()', function() {
      assert.isObject(state.member); // with optional message
    });
    it('paritesActions:updatePartyMember.member |-| name should equal Steelhorn', function() {
      assert.equal('Steelhorn', state.member.name); // with optional message
    });
  });  
  describe('index', function() {
    it('paritesActions:updatePartyMember.index |-| index should equal 1', function() {
      assert.equal(1, state.index); // with optional message
    });
  });
});