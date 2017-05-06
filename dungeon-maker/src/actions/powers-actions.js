import * as types from '../actions/action-types';

export function loadExistingPowers(powers) {
  return {
    type: types.LOAD_EXISTING_POWERS,
    powers: powers
  };
}

export function addToPowers(power) {
  return {
    type: types.ADD_TO_POWERS,
    power: power
  };
}

export function resetCurrentPower(power) {
  return {
    type: types.RESET_CURRENT_POWER,
    power: power
  };
}

export function changeCurrentPower(index) {
  return {
    type: types.CHANGE_CURRENT_POWER,
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

export function changeDieModifier(modifier) {
  return {
    type: types.CHANGE_DIE_MODIFIER,
    modifier: modifier
  };
}

export function updateKey(key, value) {
  return {
    type: types.UPDATE_KEY,
    key: key,
    value: value
  };
}

export function updateAttack(key, value) {
  return {
    type: types.UPDATE_ATTACK,
    key: key,
    value: value
  };
}

