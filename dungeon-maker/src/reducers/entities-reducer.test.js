var assert = require('chai').assert;

import * as types from '../actions/action-types';
import {Variables} from '../lib/Variables';
import Slots from '../lib/Slots.js';
import TileOptions from '../lib/TileOptions';
import entitiesReducer from './entities-reducer';
import { loadCharacters, loadMonsters, updateKey, updateEntityKey, updatePointsKey, updateMouseover, updateEntityLevel, updateEntityHp,
          updateEntityWeapon, updateEntityArmor, updateEntityShield, updateEntityArmorclass, updateEntityDefense, updateEntityAbility,
          updateEntityRace, updateEntityClass, updateEntityCharacterPower, updateEntityMonsterPower, updateEntityInitiative
        
      } from '../actions/entities-actions';
import * as Entity from '../lib/Entity';

const state = {
  availableCharacters: [],
  availableMonsters: [],
  availableWeapons: [
    {
      "_id": "58b4a82b779af027180006a3",
      "category": "Military",
      "type": "melee",
      "name": "Maul",
      "range": false,
      "prof": 2,
      "damage": "1d6",
      "price": 5,
      "weight": 2,
      "_type": "weapon"
    }
  ],
  entity: Variables.clone(Entity.Template),
  points: {
    totalRacePoints: 0,
    usedPoints: 0,
    remainingPoints: 0
  },
  selectedEntity: false,
  
  hoverObj: {
    obj: false,
    type: false
  },
  mouse: {
    clientX: false,
    clientY: false
  }
};

const availableCharacters = [ {_id: 123, name: 'Steelhorn'}, {_id: 456, name: 'Jarim'} ];
const availableMonsters = [ {_id: 123, name: 'Wolf'}, {_id: 456, name: 'Goblin'} ];

describe('entitiesReducer', function() {
  describe('initilization', function() {
    it('entitiesReducer:initilization |-| State returned if Action is not passed', function() {
      var _state = entitiesReducer();
      assert.isArray(_state.availableCharacters); // with optional message
    });
    it('entitiesReducer:initilization |-| availableWeapons should be empty', function() {
      var _state = entitiesReducer();
      assert.lengthOf(_state.availableCharacters, 0, 'array has length of 0')
    });
  });

  describe('non-existant reducer', function() {
    it('entitiesReducer:non-existant reducer |-| State returned if Action is not found', function() {
      var _state = entitiesReducer(state, "NULL");
      assert.equal(_state.entity.name, ''); // with optional message
    });
  });
});

describe('LOAD_CHARACTERS', function() {
  let action, _state;
  beforeEach(function() {
    action = loadCharacters( availableCharacters );
    _state = entitiesReducer(Variables.clone(state), action);
  });

  it('entitiesReducer:LOAD_CHARACTERS |-| availableCharacters should be an array', function() {
    assert.isArray(_state.availableCharacters); // with optional message
  });
  it('entitiesReducer:LOAD_CHARACTERS |-| availableCharacters should have length of 2', function() {
    assert.lengthOf(_state.availableCharacters, 2, 'array has length of 2')
  });
  it('entitiesReducer:LOAD_CHARACTERS |-| Element[0]._id should equal 456', function() {
    assert.equal(456, _state.availableCharacters[0]._id); // with optional message
  });
});

describe('LOAD_MONSTERS', function() {
  let action, _state;
  beforeEach(function() {
    action = loadMonsters( availableMonsters );
    _state = entitiesReducer(Variables.clone(state), action);
  });

  it('entitiesReducer:LOAD_MONSTERS |-| availableMonsters should be an array', function() {
    assert.isArray(_state.availableMonsters); // with optional message
  });
  it('entitiesReducer:LOAD_MONSTERS |-| availableMonsters should have length of 2', function() {
    assert.lengthOf(_state.availableMonsters, 2, 'array has length of 2')
  });
  it('entitiesReducer:LOAD_MONSTERS |-| Element[0]._id should equal 456', function() {
    assert.equal(456, _state.availableMonsters[0]._id); // with optional message
  });
});

