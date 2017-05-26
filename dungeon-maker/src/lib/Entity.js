import {Variables} from '../lib/Variables';
import axios from 'axios';
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
      strength: { score: 12, abilityMod: 0, AttackModifier: 0 },
      constitution: { score: 12, abilityMod: 0, AttackModifier: 0 },
      dexterity: { score: 12, abilityMod: 0, AttackModifier: 0 },
      intelligence: { score: 12, abilityMod: 0, AttackModifier: 0 },
      wisdom: { score: 12, abilityMod: 0, AttackModifier: 0 },
      charisma: { score: 12, abilityMod: 0, AttackModifier: 0 }
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

export var EntityIcons = [
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

export var EntityRole = [
  'Artillery',
  'Brute',
  'Controller',
  'Lurker',
  'Minion',
  'Skirmisher',
  'Soldier'
];

export var EntitySize = [
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

export var EntityRace = [
  { name: 'Dwarf', abilityMod: { constitution: 2, wisdom: 2}, size: 'Medium', speed: 5, skillBonus: {dungeoneering: 2, endurance:2} },
  { name: 'Elf', abilityMod: { dexterity: 2, wisdom: 2}, size: 'Medium', speed: 7, skillBonus: {nature: 2, perception:2}, defenseMod: {willpower: 1} },
  { name: 'Halfling', abilityMod: { dexterity: 2, charisma: 2}, size: 'Small', speed: 6, skillBonus: {acrobatics: 2, thievery:2} },
  { name: 'Human', abilityMod: { any: 2 }, size: 'Medium', speed: 6, skillBonus: 'any', defenseMod: {fortitude: 1, reflex: 1, willpower: 1} }
];

export var _Armor = [
  {"name":"None","score":0,"check":0,"speed":0,"price":0,"weight":0,"_id":"58d18cd2481cfb2b38b54bc1"},
  {"name":"Cloth","score":0,"check":0,"speed":0,"price":1,"weight":4,"_id":"58d18cd2481cfb2b38b54bc2"},
  {"name":"Leather","score":2,"check":0,"speed":0,"price":25,"weight":15,"_id":"58d18cd2481cfb2b38b54bc3"},
  {"name":"Hide","score":3,"check":-1,"speed":0,"price":30,"weight":25,"_id":"58d18cd2481cfb2b38b54bc4"},
  {"name":"Chainmail","score":6,"check":-1,"speed":-1,"price":40,"weight":40,"_id":"58d18cd2481cfb2b38b54bc5"},
  {"name":"Scale","score":7,"check":0,"speed":-1,"price":45,"weight":45,"_id":"58d18cd2481cfb2b38b54bc6"},
  {"name":"Plate","score":8,"check":-2,"speed":-1,"price":50,"weight":50,"_id":"58d18cd2481cfb2b38b54bc7"}
];

export var _Shield = [
  { _id: '58d18c0025fde44650d30373', key: "light", name: 'Light Shield', score: 1, check: 0, speed: 0, price: 5, weight: 6 },
  { _id: '58d18c0025fde44650d30374', key: "heavy", name: 'Heavy Shield', score: 2, check: -2, speed: 0, price: 10, weight: 15 }
];

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

export var updateEncumbrance = (encumbered, coin_purse, item, action) => {
  if(action === 'add'){
    if(coin_purse < item.price){
      return encumbered;
    }
    encumbered += parseFloat(item.weight, 10);
  } else {
    encumbered -= parseFloat(item.weight, 10);
  }
  return encumbered;
}

export var updateCoinPurse = (coin_purse, item, action) => {
  if(action === 'add'){
    if(coin_purse < item.price){
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
  if(_i !== -1 && inventory[_i].item.quantity > 0){
    inventory[_i].item.quantity -= purchasedItem.quantity;
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
  }
  return score;
}

export var HalfLevelModifier = function(level, type){
  let mod = Math.floor(level/2);
  mod = (type === 'monster') ? mod * 2 : mod;
  return mod;
};

export var calculateArmorClass = function(entity, value=false){
  let ac = entity.defense.armorClass;
  let ability = (!entity.class) ? 'constitution' : _Class[ entity.class ].ability;

  ac.armorBonus = _Armor[ entity.armor ].score;
  if(_Armor[ entity.armor ].weight <= 15){
    ac.armorBonus += getDefenseModifier(entity, 'reflex');
  }
  
  ac.abilityMod = entity.abilities[ ability ].abilityMod;
  ac.halfLvl = HalfLevelModifier(entity.level, entity._type);

  let subTotal = ac.default + ac.halfLvl + ac.abilityMod + ac.armorBonus + ac.shield;

  ac.misc = (value) ? value - subTotal : 0;
  ac.total = subTotal + ac.misc;

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









/// Left to migrate





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



export var AttackModifier = function(level, score, type){
  return HalfLevelModifier(level, type) + AbilityModifier(score);
};

export var calculateInitiative = function(state, value=false){
  let base = HalfLevelModifier(state.entity.level, state._type) + state.entity.abilities.dexterity.abilityMod;
  let mod = (value) ? value - base : state.entity.initiative.modifier;
  return {
    base: HalfLevelModifier(state.entity.level, state._type) + state.entity.abilities.dexterity.abilityMod,
    modifier: mod,
    total: base+mod,
    current: 0
  }
};

export var findEntitySize = function(label){
  for(var x = 0; x<EntitySize.length;x++){
    if(EntitySize[x].label === label){
      return x;
    }
  }
  return false;
};

export var getInitialHitPoints = function(state, classIndex){
  let stats = _Class[classIndex];
  let hitPoints = (classIndex) ? stats.hitPoints : 0;
  let hitPointsPerLevel = (state.entity.level === 1) ? 0 : (((classIndex) ? stats.hitPointsLvl : 0) * state.entity.level);
  return hitPoints + hitPointsPerLevel + parseInt(state.entity.abilities[ stats.ability ].score, 10); 
}




export var findEntity = function(_this){
  axios.get(`${Variables.host}/findEntities`)
  .then(res => {
    let state = _this.state;
    state.availableMonsters = res.data.monster;
    state.availableCharacters = res.data.character;
    _this.setState( state );
  }); 
}

export var saveEntity = function(_this){
  let state = _this.state;
  state._type = _this.EntityType;

  let key = (_this.EntityType === 'monster') ? 'availableMonsters' : 'availableCharacters';

  axios.post(`${Variables.host}/saveEntity`, state.entity)
  .then(res => {
    let key2 = Variables.clone(_this.state.selectedEntity);
    state.snackbarOpen = true;
    state.snackbarMsg = state._type+' successfully saved';
    state.entity = Variables.clone(Template);
    
    if(state[key][key2] === undefined){
      state[key].push(res.data);
    } else {
      state[key][key2] = res.data;
    }
    
    state.selectedEntity = false;
    _this.setState( state );
  });
}


export var calcWeaponDamage = (player, AttackModifier) => {
	let half = HalfLevelModifier(player.level, player._type);
	let damageMod = half + AttackModifier;

	return damageMod;
}


