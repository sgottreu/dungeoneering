var assert = require('chai').assert;

import * as types from '../actions/action-types';
import {Variables} from '../lib/Variables';
import {WeaponTemplate} from '../lib/Weapons';
import {Die} from '../lib/Die';

import weaponsReducer from './weapons-reducer';

import { loadAvailableWeapons, editAvailableWeapons, changeWeapon, changeDieType, changeDieNumber, updateKey, updateRange } from '../actions/weapons-actions';

var state = {
  availableWeapons: [],
  weapon: Variables.clone(WeaponTemplate)
};

const weapons = [ 
                  {_id: 123, name: 'Short Sword', damage: { die: 'd6', num: 1}}, 
                  {_id: 456, name: 'Long Bow', damage: { die: 'd6', num: 1}} ];


describe('weaponsReducer', function() {


  describe('initilization', function() {
    it('weaponsReducer:initilization |-| State returned if Action is not passed', function() {
      var _state = weaponsReducer();
      assert.isArray(_state.availableWeapons); // with optional message
    });
    it('weaponsReducer:initilization |-| availableWeapons should be empty', function() {
      var _state = weaponsReducer();
      assert.isArray(_state.availableWeapons); // with optional message
    });
  });

  describe('non-existant reducer', function() {
    it('weaponsReducer:non-existant reducer |-| State returned if Action is not found', function() {
      var _state = weaponsReducer(Variables.clone(state), "NULL");
      assert.equal(_state.weapon._id, false); // with optional message
    });

  });

  describe('LOAD_AVAILABLE_WEAPONS', function() {
    var action;
    var _state;

    beforeEach(function() {
      state = {
        availableWeapons: [],
        weapon: Variables.clone(WeaponTemplate)
      };
      action = loadAvailableWeapons( weapons );
      _state = weaponsReducer(Variables.clone(state), action);
    });

    it('weaponsReducer:LOAD_AVAILABLE_WEAPONS |-| loadAvailableWeapons should be an array', function() {
      assert.isArray(_state.availableWeapons); // with optional message
    });
    it('weaponsReducer:LOAD_AVAILABLE_WEAPONS |-| loadAvailableWeapons should have length of 2', function() {
      assert.lengthOf(_state.availableWeapons, 2, 'array has length of 2')
    });
    it('weaponsReducer:LOAD_AVAILABLE_WEAPONS |-| Element[1].name should equal "Short Sword"', function() {
      assert.equal('Short Sword', _state.availableWeapons[1].name); // with optional message
    });
  });
 
  describe('EDIT_AVAILABLE_WEAPONS', function() {
    describe('Update existing weapon', function() {
      var weapon, action, test;
      
      beforeEach(function() {
        state = {
          availableWeapons: weapons,
          weapon: Variables.clone(WeaponTemplate)
        };
        weapon = {_id: 456, name: 'Cross Bow', damage: { die: 'd6', num: 1}};
        action = editAvailableWeapons( weapon );
        test = weaponsReducer(state, action);
      });

      it('weaponsReducer:EDIT_AVAILABLE_WEAPONS |-| editAvailableWeapons should remain length of 2', function() {
        assert.lengthOf(test.availableWeapons, 2, 'array has length of 2')
      });
      it('weaponsReducer:EDIT_AVAILABLE_WEAPONS |-| Element[0].name should equal "Cross Bow"', function() {
        assert.equal('Cross Bow', test.availableWeapons[0].name); // with optional message
      });
    });

    describe('Adding new weapon', function() {
      var weapon, action, test;
      
      beforeEach(function() {
        state = {
          availableWeapons: weapons,
          weapon: Variables.clone(WeaponTemplate)
        };
        weapon = { _id: false, name: 'War Hammer', damage: { die: 'd6', num: 1} };
        action = editAvailableWeapons( weapon );
        test = weaponsReducer(state, action);
      });
      
      it('weaponsReducer:EDIT_AVAILABLE_WEAPONS |-| editAvailableWeapons should have length of 3', function() {
        assert.lengthOf(test.availableWeapons, 3, 'array has length of 3')
      });
      it('weaponsReducer:EDIT_AVAILABLE_WEAPONS |-| Element[0].name should equal "War Hammer"', function() {
        assert.equal('War Hammer', test.availableWeapons[2].name); // with optional message
      });
      it('weaponsReducer:EDIT_AVAILABLE_WEAPONS |-| weapon has been reset', function() {
        assert.equal('', test.weapon.name); // with optional message
      });
    });


  });


  describe('CHANGE_WEAPON', function() {
    var weapon, action, test;
    
    beforeEach(function() {
      state = {
        availableWeapons: [],
        weapon: Variables.clone(WeaponTemplate)
      };

      action = loadAvailableWeapons( weapons );
      state = weaponsReducer(state, action);
    });

    it('weaponsReducer:CHANGE_WEAPON |-| change weapon._id: false to 456', function() {
      action = changeWeapon( 1 );
      state = weaponsReducer(state, action);  

      assert.equal(state.weapon._id, 456); // with optional message
    });
  
    it('weaponsReducer:CHANGE_WEAPON |-| change weapon._id: 456 to false', function() {
      action = changeWeapon( 1 );
      state = weaponsReducer(state, action);

      action = changeWeapon( 0 );
      state = weaponsReducer(state, action);      
      assert.equal(state.weapon._id, false); // with optional message
    });

    it('weaponsReducer:CHANGE_WEAPON |-| test that damage as string is converted to obj', function() {
      weapon = {_id: 456, name: 'Long Bow', damage: '1d6'};
      action = editAvailableWeapons( weapon );
      test = weaponsReducer(state, action);
      
      action = changeWeapon( 1 );
      state = weaponsReducer(state, action);  

      assert.isObject(state.weapon.damage); // with optional message
    });

  });

  describe('UPDATE_KEY', function() {
    var state, action;

    beforeEach(function() {
      state = {
        availableWeapons: [],
        weapon: Variables.clone(WeaponTemplate)
      };
      action = updateKey('name', 'Sword');
      state = weaponsReducer(state, action);
    });

    it('weaponsReducer:UPDATE_KEY |-| name should be "Sword"', function() {
      assert.equal(state.weapon.name, 'Sword'); // with optional message
    });
  });

  describe('UPDATE_RANGE', function() {
    var action = updateRange('low', 10);
    var _state = weaponsReducer(state, action);

    it('weaponsReducer:UPDATE_RANGE |-| range.low should be 10', function() {
      assert.equal(_state.weapon.range.low, 10); // with optional message
    });
  });

  describe('CHANGE_DIE_TYPE', function() {
    var action = changeDieType(3);
    var _state = weaponsReducer(Variables.clone(state), action);

    it('weaponsReducer:CHANGE_DIE_TYPE |-| damage.die should be "d10"', function() {
      assert.equal(_state.weapon.damage.die, 'd10'); // with optional message
    });
  });

  describe('CHANGE_DIE_NUMBER', function() {
    var action = changeDieNumber(3);
    var _state = weaponsReducer(Variables.clone(state), action);

    it('weaponsReducer:CHANGE_DIE_NUMBER |-| damage.num should be "3"', function() {
      assert.equal(_state.weapon.damage.num, 3); // with optional message
    });
  });

});