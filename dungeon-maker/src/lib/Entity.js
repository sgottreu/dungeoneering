import {Variables} from '../lib/Variables';

//************ Variables *******************/

export var Template = {
    _id: false,
    _type: false,
    name: '',
    level: 1,
    role: false,
    race: false,
    class: false,
    size: false,
    xp: 0,
    initiative: {total: 0, base: 0, modifier: 0, current: 0},
    hp: 0,
    bloodied: 0,
    speed: 0,
    coin_purse: 0,
    inventory_log:[],
    inventory: [],
    encumbered: 0,
    resistances: [],
    armor: 0,
    shield: false,
    abilities: {
      strength: { score: 12, abilityMod: 1, AttackModifier: 0 },
      constitution: { score: 12, abilityMod: 1, AttackModifier: 0 },
      dexterity: { score: 12, abilityMod: 1, AttackModifier: 0 },
      intelligence: { score: 12, abilityMod: 1, AttackModifier: 0 },
      wisdom: { score: 12, abilityMod: 1, AttackModifier: 0 },
      charisma: { score: 12, abilityMod: 1, AttackModifier: 0 }
    },
    healingSurge: 0,
    surgesPerDay: 0,
    defense: {
      armorClass: { total: 0, default: 10, abilityMod: 0, armorBonus: 0, shield: 0, misc: 0 },
      fortitude: { total: 0, default: 10, abilityMod: 0, classBonus: 0, raceBonus: 0, misc: 0 },
      reflex: { total:0, default: 10, abilityMod: 0, classBonus: 0, raceBonus: 0, misc: 0 },
      willpower: { total: 0, default: 10, abilityMod: 0, classBonus: 0, raceBonus: 0, misc: 0 }
    },
    skills: {
      acrobatics: { score: 0, halfLevelModifier: 0, abilityMod: 0, train: 0, raceModifier: 0, ability: 'dexterity' },
      arcana: { score: 0, halfLevelModifier: 0, abilityMod: 0, train: 0, raceModifier: 0, ability: 'intelligence' },
      athletics: { score: 0, halfLevelModifier: 0, abilityMod: 0, train: 0, raceModifier: 0, ability: 'strength' },
      bluff: { score: 0, halfLevelModifier: 0, abilityMod: 0, train: 0, raceModifier: 0, ability: 'charisma' },
      diplomacy: { score: 0, halfLevelModifier: 0, abilityMod: 0, train: 0, raceModifier: 0, ability: 'charisma' },
      dungeoneering: { score: 0, halfLevelModifier: 0, abilityMod: 0, train: 0, raceModifier: 0, ability: 'wisdom' },
      endurance: { score: 0, halfLevelModifier: 0, abilityMod: 0, train: 0, raceModifier: 0, ability: 'constitution' },
      heal: { score: 0, halfLevelModifier: 0, abilityMod: 0, train: 0, raceModifier: 0, ability: 'wisdom' },
      history: { score: 0, halfLevelModifier: 0, abilityMod: 0, train: 0, raceModifier: 0, ability: 'intelligence' },
      insight: { score: 0, halfLevelModifier: 0, abilityMod: 0, train: 0, raceModifier: 0, ability: 'wisdom' },
      intimidate: { score: 0, halfLevelModifier: 0, abilityMod: 0, train: 0, raceModifier: 0, ability: 'charisma' },
      nature: { score: 0, halfLevelModifier: 0, abilityMod: 0, train: 0, raceModifier: 0, ability: 'wisdom' },
      perception: { score: 0, halfLevelModifier: 0, abilityMod: 0, train: 0, raceModifier: 0, ability: 'wisdom' },
      religion: { score: 0, halfLevelModifier: 0, abilityMod: 0, train: 0, raceModifier: 0, ability: 'intelligence' },
      stealth: { score: 0, halfLevelModifier: 0, abilityMod: 0, train: 0, raceModifier: 0, ability: 'dexterity' },
      streetwise: { score: 0, halfLevelModifier: 0, abilityMod: 0, train: 0, raceModifier: 0, ability: 'charisma' },
      thievery: { score: 0, halfLevelModifier: 0, abilityMod: 0, train: 0, raceModifier: 0, ability: 'dexterity' }
    },
    powers: [],
    iconClass: '',
    weapons: []  
};

