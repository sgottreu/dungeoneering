import * as types from '../actions/action-types';

export function loadCharacters(availableCharacters) {
  return {
    type: types.LOAD_CHARACTERS,
    entities: availableCharacters
  };
}

export function loadMonsters(availableMonsters) {
  return {
    type: types.LOAD_MONSTERS,
    entities: availableMonsters
  };
}

export function updateKey(key, value) {
  return {
    type: types.UPDATE_KEY,
    key: key,
    value: value
  };
}

export function updateEntityKey(key, value) {
  return {
    type: types.UPDATE_ENTITY_KEY,
    key: key,
    value: value
  };
}

export function updatePointsKey(key, value) {
  return {
    type: types.UPDATE_POINTS_KEY,
    key: key,
    value: value
  };
}

export function updateMouseover(entity, entityType, event) {
  return {
    type: types.UPDATE_MOUSEOVER,
    entityType: entityType,
    entity: entity,
    mouse: event
  };
}

export function updateEntityLevel(level) {
  return {
    type: types.UPDATE_ENTITY_LEVEL,
    level: level
  };
}

export function updateEntityInventory(entity, item, step='add') {
  return {
    type: types.UPDATE_ENTITY_INVENTORY,
    item: item,
    entity: entity,
    step: step,
  };
}

export function updateEntityWeapon(id) {
  return {
    type: types.UPDATE_ENTITY_WEAPON,
    id: id
  };
}

export function updateEntityArmor(_id, item) {
  return {
    type: types.UPDATE_ENTITY_ARMOR,
    _id: _id,
    item: item
  };
}

export function updateEntityArmorclass(value) {
  return {
    type: types.UPDATE_ENTITY_ARMORCLASS,
    value: value
  };
}

export function updateEntityShield(item) {
  return {
    type: types.UPDATE_ENTITY_SHIELD,
    item: item
  };
}

export function updateEntityDefense(defense, value=false) {
  return {
    type: types.UPDATE_ENTITY_DEFENSE,
    defense: defense,
    value: value
  };
}

export function updateEntityAbility(event) {
  return {
    type: types.UPDATE_ENTITY_ABILITY,
    ability: event.name,
    score: event.value
  };
}

export function updateEntityRace(index) {
  return {
    type: types.UPDATE_ENTITY_RACE,
    index: index
  };
}

export function updateEntityClass(index) {
  return {
    type: types.UPDATE_ENTITY_CLASS,
    index: index
  };
}
export function updateEntityInitiative(value) {
  return {
    type: types.UPDATE_ENTITY_INITIATIVE,
    value: value
  };
}
export function updateEntityHp(value) {
  return {
    type: types.UPDATE_ENTITY_HP,
    value: value
  };
}

export function updateEntityCharacterPower(id) {
  return {
    type: types.UPDATE_ENTITY_CHARACTER_POWER,
    id: id
  };
}

export function updateEntityMonsterPower(power, remove=false) {
  return {
    type: types.UPDATE_ENTITY_MONSTER_POWER,
    power: power,
    remove: remove
  };
}