describe('UPDATE_MOUSEOVER', function() {
  let action, _state, entity, entityType, event;
  beforeEach(function() {
    let entity = { _id: 123, name: 'Goblin' };
    let event = { clientX: 10, clientY: 20 };
    action = updateMouseover( entity, 'entity', event);
    _state = entitiesReducer(Variables.clone(state), action);
  });

  it('powersReducer:UPDATE_MOUSEOVER |-| mouse.clientX should equal `10`', function() {
    assert.equal(_state.mouse.clientX, 10); // with optional message
  });
  it('powersReducer:UPDATE_MOUSEOVER |-| entity should be object', function() {
    assert.isObject(_state.hoverObj.obj); // with optional message
  });
  it('powersReducer:UPDATE_MOUSEOVER |-| entity.name should equal `Goblin`', function() {
    assert.equal(_state.hoverObj.obj.name, 'Goblin'); // with optional message
  });
  it('powersReducer:UPDATE_MOUSEOVER |-| entityType should equal `entity`', function() {
    assert.equal(_state.hoverObj.type, 'entity'); // with optional message
  });
});

describe('UPDATE_KEY', function() {
  let action, _state;
  beforeEach(function() {
    action = updateKey( 'selectedEntity', 4);
    _state = entitiesReducer(Variables.clone(state), action);
  });

  it('entitiesReducer:UPDATE_KEY |-| selectedEntity should equal 4', function() {
    assert.equal(_state.selectedEntity, 4); // with optional message
  });
  it('entitiesReducer:UPDATE_KEY |-| selectedEntity is remains the same', function() {
    action = updateKey( 'selectedEntity', undefined);
    _state = entitiesReducer(_state, action);
    assert.equal(_state.selectedEntity, 4); // with optional message
  });
});


describe('UPDATE_ENTITY_KEY', function() {
  let action, _state;
  beforeEach(function() {
    action = updateEntityKey( 'abilities.strength.score', 16);
    _state = entitiesReducer(Variables.clone(state), action);
  });

  it('entitiesReducer:UPDATE_ENTITY_KEY |-| abilities.strength.score should equal 16', function() {
    assert.equal(_state.entity.abilities.strength.score, 16); // with optional message
  });
  it('entitiesReducer:UPDATE_ENTITY_KEY |-| level equals `12`', function() {
    action = updateEntityKey( 'level', 12);
    _state = entitiesReducer(_state, action);
    assert.equal(_state.entity.level, 12); // with optional message
  });
});

describe('UPDATE_POINTS_KEY', function() {
  let action, _state;
  beforeEach(function() {
    action = updatePointsKey( 'usedPoints', 16);
    _state = entitiesReducer(Variables.clone(state), action);
  });

  it('entitiesReducer:UPDATE_POINTS_KEY |-| points.usedPoints should equal 16', function() {
    assert.equal(_state.points.usedPoints, 16); // with optional message
  });
});




describe('UPDATE_ENTITY_WEAPON', function() {
  let action, _state;
  
  describe('Adding new weapon', function() {
    beforeEach(function() {
      _state = Variables.clone( state );

      _state.entity.coin_purse = 100;
      _state.entity.encumbered = 0;
      _state.entity._type = 'character';


      action = updateEntityWeapon( '58b4a82b779af027180006a3' );
      _state = entitiesReducer(_state, action);
    });


    it('entitiesReducer:UPDATE_ENTITY_WEAPON |-| weapons array length of 1', function() {
      assert.lengthOf(_state.entity.weapons, 1); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_WEAPON |-| weapons[2] should equal 34', function() {
      assert.equal(_state.entity.weapons[0], '58b4a82b779af027180006a3'); // with optional message
    });

    it('entitiesReducer:UPDATE_ENTITY_ARMOR |-| coin_purse = 95', function() {
      assert.equal(_state.entity.coin_purse, 95); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_ARMOR |-| encumbered should = 2', function() {
      assert.equal(_state.entity.encumbered, 2); // with optional message
    });

    it('entitiesReducer:UPDATE_ENTITY_ARMOR |-| inventory[0].name = Maul', function() {
      assert.equal(_state.entity.inventory[0].item.name, 'Maul'); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_ARMOR |-| inventory_log[0].item.name should = Maul', function() {
      assert.equal(_state.entity.inventory_log[0].item.name, 'Maul'); // with optional message
    });

  });

  describe('removing weapon', function() {
    beforeEach(function() {
      _state = Variables.clone( state );

      _state.entity.coin_purse = 100;
      _state.entity.encumbered = 0;
      _state.entity._type = 'character';


      action = updateEntityWeapon( '58b4a82b779af027180006a3' );
      _state = entitiesReducer(_state, action);

      action = updateEntityWeapon( '58b4a82b779af027180006a3' );
      _state = entitiesReducer(_state, action);
    });


    it('entitiesReducer:UPDATE_ENTITY_WEAPON |-| weapons array length of 0', function() {
      assert.lengthOf(_state.entity.weapons, 0); // with optional message
    });

    it('entitiesReducer:UPDATE_ENTITY_ARMOR |-| coin_purse = 100', function() {
      assert.equal(_state.entity.coin_purse, 100); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_ARMOR |-| encumbered should = 0', function() {
      assert.equal(_state.entity.encumbered, 0); // with optional message
    });

    it('entitiesReducer:UPDATE_ENTITY_ARMOR |-| inventory length of 1', function() {
      assert.lengthOf(_state.entity.inventory, 1); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_ARMOR |-| inventory[0].quantity = 0', function() {
      assert.equal(_state.entity.inventory[0].item.quantity, 0); // with optional message
    });

    it('entitiesReducer:UPDATE_ENTITY_ARMOR |-| inventory_log length of 1', function() {
      assert.lengthOf(_state.entity.inventory_log, 1); // with optional message
    });

  });

});


