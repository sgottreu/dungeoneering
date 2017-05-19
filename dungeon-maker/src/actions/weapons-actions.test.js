var assert = require('chai').assert;

import * as types from './action-types';
import { loadAvailableWeapons, editAvailableWeapons, changeWeapon, changeDieType, changeDieNumber, updateKey, updateRange } from './weapons-actions';

var weapons = [ {_id: 123, name: "Short Sword"}, {_id:456} ];
var weapon = { _id: 123, name: "Short Sword" };

describe('loadAvailableWeapons', function() {

  var state = loadAvailableWeapons(weapons);

  describe('type', function() {
    
    it('weaponsActions:loadAvailableWeapons.type |-| should exist', function() {
		  assert.isString(state.type); // with optional message
    });
    it('weaponsActions:loadAvailableWeapons.type |-| should equal LOAD_AVAILABLE_WEAPONS', function() {
      assert.equal('LOAD_AVAILABLE_WEAPONS', state.type); // with optional message
    });
  });
  describe('weapons', function() {
    it('weaponsActions:loadAvailableWeapons.weapons |-| should be an Array()', function() {
      assert.isArray(state.weapons); // with optional message
    });
    it('weaponsActions:loadAvailableWeapons.weapons |-| Element[0]._id should equal 123', function() {
      assert.isNumber(state.weapons[0]._id); // with optional message
    });
  });
});

describe('editAvailableWeapons', function() {
  var state;
  beforeEach(function() {
    state = editAvailableWeapons(weapon);
  });

  it('weaponsActions:editAvailableWeapons.type |-| should exist', function() {
	  assert.isString(state.type); // with optional message
  });
  it('weaponsActions:editAvailableWeapons.type |-| should equal EDIT_AVAILABLE_WEAPONS', function() {
    assert.equal('EDIT_AVAILABLE_WEAPONS', state.type); // with optional message
  });

  it('weaponsActions:editAvailableWeapons.weapon |-| should be an Object()', function() {
    assert.isObject(state.weapon); // with optional message
  });
  it('weaponsActions:editAvailableWeapons.weapons |-| Element[0]._id should equal 123', function() {
    assert.equal('Short Sword', state.weapon.name); // with optional message
  });

});

describe('changeWeapon', function() {
  var state = changeWeapon(3);

  describe('type', function() {
    it('weaponsActions:changeWeapon.type |-| should exist', function() {
      assert.isString(state.type, 'Is a string'); // with optional message
    });
    it('weaponsActions:changeWeapon.type |-| should equal = CHANGE_WEAPON', function() {
      assert.equal(state.type, 'CHANGE_WEAPON'); // with optional message
    });
  });
  describe('index', function() {
    it('weaponsActions:changeWeapon.index |-| index should equal 3', function() {
      assert.equal(state.index, 3); // with optional message
    });
  }); 
});

describe('changeDieType', function() {
  var state = changeDieType(3);

  describe('type', function() {
    it('weaponsActions:changeDieType.type |-| should exist', function() {
      assert.isString(state.type, 'Is a string'); // with optional message
    });
    it('weaponsActions:changeDieType.type |-| should equal = CHANGE_DIE_TYPE', function() {
      assert.equal(state.type, 'CHANGE_DIE_TYPE'); // with optional message
    });
  });
  describe('index', function() {
    it('weaponsActions:changeDieType.index |-| index should equal 3', function() {
      assert.equal(state.index, 3); // with optional message
    });
  }); 
});


describe('changeDieNumber', function() {
  var state = changeDieNumber(3);

  describe('type', function() {
    it('weaponsActions:changeDieNumber.type |-| should exist', function() {
      assert.isString(state.type, 'Is a string'); // with optional message
    });
    it('weaponsActions:changeDieNumber.type |-| should equal = CHANGE_DIE_NUMBER', function() {
      assert.equal(state.type, 'CHANGE_DIE_NUMBER'); // with optional message
    });
  });
  describe('quantity', function() {
    it('weaponsActions:changeDieNumber.quantity |-| quantity should equal 3', function() {
      assert.equal(state.quantity, 3); // with optional message
    });
  }); 
});

describe('updateKey', function() {
  var state = updateKey('name', 'Short Sword');

  it('weaponsActions:updateKey |-| should be an object', function() {
    assert.isObject(state); // with optional message
  });

  describe('type', function() {
    it('weaponsActions:updateKey.type |-| should exist', function() {
      assert.isString(state.type, 'Is a string'); // with optional message
    });
    it('weaponsActions:updateKey.type |-| should equal = UPDATE_KEY', function() {
      assert.equal(state.type, 'UPDATE_KEY'); // with optional message
    });
  });
  describe('key', function() {
    it('weaponsActions:updateKey.key |-| key should equal name', function() {
      assert.equal(state.key, 'name'); // with optional message
    });
  });
  describe('value', function() {
    it('weaponsActions:updateKey.value |-| value should equal "Short Sword"', function() {
      assert.equal(state.value, 'Short Sword'); // with optional message
    });
  });

  
});

describe('updateRange', function() {
  var state = updateRange('low', 10);

  describe('type', function() {
    it('weaponsActions:updateRange.type |-| should equal = UPDATE_RANGE', function() {
      assert.equal(state.type, 'UPDATE_RANGE'); // with optional message
    });
  });
  describe('key', function() {
    it('weaponsActions:updateRange.key |-| key should equal low', function() {
      assert.equal(state.key, 'low'); // with optional message
    });
  });
  describe('value', function() {
    it('weaponsActions:updateRange.value |-| value should equal 10', function() {
      assert.equal(state.value, 10); // with optional message
    });
  });

  
});

