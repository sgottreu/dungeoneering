import * as types from '../actions/action-types';

export function loadAvailableWeapons(weapons) {
  return {
    type: types.LOAD_AVAILABLE_WEAPONS,
    weapons: weapons
  };
}

export function editAvailableWeapons(weapon){
  return {
    type: types.EDIT_AVAILABLE_WEAPONS,
    weapon: weapon
  };
}

export function changeWeapon(index) {
  return {
    type: types.CHANGE_WEAPON,
    index: index
  };
}

export function changeDieType(index) {
  return {
    type: types.CHANGE_DIE_TYPE,
    index: index
  };
}

export function changeDieNumber(quantity) {
  return {
    type: types.CHANGE_DIE_NUMBER,
    quantity: quantity
  };
}

export function updateKey(key, value) {
  return {
    type: types.UPDATE_KEY,
    key: key,
    value: value
  };
}