describe('UPDATE_ENTITY_ARMOR', function() {
  let action, _state;
  
  describe('Adding Hide Armor to lvl 6 Ranger with +4 Con mod', function() {
    beforeEach(function() {
      _state = Variables.clone( state );

      _state.entity._type = 'character';
      _state.entity.level = 6;
      _state.entity.class = 3; // Ranger
      _state.entity.armor = 2; // Leather 

      _state.entity.abilities = {
          strength: { abilityMod: 5 }, constitution: { abilityMod: 4 },
          dexterity: { abilityMod: 3 }, intelligence: { abilityMod: 2 },
          wisdom: { abilityMod: 2 }, charisma: { abilityMod: 0 }
      };

      _state.entity.inventory = [ { category: 'armor' , item: {"name":"Leather","score":2,"check":0,"speed":0,"price":25,"weight":15,"_id":"58d18cd2481cfb2b38b54bc3"} }];
      _state.entity.inventory_log = [ { category: 'armor' , item: {"name":"Leather","score":2,"check":0,"speed":0,"price":25,"weight":15,"_id":"58d18cd2481cfb2b38b54bc3"} }];
      _state.entity.coin_purse = 75;
      _state.entity.encumbered = 50;

      action = updateEntityArmor( 3 );
      _state = entitiesReducer(_state, action);

       let bedroll = { "_id": "58d18bcf05bd3e1a9c3cf4c0", "category": "Adventurer Kit", "name": "Bedroll", "price": 1,  "weight": 2,  "quantity": 1, "_type": "gear" };

      _state.entity.inventory = Entity.addInventory(bedroll, 'gear', _state.entity.inventory);
      _state.entity.inventory_log = Entity.addInventoryLog(bedroll, 'gear', _state.entity.inventory_log);
      _state.entity.coin_purse = _state.entity.coin_purse - bedroll.price;
      _state.entity.encumbered = _state.entity.encumbered - bedroll.weight;
    });

    it('entitiesReducer:UPDATE_ENTITY_ARMOR |-| coin_purse = 69', function() {
      assert.equal(_state.entity.coin_purse, 69); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_ARMOR |-| encumbered should = 58', function() {
      assert.equal(_state.entity.encumbered, 58); // with optional message
    });

    it('entitiesReducer:UPDATE_ENTITY_ARMOR |-| inventory[0].name = Hide', function() {
      assert.equal(_state.entity.inventory[0].item.name, 'Hide'); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_ARMOR |-| inventory_log[0].item.name should = Bedroll', function() {
      assert.equal(_state.entity.inventory_log[0].item.name, 'Bedroll'); // with optional message
    });

    it('entitiesReducer:UPDATE_ENTITY_ARMOR |-| armorClass.total = 20', function() {
      assert.equal(_state.entity.defense.armorClass.total, 20); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_ARMOR |-| armorClass.armorBonus = 3', function() {
      assert.equal(_state.entity.defense.armorClass.armorBonus, 3); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_ARMOR |-| armorClass.abilityMod = 4', function() {
      assert.equal(_state.entity.defense.armorClass.abilityMod, 4); // with optional message
    });
  });

  describe('Adding Plate Armor to lvl 8 Monster with +6 Con mod w/ Heavy Shield', function() {
    beforeEach(function() {
      _state = Variables.clone( state );

      _state.entity._type = 'monster';
      _state.entity.level = 8;
      _state.entity.armor = 6; // Leather 
      _state.entity.defense.armorClass.shield = 2; // Heavy Shield

      _state.entity.abilities = {
          strength: { abilityMod: 5 }, constitution: { abilityMod: 6 },
          dexterity: { abilityMod: 3 }, intelligence: { abilityMod: 2 },
          wisdom: { abilityMod: 2 }, charisma: { abilityMod: 0 }
      };

      action = updateEntityArmor( 6 );
      _state = entitiesReducer(_state, action);

       let bedroll = { "_id": "58d18bcf05bd3e1a9c3cf4c0", "category": "Adventurer Kit", "name": "Bedroll", "price": 1,  "weight": 2,  "quantity": 1, "_type": "gear" };

      _state.entity.inventory = Entity.addInventory(bedroll, 'gear', _state.entity.inventory);
      _state.entity.inventory_log = Entity.addInventoryLog(bedroll, 'gear', _state.entity.inventory_log);

    });

    it('entitiesReducer:UPDATE_ENTITY_ARMOR |-| entity.armor = 6', function() {
      assert.equal(_state.entity.armor, 6); // with optional message
    });

    it('entitiesReducer:UPDATE_ENTITY_ARMOR |-| coin_purse = 0', function() {
      assert.equal(_state.entity.coin_purse, 0); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_ARMOR |-| encumbered should = 0', function() {
      assert.equal(_state.entity.encumbered, 0); // with optional message
    });

    it('entitiesReducer:UPDATE_ENTITY_ARMOR |-| inventory[0].name = Plate', function() {
      assert.equal(_state.entity.inventory[0].item.name, 'Plate'); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_ARMOR |-| inventory_log[0].item.name should = Bedroll', function() {
      assert.equal(_state.entity.inventory_log[0].item.name, 'Bedroll'); // with optional message
    });

    it('entitiesReducer:UPDATE_ENTITY_ARMOR |-| armorClass.total = 34', function() {
      assert.equal(_state.entity.defense.armorClass.total, 34); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_ARMOR |-| armorClass.armorBonus = 8', function() {
      assert.equal(_state.entity.defense.armorClass.armorBonus, 8); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_ARMOR |-| armorClass.abilityMod = 6', function() {
      assert.equal(_state.entity.defense.armorClass.abilityMod, 6); // with optional message
    });
  });

});

