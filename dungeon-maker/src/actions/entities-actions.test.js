var assert = require('chai').assert;

import * as types from './action-types';
import { loadCharacters, loadMonsters, updateKey, updateEntityKey, updateMouseover, 
          updatePointsKey, updateEntityWeapon, updateEntityArmor, updateEntityShield,
          updateEntityDefense, updateEntityAbility, updateEntityRace
        } from './entities-actions';

var availableCharacters = [ {_id: 123, name: 'Steelhorn'}, {_id: 456, name: 'Jarim'} ];
var availableMonsters = [ {_id: 123, name: 'Goblin'}, {_id: 456, name: 'Wolf'} ];
var entity = { _id: 123, weapons: [12, 25] };

describe('loadCharacters', function() {
  var state = loadCharacters(availableCharacters);

  describe('type', function() {
    it('entitiesActions:loadCharacters.type |-| should exist', function() {
		assert.isString(state.type); // with optional message
    });
    it('entitiesActions:loadCharacters.type |-| should equal LOAD_CHARACTERS', function() {
      assert.equal('LOAD_CHARACTERS', state.type); // with optional message
    });
  });
  describe('availableCharacters', function() {
    it('entitiesActions:loadCharacters.entities |-| should be an Array()', function() {
      assert.isArray(state.entities); // with optional message
    });
    it('entitiesActions:loadCharacters.entities |-| Element[0]._id should equal 123', function() {
      assert.isNumber(123, state.entities[0]._id); // with optional message
    });
  });
});

describe('loadMonsters', function() {
  var state = loadMonsters(availableMonsters);

  describe('type', function() {
    it('entitiesActions:loadMonsters.type |-| should exist', function() {
		assert.isString(state.type); // with optional message
    });
    it('entitiesActions:loadMonsters.type |-| should equal LOAD_CHARACTERS', function() {
      assert.equal('LOAD_MONSTERS', state.type); // with optional message
    });
  });
  describe('availableMonsters', function() {
    it('entitiesActions:loadMonsters.entities |-| should be an Array()', function() {
      assert.isArray(state.entities); // with optional message
    });
    it('entitiesActions:loadMonsters.entities |-| Element[0]._id should equal 123', function() {
      assert.isNumber(123, state.entities[0]._id); // with optional message
    });
  });
});

describe('updateKey', function() {
  var state = updateKey('usedPoints', 4);

  it('entitiesActions:updateKey |-| should be an object', function() {
    assert.isObject(state); // with optional message
  });

  describe('type', function() {
    it('entitiesActions:updateKey.type |-| should exist', function() {
      assert.isString(state.type, 'Is a string'); // with optional message
    });
    it('entitiesActions:updateKey.type |-| should equal = UPDATE_KEY', function() {
      assert.equal(state.type, 'UPDATE_KEY'); // with optional message
    });
  });
  describe('key', function() {
    it('entitiesActions:updateKey.key |-| key should equal usedPoints', function() {
      assert.equal(state.key, 'usedPoints'); // with optional message
    });
  });
  describe('value', function() {
    it('entitiesActions:updateKey.value |-| value should equal 4', function() {
      assert.equal(state.value, 4); // with optional message
    });
  });
});

describe('updateEntityKey', function() {
  var state = updateEntityKey('abilities.strength.score', 16);

  it('entitiesActions:updateEntityKey |-| should be an object', function() {
    assert.isObject(state); // with optional message
  });

  describe('type', function() {
    it('entitiesActions:updateEntityKey.type |-| should exist', function() {
      assert.isString(state.type, 'Is a string'); // with optional message
    });
    it('entitiesActions:updateEntityKey.type |-| should equal = UPDATE_ENTITY_KEY', function() {
      assert.equal(state.type, 'UPDATE_ENTITY_KEY'); // with optional message
    });
  });
  describe('key', function() {
    it('entitiesActions:updateEntityKey.key |-| key should equal abilities.strength.score', function() {
      assert.equal(state.key, 'abilities.strength.score'); // with optional message
    });
  });
  describe('value', function() {
    it('entitiesActions:updateEntityKey.value |-| value should equal 16', function() {
      assert.equal(state.value, 16); // with optional message
    });
  });
});

describe('updatePointsKey', function() {
  var state = updatePointsKey('points.usedPoints', 16);

  it('entitiesActions:updatePointsKey |-| should be an object', function() {
    assert.isObject(state); // with optional message
  });

  describe('type', function() {
    it('entitiesActions:updatePointsKey.type |-| should exist', function() {
      assert.isString(state.type, 'Is a string'); // with optional message
    });
    it('entitiesActions:updatePointsKey.type |-| should equal = UPDATE_POINTS_KEY', function() {
      assert.equal(state.type, 'UPDATE_POINTS_KEY'); // with optional message
    });
  });
  describe('key', function() {
    it('entitiesActions:updatePointsKey.key |-| key should equal points.usedPoints', function() {
      assert.equal(state.key, 'points.usedPoints'); // with optional message
    });
  });
  describe('value', function() {
    it('entitiesActions:updatePointsKey.value |-| value should equal 16', function() {
      assert.equal(state.value, 16); // with optional message
    });
  });
});

