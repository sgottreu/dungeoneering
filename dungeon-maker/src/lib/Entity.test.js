var assert = require('chai').assert;

import {Variables} from '../lib/Variables';
import * as Entity from './Entity';

describe('Entity', function() {
  let state = {
    points: {
      totalRacePoints: 0,
      usedPoints: 0,
      remainingPoints: 0
    },
    entity: Variables.clone(Entity.Template)
  }

  describe('calcRemainingPoints ', function() {
    it('Entity:calcRemainingPoints  |-| returns remaining points 24', function() {
      let _state = Variables.clone(state);
      _state.entity.level = 10;
      let points = Entity.calcRemainingPoints(_state.points, _state.entity);
      assert.equal(points.remainingPoints, 22); // with optional message
    });

    it('Entity:calcRemainingPoints  |-| returns usedPoints 74', function() {
      let _state = Variables.clone(state);
      let target = { name: 'strength', value: 14 };
      let points = Entity.calcRemainingPoints(_state.points, _state.entity, target);
      assert.equal(points.usedPoints, 74); // with optional message
    });
  });

  describe('updateEncumbrance ', function() {
    let action, _state;

    describe('when there are available funds ', function() {
      let action, _state, item;
      beforeEach(function() {
        _state = state;
        _state.entity.coin_purse = 100;
        _state.entity.encumbered = 30;
        item = { price: 20, weight: 15};
      });
      
      it('Entity:updateEncumbrance  |-| increase encumbrance to 45', function() {
        let encumbered = Entity.updateEncumbrance(_state.entity.encumbered, _state.entity.coin_purse, item, 'add');
        assert.equal(encumbered, 45); // with optional message
      });

      it('Entity:updateEncumbrance  |-| decrease encumbrance to 15', function() {
        let encumbered = Entity.updateEncumbrance(_state.entity.encumbered, _state.entity.coin_purse, item, 'remove');
        assert.equal(encumbered, 15); // with optional message
      });
    });

    describe('when funds aren\'t available', function() {
      let action, _state, item;
      beforeEach(function() {
        _state = state;
        _state.entity.coin_purse = 30;
        _state.entity.encumbered = 30;
        item = { price: 50, weight: 15};
      });
      
      it('Entity:updateEncumbrance  |-| leave encumbrance at 30', function() {
        let encumbered = Entity.updateEncumbrance(_state.entity.encumbered, _state.entity.coin_purse, item, 'add');
        assert.equal(encumbered, 30); // with optional message
      });
    });

  });

  describe('updateCoinPurse ', function() {
    let action, _state;

    describe('when there are available funds ', function() {
      let action, _state, item;
      beforeEach(function() {
        _state = Variables.clone(state);
        _state.entity.coin_purse = 100;
        _state.entity.encumbered = 30;
        item = { price: 20, weight: 15};
      });
      
      it('Entity:updateCoinPurse  |-| decrease coin_purse to 80', function() {
        let coin_purse = Entity.updateCoinPurse(_state.entity.coin_purse, item, 'add');
        assert.equal(coin_purse, 80); // with optional message
      });

      it('Entity:updateCoinPurse  |-| increase coin_purse to 120', function() {
        let coin_purse = Entity.updateCoinPurse(_state.entity.coin_purse, item, 'remove');
        assert.equal(coin_purse, 120); // with optional message
      });
    });

    describe('when funds aren\'t available', function() {
      let action, _state, item;
      beforeEach(function() {
        _state = Variables.clone(state);
        _state.entity.coin_purse = 30;
        _state.entity.encumbered = 30;
        item = { price: 50, weight: 15};
      });
      
      it('Entity:updateCoinPurse  |-| leave coin_purse at 30', function() {
        let coin_purse = Entity.updateCoinPurse(_state.entity.coin_purse, item, 'add');
        assert.equal(coin_purse, 30); // with optional message
      });
    });

  });

  describe('addInventoryLog ', function() {
    let action, _state;

    describe('add to log', function() {
      let action, _state, item;
      beforeEach(function() {
        _state = Variables.clone(state);
        item = { price: 20, weight: 15, name: 'Sword'};
      });
      
      it('Entity:addInventoryLog  |-| array is now length 1', function() {
        let inventory_log = Entity.addInventoryLog(item, 'armor', _state.entity.inventory_log);
        assert.lengthOf(inventory_log, 1); // with optional message
      });

      it('Entity:addInventoryLog  |-| [0].category = armor', function() {
        let inventory_log = Entity.addInventoryLog(item, 'armor', _state.entity.inventory_log);
        assert.equal(inventory_log[0].category, 'armor'); // with optional message
      });

      it('Entity:addInventoryLog  |-| [0].item.name = Sword', function() {
        let inventory_log = Entity.addInventoryLog(item, 'armor', _state.entity.inventory_log);
        assert.equal(inventory_log[0].item.name, 'Sword'); // with optional message
      });
    });

    describe('add to log & reorder', function() {
      let action, _state, item;
      beforeEach(function() {
        _state = Variables.clone(state);
        item = { price: 20, weight: 15, name: 'Sword'};
        _state.entity.inventory_log = Entity.addInventoryLog(item, 'armor', _state.entity.inventory_log);
        item = { price: 30, weight: 15, name: 'Heavy Shield'};
      });
      
      it('Entity:addInventoryLog  |-| array is now length 2', function() {
        let inventory_log = Entity.addInventoryLog(item, 'shield', _state.entity.inventory_log);
        assert.lengthOf(inventory_log, 2); // with optional message
      });

      it('Entity:addInventoryLog  |-| [0].category = shield', function() {
        let inventory_log = Entity.addInventoryLog(item, 'shield', _state.entity.inventory_log);
        assert.equal(inventory_log[0].category, 'shield'); // with optional message
      });

      it('Entity:addInventoryLog  |-| [0].item.name = Heavy Shield', function() {
        let inventory_log = Entity.addInventoryLog(item, 'shield', _state.entity.inventory_log);
        assert.equal(inventory_log[0].item.name, 'Heavy Shield'); // with optional message
      });

    });

  }); // addInventoryLog


  describe('removeInventoryLog ', function() {
    let action, _state;

    describe('remove from log', function() {
      let action, _state, item;
      beforeEach(function() {
        _state = Variables.clone(state);
        _state.entity.inventory_log = [
            { category: 'armor', item: { price: 20, weight: 45, name: 'Chainmail' } },
            { category: 'shield', item: { price: 10, weight: 5, name: 'Heavy Shield' } }
        ];
        item = { price: 20, weight: 45, name: 'Chainmail' };
      });
      
      it('Entity:removeInventoryLog  |-| array is now length 1', function() {
        let inventory_log = Entity.removeInventoryLog(item, 'armor', _state.entity.inventory_log);
        assert.lengthOf(inventory_log, 1); // with optional message
      });

      it('Entity:removeInventoryLog  |-| [0].category = shield', function() {
        let inventory_log = Entity.removeInventoryLog(item, 'armor', _state.entity.inventory_log);
        assert.equal(inventory_log[0].category, 'shield'); // with optional message
      });

      it('Entity:removeInventoryLog  |-| [0].item.name = Sword', function() {
        let inventory_log = Entity.removeInventoryLog(item, 'armor', _state.entity.inventory_log);
        assert.equal(inventory_log[0].item.name, 'Heavy Shield'); // with optional message
      });
    });

  }); // removeInventoryLog

  describe('addInventory ', function() {
    let action, _state;

    describe('add new item to inventory with no quantity', function() {
      let action, _state, item, inventory;
      beforeEach(function() {
        _state = Variables.clone(state);
        item = { price: 20, weight: 15, name: 'Sword', _id: 123};
        inventory = Entity.addInventory(item, 'armor', _state.entity.inventory);
      });
      
      it('Entity:addInventory  |-| array is now length 1', function() {
        assert.lengthOf(inventory, 1); // with optional message
      });

      it('Entity:addInventory  |-| [0].category = armor', function() {
        assert.equal(inventory[0].category, 'armor'); // with optional message
      });

      it('Entity:addInventory  |-| [0].item.name = Sword', function() {
        assert.equal(inventory[0].item.name, 'Sword'); // with optional message
      });
      it('Entity:addInventory  |-| [0].item.quantity = 1', function() {
        assert.equal(inventory[0].item.quantity, 1); // with optional message
      });
    });

    describe('increase quanity of existing item  with no quantity', function() {
      let action, _state, item, inventory;
      beforeEach(function() {
        _state = Variables.clone(state);
        item = { price: 20, weight: 15, name: 'Sword', _id: 123};
        _state.entity.inventory = Entity.addInventory(item, 'armor', _state.entity.inventory);
        inventory = Entity.addInventory(item, 'armor', _state.entity.inventory);
      });
      
      it('Entity:addInventory  |-| array is now length 1', function() {
        assert.lengthOf(inventory, 1); // with optional message
      });

      it('Entity:addInventory  |-| [0].category = armor', function() {
        assert.equal(inventory[0].category, 'armor'); // with optional message
      });

      it('Entity:addInventory  |-| [0].item.quantity = 2', function() {
        assert.equal(inventory[0].item.quantity, 2); // with optional message
      });

    });

    describe('add new item to inventory that has existing quantity', function() {
      let action, _state, item, inventory;
      beforeEach(function() {
        _state = Variables.clone(state);
        item = { price: 5, weight: 2, name: 'Arrows', _id: 123, quantity: 30 };
        inventory = Entity.addInventory(item, 'gear', _state.entity.inventory);
      });
      
      it('Entity:addInventory  |-| array is now length 1', function() {
        assert.lengthOf(inventory, 1); // with optional message
      });

      it('Entity:addInventory  |-| [0].category = gear', function() {
        assert.equal(inventory[0].category, 'gear'); // with optional message
      });

      it('Entity:addInventory  |-| [0].item.name = Arrows', function() {
        assert.equal(inventory[0].item.name, 'Arrows'); // with optional message
      });
      it('Entity:addInventory  |-| [0].item.quantity = 30', function() {
        assert.equal(inventory[0].item.quantity, 30); // with optional message
      });
    });

    describe('increase quanity of existing item', function() {
      let action, _state, item, inventory;
      beforeEach(function() {
        _state = Variables.clone(state);
        
        item = { price: 5, weight: 2, name: 'Arrows', _id: 123, quantity: 30 };
        _state.entity.inventory = Entity.addInventory(item, 'gear', _state.entity.inventory);

        item = { price: 20, weight: 15, name: 'Sword', _id: 455};
        _state.entity.inventory = Entity.addInventory(item, 'armor', _state.entity.inventory);

        item = { price: 5, weight: 2, name: 'Arrows', _id: 123, quantity: 30 };
        inventory = Entity.addInventory(item, 'gear', _state.entity.inventory);
      });
      
      it('Entity:addInventory  |-| array is now length 1', function() {
        assert.lengthOf(inventory, 2); // with optional message
      });

      it('Entity:addInventory  |-| [0].category = gear', function() {
        assert.equal(inventory[0].category, 'gear'); // with optional message
      });

      it('Entity:addInventory  |-| [0].item.quantity = 60', function() {
        assert.equal(inventory[0].item.quantity, 60); // with optional message
      });

      it('Entity:addInventory  |-| [1].category = armor', function() {
        assert.equal(inventory[1].category, 'armor'); // with optional message
      });
    });

  }); // addInventory


  describe('removeInventoryCategory ', function() {
    let action, _state;

    describe('remove from inventory', function() {
      let action, _state, item;
      beforeEach(function() {
        _state = Variables.clone(state);
        _state.entity.inventory = [
            { category: 'armor', item: { price: 20, weight: 45, name: 'Chainmail' } },
            { category: 'shield', item: { price: 10, weight: 5, name: 'Heavy Shield' } }
        ];
        item = { price: 20, weight: 45, name: 'Chainmail' };
      });
      
      it('Entity:removeInventoryCategory  |-| array is now length 1', function() {
        let inventory = Entity.removeInventoryCategory('armor', _state.entity.inventory);
        assert.lengthOf(inventory, 1); // with optional message
      });

      it('Entity:removeInventoryCategory  |-| [0].category = shield', function() {
        let inventory = Entity.removeInventoryCategory('armor', _state.entity.inventory);
        assert.equal(inventory[0].category, 'shield'); // with optional message
      });

      it('Entity:removeInventoryCategory  |-| [0].item.name = Heavy Shield', function() {
        let inventory = Entity.removeInventoryCategory('armor', _state.entity.inventory);
        assert.equal(inventory[0].item.name, 'Heavy Shield'); // with optional message
      });
    });

    describe('attempt to remove from inventory when not in inventory', function() {
      let action, _state, item;
      beforeEach(function() {
        _state = Variables.clone(state);
        _state.entity.inventory = [
            { category: 'gear', item: { price: 3, weight: 45, name: 'Arrows', _id: 456 } },
            { category: 'shield', item: { price: 10, weight: 5, name: 'Heavy Shield' } }
        ];
        item = { price: 20, weight: 45, name: 'Chainmail' };
      });
      
      it('Entity:removeInventoryCategory  |-| array is now length 1', function() {
        let inventory = Entity.removeInventoryCategory('armor', _state.entity.inventory);
        assert.lengthOf(inventory, 2); // with optional message
      });

      it('Entity:removeInventoryCategory  |-| [0].category = gear', function() {
        let inventory = Entity.removeInventoryCategory('armor', _state.entity.inventory);
        assert.equal(inventory[0].category, 'gear'); // with optional message
      });

      it('Entity:removeInventoryCategory  |-| [0].item.name = Arrows', function() {
        let inventory = Entity.removeInventoryCategory('armor', _state.entity.inventory);
        assert.equal(inventory[0].item.name, 'Arrows'); // with optional message
      });

      it('Entity:removeInventoryCategory  |-| [1].category = shield', function() {
        let inventory = Entity.removeInventoryCategory('armor', _state.entity.inventory);
        assert.equal(inventory[1].category, 'shield'); // with optional message
      });

    });

  }); // removeInventoryCategory

  describe('removeInventoryItem ', function() {
    let action, _state;

    describe('decrease item quantity in inventory', function() {
      let action, _state, item, inventory;
      beforeEach(function() {
        _state = Variables.clone(state);
        _state.entity.inventory = [
            { category: 'weapon', item: { price: 5, weight: 5, quantity: 1, name: 'Javelin', _id: 123 } },
            { category: 'gear', item: { price: 10, weight: 5, quantity: 60, name: 'Arrows', _id: 456 } }
        ];
        item = { price: 10, weight: 5, quantity: 30, name: 'Arrows', _id: 456 };
        inventory = Entity.removeInventoryItem(item, 'gear', _state.entity.inventory);
      });
      
      it('Entity:removeInventoryItem  |-| array is now length 2', function() {
        assert.lengthOf(inventory, 2); // with optional message
      });

      it('Entity:removeInventoryItem  |-| [0].item.quantity = 30', function() {
        assert.equal(inventory[1].item.quantity, 30); // with optional message
      });
    });

    describe('try to decrease item quantity when 0', function() {
      let action, _state, item, inventory;
      beforeEach(function() {
        _state = Variables.clone(state);
        _state.entity.inventory = [
            { category: 'weapon', item: { price: 5, weight: 5, quantity: 0, name: 'Javelin', _id: 123 } },
            { category: 'gear', item: { price: 10, weight: 5, quantity: 60, name: 'Arrows', _id: 456 } }
        ];
        item = { price: 5, weight: 5, quantity: 1, name: 'Javelin', _id: 123 };
        inventory = Entity.removeInventoryItem(item, 'gear', _state.entity.inventory);
      });
      
      it('Entity:removeInventoryItem  |-| array is now length 2', function() {
        assert.lengthOf(inventory, 2); // with optional message
      });

      it('Entity:removeInventoryItem  |-| [0].item.quantity = 0', function() {
        assert.equal(inventory[0].item.quantity, 0); // with optional message
      });
    });

    describe('try to decrease item quantity when item not in inventory', function() {
      let action, _state, item, inventory;
      beforeEach(function() {
        _state = Variables.clone(state);
        _state.entity.inventory = [
            { category: 'weapon', item: { price: 5, weight: 5, quantity: 1, name: 'Javelin', _id: 123 } },
            { category: 'gear', item: { price: 10, weight: 5, quantity: 60, name: 'Arrows', _id: 456 } }
        ];
        item = { price: 5, weight: 5, quantity: 1, name: 'Bedroll', _id: 789 };
        inventory = Entity.removeInventoryItem(item, 'gear', _state.entity.inventory);
      });
      
      it('Entity:removeInventoryItem  |-| array is now length 2', function() {  
        assert.lengthOf(inventory, 2); // with optional message
      });

      it('Entity:removeInventoryItem  |-| [0].item.category = weapon', function() {
        assert.equal(inventory[0].category, 'weapon'); // with optional message
      });

      it('Entity:removeInventoryItem  |-| [1].item.category = gear', function() {
        assert.equal(inventory[1].category, 'gear'); // with optional message
      });
    });

  }); // removeInventoryItem


  describe('getDefenseModifier ', function() {
    let action, _state;

    describe('get fortitude with strength', function() {
      beforeEach(function(){
        _state = Variables.clone(state);
        _state.entity.abilities = {
            strength: { abilityMod: 4 }, constitution: { abilityMod: 2 },
            dexterity: { abilityMod: 0 }, intelligence: { abilityMod: 0 },
            wisdom: { abilityMod: 0 }, charisma: { abilityMod: 0 }
        };
      });

      it('Entity:getDefenseModifier  |-| score equal 4', function() {
        let score = Entity.getDefenseModifier(_state.entity, 'fortitude');
        assert.equal(score, 4); // with optional message
      });
    });
    describe('get fortitude with constitution', function() {
      beforeEach(function(){
        _state = Variables.clone(state);
        _state.entity.abilities = {
            strength: { abilityMod: 4 }, constitution: { abilityMod: 6 },
            dexterity: { abilityMod: 0 }, intelligence: { abilityMod: 0 },
            wisdom: { abilityMod: 0 }, charisma: { abilityMod: 0 }
        };
      });

      it('Entity:getDefenseModifier  |-| score equal 6', function() {
        let score = Entity.getDefenseModifier(_state.entity, 'fortitude');
        assert.equal(score, 6); // with optional message
      });
    });

    describe('get reflex with dexterity', function() {
      beforeEach(function(){
        _state = Variables.clone(state);
        _state.entity.abilities = {
            strength: { abilityMod: 4 }, constitution: { abilityMod: 2 },
            dexterity: { abilityMod: 5 }, intelligence: { abilityMod: 5 },
            wisdom: { abilityMod: 0 }, charisma: { abilityMod: 0 }
        };
      });

      it('Entity:getDefenseModifier  |-| score equal 5', function() {
        let score = Entity.getDefenseModifier(_state.entity, 'reflex');
        assert.equal(score, 5); // with optional message
      });
    });
    describe('get reflex with intelligence', function() {
      beforeEach(function(){
        _state = Variables.clone(state);
        _state.entity.abilities = {
            strength: { abilityMod: 4 }, constitution: { abilityMod: 6 },
            dexterity: { abilityMod: 5 }, intelligence: { abilityMod: 7 },
            wisdom: { abilityMod: 0 }, charisma: { abilityMod: 0 }
        };
      });

      it('Entity:getDefenseModifier  |-| score equal 7', function() {
        let score = Entity.getDefenseModifier(_state.entity, 'reflex');
        assert.equal(score, 7); // with optional message
      });
    });

    describe('get willpower with wisdom', function() {
      beforeEach(function(){
        _state = Variables.clone(state);
        _state.entity.abilities = {
            strength: { abilityMod: 4 }, constitution: { abilityMod: 2 },
            dexterity: { abilityMod: 5 }, intelligence: { abilityMod: 5 },
            wisdom: { abilityMod: 6 }, charisma: { abilityMod: 3 }
        };
      });

      it('Entity:getDefenseModifier  |-| score equal 6', function() {
        let score = Entity.getDefenseModifier(_state.entity, 'willpower');
        assert.equal(score, 6); // with optional message
      });
    });
    describe('get willpower with charisma', function() {
      beforeEach(function(){
        _state = Variables.clone(state);
        _state.entity.abilities = {
            strength: { abilityMod: 4 }, constitution: { abilityMod: 6 },
            dexterity: { abilityMod: 5 }, intelligence: { abilityMod: 7 },
            wisdom: { abilityMod: 6 }, charisma: { abilityMod: 9 }
        };
      });

      it('Entity:getDefenseModifier  |-| score equal 9', function() {
        let score = Entity.getDefenseModifier(_state.entity, 'willpower');
        assert.equal(score, 9); // with optional message
      });
    });

  }); // getDefenseModifier

  describe('HalfLevelModifier ', function() {
    let action, _state;     
    it('Entity:HalfLevelModifier  |-| half level of character - half of 5 rounded down = 2', function() {
      let half = Entity.HalfLevelModifier(5, 'character');
      assert.equal(half, 2, 'half level of 5 rounded down = 2'); // with optional message
    });
    it('Entity:HalfLevelModifier  |-| half level of character - half of 10 = 5', function() {
      let half = Entity.HalfLevelModifier(10, 'character');
      assert.equal(half, 5, 'half of 10 = 5'); // with optional message
    });

    it('Entity:HalfLevelModifier  |-| half level of monster - half of 5 rounded down * 2 = 4', function() {
      let half = Entity.HalfLevelModifier(5, 'monster');
      assert.equal(half, 4, 'half level of 5 rounded down * 2 = 4'); // with optional message
    });
    it('Entity:HalfLevelModifier  |-| half level of monster - half of 10 * 2 = 10', function() {
      let half = Entity.HalfLevelModifier(10, 'monster');
      assert.equal(half, 10, 'half of 10 * 2 = 10'); // with optional message
    });

  }); // HalfLevelModifier


  describe('calculateArmorClass ', function() {
    let action, _state;

    describe('Lvl 5 Cleric with Con mod of 1 & Cloth Armor & +1 def from reflex', function() {
      beforeEach(function(){
        _state = Variables.clone(state);
        _state.entity._type = 'character';
        _state.entity.level = 5;
        _state.entity.class = 0; //Cleric
        _state.entity.armor = 1; //Cloth 
        _state.entity.abilities = {
            strength: { abilityMod: 0 }, constitution: { abilityMod: 1 },
            dexterity: { abilityMod: 1 }, intelligence: { abilityMod: 3 },
            wisdom: { abilityMod: 2 }, charisma: { abilityMod: 0 }
        };
      });

      it('Entity:calculateArmorClass  |-| armorClass.total = 16', function() {
        let armorClass = Entity.calculateArmorClass(_state.entity);
        assert.equal(armorClass.total, 16); // with optional message
      });
      it('Entity:calculateArmorClass  |-| armorClass.armorBonus = 3', function() {
        let armorClass = Entity.calculateArmorClass(_state.entity);
        assert.equal(armorClass.armorBonus, 3); // with optional message
      });
      it('Entity:calculateArmorClass  |-| armorClass.abilityMod = 1', function() {
        let armorClass = Entity.calculateArmorClass(_state.entity);
        assert.equal(armorClass.abilityMod, 1); // with optional message
      });
      it('Entity:calculateArmorClass  |-| armorClass.shield = 0', function() {
        let armorClass = Entity.calculateArmorClass(_state.entity);
        assert.equal(armorClass.shield, 0); // with optional message
      });
    });

    describe('Lvl 8 Paladin with Con mod of 4 & Plate Armor & Heavy Shield', function() {
      beforeEach(function(){
        _state = Variables.clone(state);
        _state.entity._type = 'character';
        _state.entity.level = 8;
        _state.entity.class = 2; // Paladin
        _state.entity.armor = 6; // Plate 
        _state.entity.defense.armorClass.shield = 2; // Heavy Shield

        _state.entity.abilities = {
            strength: { abilityMod: 5 }, constitution: { abilityMod: 4 },
            dexterity: { abilityMod: 3 }, intelligence: { abilityMod: 2 },
            wisdom: { abilityMod: 2 }, charisma: { abilityMod: 0 }
        };
      });

      it('Entity:calculateArmorClass  |-| armorClass.total = 28', function() {
        let armorClass = Entity.calculateArmorClass(_state.entity);
        assert.equal(armorClass.total, 28); // with optional message
      });
      it('Entity:calculateArmorClass  |-| armorClass.armorBonus = 8', function() {
        let armorClass = Entity.calculateArmorClass(_state.entity);
        assert.equal(armorClass.armorBonus, 8); // with optional message
      });
      it('Entity:calculateArmorClass  |-| armorClass.abilityMod = 4', function() {
        let armorClass = Entity.calculateArmorClass(_state.entity);
        assert.equal(armorClass.abilityMod, 4); // with optional message
      });
      it('Entity:calculateArmorClass  |-| armorClass.shield = 2', function() {
        let armorClass = Entity.calculateArmorClass(_state.entity);
        assert.equal(armorClass.shield, 2); // with optional message
      });
    });


    describe('Lvl 8 Paladin Monster with Con mod of 4 & Plate Armor & Heavy Shield', function() {
      beforeEach(function(){
        _state = Variables.clone(state);
        _state.entity._type = 'monster';
        _state.entity.level = 8;
        _state.entity.class = false; //Monster
        _state.entity.armor = 6; // Plate 
        _state.entity.defense.armorClass.shield = 2; // Heavy Shield

        _state.entity.abilities = {
            strength: { abilityMod: 5 }, constitution: { abilityMod: 4 },
            dexterity: { abilityMod: 3 }, intelligence: { abilityMod: 2 },
            wisdom: { abilityMod: 2 }, charisma: { abilityMod: 0 }
        };
      });

      it('Entity:calculateArmorClass  |-| armorClass.total = 32', function() {
        let armorClass = Entity.calculateArmorClass(_state.entity);
        assert.equal(armorClass.total, 32); // with optional message
      });
    });

    describe('Lvl 8 Paladin Monster with Total AC of 35', function() {
      beforeEach(function(){
        _state = Variables.clone(state);
        _state.entity._type = 'monster';
        _state.entity.level = 8;
        _state.entity.class = false; //Monster
        _state.entity.armor = 6; // Plate 
        _state.entity.defense.armorClass.shield = 2; // Heavy Shield

        _state.entity.abilities = {
            strength: { abilityMod: 5 }, constitution: { abilityMod: 4 },
            dexterity: { abilityMod: 3 }, intelligence: { abilityMod: 2 },
            wisdom: { abilityMod: 2 }, charisma: { abilityMod: 0 }
        };
      });

      it('Entity:calculateArmorClass  |-| armorClass.total = 35', function() {
        let armorClass = Entity.calculateArmorClass(_state.entity, 35);
        assert.equal(armorClass.total, 35); // with optional message
      });
      it('Entity:calculateArmorClass  |-| armorClass.misc = 3', function() {
        let armorClass = Entity.calculateArmorClass(_state.entity, 35);
        assert.equal(armorClass.misc, 3); // with optional message
      });
    });

  });

  describe('AbilityModifier ', function() {
    let action, _state;     
    it('Entity:AbilityModifier  |-| ability modifier = -5', function() {
      let abilityMod = Entity.AbilityModifier(0);
      assert.equal(abilityMod, -5,); // with optional message
    });
    it('Entity:AbilityModifier  |-| abilty modifier = 0', function() {
      let abilityMod = Entity.AbilityModifier(10);
      assert.equal(abilityMod, 0); // with optional message
    });

    it('Entity:AbilityModifier  |-| half level of monster - half of 5 rounded down * 2 = 4', function() {
      let abilityMod = Entity.AbilityModifier(17);
      assert.equal(abilityMod, 3); // with optional message
    });
    it('Entity:AbilityModifier  |-| half level of monster - half of 10 * 2 = 10', function() {
      let abilityMod = Entity.AbilityModifier(22);
      assert.equal(abilityMod, 6); // with optional message
    });

  }); // AbilityModifier

  describe('AttackModifier ', function() {
    let action, _state;     
    it('Entity:AttackModifier  |-| equals 9', function() {
      let abilityMod = Entity.AttackModifier(12, 16, 'character');
      assert.equal(abilityMod, 9); 
    });
    it('Entity:AttackModifier  |-| equals 11', function() {
      let abilityMod = Entity.AttackModifier(8, 17, 'monster');
      assert.equal(abilityMod, 11); 
    });

  }); // AttackModifier

  describe('calculateInitiative ', function() {
    var entity = {};

    beforeEach(function(){
       entity = {
          _type: false,
          name: '',
          level: 1,
          initiative: {total: 0, base: 0, modifier: 0, current: 0},
          abilities: {
            dexterity: { score: 12, abilityMod: 0, AttackModifier: 0 }
          }
        };
    });
    
    it('Entity:calculateInitiative  |-| character base = 11', function() {
      entity.level = 14;
      entity._type = 'character';
      entity.abilities.dexterity = { score: 18, abilityMod: 4, AttackModifier: 7 }
      let init = Entity.calculateInitiative(entity);
      assert.equal(init.base, 11); 
    });
    it('Entity:calculateInitiative  |-| character modifier = 0', function() {
      entity.level = 14;
      entity._type = 'character';
      entity.abilities.dexterity = { score: 18, abilityMod: 4, AttackModifier: 7 }
      let init = Entity.calculateInitiative(entity);
      assert.equal(init.modifier, 0); 
    });
    it('Entity:calculateInitiative  |-| character total = 11', function() {
      entity.level = 14;
      entity._type = 'character';
      entity.abilities.dexterity = { score: 18, abilityMod: 4, AttackModifier: 7 }
      let init = Entity.calculateInitiative(entity);
      assert.equal(init.total, 11); 
    });

    it('Entity:calculateInitiative  |-| monster base = 6', function() {
      entity.level = 11;
      entity._type = 'monster';
      entity.abilities.dexterity = { score: 12, abilityMod: 1, AttackModifier: 6 }
      let init = Entity.calculateInitiative(entity, 16);
      assert.equal(init.base, 11); 
    });
    it('Entity:calculateInitiative  |-| monster modifier = 0', function() {
      entity.level = 11;
      entity._type = 'monster';
      entity.abilities.dexterity = { score: 12, abilityMod: 1, AttackModifier: 6 }
      let init = Entity.calculateInitiative(entity, 16);
      assert.equal(init.modifier, 5); 
    });
    it('Entity:calculateInitiative  |-| monster total = 6', function() {
      entity.level = 11;
      entity._type = 'monster';
      entity.abilities.dexterity = { score: 12, abilityMod: 1, AttackModifier: 6 }
      let init = Entity.calculateInitiative(entity, 16);
      assert.equal(init.total, 16); 
    });

  }); // calculateInitiative

  describe('calculateAbility ', function() {
    var entity = Variables.clone(Entity.Template);

    describe('character ', function() {
      beforeEach(function(){
        entity._type = 'character';
        entity.level = 16;
      });  
      it('Entity:calculateAbility  |-| score = 18', function() {
        let ability = Entity.calculateAbility(entity, 'strength', 18);
        assert.equal(ability.score, 18); 
      });
      it('Entity:calculateAbility  |-| abilityMod equals 4', function() {
        let ability = Entity.calculateAbility(entity, 'strength', 18);
        assert.equal(ability.abilityMod, 4); 
      });
      it('Entity:calculateAbility  |-| AttackModifier equals 11', function() {
        let ability = Entity.calculateAbility(entity, 'strength', 18);
        assert.equal(ability.AttackModifier, 12); 
      });
    });

    describe('monster ', function() {
      beforeEach(function(){
        entity._type = 'monster';
        entity.level = 10;
      });  
      it('Entity:calculateAbility  |-| score = 15', function() {
        let ability = Entity.calculateAbility(entity, 'strength', 15);
        assert.equal(ability.score, 15); 
      });
      it('Entity:calculateAbility  |-| abilityMod equals 2', function() {
        let ability = Entity.calculateAbility(entity, 'strength', 15);
        assert.equal(ability.abilityMod, 2); 
      });
      it('Entity:calculateAbility  |-| AttackModifier equals 12', function() {
        let ability = Entity.calculateAbility(entity, 'strength', 15);
        assert.equal(ability.AttackModifier, 12); 
      });
    });

  }); // calculateAbility

  describe('getInitialHitPoints ', function() {
    describe('level 1 Paladin ', function() {
      let entity = {
        level: 1,
        abilities: {
          constitution: { score: 16, abilityMod: 3, AttackModifier: 11 }
        }
      };  
      it('Entity:getInitialHitPoints  |-| hp equals 31', function() {
        let initHP = Entity.getInitialHitPoints(entity, 2);
        assert.equal(initHP, 31); 
      });
    }); 

    describe('level 9 Warlock ', function() {
      let entity = {
        level: 9,
        abilities: {
          constitution: { score: 16, abilityMod: 3, AttackModifier: 11 }
        }
      };  
      it('Entity:getInitialHitPoints  |-| hp equals 68', function() {
        let initHP = Entity.getInitialHitPoints(entity, 5);
        assert.equal(initHP, 68); 
      });
    }); 

  }); // getInitialHitPoints

});