describe('UPDATE_ENTITY_SHIELD', function() {
  let action, _state;
  
  describe('Adding Heavy Shield to lvl 6 Paladin with +4 Con mod', function() {
    beforeEach(function() {
      _state = Variables.clone( state );

      _state.entity._type = 'character';
      _state.entity.level = 6;
      _state.entity.class = 2; // Paladin
      _state.entity.armor = 6; // Plate 

      _state.entity.abilities = {
          strength: { abilityMod: 5 }, constitution: { abilityMod: 4 },
          dexterity: { abilityMod: 3 }, intelligence: { abilityMod: 2 },
          wisdom: { abilityMod: 2 }, charisma: { abilityMod: 0 }
      };

      _state.entity.coin_purse = 100;
      _state.entity.encumbered = 20;

      action = updateEntityArmor( 6 );
      _state = entitiesReducer(_state, action);

      action = updateEntityShield( 2 );
      _state = entitiesReducer(_state, action);
    });

    it('entitiesReducer:UPDATE_ENTITY_SHIELD |-| coin_purse = 40', function() {
      assert.equal(_state.entity.coin_purse, 40); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_SHIELD |-| encumbered should = 85', function() {
      assert.equal(_state.entity.encumbered, 85); // with optional message
    });

    it('entitiesReducer:UPDATE_ENTITY_SHIELD |-| inventory_log[0].item.name should = Heavy Shield', function() {
      assert.equal(_state.entity.inventory_log[0].item.name, 'Heavy Shield'); // with optional message
    });

    it('entitiesReducer:UPDATE_ENTITY_SHIELD |-| armorClass.total = 27', function() {
      assert.equal(_state.entity.defense.armorClass.total, 27); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_SHIELD |-| shield = 2', function() {
      assert.equal(_state.entity.shield, 2); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_SHIELD |-| armorClass.shield = 2', function() {
      assert.equal(_state.entity.defense.armorClass.shield, 2); // with optional message
    });
  });

  describe('Adding Light Shield to lvl 6 Paladin with +4 Con mod', function() {
    beforeEach(function() {
      _state = Variables.clone( state );

      _state.entity._type = 'character';
      _state.entity.level = 6;
      _state.entity.class = 2; // Paladin
      _state.entity.armor = 6; // Plate 

      _state.entity.abilities = {
          strength: { abilityMod: 5 }, constitution: { abilityMod: 4 },
          dexterity: { abilityMod: 3 }, intelligence: { abilityMod: 2 },
          wisdom: { abilityMod: 2 }, charisma: { abilityMod: 0 }
      };

      _state.entity.coin_purse = 100;
      _state.entity.encumbered = 20;

      action = updateEntityArmor( 6 );
      _state = entitiesReducer(_state, action);

      action = updateEntityShield( 2 );
      _state = entitiesReducer(_state, action);

      action = updateEntityShield( 1 );
      _state = entitiesReducer(_state, action);
    });

    it('entitiesReducer:UPDATE_ENTITY_SHIELD |-| coin_purse = 45', function() {
      assert.equal(_state.entity.coin_purse, 45); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_SHIELD |-| encumbered should = 76', function() {
      assert.equal(_state.entity.encumbered, 76); // with optional message
    });

    it('entitiesReducer:UPDATE_ENTITY_SHIELD |-| inventory[1].item.name should = Light Shield', function() {
      assert.equal(_state.entity.inventory[1].item.name, 'Light Shield'); // with optional message
    });

    it('entitiesReducer:UPDATE_ENTITY_SHIELD |-| inventory_log[0].item.name should = Light Shield', function() {
      assert.equal(_state.entity.inventory_log[0].item.name, 'Light Shield'); // with optional message
    });

    it('entitiesReducer:UPDATE_ENTITY_SHIELD |-| armorClass.total = 26', function() {
      assert.equal(_state.entity.defense.armorClass.total, 26); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_SHIELD |-| shield = 1', function() {
      assert.equal(_state.entity.shield, 1); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_SHIELD |-| armorClass.shield = 1', function() {
      assert.equal(_state.entity.defense.armorClass.shield, 1); // with optional message
    });
  });

});