describe('updateMouseover', function() {
  var entity = { _id: 123, name: 'Dire Wolf' };
  var event = { clientX: 5, clientY: 5 };
  var state = updateMouseover(entity, 'entity', event);

  describe('type', function() {
    it('entitiesActions:updateMouseover.type |-| should exist', function() {
      assert.isString(state.type, 'Is a string'); // with optional message
    });
    it('entitiesActions:updateMouseover.type |-| should equal = UPDATE_MOUSEOVER', function() {
      assert.equal(state.type, 'UPDATE_MOUSEOVER'); // with optional message
    });
  });
  describe('entity', function() {
    it('entitiesActions:updateMouseover.entity |-| entity is object', function() {
      assert.isObject(state.entity, 'title'); // with optional message
    });
    it('entitiesActions:updateMouseover.entity |-| entity.name should equal `Dire Wolf`', function() {
      assert.equal(state.entity.name, 'Dire Wolf'); // with optional message
    });
  });
  describe('entityType', function() {
    it('entitiesActions:updateMouseover.entityType |-| entityType should equal `entity`', function() {
      assert.equal(state.entityType, 'entity'); // with optional message
    });
  });
  describe('mouse', function() {
    it('entitiesActions:updateMouseover.entityType |-| mouse should be object', function() {
      assert.isObject(state.mouse); // with optional message
    });
    it('entitiesActions:updateMouseover.mouse |-| mouse.clientX should equal `5`', function() {
      assert.equal(state.mouse.clientX, 5); // with optional message
    });
  });
});

describe('updateEntityWeapon', function() {
  var state = updateEntityWeapon(12);
  
  describe('type', function() {
    it('entitiesActions:updateEntityWeapon.type |-| should exist', function() {
      assert.isString(state.type, 'Is a string'); // with optional message
    });
    it('entitiesActions:updateEntityWeapon.type |-| should equal = UPDATE_ENTITY_WEAPON', function() {
      assert.equal(state.type, 'UPDATE_ENTITY_WEAPON'); // with optional message
    });
  });
  describe('id', function() {
    it('entitiesActions:updateEntityWeapon.id |-| state.id should equal 12', function() {
      assert.equal(state.id, 12); // with optional message
    });
  });
  
});


describe('updateEntityArmor', function() {
  var state = updateEntityArmor(3);
  
  describe('type', function() {
    it('entitiesActions:updateEntityArmor.type |-| should exist', function() {
      assert.isString(state.type, 'Is a string'); // with optional message
    });
    it('entitiesActions:updateEntityArmor.type |-| should equal = UPDATE_ENTITY_ARMOR', function() {
      assert.equal(state.type, 'UPDATE_ENTITY_ARMOR'); // with optional message
    });
  });
  describe('index', function() {
    it('entitiesActions:updateEntityArmor.index |-| state.index should equal 3', function() {
      assert.equal(state.index, 3); // with optional message
    });
  });
});

describe('updateEntityShield', function() {
  var state = updateEntityShield(2);
  describe('type', function() {
    it('entitiesActions:updateEntityShield.type |-| should exist', function() {
      assert.isString(state.type, 'Is a string'); // with optional message
    });
    it('entitiesActions:updateEntityShield.type |-| should equal = UPDATE_ENTITY_ARMOR', function() {
      assert.equal(state.type, 'UPDATE_ENTITY_SHIELD'); // with optional message
    });
  });
  describe('score', function() {
    it('entitiesActions:updateEntityShield.score |-| state.score should equal 2', function() {
      assert.equal(state.score, 2); // with optional message
    });
  });
  
});

describe('updateEntityDefense', function() {
  var state = updateEntityDefense('fortitude', 12);
  describe('type', function() {
    it('entitiesActions:updateEntityDefense.type |-| should exist', function() {
      assert.isString(state.type, 'Is a string'); // with optional message
    });
    it('entitiesActions:updateEntityDefense.type |-| should equal = UPDATE_ENTITY_DEFENSE', function() {
      assert.equal(state.type, 'UPDATE_ENTITY_DEFENSE'); // with optional message
    });
  });
  describe('defense', function() {
    it('entitiesActions:updateEntityDefense.defense |-| state.defense should equal fortitude', function() {
      assert.equal(state.defense, 'fortitude'); // with optional message
    });
  });
  describe('value', function() {
    it('entitiesActions:updateEntityDefense.value |-| state.value should equal 12', function() {
      assert.equal(state.value, 12); // with optional message
    });
  });
});

describe('updateEntityAbility', function() {
  var state = updateEntityAbility({ name: 'strength', value: 12});
  describe('type', function() {
    it('entitiesActions:updateEntityAbility.type |-| should exist', function() {
      assert.isString(state.type, 'Is a string'); // with optional message
    });
    it('entitiesActions:updateEntityAbility.type |-| should equal = UPDATE_ENTITY_ABILITY', function() {
      assert.equal(state.type, 'UPDATE_ENTITY_ABILITY'); // with optional message
    });
  });
  describe('ability', function() {
    it('entitiesActions:updateEntityAbility.defense |-| ability should equal strength', function() {
      assert.equal(state.ability, 'strength'); // with optional message
    });
  });
  describe('value', function() {
    it('entitiesActions:updateEntityAbility.value |-| score should equal 12', function() {
      assert.equal(state.score, 12); // with optional message
    });
  });
});

describe('updateEntityRace', function() {
  var state = updateEntityRace(2);
  describe('type', function() {
    it('entitiesActions:updateEntityRace.type |-| should exist', function() {
      assert.isString(state.type, 'Is a string'); // with optional message
    });
    it('entitiesActions:updateEntityRace.type |-| should equal = UPDATE_ENTITY_DEFENSE', function() {
      assert.equal(state.type, 'UPDATE_ENTITY_RACE'); // with optional message
    });
  });
  describe('index', function() {
    it('entitiesActions:updateEntityRace.index |-| state.index should equal 2', function() {
      assert.equal(state.index, 2); // with optional message
    });
  });

});