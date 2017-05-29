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

export function updateEntityWeapon(id) {
  return {
    type: types.UPDATE_ENTITY_WEAPON,
    id: id
  };
}

export function updateEntityArmor(index) {
  return {
    type: types.UPDATE_ENTITY_ARMOR,
    index: index
  };
}

export function updateEntityShield(score) {
  return {
    type: types.UPDATE_ENTITY_SHIELD,
    score: score
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