describe('UPDATE_ENTITY_ARMORCLASS', function() {
  let action, _state;
  
  describe('Adding ArmorClass to lvl 1 character', function() {
    beforeEach(function() {
      _state = Variables.clone( state );

      _state.entity._type = 'character';
      _state.entity.level = 1;

      action = updateEntityArmorclass( 16 );
      _state = entitiesReducer(_state, action);
    });

    it('entitiesReducer:UPDATE_ENTITY_DEFENSE |-| defense.fortitude.total = 16', function() {
      assert.equal(_state.entity.defense.armorClass.total, 16); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_DEFENSE |-| defense.fortitude.abilityMod = 4', function() {
      assert.equal(_state.entity.defense.armorClass.misc, 4); // with optional message
    });
  });
});

describe('UPDATE_ENTITY_DEFENSE', function() {
  let action, _state;
  
  describe('Adding Fortitude to lvl 10 Paladin with +6 Str mod', function() {
    beforeEach(function() {
      _state = Variables.clone( state );

      _state.entity._type = 'character';
      _state.entity.level = 10;
      _state.entity.class = 2; // Paladin
      _state.entity.armor = 6; // Plate 

      _state.entity.abilities = {
          strength: { abilityMod: 6 }, constitution: { abilityMod: 4 },
          dexterity: { abilityMod: 3 }, intelligence: { abilityMod: 2 },
          wisdom: { abilityMod: 2 }, charisma: { abilityMod: 0 }
      };
      _state.entity.defense.fortitude = { total: 0, default: 10, abilityMod: 0, classBonus: 1, raceBonus: 0, misc: 0 };

      action = updateEntityShield( 2 );
      _state = entitiesReducer(_state, action);

      action = updateEntityDefense( 'fortitude' );
      _state = entitiesReducer(_state, action);
    });

    it('entitiesReducer:UPDATE_ENTITY_DEFENSE |-| defense.fortitude.total = 22', function() {
      assert.equal(_state.entity.defense.fortitude.total, 22); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_DEFENSE |-| defense.fortitude.abilityMod = 6', function() {
      assert.equal(_state.entity.defense.fortitude.abilityMod, 6); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_DEFENSE |-| defense.fortitude.halfLvl = 5', function() {
      assert.equal(_state.entity.defense.fortitude.halfLvl, 5); // with optional message
    });
  });

  describe('Adding Reflex to lvl 10 Paladin with +3 Dex mod', function() {
    beforeEach(function() {
      _state = Variables.clone( state );

      _state.entity._type = 'character';
      _state.entity.level = 10;
      _state.entity.class = 2; // Paladin
      _state.entity.armor = 6; // Plate 

      _state.entity.abilities = {
          strength: { abilityMod: 6 }, constitution: { abilityMod: 4 },
          dexterity: { abilityMod: 3 }, intelligence: { abilityMod: 2 },
          wisdom: { abilityMod: 2 }, charisma: { abilityMod: 0 }
      };
      _state.entity.defense.reflex = { total: 0, default: 10, abilityMod: 0, classBonus: 1, raceBonus: 0, misc: 0 };

      action = updateEntityShield( 2 );
      _state = entitiesReducer(_state, action);

      action = updateEntityDefense( 'reflex' );
      _state = entitiesReducer(_state, action);
    });

    it('entitiesReducer:UPDATE_ENTITY_DEFENSE |-| defense.reflex.total = 21', function() {
      assert.equal(_state.entity.defense.reflex.total, 21); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_DEFENSE |-| defense.reflex.abilityMod = 3', function() {
      assert.equal(_state.entity.defense.reflex.abilityMod, 3); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_DEFENSE |-| defense.reflex.halfLvl = 5', function() {
      assert.equal(_state.entity.defense.reflex.halfLvl, 5); // with optional message
    });
  });

  describe('Adding willpower to lvl 12 Monster with +3 Dex mod', function() {
    beforeEach(function() {
      _state = Variables.clone( state );

      _state.entity._type = 'monster';
      _state.entity.level = 12;

      _state.entity.abilities = {
          strength: { abilityMod: 6 }, constitution: { abilityMod: 4 },
          dexterity: { abilityMod: 3 }, intelligence: { abilityMod: 2 },
          wisdom: { abilityMod: 7 }, charisma: { abilityMod: 3 }
      };
      _state.entity.defense.willpower = { total: 0, default: 10, abilityMod: 0, classBonus: 0, raceBonus: 0, misc: 0 };

      action = updateEntityDefense( 'willpower', 35 );
      _state = entitiesReducer(_state, action);
    });

    it('entitiesReducer:UPDATE_ENTITY_DEFENSE |-| defense.willpower.total = 35', function() {
      assert.equal(_state.entity.defense.willpower.total, 35); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_DEFENSE |-| defense.willpower.abilityMod = 7', function() {
      assert.equal(_state.entity.defense.willpower.abilityMod, 7); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_DEFENSE |-| defense.willpower.halfLvl = 12', function() {
      assert.equal(_state.entity.defense.willpower.halfLvl, 12); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_DEFENSE |-| defense.willpower.misc = 6', function() {
      assert.equal(_state.entity.defense.willpower.misc, 6); // with optional message
    });
  });

});

