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

export function changeGear(gear) {
  return {
    type: types.CHANGE_GEAR,
    gear: gear
  };
}

export function updateExistingGear(gear) {
  return {
    type: types.UPDATE_EXISTING_GEAR,
    gear: gear
  };
}