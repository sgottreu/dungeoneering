import * as types from '../actions/action-types';

export function loadCharacters(availableCharacters) {
  return {
    type: types.LOAD_CHARACTERS,
    availableCharacters: availableCharacters
  };
}

export function loadMonsters(availableMonsters) {
  return {
    type: types.LOAD_MONSTERS,
    availableMonsters: availableMonsters
  };
}