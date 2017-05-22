import axios from 'axios';
import {Variables} from '../lib/Variables';

//************ Variables *******************/

export var EntityTemplate = {
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
    armor: false,
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

export var EntityClass = [
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

export var EntityArmor = [
  {"name":"None","score":0,"check":0,"speed":0,"price":0,"weight":0,"_id":"58d18cd2481cfb2b38b54bc1"},
  {"name":"Cloth","score":0,"check":0,"speed":0,"price":1,"weight":4,"_id":"58d18cd2481cfb2b38b54bc2"},
  {"name":"Leather","score":2,"check":0,"speed":0,"price":25,"weight":15,"_id":"58d18cd2481cfb2b38b54bc3"},
  {"name":"Hide","score":3,"check":-1,"speed":0,"price":30,"weight":25,"_id":"58d18cd2481cfb2b38b54bc4"},
  {"name":"Chainmail","score":6,"check":-1,"speed":-1,"price":40,"weight":40,"_id":"58d18cd2481cfb2b38b54bc5"},
  {"name":"Scale","score":7,"check":0,"speed":-1,"price":45,"weight":45,"_id":"58d18cd2481cfb2b38b54bc6"},
  {"name":"Plate","score":8,"check":-2,"speed":-1,"price":50,"weight":50,"_id":"58d18cd2481cfb2b38b54bc7"}
];

export var EntityShield = [
  { _id: '58d18c0025fde44650d30373', key: "light", name: 'Light Shield', score: 1, check: 0, speed: 0, price: 5, weight: 6 },
  { _id: '58d18c0025fde44650d30374', key: "heavy", name: 'Heavy Shield', score: 2, check: -2, speed: 0, price: 10, weight: 15 }
];

///*********** Functions *******************/

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

export var calculateInitiative = function(state, value=false){
  let base = HalfLevelModifier(state.entity.level, state.entity._type) + state.entity.abilities.dexterity.abilityMod;
  let mod = (value) ? value - base : state.entity.initiative.modifier;
  return {
    base: HalfLevelModifier(state.entity.level, state.entity._type) + state.entity.abilities.dexterity.abilityMod,
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
  let stats = EntityClass[classIndex];
  let hitPoints = (classIndex) ? stats.hitPoints : 0;
  let hitPointsPerLevel = (state.entity.level === 1) ? 0 : (((classIndex) ? stats.hitPointsLvl : 0) * state.entity.level);
  return hitPoints + hitPointsPerLevel + parseInt(state.entity.abilities[ stats.ability ].score, 10); 
}

export var calculateArmorClass = function(state, value=false){
  let armor = state.entity.defense.armorClass;
  let ability = (!state.entity.class) ? 'constitution' : EntityClass[ state.entity.class ].ability;
  armor.armorBonus = (!state.entity.armor) ? 0 : EntityArmor[ state.entity.armor ].score;
  if(state.entity.armor <= 2){
    armor.armorBonus += getDefenseModifier(state, 'reflex');
  }
  
  armor.abilityMod = state.entity.abilities[ ability ].abilityMod;
  armor.halfLvl = HalfLevelModifier(state.entity.level);
  let subTotal = armor.default + armor.halfLvl + armor.abilityMod + armor.armorBonus + armor.shield;
  armor.misc = (value) ? value - subTotal : 0;

  armor.total = subTotal + armor.misc;
  state.entity.defense.armorClass = armor;

  return state;
};

export var calculateDefense = function(state, _defense=false,value=false){
  for(let d in state.entity.defense){
    if(state.entity.defense.hasOwnProperty(d) && d !== 'armorClass'){
      let def = state.entity.defense[d];
      def.abilityMod = getDefenseModifier(state, d);
      def.halfLvl = + HalfLevelModifier(state.entity.level, state.entity._type);
      let subTotal = def.default + def.halfLvl + def.abilityMod + def.classBonus + def.raceBonus;
      subTotal = (d === 'reflex') ? subTotal + state.entity.defense.armorClass.shield : subTotal;
      def.misc = (_defense === d && value) ? value-subTotal : def.misc;
      def.total = def.misc + subTotal;
      state.entity.defense[d] = def;
    }
  }
  return state;
}

function getDefenseModifier(state, defense)
{
  let abl = state.entity.abilities;
  let score = 0;
  if(defense === 'fortitude'){
    score = (abl.strength.abilityMod >= abl.constitution.abilityMod) ? abl.strength.abilityMod : abl.constitution.abilityMod;
  }
  if(defense === 'reflex'){
    score = (abl.dexterity.abilityMod >= abl.intelligence.abilityMod) ? abl.dexterity.abilityMod : abl.intelligence.abilityMod;
  }
  if(defense === 'willpower'){
    score = (abl.wisdom.abilityMod >= abl.charisma.abilityMod) ? abl.wisdom.abilityMod : abl.charisma.abilityMod;
  }
  
  return score;
}

export var updateWeightPrice = (state, item, action) => {
  if(state._type === 'character'){
    if(action === 'add'){
      if(state.coin_purse < item.price){
        return state;
      }
      state.encumbered += parseFloat(item.weight, 10);
      state.coin_purse -= parseFloat(item.price, 10);
    } else {
      state.encumbered -= parseFloat(item.weight, 10);
      state.coin_purse += parseFloat(item.price, 10);
    }
  }
  return state;
}

export var updateInventory = (state, item, category, action, index=false) => {
  let inventory_id = item._id;
  let inventory = state.inventory;
  let inventory_log = state.inventory_log;
  let _i;
  let tmpItem = Variables.clone(item);
  tmpItem.quantity = (tmpItem.quantity === undefined) ? 1 : tmpItem.quantity;

  if(action === 'add'){
    if(state._type === 'character'){
      if(state.coin_purse < tmpItem.price){
        return state;
      }
    } else {
      if(state.weapons.length === 0){
        inventory = [];
        inventory_log = [];
      }
    }
    _i = inventory.findIndex((inv, i) => { return inv.item._id === inventory_id });
    
    if(_i === -1){
      inventory.push( { category: category, item: tmpItem } );
    } else {
      inventory[_i].item.quantity += (tmpItem.quantity === undefined) ? 1 : tmpItem.quantity;
    }
    inventory_log.splice(0, 0, { category: category, item: tmpItem } );
  }

  if(action === 'removeCategory'){
    _i = inventory.findIndex((inv, i) => { return inv.category === category});
    if(_i !== -1){
      inventory.splice(_i, 1);
    }
    inventory_log.splice(index, 1);
  }

  if(action === 'removeItem'){
    _i = inventory.findIndex((inv, i) => { return inv.item._id === inventory_id});
    if(_i !== -1 && inventory[_i].item.quantity > 0){
      inventory[_i].item.quantity -= tmpItem.quantity;
    }
  }

  state.inventory = inventory;
  state.inventory_log = inventory_log;

  return state;
}

export var calcWeightPrice = (state, purchasedItem, category, bolRemove=false, bolAddItem=true) => {
  if(state.inventory === undefined){
    state.inventory = [];
    state.inventory_log = [];
  }
  if(bolRemove){
    let log = state.inventory_log;
    if(bolRemove === 'category'){      
      let _i = log.findIndex((item, index) => { return item.category === category} );
      if(_i !== -1){    
        state = updateWeightPrice(state, log[_i].item, 'remove');
        state = updateInventory(state, log[_i].item, category, 'removeCategory', _i);
      }
    }

    if(bolRemove === 'item'){
      let inventory_id = purchasedItem._id;
      let _i = state.inventory.findIndex((inv, i) => { return inv.item._id === inventory_id });
      if(_i !== undefined && _i > -1) {
        if(state.inventory[_i].item.quantity > 0){
          state = updateWeightPrice(state, purchasedItem, 'remove');
          state = updateInventory(state, purchasedItem, category, 'removeItem');
        }
      }
    }
  }

  if(bolAddItem){
    state = updateWeightPrice(state, purchasedItem, 'add');
    state = updateInventory(state, purchasedItem, category, 'add');
  }
  return state;
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
  state.entity._type = _this.EntityType;

  let key = (_this.EntityType === 'monster') ? 'availableMonsters' : 'availableCharacters';

  axios.post(`${Variables.host}/saveEntity`, state.entity)
  .then(res => {
    let key2 = Variables.clone(_this.state.selectedEntity);
    state.snackbarOpen = true;
    state.snackbarMsg = state.entity._type+' successfully saved';
    state.entity = Variables.clone(EntityTemplate);
    
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