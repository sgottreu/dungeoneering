import {Variables} from '../lib/Variables';

//************ Variables *******************/

export var GearCategories = ["Adventurer Kit", "Ammunition", "Equipment", "Armor", "Shield", "Weapons"];

export var GearSlots = ["Arms", "Chest", "Feet", "Hands", "Head", "Neck", "Rings", "Waist"];

export var findItem = (id, availableGear) => {
  return availableGear.find( g => { return g._id === id });
};

export var findByCategory = (category, availableGear) => {
    if(category === null || category === false){
      return availableGear;
    }
    return availableGear.filter( g => { return g.category === category });
};

export var regularArmor = (availableGear) => {
    let regularArmor = availableGear.filter(item => {
        return item.category.toLowerCase() === 'armor' && item.rare === false;
    });
    return regularArmor;
};

export var getEntityArmor = (inventory) => {
  return inventory.find( invt => { 
    return invt.category.toLowerCase() === 'armor' && invt.item.equipped 
  });
};