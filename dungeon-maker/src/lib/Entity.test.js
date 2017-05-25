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








});