export var _Icons = [
  { label: 'Kobold', class: 'kobold', type: 'monster' },
  { label: 'Goblin', class: 'goblin', type: 'monster' },
  { label: 'Skeleton', class: 'skeleton', type: 'monster' },
  { label: 'Zombie', class: 'zombie', type: 'monster' },
  { label: 'Critter', class: 'critter', type: 'monster' },
  { label: 'Rat', class: 'rat', type: 'monster' },
  { label: 'Bat', class: 'bat', type: 'monster' },
  { label: 'Bear', class: 'bear', type: 'monster' },
  { label: 'Wolf', class: 'wolf', type: 'monster' },
  { label: 'Cleric', class: 'cleric', type: 'character' },
  { label: 'Ranger', class: 'ranger', type: 'character' },
  { label: 'Wizard', class: 'wizard', type: 'character' },
  { label: 'Warlock', class: 'warlock', type: 'character' },
  { label: 'Fighter', class: 'fighter', type: 'character' }
];

export var AbilityScorePoints = 76;

export var _Role = [
  'Artillery',
  'Brute',
  'Controller',
  'Lurker',
  'Minion',
  'Skirmisher',
  'Soldier'
];

export var _Size = [
  {label: 'Tiny', space: 1, reach: 0},
  {label: 'Small', space: 1, reach: 1},
  {label: 'Medium', space: 1, reach: 1},
  {label: 'Large', space: 2, reach: 1},
  {label: 'Huge', space: 3, reach: 2},
  {label: 'Gargantuan', space: 4, reach: 3 }
];

export var _Class = [
  { name: 'Cleric', hitPoints: 12, ability: 'constitution', hitPointsLvl: 5, abilityMod: {}, surges: 7, defenseMod: {willpower: 2} },
  { name: 'Fighter', hitPoints: 15, ability: 'constitution', hitPointsLvl: 6, abilityMod: {}, surges: 9, defenseMod: {fortitude: 2} },
  { name: 'Paladin', hitPoints: 15, ability: 'constitution', hitPointsLvl: 6, abilityMod: {}, surges: 10, defenseMod: {fortitude: 1, reflex: 1, willpower: 1} },
  { name: 'Ranger', hitPoints: 12, ability: 'constitution', hitPointsLvl: 5, abilityMod: {}, surges: 6, defenseMod: {fortitude: 1, reflex: 1} },
  { name: 'Rogue', hitPoints: 12, ability: 'constitution', hitPointsLvl: 5, abilityMod: {}, surges: 6, defenseMod: {reflex: 2} },
  { name: 'Warlock', hitPoints: 12, ability: 'constitution', hitPointsLvl: 5, abilityMod: {}, surges: 6, defenseMod: {reflex: 1, willpower: 1} },
  { name: 'Warlord', hitPoints: 12, ability: 'constitution', hitPointsLvl: 5, abilityMod: {}, surges: 7, defenseMod: {fortitude: 1, willpower: 1} },
  { name: 'Wizard', hitPoints: 10, ability: 'constitution', hitPointsLvl: 4, abilityMod: {}, surges: 6, defenseMod: {willpower: 2} },
]; 

export var _Race = [
  { name: 'Dragonborn', abilityMod: {}, size: 'Medium', speed: 5, skillBonus: {} },
  { name: 'Dwarf', abilityMod: { constitution: 2, wisdom: 2}, size: 'Medium', speed: 5, skillBonus: {dungeoneering: 2, endurance:2} },
  { name: 'Eladrin', abilityMod: {}, size: 'Medium', speed: 5, skillBonus: {} },
  { name: 'Dragonborn', abilityMod: {}, size: 'Medium', speed: 5, skillBonus: {} },
  { name: 'Elf', abilityMod: { dexterity: 2, wisdom: 2}, size: 'Medium', speed: 7, skillBonus: {nature: 2, perception:2}, defenseMod: {willpower: 1} },
  { name: 'Half-Elf', abilityMod: {}, size: 'Medium', speed: 5, skillBonus: {} },
  { name: 'Halfling', abilityMod: { dexterity: 2, charisma: 2}, size: 'Small', speed: 6, skillBonus: {acrobatics: 2, thievery:2} },
  { name: 'Human', abilityMod: { any: 2 }, size: 'Medium', speed: 6, skillBonus: 'any', defenseMod: {fortitude: 1, reflex: 1, willpower: 1} },
  { name: 'Tiefling', abilityMod: {}, size: 'Medium', speed: 5, skillBonus: {} }
];

