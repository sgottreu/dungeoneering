import axios from 'axios';
import {Variables} from './Variables';

export var EntityTemplate = {

    name: '',
    level: 1,
    role: '',
    race: false,
    class: false,
    type: '',
    size: false,
    xp: 0,
    initiative: 0,
    hp: 0,
    bloodied: 0,
    speed: 0,
    resistances: [],
    armor: [],
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
      armorClass: { total: 0, default: 10, abilityMod: 0, armorBonus: 0, shield: 0 },
      fortitude: { total: 0, default: 10, abilityMod: 0, classBonus: 0, raceBonus: 0 },
      reflex: { total:0, default: 10, abilityMod: 0, classBonus: 0, raceBonus: 0 },
      willpower: { total: 0, default: 10, abilityMod: 0, classBonus: 0, raceBonus: 0 }
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
    iconClass: ''
  
};

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
}

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
  {label: 'Tiny', space: 0, reach: 0},
  {label: 'Small', space: 1, reach: 1},
  {label: 'Medium', space: 1, reach: 1},
  {label: 'Large', space: 2, reach: 1},
  {label: 'Huge', space: 3, reach: 2},
  {label: 'Gargantuan', space: 4, reach: 3 }
];

export var findEntitySize = function(label){
  for(var x = 0; x<EntitySize.length;x++){
    if(EntitySize[x].label === label){
      return x;
    }
  }
  return false;
};

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

export var getInitialHitPoints = function(state, classIndex){
  let stats = EntityClass[classIndex];
  let hitPoints = (classIndex) ? stats.hitPoints : 0;
  let hitPointsPerLevel = (state.entity.level === 1) ? 0 : (((classIndex) ? stats.hitPointsLvl : 0) * state.entity.level);
  return hitPoints + hitPointsPerLevel + parseInt(state.entity.abilities[ stats.ability ].score, 10); 
}

export var EntityRace = [
  { name: 'Dwarf', abilityMod: { constitution: 2, wisdom: 2}, size: findEntitySize('Medium'), speed: 5, skillBonus: {dungeoneering: 2, endurance:2} },
  { name: 'Elf', abilityMod: { dexterity: 2, wisdom: 2}, size: findEntitySize('Medium'), speed: 7, skillBonus: {nature: 2, perception:2}, defenseMod: {willpower: 1} },
  { name: 'Halfling', abilityMod: { dexterity: 2, charisma: 2}, size: findEntitySize('Small'), speed: 6, skillBonus: {acrobatics: 2, thievery:2} },
  { name: 'Human', abilityMod: { any: 2 }, size: findEntitySize('Medium'), speed: 6, skillBonus: 'any', defenseMod: {fortitude: 1, reflex: 1, willpower: 1} }
];

export var EntityArmor = [
  { name: 'None', score: 0 },
  { name: 'Cloth', score: 0 },
  { name: 'Leather', score: 2 },
  { name: 'Hide', score: 3 },
  { name: 'Chainmail', score: 6 },
  { name: 'Scale', score: 7 },
  { name: 'Plate', score: 8 }
];

export var calculateArmorClass = function(state){
  let armor = state.entity.defense.armorClass;
  let ability = (!state.entity.class) ? 'constitution' : EntityClass[ state.entity.class ].ability;
  armor.armorBonus = EntityArmor[ state.entity.armor].score;
  if(state.entity.armor <= 2){
    armor.armorBonus += getDefenseModifier(state, 'reflex');
  }
  armor.abilityMod = state.entity.abilities[ ability ].abilityMod;
  armor.halfLvl = HalfLevelModifier(state.entity.level);
  armor.total = armor.default + armor.halfLvl + armor.abilityMod + armor.armorBonus + armor.shield;
  state.entity.defense.armorClass = armor;

  return state;
};

export var calculateDefense = function(state){
  for(let d in state.entity.defense){
    if(state.entity.defense.hasOwnProperty(d)){
      let def = state.entity.defense[d];
      def.abilityMod = getDefenseModifier(state, d);
      def.halfLvl = + HalfLevelModifier(state.entity.level, state.entity.type);
      def.total = def.default + def.halfLvl + def.abilityMod + def.classBonus + def.raceBonus;
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

export var saveEntity = function(_this){
  let state = _this.state;
  state.entity.type = _this.EntityType;

  axios.post(`${Variables.host}/saveEntity`, state)
  .then(res => {
      _this.setState( {snackbarOpen: true, snackbarMsg: state.entity.type+' successfully saved', entity: Variables.clone(EntityTemplate) });
  });
}

export var EntityIcons = [
  { label: 'Kobold', class: 'kobold', type: 'monster' },
  { label: 'Goblin', class: 'goblin', type: 'monster' },
  { label: 'Skeleton', class: 'skeleton', type: 'monster' },
  { label: 'Zombie', class: 'zombie', type: 'monster' },
  { label: 'Critter', class: 'critter', type: 'monster' },
  { label: 'Rat', class: 'rat', type: 'monster' },
  { label: 'Bat', class: 'bat', type: 'monster' },
  { label: 'Cleric', class: 'cleric', type: 'character' },
  { label: 'Ranger', class: 'ranger', type: 'character' },
  { label: 'Wizard', class: 'wizard', type: 'character' },
  { label: 'Warlock', class: 'warlock', type: 'character' }
];