describe('UPDATE_ENTITY_INITIATIVE', function() {
  let action, _state;
  
  describe('Adding Initiative to lvl 1 character', function() {
    beforeEach(function() {
      _state = Variables.clone( state );

      _state.entity._type = 'character';
      _state.entity.level = 1;

      action = updateEntityInitiative( 4 );
      _state = entitiesReducer(_state, action);
    });

    it('entitiesReducer:UPDATE_ENTITY_INITIATIVE |-| initiative.total = 4', function() {
      assert.equal(_state.entity.initiative.total, 4); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_INITIATIVE |-| initiative.modifier = 3', function() {
      assert.equal(_state.entity.initiative.modifier, 3); // with optional message
    });
  });
});

describe('UPDATE_ENTITY_HP', function() {
  let action, _state;
  
  describe('Adding Health points', function() {
    beforeEach(function() {
      _state = Variables.clone( state );

      _state.entity._type = 'monster';
      _state.entity.level = 1;

      action = updateEntityHp( 25 );
      _state = entitiesReducer(_state, action);
    });

    it('entitiesReducer:UPDATE_ENTITY_HP |-| hp = 25', function() {
      assert.equal(_state.entity.hp, 25); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_HP |-| bloodied = 12', function() {
      assert.equal(_state.entity.bloodied, 12); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_HP |-| healingSurge = 6', function() {
      assert.equal(_state.entity.healingSurge, 6); // with optional message
    });
  });
});