// export var _Armor = [
//   {"name":"None","score":0,"check":0,"speed":0,"price":0,"weight":0,"_id":"58d18cd2481cfb2b38b54bc1"},
//   {"name":"Cloth","score":0,"check":0,"speed":0,"price":1,"weight":4,"_id":"58d18cd2481cfb2b38b54bc2"},
//   {"name":"Leather","score":2,"check":0,"speed":0,"price":25,"weight":15,"_id":"58d18cd2481cfb2b38b54bc3"},
//   {"name":"Hide","score":3,"check":-1,"speed":0,"price":30,"weight":25,"_id":"58d18cd2481cfb2b38b54bc4"},
//   {"name":"Chainmail","score":6,"check":-1,"speed":-1,"price":40,"weight":40,"_id":"58d18cd2481cfb2b38b54bc5"},
//   {"name":"Scale","score":7,"check":0,"speed":-1,"price":45,"weight":45,"_id":"58d18cd2481cfb2b38b54bc6"},
//   {"name":"Plate","score":8,"check":-2,"speed":-1,"price":50,"weight":50,"_id":"58d18cd2481cfb2b38b54bc7"}
// ];

///*********** Functions *******************/


//Modified


export var calcRemainingPoints = (points, entity, target) => {
  if(target === undefined){
      points.remainingPoints = 4 + ((entity.level-1)*2);
  } else {
    points.usedPoints = 0;
    for(let a in entity.abilities){
      if(entity.abilities.hasOwnProperty(a)){
        if(target.name === a){
          points.usedPoints += parseInt( target.value, 10 );
        } else {
          points.usedPoints += parseInt( entity.abilities[ a ].score, 10 );
        }          
      }
    }
  }
  return points;
}

export var checkCarryingCapacity = (entity, item) => {
  let carrying = entity.abilities.strength.score * 10;
  let final = entity.encumbered + parseFloat(item.weight, 10);
  if(final > carrying){
    return false;
  }
  return true;
}

export var checkCoinPurse = (coin_purse, item) => {
  if(coin_purse < item.price && (item.loot === undefined || !item.loot)){
    return false;
  } 
  return true;
}

export var updateEncumbrance = (entity, item, action) => {
  if(action === 'add'){
    if(!checkCarryingCapacity(entity, item)){
      return entity.encumbered;
    }
    let carrying = entity.abilities.strength.score * 10;
    let final = entity.encumbered + parseFloat(item.weight, 10);
    if(final > carrying){
      return entity.encumbered;
    }
    entity.encumbered += parseFloat(item.weight, 10);
  } else {
    entity.encumbered -= parseFloat(item.weight, 10);
  }
  return entity.encumbered;
}

export var updateCoinPurse = (coin_purse, item, action) => {
  if(action === 'add'){
    if(!checkCoinPurse(coin_purse, item)){
      return coin_purse;
    }
    coin_purse -= parseFloat(item.price, 10);
  } else {
    coin_purse += parseFloat(item.price, 10);
  }
  return coin_purse;
}



export var removeInventoryCategory = (category, inventory) => {
  let _i = inventory.findIndex((inv, i) => { return inv.category === category});
  if(_i !== -1){
    inventory.splice(_i, 1);
  }
  return inventory;
}

export var removeInventoryItem = (purchasedItem, category, inventory) => {
  let _i = inventory.findIndex((inv, i) => { return inv.item._id === purchasedItem._id});
  let tmpItem = Variables.clone(purchasedItem);
  tmpItem.quantity = (tmpItem.quantity === undefined) ? 1 : tmpItem.quantity;

  if(_i !== -1 && inventory[_i].item.quantity > 0){
    inventory[_i].item.quantity -= tmpItem.quantity;
  }
  return inventory;
}

export var addInventory = (purchasedItem, category, inventory) => {
  let tmpItem = Variables.clone(purchasedItem);
  tmpItem.quantity = (tmpItem.quantity === undefined) ? 1 : tmpItem.quantity;
  let _i = -1;

  if(inventory.length > 0){
    _i = inventory.findIndex((inv, i) => { return inv.item._id === tmpItem._id });
  }
  
  if(_i === -1){
    inventory.push( { category: category, item: tmpItem } );
  } else {
    inventory[_i].item.quantity += tmpItem.quantity;
  }
  return inventory;
}

export var addInventoryLog = (purchasedItem, category, inventory_log) => {
  inventory_log.splice(0, 0, { category: category, item: purchasedItem } );
  return inventory_log;
}

export var removeInventoryLog = (purchasedItem, category, inventory_log) => {
  let _i = inventory_log.findIndex((item, index) => { return item.category === category} );
  inventory_log.splice(_i, 1);

  return inventory_log;
}
export function getDefenseModifier(entity, defense)
{
  var abl = entity.abilities;
  var aM = 'abilityMod';
  var score = 0;

  switch(defense) {
    case 'fortitude':
      score = (abl.strength[aM] >= abl.constitution[aM]) ? abl.strength[aM] : abl.constitution[aM];
      break;
    case 'reflex':
      score = (abl.dexterity[aM] >= abl.intelligence[aM]) ? abl.dexterity[aM] : abl.intelligence[aM];
      break;
    case 'willpower':
      score = (abl.wisdom[aM] >= abl.charisma[aM]) ? abl.wisdom[aM] : abl.charisma[aM];
      break;
    default:
      score = 0;
      break;
  }
  return score;
}

