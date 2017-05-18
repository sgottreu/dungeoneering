var assert = require('chai').assert;

import * as types from '../actions/action-types';
import {Variables} from '../lib/Variables';
import {PowerTemplate} from '../components/_Powers';
import {Die} from '../lib/Die';

import powersReducer from './powers-reducer';

import { loadExistingPowers, addToPowers, resetCurrentPower, changeCurrentPower, changeDieType, changeDieNumber, changeDieModifier, updateKey, updateAttack } from '../actions/powers-actions';



describe('powersReducer', function() {

  const state = {
    existingPowers: [],
    current_power: false,
    power: Variables.clone(PowerTemplate)
  };

  const powers = [ {_id: 123, name: 'Melee'}, {_id: 456} ];

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

  describe('non-existant reducer', function() {
    it('powersReducer:non-existant reducer |-| State returned if Action is not found', function() {
      var _state = powersReducer(state, "NULL");
      assert.equal(_state.power._id, undefined); // with optional message
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
 

  describe('ADD_TO_POWERS', function() {
    var _state = Object.assign({}, state);
    _state.existingPowers = powers;

    it('powersReducer:ADD_TO_POWERS |-| add new power to existingPowers', function() {
      /* Setup */
      _state.existingPowers = powers;
      var power = { name: 'blast'};

      var action = addToPowers( power );
      _state = powersReducer(_state, action);

      assert.equal(_state.existingPowers.length, 3); // with optional message
    });
    it('powersReducer:ADD_TO_POWERS |-| update existingPowers[0]', function() {
      /* Setup */
      _state.existingPowers = powers;
      var power = powers[0];
      power.name = "Ranged";

      var action = addToPowers( power );
      _state = powersReducer(_state, action);
   
      assert.equal(_state.existingPowers[0].name, 'Ranged'); // with optional message
    });
  });


  describe('CHANGE_CURRENT_POWER', function() {
    var _state = Object.assign({}, state);
    _state.existingPowers = powers;

    it('powersReducer:CHANGE_CURRENT_POWER |-| change from current_power: false to 1', function() {
      var action = changeCurrentPower( 1 );
      _state = powersReducer(_state, action);      
      assert.equal(_state.current_power, 1); // with optional message
    });
    it('powersReducer:CHANGE_CURRENT_POWER |-| change power._id: false to 123', function() {
      var action = changeCurrentPower( 1 );
      _state = powersReducer(_state, action);      
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

  describe('RESET_CURRENT_POWER', function() {
    it('powersReducer:RESET_CURRENT_POWER |-| change power._id: 123 to false', function() {
      var action = changeCurrentPower( 1 );
      var _state = powersReducer(state, action);

      action = resetCurrentPower( _state.power );
      _state = powersReducer(_state, action);      
      assert.equal(_state.power._id, false); // with optional message
    });
    it('powersReducer:RESET_CURRENT_POWER |-| change current_power to false', function() {
      var action = changeCurrentPower( 1 );
      var _state = powersReducer(state, action);

      action = resetCurrentPower( _state.power );
      _state = powersReducer(_state, action);      
      assert.equal(_state.current_power, false); // with optional message
    });
    it('powersReducer:RESET_CURRENT_POWER |-| confirm name stays the same', function() {
      var action = changeCurrentPower( 1 );
      var _state = powersReducer(state, action);

      action = resetCurrentPower( _state.power );
      var _state2 = powersReducer(_state, action);      
      assert.equal(_state.power.name, _state2.name); // with optional message
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

  describe('CHANGE_DIE_TYPE', function() {
    var action = changeDieType(3);
    var _state = powersReducer(state, action);

    it('powersReducer:CHANGE_DIE_TYPE |-| damage.die should be "d10"', function() {
      assert.equal(_state.power.damage.die, 'd10'); // with optional message
    });
  });

  describe('CHANGE_DIE_NUMBER', function() {
    var action = changeDieNumber(3);
    var _state = powersReducer(state, action);

    it('powersReducer:CHANGE_DIE_NUMBER |-| damage.num should be "3"', function() {
      assert.equal(_state.power.damage.num, 3); // with optional message
    });
  });

  describe('CHANGE_DIE_MODIFIER', function() {
    var action = changeDieModifier(3);
    var _state = powersReducer(state, action);

    it('powersReducer:CHANGE_DIE_MODIFIER |-| damage.die should be "3"', function() {
      assert.equal(_state.power.damage.modifier, '3'); // with optional message
    });
  });

});