describe('UPDATE_ENTITY_ABILITY', function() {
  let action, _state;
  
  describe('setting strength to 13 of lvl 1 Ranger', function() {
    beforeEach(function() {
      _state = Variables.clone( state );

      _state.entity._type = 'character';
      _state.entity.level = 1;
      _state.entity.class = 3;
      _state.points.remainingPoints = 4;
      _state.entity.defense.fortitude.classBonus = 1;
      _state.entity.defense.reflex.classBonus = 1;

      action = updateEntityAbility({ name: 'strength', value: 13});
      _state = entitiesReducer(_state, action);
    });

    it('entitiesReducer:UPDATE_ENTITY_ABILITY |-| points.remainingPoints = 3', function() {
      assert.equal(_state.points.remainingPoints, 3); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_ABILITY |-| ability.strength.score = 13', function() {
      assert.equal(_state.entity.abilities.strength.score, 13); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_ABILITY |-| surgesPerDay = 7', function() {
      assert.equal(_state.entity.surgesPerDay, 7); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_ABILITY |-| hp = 24', function() {
      assert.equal(_state.entity.hp, 24); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_ABILITY |-| bloodied = 12', function() {
      assert.equal(_state.entity.bloodied, 12); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_ABILITY |-| healingSurge = 6', function() {
      assert.equal(_state.entity.healingSurge, 6); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_ABILITY |-| initiative.base = 1', function() {
      assert.equal(_state.entity.initiative.base, 1); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_ABILITY |-| initiative.base = 1', function() {
      assert.equal(_state.entity.initiative.total, 1); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_ABILITY |-| defense.fortitude = 12', function() {
      assert.equal(_state.entity.defense.fortitude.total, 12); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_ABILITY |-| defense.willpower = 11', function() {
      assert.equal(_state.entity.defense.willpower.total, 11); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_ABILITY |-| defense.armorClass = 12', function() {
      assert.equal(_state.entity.defense.armorClass.total, 12); // with optional message
    });
  });

});

describe('UPDATE_ENTITY_LEVEL', function() {
  let action, _state;
  beforeEach(function() {
    _state = Variables.clone( state );

    _state.entity._type = 'character';
    _state.entity.level = 1;

    action = updateEntityLevel( 11 );
    _state = entitiesReducer(_state, action);
  });

  it('entitiesReducer:UPDATE_ENTITY_LEVEL |-| entity.level should equal 11', function() {
    assert.equal(_state.entity.level, 11); // with optional message
  });
  it('entitiesReducer:UPDATE_ENTITY_LEVEL |-| points.remainingPoints should equal 24', function() {
    assert.equal(_state.points.remainingPoints, 24); // with optional message
  });
});

describe('UPDATE_ENTITY_RACE', function() {
  let action, _state;
  
  describe('level 1 Dwarf', function() {
    beforeEach(function() {
      _state = Variables.clone( state );

      _state.entity._type = 'character';
      _state.entity.level = 1;

      action = updateEntityRace(1);
      _state = entitiesReducer(_state, action);
    });

    it('entitiesReducer:UPDATE_ENTITY_RACE |-| points.remainingPoints = 4', function() {
      assert.equal(_state.points.remainingPoints, 4); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_RACE |-| race = 1', function() {
      assert.equal(_state.entity.race, 1); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_RACE |-| size = 2', function() {
      assert.equal(_state.entity.size, 'Medium'); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_RACE |-| speed = 5', function() {
      assert.equal(_state.entity.speed, 5); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_RACE |-| ability.wisdom.total = 14', function() {
      assert.equal(_state.entity.abilities.wisdom.score, 14); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_RACE |-| points.totalRacePoints = 4', function() {
      assert.equal(_state.points.totalRacePoints, 4); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_RACE |-| skills.dungeoneering.raceModifier = 2', function() {
      assert.equal(_state.entity.skills.dungeoneering.raceModifier, 2); // with optional message
    });
  });

});

