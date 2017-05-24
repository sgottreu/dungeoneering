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