export var AbilityModifier = function(score){
  let modifier = -5;
  if(score > 1){
    if( score % 2 === 0){
      modifier = (score / 2) + modifier;
    } else {
      modifier = ((score - 1) / 2) + modifier;
    }
  } 
  return modifier;
};

export var HalfLevelModifier = function(level, type){
  let mod = Math.floor(level/2);
  mod = (type === 'monster') ? mod * 2 : mod;
  return mod;
};

export var AttackModifier = function(level, score, type){
  return HalfLevelModifier(level, type) + AbilityModifier(score);
};



export var calculateArmorClass = function(entity, value=false){
  let ac = entity.defense.armorClass;
  let ability = (!entity.class) ? 'constitution' : _Class[ entity.class ].ability;

  let _armor = entity.inventory.find(inv => {
    return inv.item.equipped && inv.category.toLowerCase() === 'armor'
  });

  if(_armor === undefined){
    _armor = {
      weight: 0,
      enhanceBonus: 0,
      armorBonus: 0
    };
  } else {
    _armor.weight = parseInt( _armor.item.weight, 10);
    _armor.enhanceBonus = parseInt( _armor.item.enhanceBonus, 10);
    _armor.armorBonus = parseInt( _armor.item.armorBonus, 10);
  }

  ac.armorBonus = _armor.armorBonus;
  if(_armor.weight <= 15){
    ac.armorBonus += getDefenseModifier(entity, 'reflex');
  }
  
  ac.abilityMod = entity.abilities[ ability ].abilityMod;
  ac.halfLvl = HalfLevelModifier(entity.level, entity._type);

  let subTotal = ac.default + ac.halfLvl + ac.abilityMod + ac.armorBonus + ac.shield;

  ac.misc = (value) ? value - subTotal : 0;
  ac.total = subTotal + ac.misc + _armor.enhanceBonus;

  return ac;
};

export var calculateDefense = (_entity, defense, value=false) => {
  if(_entity.defense[ defense ] !== undefined && defense !== 'armorClass'){
    let def = _entity.defense[ defense ];
    def.abilityMod = getDefenseModifier(_entity, defense);
    def.halfLvl = + HalfLevelModifier(_entity.level, _entity._type);
    let subTotal = def.default + def.halfLvl + def.abilityMod + def.classBonus + def.raceBonus;
    subTotal = (defense === 'reflex') ? subTotal + _entity.defense.armorClass.shield : subTotal;
    def.misc = (value) ? value - subTotal : def.misc;
    def.total = def.misc + subTotal;
    return def;
  }
};

export var calculateInitiative = function(entity, value=false){
  let abl = entity.abilities;
  let base = HalfLevelModifier(entity.level, entity._type) + abl.dexterity.abilityMod;
  let mod = (value) ? value - base : entity.initiative.modifier;
  return {
    base: base,
    modifier: mod,
    total: base+mod,
    current: 0
  }
};

export var calculateAbility = (entity, label, score) => {
  let abl = entity.abilities[ label ];
  abl.score = score;
  abl.abilityMod = AbilityModifier(score);
  abl.AttackModifier = AttackModifier(entity.level, score, entity._type);

  return abl;
}

export var getInitialHitPoints = function(entity, classIndex=false){
  let stats = _Class[classIndex];
  let hitPoints = (classIndex) ? stats.hitPoints : 0;
  let hitPointsFromLevels = 0;
  
  if(classIndex){
    hitPoints += parseInt(entity.abilities[ stats.ability ].score, 10)
    if(entity.level > 1) {
      hitPointsFromLevels = stats.hitPointsLvl * (entity.level - 1);
    }
  } 
  return hitPoints + hitPointsFromLevels; 
}

export var calcWeaponDamage = (player, AttackModifier) => {
  let half = HalfLevelModifier(player.level, player._type);
  let damageMod = half + AttackModifier;

  return damageMod;
}


export var findEntitySize = (label) => {
  for(var x = 0, len=_Size.length; x<len;x++){
    if(_Size[x].label === label){
      return x;
    }
  }
  return false;
};


export var getEntity = (availableEntities, entity) => {
  if(entity._type === 'monster'){
    let e = availableEntities.monsters.find( m => { return m._id === entity._id} );
    if(e !== undefined){
        entity = e;
    }
  } else {
    let e = availableEntities.characters.find( m => { return m._id === entity._id} );
    if(e !== undefined){
        entity = e;
    }
  }

  return entity;
}