import * as types from '../actions/action-types';

export function loadAvailableGear(gear) {
  return {
    type: types.LOAD_AVAILABLE_GEAR,
    gear: gear
  };
}

export function updateKey(key, value) {
  return {
    type: types.UPDATE_KEY,
    key: key,
    value: value
  };
}

export function changeGear(index) {
  return {
    type: types.CHANGE_GEAR,
    index: index
  };
}

export function updateExistingGear(gear) {
  return {
    type: types.UPDATE_EXISTING_GEAR,
    gear: gear
  };
}