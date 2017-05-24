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