describe('UPDATE_ENTITY_CLASS', function() {
  let action, _state;
  
  describe('lvl 1 Elf Rogue', function() {
    beforeEach(function() {
      _state = Variables.clone( state );

      _state.entity._type = 'character';
      _state.entity.level = 1;
      _state.entity.race = 4;

      action = updateEntityClass( 4 );
      _state = entitiesReducer(_state, action);
    });

    it('entitiesReducer:UPDATE_ENTITY_CLASS |-| class = 4', function() {
      assert.equal(_state.entity.class, 4); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_CLASS |-| surgesPerDay = 7', function() {
      assert.equal(_state.entity.surgesPerDay, 7); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_CLASS |-| hp = 24', function() {
      assert.equal(_state.entity.hp, 24); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_CLASS |-| bloodied = 12', function() {
      assert.equal(_state.entity.bloodied, 12); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_CLASS |-| healingSurge = 6', function() {
      assert.equal(_state.entity.healingSurge, 6); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_CLASS |-| defense.reflex.classBonus = 2', function() {
      assert.equal(_state.entity.defense.reflex.classBonus, 2); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_CLASS |-| iconClass', function() {
      assert.equal(_state.entity.iconClass, 'rogue'); // with optional message
    });
  });

});

describe('UPDATE_ENTITY_CHARACTER_POWER', function() {
  let action, _state;
  
  describe('add new power', function() {
    beforeEach(function() {
      _state = Variables.clone( state );
      _state.existingPowers = ['67890', '37465', '12345'];
      _state.entity.powers.push('12345');

      action = updateEntityCharacterPower( '67890' );
      _state = entitiesReducer(_state, action);
    });

    it('entitiesReducer:UPDATE_ENTITY_CHARACTER_POWER |-| powers length is 2', function() {
      assert.lengthOf(_state.entity.powers, 2); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_CHARACTER_POWER |-| powers[1] = 67890', function() {
      assert.equal(_state.entity.powers[1], '67890'); // with optional message
    });

  });

  describe('remove power', function() {
    beforeEach(function() {
      _state = Variables.clone( state );
      _state.existingPowers = ['67890', '37465', '12345'];
      _state.entity.powers.push('12345', '67890');

      action = updateEntityCharacterPower( '12345' );
      _state = entitiesReducer(_state, action);
    });

    it('entitiesReducer:UPDATE_ENTITY_CHARACTER_POWER |-| powers length is 1', function() {
      assert.lengthOf(_state.entity.powers, 1); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_CHARACTER_POWER |-| powers[0] = 67890', function() {
      assert.equal(_state.entity.powers[0], '67890'); // with optional message
    });
  });
});

describe('UPDATE_ENTITY_MONSTER_POWER', function() {
  let action, _state;
  
  describe('add new power', function() {
    beforeEach(function() {
      _state = Variables.clone( state );
      _state.entity.powers = [{_id: '12345', name:'Bite'}, {_id:456, name: 'Claw'}];

      action = updateEntityMonsterPower( {_id: '789', name:'Howl'} );
      _state = entitiesReducer(_state, action);
    });

    it('entitiesReducer:UPDATE_ENTITY_MONSTER_POWER |-| powers length is 3', function() {
      assert.lengthOf(_state.entity.powers, 3); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_MONSTER_POWER |-| powers[2].name = Howl', function() {
      assert.equal(_state.entity.powers[2].name, 'Howl'); // with optional message
    });
  });

  describe('update existing power', function() {
    beforeEach(function() {
      _state = Variables.clone( state );
      _state.entity.powers = [{_id: '12345', name:'Bite'}, {_id:456, name: 'Claw'}];

      action = updateEntityMonsterPower( {_id:456, name: 'Maul'} );
      _state = entitiesReducer(_state, action);
    });

    it('entitiesReducer:UPDATE_ENTITY_MONSTER_POWER |-| powers length is 2', function() {
      assert.lengthOf(_state.entity.powers, 2); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_MONSTER_POWER |-| powers[1].name = Maul', function() {
      assert.equal(_state.entity.powers[1].name, 'Maul'); // with optional message
    });

  });

  describe('remove power', function() {
    beforeEach(function() {
      _state = Variables.clone( state );
      _state.entity.powers =[{_id: 12345, name:'Bite'}, {_id:456, name: 'Claw'}];

      action = updateEntityMonsterPower( {_id:12345, name: 'Bite'}, true );
      _state = entitiesReducer(_state, action);
    });

    it('entitiesReducer:UPDATE_ENTITY_MONSTER_POWER |-| powers length is 1', function() {
      assert.lengthOf(_state.entity.powers, 1); // with optional message
    });
    it('entitiesReducer:UPDATE_ENTITY_MONSTER_POWER |-| powers[0].name = Claw', function() {
      assert.equal(_state.entity.powers[0].name, 'Claw'); // with optional message
    });

  });

});